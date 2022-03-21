package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement CPBuildingCoverageEnhancement : entity.CPBuilding {
  property get CPBPPCov () : productmodel.CPBPPCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBPPCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.CPBPPCov
  }
  
  property get CPBPPCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBPPCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get CPBldgBusIncomeCov () : productmodel.CPBldgBusIncomeCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBldgBusIncomeCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.CPBldgBusIncomeCov
  }
  
  property get CPBldgBusIncomeCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBldgBusIncomeCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get CPBldgCov () : productmodel.CPBldgCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBldgCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.CPBldgCov
  }
  
  property get CPBldgCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBldgCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get CPBldgExtraExpenseCov () : productmodel.CPBldgExtraExpenseCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBldgExtraExpenseCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.CPBldgExtraExpenseCov
  }
  
  property get CPBldgExtraExpenseCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBldgExtraExpenseCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get CPBldgStockCov () : productmodel.CPBldgStockCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBldgStockCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.CPBldgStockCov
  }
  
  property get CPBldgStockCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("CPBldgStockCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}