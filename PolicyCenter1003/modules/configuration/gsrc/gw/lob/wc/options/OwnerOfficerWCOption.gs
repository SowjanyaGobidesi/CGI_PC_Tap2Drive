package gw.lob.wc.options

uses gw.api.locale.DisplayKey

@Export
class OwnerOfficerWCOption extends WCOption {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  override property get Label() : String {
    return DisplayKey.get("Web.Policy.Contact.OwnerOfficers")
  }

  override property get Mode() : String {
    return "OwnerOfficer"
  }

  override function addToPolicy() {
  }

  override function removeFromPolicy() {
    Period.WorkersCompLine.PolicyOwnerOfficers.each(
        \ ownerOfficer -> Period.WorkersCompLine.removeFromPolicyOwnerOfficers(ownerOfficer))
  }

  override function isOnPolicy() : boolean {
    return WCLine.HasOwnerOfficer
  }
}