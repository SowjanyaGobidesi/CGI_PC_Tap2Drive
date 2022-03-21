package gw.webservice.pc.pc900.community.datamodel

uses gw.xml.ws.annotation.WsiExportable

@Export
@WsiExportable("http://guidewire.com/pc/ws/gw/webservice/pc/pc900/community/datamodel/CommissionPlanDTO")
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
final class CommissionPlanDTO {
  var _commissionPlanID : String as CommissionPlanID
  var _currency : Currency as Currency

  function populateFromCommissionPlan(plan : CommissionPlan) {
    this.CommissionPlanID = plan.CommissionPlanID
    this.Currency = plan.Currency
  }

  function updateCommissionPlan(plan : CommissionPlan) {
    plan.CommissionPlanID = this.CommissionPlanID
    plan.Currency = this.Currency
  }
}