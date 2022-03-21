package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement BAJurisdictionConditionEnhancement : entity.BAJurisdiction {
  property get BATerror2356Cond () : productmodel.BATerror2356Cond {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BATerror2356Cond") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BATerror2356Cond
  }
  
  property get BATerror2356CondExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BATerror2356Cond") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}