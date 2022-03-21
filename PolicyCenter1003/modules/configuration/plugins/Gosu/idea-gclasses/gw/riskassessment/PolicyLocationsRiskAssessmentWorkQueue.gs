package gw.riskassessment

uses gw.api.locale.DisplayKey
uses gw.api.spotlight.NonInteractivePolicyLocationRiskAssessmentParameters
uses gw.api.system.PCLoggerCategory
uses gw.pl.persistence.core.Bundle
uses gw.processes.WorkQueueBase

/**
 * WorkQueue to start up Risk Assessments for multiple locations.  This workqueue will grab all the PolicyLocations on
 * the Policy Period and run a risk assessment for each location.  The work item is only created when createWorkItem()
 * is called.  If the risk assessment succeeds then it will send the user who requested the risk assessment an
 * activity saying it was successful, else it will send one that says it failed.
 */
@Export
class PolicyLocationsRiskAssessmentWorkQueue extends WorkQueueBase<PolicyPeriod, RiskEvaluationWorkItem> {

  construct () {
    super(BatchProcessType.TC_POLICYLOCATIONSRISKASSESSMENT, RiskEvaluationWorkItem, PolicyPeriod)
  }

  /**
   * Create a work item for a policy period that will get risk assessment for each policy location on this policy period
   * @param period - The policy period to get the risk assessments
   * @param requestingUser - The user who requested the risk assessments for this policy period.
   * @param b - bundle to create the work item into the db
   * @return
   */
  static function createWorkItem(period : PolicyPeriod, requestingUser : User, b : Bundle) : RiskEvaluationWorkItem {
    var workItem = new RiskEvaluationWorkItem(b)
    workItem.PolicyPeriod = period
    workItem.RequestingUser = requestingUser
    workItem.initialize()
    return workItem
  }

  override function createWorkItem(target : PolicyPeriod, b : Bundle) : RiskEvaluationWorkItem {
    PCLoggerCategory.RISK_ASSESSMENT.warn("PolicyLocationsRiskAssessmentWorkQueue.createWorkItem being called without a User argument")
    return PolicyLocationsRiskAssessmentWorkQueue.createWorkItem(target, null, b)
  }

  private function createTempStore(period : PolicyPeriod) : OutboundPeriodRiskAssessmentTempStore {
    var tempStore = new OutboundPeriodRiskAssessmentTempStore(period.Bundle)
    tempStore.populateData(period)
    tempStore.Bundle.commit()

    return tempStore
  }

  override function processWorkItem(workItem : RiskEvaluationWorkItem) {
    var periodToEvaluate = workItem.PolicyPeriod
    var requestingUser = workItem.RequestingUser

    PCLoggerCategory.RISK_ASSESSMENT.info("Policy period " + periodToEvaluate.DisplayName + " risk assessment started by work item " + workItem.getDisplayName())
    periodToEvaluate = periodToEvaluate.getSlice(periodToEvaluate.EditEffectiveDate)
    var tempStore = createTempStore(periodToEvaluate)
    var errorHandler = new SpotlightNonInteractiveErrorHandler()
    var riskAssessmentGateway = new PolicyLocationRiskAssessmentGateway(errorHandler.ErrorCollector)

    var evaluationTime = Date.now()
    riskAssessmentGateway.callRiskAssessmentServiceAndAcceptResult(tempStore, new NonInteractivePolicyLocationRiskAssessmentParameters(tempStore.OutboundLocationRiskAssessmentTempStore))
    errorHandler.handleErrors()

    var activitySubject : String
    var activityDescription : String

    if (errorHandler.ErrorCollector.hasErrors()) {
      activitySubject = DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentFailure.Subject")
      activityDescription = periodToEvaluate.PolicyNumber !=null ?
          DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentFailure.DescriptionWithPolicy", periodToEvaluate.PolicyNumber, periodToEvaluate.Job.DisplayType, periodToEvaluate.Job.JobNumber)
          : DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentFailure.DescriptionWithoutPolicy", periodToEvaluate.Job.DisplayType, periodToEvaluate.Job.JobNumber)
    } else {
      activitySubject = DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentComplete.Subject")
      var jobName = periodToEvaluate.Job.DisplayType.toLowerCase()
      activityDescription = periodToEvaluate.PolicyNumber !=null ?
          DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentComplete.DescriptionWithPolicy", evaluationTime, periodToEvaluate.PolicyNumber, jobName, periodToEvaluate.Job.JobNumber)
          : DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentComplete.DescriptionWithoutPolicy", evaluationTime, jobName, periodToEvaluate.Job.JobNumber)
    }

    if (requestingUser != null) {
      SpotlightNotificationActivityCreator.createActivityForRequestingUser(requestingUser, periodToEvaluate.Job, activitySubject, activityDescription)
    } else if (not errorHandler.ErrorCollector.hasErrors()) {
      SpotlightNotificationActivityCreator.createActivity(periodToEvaluate.Job, activitySubject, activityDescription)
    }

    periodToEvaluate.Bundle.commit()
    PCLoggerCategory.RISK_ASSESSMENT.info("Policy period " + periodToEvaluate.DisplayName + " risk assessment completed by work item " + workItem.getDisplayName())
  }

  override function workItemFailed(workItem : RiskEvaluationWorkItem) {
    var period = workItem.PolicyPeriod

    PCLoggerCategory.RISK_ASSESSMENT.info("Policy period " + period.DisplayName + " risk assessment failed")

    var job = period.Job
    SpotlightNotificationActivityCreator.createActivity(job, DisplayKey.get("RiskAssessment.PolicyLocation.WorkItemFailed.Subject"), DisplayKey.get("RiskAssessment.PolicyLocation.WorkItemFailed.Description"))

    var requestingUser = workItem.RequestingUser
    if (requestingUser != null) {
      SpotlightNotificationActivityCreator.createActivityForRequestingUser(requestingUser, job,
          DisplayKey.get("RiskAssessment.PolicyLocation.WorkItemFailed.Subject"), DisplayKey.get("RiskAssessment.PolicyLocation.WorkItemFailed.Description"))

    }
  }

}
