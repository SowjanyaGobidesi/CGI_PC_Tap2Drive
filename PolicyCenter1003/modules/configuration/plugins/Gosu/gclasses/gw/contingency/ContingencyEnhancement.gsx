package gw.contingency

uses gw.api.database.IQueryBeanResult
uses typekey.Job
uses gw.api.assignment.RoleAssignee
uses gw.api.database.Query
uses gw.api.locale.DisplayKey

uses java.util.Date

@Export
enhancement ContingencyEnhancement : entity.Contingency {

  function createContingencyActivity() : Activity {
    var activityPattern = ActivityPattern.finder.getActivityPatternByCode("uw_review_contingency")

    var assignee : RoleAssignee
    var activity : Activity
    if (this.PolicyPeriod == null) {
      assignee = new RoleAssignee(TC_UNDERWRITER, this.Policy.MostRecentBoundPeriodOnMostRecentTerm.Job.Underwriter)
      activity = activityPattern.createPolicyActivity(this.Bundle,
          this.Policy,
          this.Title, this.Description,
          null, null, null, this.DueDate, null)
    } else {
      assignee = new gw.api.assignment.RoleAssignee(TC_UNDERWRITER, this.PolicyPeriod.Job.Underwriter )
      activity = activityPattern.createJobActivity(this.Bundle,
          this.PolicyPeriod.Job,
          this.Title, this.Description,
          null, null, null, this.DueDate, null)
    }

    var picker = new gw.assignment.PCAssigneePicker()
    picker.SelectedAssignee = assignee


    activity.Contingency = this
    picker.SelectedAssignee.assignToThis(activity)
    this.addToActivities(activity)

    return activity
  }

  function createContingencyNote() : Note {
    var note = new Note()
    note.Subject = DisplayKey.get("Web.Contingency.Note", this.Title)
    note.Author = this.CreateUser
    note.AuthoringDate = this.CreateTime
    note.setLevel(this)
    return note
  }

  function resolveContingency() {
    this.Status = TC_RESOLVED
    closeContingencyWithDateAndUser()
  }

  function waiveContigency() {
    this.Status = TC_WAIVED
    closeContingencyWithDateAndUser()
  }

  function updateActionStartDate() {
    if (this.DueDate == null or this.Action == null) {
      this.ActionStartDate = null
    } else  if (this.IsPolicyChangeAction) {
      this.ActionStartDate = this.DueDate.addBusinessDays(-5)
    } else if (this.IsCancellationAction) {
      this.ActionStartDate = this.DueDate.addDays(-30)
    }
  }

  private function closeContingencyWithDateAndUser() {
    this.CloseDate = Date.Now
    this.CloseUser = User.util.CurrentUser
  }

  property get IsCancellationAction() : boolean {
    return this.Action.Categories.contains(Job.TC_CANCELLATION)
  }

  property get IsPolicyChangeAction() : boolean {
    return this.Action.Categories.contains(Job.TC_POLICYCHANGE)
  }

  property get JobCalculationMethod() : CalculationMethod {
    return this.Action.Categories.singleWhere(\elt -> elt.getIntrinsicType() == CalculationMethod) as CalculationMethod
  }

  property get QueryForActivities() : Activity[] {
    return Query.make(Activity).compare(Activity#Contingency, Equals, this).select().toTypedArray()
  }

  property get PolicyNumberLabel() : String {
    return DisplayKey.get("Web.Contingency.PolicyOrJobNumber", this.Policy.MostRecentBoundPeriodOnMostRecentTerm.PolicyNumber)
  }

  property get JobNumberLabel() : String {
    var job = this.PolicyPeriod.Job
    return DisplayKey.get("Web.Contingency.PolicyOrJobNumber", job.JobNumber)
  }

  property get JobTypeLabel() : String {
    var job = this.PolicyPeriod.Job
    return DisplayKey.get("Web.Contingency.OnJob", job.Subtype.toString())
  }

  function queryDocuments(includeHidden: boolean = false) : IQueryBeanResult<Document> {
    var criteria = new DocumentSearchCriteria()
    criteria.Contingency = this
    criteria.IncludeObsoletes = includeHidden
    return criteria.performSearch() as IQueryBeanResult<Document>
  }

  property get SpawnedJobs() : entity.Job[] {
    return this.ContingencyJobs*.Job
  }

  function queryNotes(): IQueryBeanResult<Note> {
    var criteria = new NoteSearchCriteria()
    criteria.Contingency = this
    return criteria.performSearch()
  }
}
