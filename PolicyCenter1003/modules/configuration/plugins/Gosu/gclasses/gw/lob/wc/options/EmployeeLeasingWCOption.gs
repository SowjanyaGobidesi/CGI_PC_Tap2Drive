package gw.lob.wc.options

uses gw.api.locale.DisplayKey

@Export
class EmployeeLeasingWCOption extends WCOption {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  override property get Label() : String {
    return DisplayKey.get("Web.Policy.WC.EmployeeLeasing")
  }

  override property get Mode() : String {
    return "EmployeeLeasing"
  }

  override function addToPolicy() {
  }

  override function removeFromPolicy() {
    Period.WorkersCompLine.PolicyLaborClients.each(\ p -> Period.WorkersCompLine.removeFromPolicyLaborClients(p))
    Period.WorkersCompLine.PolicyLaborContractors.each(\ p -> Period.WorkersCompLine.removeFromPolicyLaborContractors(p))
  }

  override function isOnPolicy() : boolean {
    return WCLine.HasEmployeeLeasing
  }
}