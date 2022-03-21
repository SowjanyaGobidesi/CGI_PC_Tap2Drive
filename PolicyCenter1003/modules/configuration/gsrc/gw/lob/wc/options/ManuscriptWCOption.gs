package gw.lob.wc.options

uses gw.api.locale.DisplayKey

@Export
class ManuscriptWCOption extends WCOption {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  override property get Label() : String {
    return DisplayKey.get("Web.Policy.WC.ManuscriptOption")
  }

  override property get Mode() : String {
    return "Manuscript"
  }

  override function addToPolicy() {
    WCLine.ManuscriptOptionDesc = ""
  }

  override function removeFromPolicy() {
    WCLine.ManuscriptOptionDesc = null
    WCLine.ManuscriptPremium = null
  }

  override function isOnPolicy() : boolean {
    return WCLine.ManuscriptOptionDesc != null
  }
}