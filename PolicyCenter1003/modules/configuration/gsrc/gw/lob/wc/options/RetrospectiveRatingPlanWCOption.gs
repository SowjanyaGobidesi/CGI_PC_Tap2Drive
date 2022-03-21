package gw.lob.wc.options

uses gw.api.locale.DisplayKey

@Export
class RetrospectiveRatingPlanWCOption extends WCOption {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  override property get Label() : String {
    return DisplayKey.get("Web.Policy.WC.RetroRatingPlan")
  }

  override property get Mode() : String {
    return "RetrospectiveRatingPlan"
  }

  override function addToPolicy() {
    WCLine.HasRetrospectiveRatingPlan = true
  }

  override function removeFromPolicy() {
    WCLine.HasRetrospectiveRatingPlan = false
  }

  override function isOnPolicy() : boolean {
    return WCLine.HasRetrospectiveRatingPlan
  }
}