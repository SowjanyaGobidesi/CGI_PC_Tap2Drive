package gw.job.uw

uses java.util.Date

enhancement UWIssueApprovalEnhancement : UWIssueApproval {

  /**
   * Whether the value comparisons (if any) associated with this approval are met
   */
  property get ConditionMet() : boolean {
    return this.Issue.approvalConditionMetBy(this.ReferenceValue)
  }
  
  property get IssueType() : UWIssueType {
    return this.Issue.IssueType?.ActiveVersion
  }

  property get IssueValue() : String {
    return this.Issue.Value
  }
  
  property get Duration() : UWApprovalDurationType {
    return this.DurationType
  }
  
  /**
   * Sets the UW approval duration to the specified type as well as calculates the corresponding approval
   * expiration date (if appropriate).
   * <p>
   * See {@link gw.job.uw.UWIssueHistoryEnhancement#InvalidFrom()} for how the expiration dates and duration
   * types are displayed when viewing UW issue history.
   */
  property set Duration(durType : UWApprovalDurationType) {
    var expDate : Date = null
    switch (durType) {
      case TC_ONEYEAR:
        expDate = this.Branch.EditEffectiveDate.addYears(1)
        break
      case TC_THREEYEARS:
        expDate = this.Branch.EditEffectiveDate.addYears(3)
        break
      default:
        expDate = null
        break
    }
    this.DurationType = durType
    this.ApprovalInvalidFrom = expDate
  }
  
  function initializeDefaultValues() {
    initializeValues(IssueType.DefaultEditBeforeBind,
                     IssueType.DefaultDurationType,
                     IssueType.calculateDefaultValue(this.IssueValue),
                     defaultApprovalBlockingPoint())
  }

  function initializeValuesBasedOnApproval(prevApproval : UWIssueApproval) {
    initializeValues(prevApproval.EditBeforeBind,
                     prevApproval.Duration,
                     prevApproval.ReferenceValue,
                     prevApproval.BlockingPoint)
  }

  private function initializeValues(editBeforeBind : boolean,
                                    durationType : UWApprovalDurationType, 
                                    value : String, 
                                    bp : UWIssueBlockingPoint) {
    this.ApprovingUser = User.util.CurrentUser
    this.EditBeforeBind = editBeforeBind
    this.Duration = durationType
    this.ReferenceValue = value
    this.BlockingPoint = bp
  }
  
  function userHasAuthorityToGrantThisApproval(user : User) : boolean {
    return this.Issue.valueCanBeApprovedBy(user.UWAuthorityProfiles, this.ReferenceValue)
  }
  
  /**
   * Recalculate the approval expiration date for this approval and generate a history event.
   */
  function recalculateExpirationForChangeEffDate(){
    var oldExpiration = this.ApprovalInvalidFrom
    //Re-assigning the duration will cause the expiration date to get recalculated
    Duration = this.DurationType
    if (oldExpiration != this.ApprovalInvalidFrom){
      this.Issue.addChangeEffectiveDateHistory()
    }
  }

  property get IsManual() : boolean {
    return this.AutomaticApprovalCause == null
  }

  //
  // PRIVATE SUPPORT FUNCTIONS
  //
  private function defaultApprovalBlockingPoint() : UWIssueBlockingPoint {
    var defaultBP = IssueType.DefaultApprovalBlockingPoint
    var nextBP = this.Branch.UnderWriterIssueBlockingPoint.Next
    if (nextBP == null) {
      nextBP = TC_NONBLOCKING
    }
    return (defaultBP.Priority < nextBP.Priority ? defaultBP : nextBP)
  } 
}
