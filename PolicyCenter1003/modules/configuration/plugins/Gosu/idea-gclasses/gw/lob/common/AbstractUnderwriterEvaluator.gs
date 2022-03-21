package gw.lob.common

uses gw.api.database.Query
uses gw.api.database.Table
uses gw.api.locale.DisplayKey
uses gw.api.system.BizRulesDependenciesGateway
uses gw.bizrules.provisioning.triggeringpoints.UnderwriterEvaluatorTriggeringPoint
uses gw.policy.PolicyEvalContext

@Export
abstract class AbstractUnderwriterEvaluator implements UnderwriterEvaluator {

  private var ACTION_MAP: Map<UWIssueCheckingSet, block()> = {
      TC_PREBIND->\-> onPreBind(),
      TC_PREQUOTE->\-> onPrequote(),
      TC_REFERRAL->\-> onReferral(),
      TC_QUESTION->\-> onQuestion(),
      TC_RENEWAL->\-> onRenewal(),
      TC_REINSURANCE->\-> onReinsurance(),
      TC_PREQUOTERELEASE->\-> onPrequoteRelease(),
      TC_MVR->\-> onMVR(),
      TC_UWHOLD->\-> onUWHold(),
      TC_REGULATORYHOLD->\-> onRegulatoryHold()
  }

  protected var _policyEvalContext : PolicyEvalContext

  construct (policyEvalContext : PolicyEvalContext){
    _policyEvalContext = policyEvalContext
  }

  override function canEvaluate() : boolean {
    return true
  }

  override function evaluate() {
    if (canEvaluate()) {
      var triggeringPoint = UWIssueType.mapper.toTriggeringPointKey(_policyEvalContext.CheckingSet);
      // trigger the rules subscribed to this checking set (triggering point)
      BizRulesDependenciesGateway.getBizRulesExecutor().trigger(new UnderwriterEvaluatorTriggeringPoint(triggeringPoint, _policyEvalContext))

      // trigger the hardcoded rules for this checking set
      var action = ACTION_MAP[_policyEvalContext.CheckingSet]
      if (action != null) {
        action()
      }
    }
  }

  protected function onPreBind() {}
  protected function onPrequote() {}
  protected function onQuestion() {}
  protected function onReferral() {}
  protected function onReinsurance() {}
  protected function onRenewal() {}
  protected function onPrequoteRelease() {}
  protected function onMVR() {}
  protected function onUWHold() {}
  protected function onRegulatoryHold() {}

  protected function producerChanged() {
    final var period = _policyEvalContext.Period

    if (period.Job typeis Submission or period.Job typeis Issuance) {
      // find latest period of same product type
      var others = findActivePoliciesWithSameProduct(period)
          .map(\ p -> p.fetchPolicyPeriod().getSlice(p.PeriodStart))
          .where(\ p -> p.Policy != period.Policy)

      var otherProducer = others.firstWhere(\ o -> o.ProducerOfRecord != period.ProducerOfRecord)
      var otherCode = others.firstWhere(\ o -> o.ProducerCodeOfRecord != period.ProducerCodeOfRecord)

      if (otherProducer != null) {
        maybeAddUWIssueForProducer(otherProducer.ProducerOfRecord.Name, period.ProducerOfRecord.Name,
                                   otherProducer.ProducerCodeOfRecord,  period.ProducerCodeOfRecord)
      } else if (otherCode != null) {
        maybeAddUWIssueForProducer(otherCode.ProducerOfRecord.Name, period.ProducerOfRecord.Name,
                                   otherCode.ProducerCodeOfRecord,  period.ProducerCodeOfRecord)
      }
    }
  }

  internal function findActivePoliciesWithSameProduct(period : PolicyPeriod) : List<PolicyPeriodSummary> {
    var todaysDate = Date.CurrentDate

    // keeping this a db query instead of in-memory filtering query to prevent the large number
    // of policies from being stored in cache uneccessarily
    var query = Query.make(PolicyPeriodSummary)
    query.compare(PolicyPeriod#MostRecentModel, Equals, true);// ensure the policyperiod is latest
    query.compare(PolicyPeriodSummary#CancellationDate, Equals, null)
    query.compare(PolicyPeriodSummary#PeriodStart, NotEquals, null)
    query.compare(PolicyPeriodSummary#PeriodEnd, NotEquals, null)
    query.compare(PolicyPeriodSummary#PeriodStart, LessThanOrEquals, todaysDate)
    query.compare(PolicyPeriodSummary#PeriodEnd, GreaterThan, todaysDate)
    var policyTable : Table = query.join(PolicyPeriod#Policy)
    policyTable.compare(Policy#Account, Equals, period.Policy.Account)
    policyTable.compare(Policy#ProductCode, Equals, period.Policy.ProductCode)
    return query.select().toList()
  }

  private function maybeAddUWIssueForProducer(oldProducerName : String, newProducerName : String,
                                              oldCode : ProducerCode, newCode : ProducerCode) {
    var uwIssueCode     : String = null
    var shortDescBlock       : block() : String = null
    var longDescriptionBlock : block() : String = null

    if (oldProducerName != newProducerName) {
      uwIssueCode = "ChangedProducerOrg"
      shortDescBlock = \ -> DisplayKey.get("UWIssue.ProducerOrgChange.ShortDesc")
      longDescriptionBlock = \ -> DisplayKey.get("UWIssue.ProducerOrgChange.LongDesc", newProducerName, newCode)
    } else if (oldCode != newCode) {
      uwIssueCode = "ChangedProducerCode"
      shortDescBlock = \ -> DisplayKey.get("UWIssue.ProducerCodeChange.ShortDesc")
      longDescriptionBlock = \ -> DisplayKey.get("UWIssue.ProducerCodeChange.LongDesc", newProducerName, newCode)
    }

    if (uwIssueCode != null) {
      var uwIssueKey = newProducerName + " (" + newCode + ")"

      _policyEvalContext.addIssue(uwIssueCode, uwIssueKey, shortDescBlock, longDescriptionBlock)
    }
  }
}