package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement WCJurisdictionCoverageEnhancement : entity.WCJurisdiction {
  property get WCWorkCompDeductCov () : productmodel.WCWorkCompDeductCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCWorkCompDeductCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.WCWorkCompDeductCov
  }
  
  property get WCWorkCompDeductCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCWorkCompDeductCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}