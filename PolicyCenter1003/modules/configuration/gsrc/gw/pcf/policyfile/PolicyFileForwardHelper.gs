package gw.pcf.policyfile

uses gw.api.locale.DisplayKey

/**
 * Helper code to PolicyFileForward.pcf
 */
@Export
class PolicyFileForwardHelper {
  static function validate(period: PolicyPeriod, policyNumber: String) : String{
    if (policyNumber == null && period == null)
      return DisplayKey.get("Web.Errors.MissingUrlParameter", "PolicyNumber")
    if (period == null)
      return DisplayKey.get("Web.Errors.MissingFromSystem", "Policy", policyNumber)
    var currentUser: User = User.util.CurrentUser
    if (not currentUser.canView(period))
      return DisplayKey.get("Java.Error.Permission.View", "policy")
    return null
  }
}