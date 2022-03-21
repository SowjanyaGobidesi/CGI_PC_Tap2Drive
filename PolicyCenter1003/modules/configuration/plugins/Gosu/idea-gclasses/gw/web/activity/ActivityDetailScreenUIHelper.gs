package gw.web.activity

uses gw.api.domain.document.DocumentContainer
uses gw.api.system.PCConfigParameters
uses pcf.AccountFile_Notes
uses pcf.ActivityNotesPopup
uses pcf.PolicyFileForward

@Export
class ActivityDetailScreenUIHelper {

  /**
   * Show all notes that are related to this activity. This method will handle viewing notes
   * from the account, policy, and job
   */
  public static function viewActivityNotes(activity: Activity, policyPeriod: PolicyPeriod) {
    if (activity.PolicyPeriod != null and activity.Job != null) {
      ActivityNotesPopup.push(activity, activity.PolicyPeriod)
    } else if (activity.Policy != null) {
      PolicyFileForward.goInMain(policyPeriod, policyPeriod.SliceDate, "PolicyNotes for Activity", {activity})
    } else if (activity.Account != null) {
      AccountFile_Notes.goInMain(activity.Account, activity)
    }
  }

  public static function getDocContainer(actv: Activity): DocumentContainer {
    if (actv.PolicyPeriod != null) {
      return actv.PolicyPeriod
    } else if (actv.Job != null) {
      return actv.Job
    } else if (actv.Account != null) {
      return actv.Account
    }
    return null
  }

  public static function createSearchCriteria(symbolTable: Map<String, Object>): NoteTemplateSearchCriteria {
    var rtn = new NoteTemplateSearchCriteria()
    // rtn.Language = Account.AccountHolder.Language
    rtn.AvailableSymbols = symbolTable.Keys.join(",")
    if ((symbolTable.get("policy") as Policy).Product != null) {
      rtn.LOB = (symbolTable.get("policy") as Policy).Product.PublicID
    }
    return rtn
  }

  public static function isDocumentButtonVisible(activity: Activity, productizedButton: boolean): Boolean {
    if (PCConfigParameters.DocumentProductionIntegrationEnabled.Value) {
      return productizedButton
          ? perm.System.doccreate
          : false
    } else {
      return productizedButton
          ? false
          : perm.System.doccreate and activity.DocumentTemplate != null
    }
  }
}