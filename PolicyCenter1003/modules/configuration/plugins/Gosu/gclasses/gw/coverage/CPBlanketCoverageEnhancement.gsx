package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement CPBlanketCoverageEnhancement : entity.CPBlanket {
  property get CPBlanketCov () : productmodel.CPBlanketCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBlanketCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.CPBlanketCov
  }
  
  property get CPBlanketCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBlanketCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}