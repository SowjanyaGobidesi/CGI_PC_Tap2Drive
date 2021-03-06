package gw.lob.wc.options

uses gw.api.locale.DisplayKey

@Export
class ExclusionsWCOption extends WCOption {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  override property get Label() : String {
    return DisplayKey.get("Web.Policy.WC.WCExcludedWorkplace")
  }

  override property get Mode() : String {
    return "Exclusions"
  }

  override function addToPolicy() {
    WCLine.HasWCExcludedWorkplace = true
  }

  override function removeFromPolicy() {
    WCLine.HasWCExcludedWorkplace = false
  }

  override function isOnPolicy() : boolean {
    return WCLine.HasWCExcludedWorkplace
  }
}