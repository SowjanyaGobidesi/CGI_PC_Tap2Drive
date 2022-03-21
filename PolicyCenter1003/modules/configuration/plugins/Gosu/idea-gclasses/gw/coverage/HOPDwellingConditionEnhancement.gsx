package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement HOPDwellingConditionEnhancement : entity.HOPDwelling {
  property get HOPACVRoof () : productmodel.HOPACVRoof {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zqmi2c4l40olsa7dnghbo59s2o9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPACVRoof
  }
  
  property get HOPACVRoofExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zqmi2c4l40olsa7dnghbo59s2o9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPRentalOfUnitToOthers () : productmodel.HOPRentalOfUnitToOthers {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zb6h6c469lfch616h0vthd9huaa") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPRentalOfUnitToOthers
  }
  
  property get HOPRentalOfUnitToOthersExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zb6h6c469lfch616h0vthd9huaa") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}