package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement PersonalVehicleCoverageEnhancement : entity.PersonalVehicle {
  property get PACollisionCov () : productmodel.PACollisionCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PACollisionCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.PACollisionCov
  }
  
  property get PACollisionCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PACollisionCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get PACollision_MA_MI_Limited () : productmodel.PACollision_MA_MI_Limited {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PACollision_MA_MI_Limited") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.PACollision_MA_MI_Limited
  }
  
  property get PACollision_MA_MI_LimitedExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PACollision_MA_MI_Limited") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get PAComprehensiveCov () : productmodel.PAComprehensiveCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PAComprehensiveCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.PAComprehensiveCov
  }
  
  property get PAComprehensiveCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PAComprehensiveCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get PAExcessElectronicsCov () : productmodel.PAExcessElectronicsCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PAExcessElectronicsCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.PAExcessElectronicsCov
  }
  
  property get PAExcessElectronicsCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PAExcessElectronicsCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get PARentalCov () : productmodel.PARentalCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PARentalCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.PARentalCov
  }
  
  property get PARentalCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PARentalCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get PATapeDiscMediaCov () : productmodel.PATapeDiscMediaCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PATapeDiscMediaCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.PATapeDiscMediaCov
  }
  
  property get PATapeDiscMediaCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PATapeDiscMediaCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get PATowingLaborCov () : productmodel.PATowingLaborCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PATowingLaborCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.PATowingLaborCov
  }
  
  property get PATowingLaborCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PATowingLaborCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}