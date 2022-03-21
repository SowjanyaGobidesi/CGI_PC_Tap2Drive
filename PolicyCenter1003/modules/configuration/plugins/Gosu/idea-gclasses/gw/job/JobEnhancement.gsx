package gw.job

uses gw.api.locale.DisplayKey

uses java.lang.IllegalArgumentException
uses java.util.Date
uses gw.api.util.DisplayableException
uses gw.api.util.TypeUtil
uses gw.assignment.AssignmentUtil
uses gw.pl.currency.MonetaryAmount

enhancement JobEnhancement : Job {

  /**
   * Return a string representation of the job status
   */
  property get DisplayStatus() : String {
    return this.SelectedVersion.Status.DisplayName
  }

  /**
   * Return DateQuoteNeeded for submission jobs
   */
  property get DateQuoteNeeded() : Date {
    return this.SelectedVersion.Submission.DateQuoteNeeded
  }
   /**
   * Grouping logic for JobGroups, including SubmissionGroups, RenewalGroups, etc.
   *
   * This grouping algorithm uses a "Time window" approach, where
   * a job will try to join a JobGroup which already has a job within "TIME_WINDOW" days
   * of this job (based on PolicyPeriod effective date).
   *
   * The timeWindow is a span of time a certain number of days ahead of the earliest
   * job in a JobGroup. A job will not be grouped in a group where the earliest job
   * is after it.
   *
   * Time window is in days.  How close a job must be to another job to try to join its group.
   * Note that a timeWindow of 1 means that jobs must be on the *same* day, a
   * timeWindow of 2 means they can be up to one day *apart*, and so on.  
   *
   * A timeWindow of 0 would mean that jobs are never grouped together.
   *
   * A negative timeWindow means no window; i.e. we'll always group jobs of the same type
   * together.  It's equivalent to an "infinite" window.
   *
   * This is NOT a configurable subsystem; customers should NOT configure it.
   *
   * Core algorithm: finds a JobGroup for the job to join, or null.
   */
  reified function findJobGroupWithinWindow<T extends JobGroup>(typeOfGroup : Type<T>, timeWindow : int) : T {
    var jobDate = getJobDate()
    var groups = this.Policy.Account.JobGroups.sortBy( \ group -> group.CreateTime ) // Sort the groups in the array by their creation date
    
    for (group in groups) {
      
      // First make sure Job is of right type
      if (TypeUtil.isNominallyOrStructurallyAssignable(typeOfGroup, typeof group )) {
        // Now check the time window
        var groupJobs = group.Jobs
        groupJobs.sortBy( \ gjob -> getJobDate())
        var earliestJobDate = groupJobs.first().getJobDate()
        if (( earliestJobDate.differenceInDays( jobDate ) < timeWindow  and earliestJobDate.beforeOrEqual( jobDate ) ) or timeWindow < 0) {
          return group as T
        }
      }
    }
    return null
  }
  
  /**
   * Algorithm used to determine what date to consider a job as applying to.
   * Default uses the effective date of the latest period.
   */
  function getJobDate() : Date {
    return this.LatestPeriod.EditEffectiveDate
  }
  
  /**
   * Set common attributes on the JobGroup
   */
  function initializeGroup(group : JobGroup, name : String) {
    group.Account = this.Policy.Account
    group.Name = name + this.JobNumber + this.Policy.Account.AccountNumber
  }

  function withdraw() {
    var activePeriods = this.ActivePeriods
    if (activePeriods.Count == 0) {
      throw new DisplayableException(DisplayKey.get("Job.Withdraw.Error.NoActivePeriods"))
    }
    activePeriods[0].JobProcess.withdrawJob()
  }

  function newNote() : Note {
    var note = new Note(this.Bundle)
    note.Level = this
    return note
  }

  function copyUsersFromJobToPolicy() {
    for (roleAssignment in this.RoleAssignments) {
      copyUserRoleFromJobToPolicyWithRole(roleAssignment.Role)
    }
  }

  /**
   * Returns the PolicyNumber if assigned or the JobNumber otherwise
   */
  property get PolicyNumberOrJobNumber(): String {
    return this.LatestPeriod.PolicyNumberAssigned ? this.LatestPeriod.PolicyNumberDisplayString : this.JobNumber
  }
  
  private function copyUserRoleFromJobToPolicyWithRole(role : typekey.UserRole) {
    var userRole = this.getUserRoleAssignmentByRole(role)
    if (userRole != null) {
      AssignmentUtil.assignAndLogUserRole( this.Policy, userRole.AssignedUser, userRole.AssignedGroup, role,
                                           this.Subtype.DisplayName + ".copyUsersFromJobToPolicy()")
    }
  }

  property get AmountPaid() : MonetaryAmount {
    if (this.UpFrontPayments.IsEmpty) {
      return new MonetaryAmount(0, this.LatestPeriod.PreferredSettlementCurrency)
    }
    var currency = this.UpFrontPayments[0].Amount.Currency
    if (not this.UpFrontPayments.allMatch( \ payment -> currency == payment.Amount_cur)) {
      throw new IllegalArgumentException("Can't add amounts of different currencies")
    }
    return this.UpFrontPayments.sum(currency, \ upfp -> upfp.Amount)
  }


}
