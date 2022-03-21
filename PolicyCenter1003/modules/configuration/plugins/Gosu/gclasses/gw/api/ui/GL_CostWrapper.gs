package gw.api.ui
uses gw.pl.currency.MonetaryAmount

@Export
class GL_CostWrapper extends CostWrapper {
   
  construct(aCost : GLCost) {
    Order = aCost.DisplayOrder
    Cost = aCost
    Description = aCost.DisplayName
  }
  
  construct(orderArg : double, descriptionArg : String, auditedTotalArg : MonetaryAmount, boldArg : boolean) {
    super(orderArg, descriptionArg, auditedTotalArg, boldArg)
  }
  
  override property get Mode() : String {
    return (Cost == null) ? super.Mode : "GL"
  }
}
