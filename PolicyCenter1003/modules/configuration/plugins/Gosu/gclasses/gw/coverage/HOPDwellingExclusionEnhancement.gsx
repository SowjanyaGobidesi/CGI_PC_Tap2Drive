package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement HOPDwellingExclusionEnhancement : entity.HOPDwelling {
  property get HOPCosmeticDamageExclusion () : productmodel.HOPCosmeticDamageExclusion {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z5cisimhgo3869grkj5kijck6n8") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPCosmeticDamageExclusion
  }
  
  property get HOPCosmeticDamageExclusionExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z5cisimhgo3869grkj5kijck6n8") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPInflationProtectionElimination () : productmodel.HOPInflationProtectionElimination {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zv9hkqn0g5ita45pblmg1kbd5fa") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPInflationProtectionElimination
  }
  
  property get HOPInflationProtectionEliminationExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zv9hkqn0g5ita45pblmg1kbd5fa") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPMineSubsidenceExclusion () : productmodel.HOPMineSubsidenceExclusion {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zcrj42qr2tgmfbqohsgr92nrpp9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPMineSubsidenceExclusion
  }
  
  property get HOPMineSubsidenceExclusionExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zcrj42qr2tgmfbqohsgr92nrpp9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPPersonalPropertyCoverageExclusion () : productmodel.HOPPersonalPropertyCoverageExclusion {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ztji6hbcsv8e62ln3pte21ppo0a") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPPersonalPropertyCoverageExclusion
  }
  
  property get HOPPersonalPropertyCoverageExclusionExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ztji6hbcsv8e62ln3pte21ppo0a") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPWindstormOrHailCoverageExclusion () : productmodel.HOPWindstormOrHailCoverageExclusion {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zt2gg2bpmg9au89d3g8rdfr72a9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPWindstormOrHailCoverageExclusion
  }
  
  property get HOPWindstormOrHailCoverageExclusionExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zt2gg2bpmg9au89d3g8rdfr72a9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}