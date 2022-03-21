package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement BusinessOwnersLineConditionEnhancement : entity.BusinessOwnersLine {
  property get BOPWaiveInsurToValue () : productmodel.BOPWaiveInsurToValue {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPWaiveInsurToValue") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPWaiveInsurToValue
  }
  
  property get BOPWaiveInsurToValueExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPWaiveInsurToValue") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPWaiveSubroCond () : productmodel.BOPWaiveSubroCond {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPWaiveSubroCond") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPWaiveSubroCond
  }
  
  property get BOPWaiveSubroCondExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPWaiveSubroCond") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}