package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement PersonalAutoLineExclusionEnhancement : entity.PersonalAutoLine {
  property get ExcludeCustomEquipment () : productmodel.ExcludeCustomEquipment {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ExcludeCustomEquipment") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.ExcludeCustomEquipment
  }
  
  property get ExcludeCustomEquipmentExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ExcludeCustomEquipment") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get PAExcludeFedEmployeeUse () : productmodel.PAExcludeFedEmployeeUse {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PAExcludeFedEmployeeUse") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.PAExcludeFedEmployeeUse
  }
  
  property get PAExcludeFedEmployeeUseExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("PAExcludeFedEmployeeUse") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}