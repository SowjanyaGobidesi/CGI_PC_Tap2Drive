package gw.api.ui
uses gw.pl.currency.MonetaryAmount

@Export
class AuditCostWrapper extends GL_CostWrapper {
  
  var _estimatedTotal : MonetaryAmount as readonly EstimatedTotal
  
  construct(costArg : GLCost) {
    super(costArg)
  }
  
  construct(orderArg : double, descriptionArg : String, estimatedTotalArg : MonetaryAmount, auditedTotalArg : MonetaryAmount, boldArg : boolean) {
    super(orderArg, descriptionArg, auditedTotalArg, boldArg)
    _estimatedTotal = estimatedTotalArg
  }
  
  property get AuditedTotal() : MonetaryAmount {
    return Total  
  }
  
  property get Change() : MonetaryAmount {
    return AuditedTotal - EstimatedTotal    
  }
}
