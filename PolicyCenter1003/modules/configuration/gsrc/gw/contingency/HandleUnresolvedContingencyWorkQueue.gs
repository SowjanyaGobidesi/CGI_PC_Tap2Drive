package gw.contingency

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.system.PLDependenciesGateway
uses gw.pl.persistence.core.Bundle
uses gw.processes.BulkInsertWorkQueueBase

uses java.lang.IllegalStateException
uses java.util.Date

/**
 * This work queue processes unresolved contingencies and start a Job based on the contingency action
 * for each contingency in advance of the due date on it
 */
@Export
class HandleUnresolvedContingencyWorkQueue extends BulkInsertWorkQueueBase<Contingency, StandardWorkItem> {

    private static final var LOG = PCLoggerCategory.JOB_PROCESS

    construct () {
      super(BatchProcessType.TC_HANDLEUNRESOLVEDCONTINGENCY, StandardWorkItem, Contingency)
    }

    override function buildBulkInsertSelect(builder : Object, args: List<Object>) {
      excludeDuplicatesOnStandardWorkItem(builder, false);
      final var sourceQuery = extractSourceQuery(builder)
      sourceQuery.compare(Contingency#ActionStartDate, LessThanOrEquals, Date.Now)
      sourceQuery.compare(Contingency#ActionStarted, Equals, false)
      sourceQuery.compare(Contingency#Status, Equals, ContingencyStatus.TC_PENDING)
      (sourceQuery as Query).withLogSQL(true)
    }

    override function processWorkItem(workItem : StandardWorkItem) {
      var suId = PLDependenciesGateway.getSuperUserIdentifier().getSystemServicesUserId()
      var token = PLDependenciesGateway.getServiceTokenManager().createAuthenticatedToken(suId)
      PLDependenciesGateway.getCommonDependencies().setServiceToken(token)

      gw.transaction.Transaction.runWithNewBundle(\bundle -> {
        var contingency = bundle.add(extractTarget(workItem))

        //find latest bound one and then initiate action
        try {
          if (contingency.IsCancellationAction) {
            var cancellation = new Cancellation()
            cancellation.Source = CancellationSource.TC_CARRIER
            cancellation.CancelReasonCode = ReasonCode.TC_UNRESOLVEDCONTINGENCY
            var contingencyJob = createContingencyJob(cancellation, contingency, bundle)
            cancellation.setContingencyInitiator(contingencyJob)
            cancellation.startJob(contingency.Policy, getJobDate(contingency), contingency.JobCalculationMethod)
          } else if (contingency.IsPolicyChangeAction) {
            var change = new PolicyChange()
            change.Description = DisplayKey.get('PolicyChange.Description.UnresolvedContingency')
            var contingencyJob = createContingencyJob(change, contingency, bundle)
            change.setContingencyInitiator(contingencyJob)
            change.startJob(contingency.Policy, getJobDate(contingency))
          }
          contingency.ActionStarted = true
          contingency.Status = TC_ACTION_INITIATED
        } catch(e : RuntimeException) {
          handleUnableToCreateJobException(bundle, contingency)
        }
      })

      PLDependenciesGateway.getServiceTokenManager().removeToken(PLDependenciesGateway.getCommonDependencies().getServiceToken())
    }

    private function handleUnableToCreateJobException(bundle : gw.pl.persistence.core.Bundle, contingency : Contingency) {
      LOG.error(DisplayKey.get('Job.Error.FailedToStartJobForContingency'))
      bundle.InsertedBeans.each(\elt -> {
        bundle.delete(elt)
      })
      createActivityFromFailedAction(contingency)
    }

    protected function createActivityFromFailedAction(contingency : Contingency) {
      var activityAlreadyCreated = contingency.Activities.where(\elt -> elt.Description == DisplayKey.get('Job.Error.ContingencyActionForUnboundJob'))
      if (activityAlreadyCreated.IsEmpty) {
        var activity = contingency.createContingencyActivity()
        activity.Description = DisplayKey.get('Job.Error.ContingencyActionForUnboundJob')
        activity.setEscalationDate(Date.Today)
        activity.Priority = TC_URGENT
        contingency.Bundle.add(activity)
      }
    }

    internal function getJobDate(contingency : Contingency) : Date {
      if (contingency.JobCalculationMethod == CalculationMethod.TC_PRORATA) {
        return contingency.DueDate.addDays(1)
      } else if (contingency.JobCalculationMethod == CalculationMethod.TC_FLAT) {
        if (contingency.PolicyPeriod != null) {
          return contingency.PolicyPeriod.PeriodStart
        } else {
          //OOTB we are canceling only the latest bound period for policy level contingencies
          return contingency.Policy.LatestBoundPeriod.PeriodStart
        }
      }
      throw new IllegalStateException("unspecified calculation method for " + contingency.Action)
    }

    private function createContingencyJob(job : Job, contingency : Contingency, bundle: Bundle) : ContingencyJob {
      var contingencyJob = new ContingencyJob(bundle)
      contingencyJob.Contingency = contingency
      contingencyJob.Job = job

      return contingencyJob
    }

  }

