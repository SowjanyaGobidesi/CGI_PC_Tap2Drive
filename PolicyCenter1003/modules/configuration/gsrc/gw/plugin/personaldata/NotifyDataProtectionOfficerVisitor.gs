package gw.plugin.personaldata

uses gw.api.database.Query

uses gw.api.domain.PinnableVisitor
uses gw.api.locale.DisplayKey
uses gw.api.system.PLLoggerCategory
uses gw.assignment.AssignmentUtil
uses gw.pl.persistence.core.Bundle

@Export
class NotifyDataProtectionOfficerVisitor implements PinnableVisitor {

  var _dataProtectionOfficers : List<User>
  var _activityPattern : ActivityPattern
  var _title : String
  var _description: String
  var _message: String
  var _errorOccurred : Date
  final static var DATA_DESTRUCTION_ACTIVITY_PATTERN = "personal_data_destruction_error"

  var _logger = PLLoggerCategory.DATA_DESTRUCTION_REQUEST

  construct(title : String, message : String, errorOccurred : Date) {
    _dataProtectionOfficers = AllDataProtectionOfficers
    _activityPattern = ActivityPattern.finder.getActivityPatternByCode(DATA_DESTRUCTION_ACTIVITY_PATTERN)
    _title = title
    _message = message
    _description = DisplayKey.get("PersonalData.NotifyProtectionOfficer.MustDestroyError.Description")
    _errorOccurred = errorOccurred
  }

  override function visit(contact : Contact) {
    createActivityWithNewBundle(\bundle -> _activityPattern.createContactActivity(bundle, contact, _title, _description, null, TC_URGENT, null, _errorOccurred, null))
  }

  override function visit(account : Account) {
    createActivityWithNewBundle(\bundle -> _activityPattern.createAccountActivity(bundle, _activityPattern, account, _title, _description, null, TC_URGENT, null, _errorOccurred, null))
  }

  override function visit(policy : Policy) {
    createActivityWithNewBundle(\bundle -> _activityPattern.createPolicyActivity(bundle, policy, _title, _description, null, TC_URGENT, null, _errorOccurred, null))
  }

  override function visit(policyTerm : PolicyTerm) {
    createActivityWithNewBundle(\bundle -> _activityPattern.createPolicyActivity(bundle, policyTerm.Policy, _title, _description, null, TC_URGENT, null, _errorOccurred, null))
  }

  override function visit(period : PolicyPeriod) {
    createActivityWithNewBundle(\bundle -> _activityPattern.createJobActivity(bundle, period.Job, _title, _description, null, TC_URGENT, null, _errorOccurred, null))
  }

  private function createActivityWithNewBundle (createActivity : block(bundle : Bundle) : Activity)  {
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      _dataProtectionOfficers.each(\officer -> {
        var activity = createActivity(bundle)
        assignToOfficer(activity, officer)

        // Always create a note for detailed error message.
        var note = activity.newNote()
        note.Account = activity.Account
        note.Subject = activity.Subject
        note.Body = _message
        note.Topic = TC_DATADESTRUCTION
        note.SecurityType = TC_INTERNALONLY
        note.Confidential = true
      })
    })
  }

  private property get AllDataProtectionOfficers() : List<User> {
    var criteria : UserSearchCriteria
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      criteria = new UserSearchCriteria(bundle)
      var roleQuery = Query.make(entity.Role).compare(Role#PublicID, Equals, "data_protection_officer")
      criteria.Role = roleQuery.select().single()
    })
    return criteria.performSearch().toList() as List<User>
  }

  private function assignToOfficer(activity : Activity, officer : User) {
    var assigned = activity.assignUserAndDefaultGroup(officer)
    if (!assigned) {
      _logger.error("Could not assign activity, user " + officer.DisplayName + " is not configured correctly for assigning activities")
      activity.assign(AssignmentUtil.DefaultUser.DefaultAssignmentGroup, AssignmentUtil.DefaultUser)
    }
  }
}