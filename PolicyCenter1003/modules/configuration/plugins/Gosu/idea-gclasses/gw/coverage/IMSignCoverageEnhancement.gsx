package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement IMSignCoverageEnhancement : entity.IMSign {
  property get IMSignCov () : productmodel.IMSignCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("IMSignCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.IMSignCov
  }
  
  property get IMSignCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("IMSignCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}