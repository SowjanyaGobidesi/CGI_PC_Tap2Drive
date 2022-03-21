package gw.web.billing

uses java.lang.IllegalStateException
uses java.lang.SuppressWarnings
uses gw.api.locale.DisplayKey

@Export
class PaymentInstrumentUIHelper {

  static function checkForError(jobNumber : String, jobToFind : Job) : String{
    if (jobNumber == null)
      return DisplayKey.get("Web.Errors.MissingUrlParameter", "JobNumber")
    if (jobToFind == null)
      return DisplayKey.get("Web.Errors.InvalidUrlParameter", "JobNumber", jobNumber)
    var currentUser: User = User.util.CurrentUser
    if (not currentUser.canView(jobToFind))
      return DisplayKey.get("Java.Error.Permission.View", "job")
    return null
  }
}
