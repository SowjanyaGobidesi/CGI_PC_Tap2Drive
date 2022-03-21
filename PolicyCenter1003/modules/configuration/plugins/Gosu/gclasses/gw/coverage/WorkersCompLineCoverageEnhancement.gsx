package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement WorkersCompLineCoverageEnhancement : entity.WorkersCompLine {
  property get WCEmpLiabCov () : productmodel.WCEmpLiabCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCEmpLiabCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.WCEmpLiabCov
  }
  
  property get WCEmpLiabCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCEmpLiabCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get WCFedEmpLiabCov () : productmodel.WCFedEmpLiabCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCFedEmpLiabCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.WCFedEmpLiabCov
  }
  
  property get WCFedEmpLiabCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCFedEmpLiabCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get WCOtherStatesInsurance () : productmodel.WCOtherStatesInsurance {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCOtherStatesInsurance") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.WCOtherStatesInsurance
  }
  
  property get WCOtherStatesInsuranceExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCOtherStatesInsurance") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get WCWorkersCompCov () : productmodel.WCWorkersCompCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCWorkersCompCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.WCWorkersCompCov
  }
  
  property get WCWorkersCompCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCWorkersCompCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}