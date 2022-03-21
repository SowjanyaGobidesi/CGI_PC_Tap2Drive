package gw.pcf.duplicatecontacts

uses gw.api.locale.DisplayKey
uses gw.plugin.contact.DuplicateContactResult

enhancement DuplicateContactResultEnhancement : DuplicateContactResult {
  
  property get MatchType() : String {
    return this.ExactMatch
        ? DisplayKey.get("Web.DuplicateContactsPopup.MatchType.Exact")
        : DisplayKey.get("Web.DuplicateContactsPopup.MatchType.Potential")
  }
}
