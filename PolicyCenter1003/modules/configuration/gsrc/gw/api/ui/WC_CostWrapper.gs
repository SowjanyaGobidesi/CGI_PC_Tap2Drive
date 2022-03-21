package gw.api.ui
uses java.lang.Integer
uses gw.pl.currency.MonetaryAmount

@Export
class WC_CostWrapper extends CostWrapper {
  
  construct(aCost : WCCost) {
    Order = aCost.CalcOrder
    Cost = aCost
    Description = aCost.DisplayName
  }
  
  construct(orderArg : double, descriptionArg : String, auditedTotalArg : MonetaryAmount, boldArg : boolean) {
    super(orderArg, descriptionArg, auditedTotalArg, boldArg)
  }
  
  override property get Mode() : String {
    return (Cost == null) ? super.Mode : "default"
  }
  
  override property get LocNumber() : Integer {
    return Cost typeis WCCovEmpCost ? Cost.LocationNum : super.LocNumber
  }

  override property get Visible() : boolean {
    return super.Visible or (Cost typeis WCJurisdictionCost and Cost.WCJurisdictionCostType == TC_EXPMOD) 
  }
}
