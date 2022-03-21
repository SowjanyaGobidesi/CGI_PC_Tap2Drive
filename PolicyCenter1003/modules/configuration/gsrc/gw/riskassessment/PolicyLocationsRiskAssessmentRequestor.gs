package gw.riskassessment

uses com.guidewire.pl.system.dependency.PLDependencies
uses gw.api.database.Query

/**
 * A class to request policy locations risk assessment for a given policy period
 */
@Export
class PolicyLocationsRiskAssessmentRequestor {

  private construct () {} // This class is not meant to be instantiated

  /**
   * Creates a work item to evaluate policy location risks and notifies worker(s) to process the newly created work item
   * @param period Policy Period
   */
  static function enqueueForLocationsRiskAssessment(period: PolicyPeriod) {
    var workItem = PolicyLocationsRiskAssessmentWorkQueue.createWorkItem(period, PLDependencies.getCommonDependencies().getCurrentUser(), period.Bundle)
    workItem.Bundle.commit()
    PLDependencies.getDistributedWorkerManager().notifyExecutor(BatchProcessType.TC_POLICYLOCATIONSRISKASSESSMENT)
  }

  static function isLocationsRiskAssessmentInProgress(period: PolicyPeriod) : boolean {
    return Query.make(RiskEvaluationWorkItem)
        .compare(RiskEvaluationWorkItem#PolicyPeriod, Equals, period)
        .compareIn(RiskEvaluationWorkItem#Status, {WorkItemStatusType.TC_CHECKEDOUT, WorkItemStatusType.TC_AVAILABLE})
        .select().HasElements
  }
}
