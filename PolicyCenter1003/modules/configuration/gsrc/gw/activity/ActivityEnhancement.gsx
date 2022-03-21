package gw.activity

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException

enhancement ActivityEnhancement: Activity {

  /* When assigning an activity based on a role on the associated Job, this function checks that the
   * role has been assigned.  If not, it first attempts to assign the role.  If the activity cannot be
   * assigned (either because the role cannot be assigned or because the AssignToRole method returns false)
   * this function will also return false.  Otherwise, it will return true, indicating that the assignment
   * suceeded.
   */
  function assignByJobRole(role: String): boolean {
    // First, check to see if the needed role has already been assigned.  If not, attempt to assign it.
    if (this.Job.getUserRoleAssignmentByRole(typekey.UserRole.get(role)) == null) {  // I.e. the role has not yet been assigned
      this.Job.autoAssignRole(typekey.UserRole.get(role))
      if (this.Job.getUserRoleAssignmentByRole(typekey.UserRole.get(role)) == null) { // Unable to assign the role
        return false
      }
    }
    // Second, attempt to assign the activity to the role
    return this.assignToRole(typekey.UserRole.get(role))
  }

  /* When assigning an activity based on a role on the assoicated Account, this function checkes that
   * the role has been assigned.  If not, it first attempts to assign the role.  If the activity cannot
   * be assigned (either because the role cannot be assigned to because the AssignToRole method returns
   * false) this function will also return false.  Otherwise, it will return true, indicating that the
   * assignment suceeded.
   */
  function assignByContainerRole(role: String): boolean {
    if (this.Account.getUserRoleAssignmentByRole(typekey.UserRole.get(role)) == null) {
      // the role has not yet been assigned
      this.Account.autoAssignRole(typekey.UserRole.get(role))
      if (this.Account.getUserRoleAssignmentByRole(typekey.UserRole.get(role)) == null) {
        return false
      }
    }
    return this.assignToRole(typekey.UserRole.get(role))
  }

  /**
   * Method to determine if the user has sufficient permissions to view the notes on this activity.
   *
   * @param PolicyPeriod OPTIONAL. Used to specify the policy period of interest for activities associated with a policy.
   * @return true if the user can view the notes associated with this activity.
   * false if the user can not view the notes associated with this activity.
   */
  function canViewNotes(policyPeriod: PolicyPeriod): boolean {
    if (!perm.System.noteview) {
      return false
    }

    if (this.Job != null) {
      return perm.Job.view(this.Job)
    } else if (this.Policy != null) {
      return perm.PolicyPeriod.view(policyPeriod)
    } else if (this.Account != null) {
      return perm.Account.view(this.Account)
    }
    return false
  }

  property get SearchResultID(): String {
    if (this.Job != null) {
      return this.Job.LatestPeriod.PolicyNumberAssigned ? this.Job.LatestPeriod.PolicyNumber : this.Job.JobNumber
    } else if (this.Account != null) {
      var acctNum = this.Account.AccountNumber
      return (acctNum != null and acctNum.length > 0) ? acctNum : "Account" // should be impossible but better than blank
    } else if (this.Contact != null) {
      return this.Contact.DisplayName
    }

    throw new DisplayableException(DisplayKey.get("Activity.Search.NullAccount"))
  }

}