package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement HOPLineExclusionEnhancement : entity.HOPLine {
  property get HOPComputerRelatedDamageOrInjuryExclusion () : productmodel.HOPComputerRelatedDamageOrInjuryExclusion {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z6sh4d0oj334q2h4qn72ostqmi8") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPComputerRelatedDamageOrInjuryExclusion
  }
  
  property get HOPComputerRelatedDamageOrInjuryExclusionExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z6sh4d0oj334q2h4qn72ostqmi8") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}