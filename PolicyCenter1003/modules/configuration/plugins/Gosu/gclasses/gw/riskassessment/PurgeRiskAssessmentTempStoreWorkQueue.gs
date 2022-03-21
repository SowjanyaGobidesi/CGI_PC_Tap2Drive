package gw.riskassessment

uses gw.api.database.IQuery
uses gw.api.database.IQueryBuilder
uses gw.api.database.Queries
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.processes.BulkInsertWorkQueueBase

uses java.util.Date
uses java.util.Iterator

@Export
class PurgeRiskAssessmentTempStoreWorkQueue extends BulkInsertWorkQueueBase<OutboundPeriodRiskAssessmentTempStore, StandardWorkItem> {

  construct () {
    super(BatchProcessType.TC_PURGERISKASSESSMENTTEMPSTORE, StandardWorkItem, OutboundPeriodRiskAssessmentTempStore)
  }

  protected override function buildBulkInsertSelect(builder : Object, objects : List<Object>) {
    excludeDuplicatesOnStandardWorkItem(builder, false)
    findTargets(extractSourceQuery(builder))
  }
  
  @SuppressWarnings("unchecked")
  override function findTargets() : Iterator<OutboundPeriodRiskAssessmentTempStore> {
    var query = Queries.createQuery(getTargetType())
    return findTargets(query) as Iterator<OutboundPeriodRiskAssessmentTempStore>
  }
  
  private function findTargets(query: IQueryBuilder) : Iterator {
    var latestDateForPurgePeriod = Date.Now.addDays(-(PCConfigParameters.PurgeRiskAssessmentTempStoreDays.getValue()))
    query.compare(OutboundPeriodRiskAssessmentTempStore#UpdateTime, LessThanOrEquals, latestDateForPurgePeriod)
    var policyPeriod = query.subselect(OutboundPeriodRiskAssessmentTempStore#PolicyPeriod, CompareIn, PolicyPeriod#ID)
    policyPeriod.compare(PolicyPeriod#Status, Equals, PolicyPeriodStatus.TC_BOUND)
    return (query as IQuery).withLogSQL(true).select().iterator()
  }

  override function processWorkItem(workItem : StandardWorkItem) {
    if (!PCConfigParameters.RiskAssessmentIntegrationEnabled.getValue()) {
      return;
    }

    PCLoggerCategory.RISK_ASSESSMENT.info("Risk assessment temp store entities" + OutboundPeriodRiskAssessmentTempStore.ID_PROP + " purge started by work item " + workItem.getDisplayName())
    var tempStoreToEvaluate = extractTarget(workItem)
    if (tempStoreToEvaluate != null) {
      tempStoreToEvaluate.remove()
      tempStoreToEvaluate.Bundle.commit()
    } else {
      PCLoggerCategory.RISK_ASSESSMENT.info("Risk assessment temp store entities" + OutboundPeriodRiskAssessmentTempStore.ID_PROP + " is null. Nothing to remove.")
    }
    PCLoggerCategory.RISK_ASSESSMENT.info("Risk assessment temp store entities" + OutboundPeriodRiskAssessmentTempStore.ID_PROP + " purge is completed by work item " + workItem.getDisplayName())
  }
}