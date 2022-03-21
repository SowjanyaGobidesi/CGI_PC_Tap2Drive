package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement IMAccountsReceivableCoverageEnhancement : entity.IMAccountsReceivable {
  property get IMAccountReceivableCov () : productmodel.IMAccountReceivableCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("IMAccountReceivableCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.IMAccountReceivableCov
  }
  
  property get IMAccountReceivableCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("IMAccountReceivableCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}