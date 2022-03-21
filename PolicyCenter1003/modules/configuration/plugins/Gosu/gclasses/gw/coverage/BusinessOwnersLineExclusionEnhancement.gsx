package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement BusinessOwnersLineExclusionEnhancement : entity.BusinessOwnersLine {
  property get BOPCertTerrorismExcl () : productmodel.BOPCertTerrorismExcl {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPCertTerrorismExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPCertTerrorismExcl
  }
  
  property get BOPCertTerrorismExclExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPCertTerrorismExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPCert_BioChemExcl () : productmodel.BOPCert_BioChemExcl {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPCert_BioChemExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPCert_BioChemExcl
  }
  
  property get BOPCert_BioChemExclExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPCert_BioChemExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPTerrorismAllExcl () : productmodel.BOPTerrorismAllExcl {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPTerrorismAllExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPTerrorismAllExcl
  }
  
  property get BOPTerrorismAllExclExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPTerrorismAllExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPTerrorismBioChemExcl () : productmodel.BOPTerrorismBioChemExcl {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPTerrorismBioChemExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPTerrorismBioChemExcl
  }
  
  property get BOPTerrorismBioChemExclExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPTerrorismBioChemExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPTerrorismLtdExcl () : productmodel.BOPTerrorismLtdExcl {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPTerrorismLtdExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPTerrorismLtdExcl
  }
  
  property get BOPTerrorismLtdExclExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPTerrorismLtdExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}