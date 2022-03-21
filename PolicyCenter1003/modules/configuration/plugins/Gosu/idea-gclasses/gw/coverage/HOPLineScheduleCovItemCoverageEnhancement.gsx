package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement HOPLineScheduleCovItemCoverageEnhancement : entity.HOPLineScheduleCovItem {
  property get HOPAssistedLivingCareItem () : productmodel.HOPAssistedLivingCareItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z1gguiuovtplr3j4rucqdv0stra") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPAssistedLivingCareItem
  }
  
  property get HOPAssistedLivingCareItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z1gguiuovtplr3j4rucqdv0stra") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPScheduledPersonalPropertyItem () : productmodel.HOPScheduledPersonalPropertyItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zd5joencat3ep2cm32h3e5cdmj9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPScheduledPersonalPropertyItem
  }
  
  property get HOPScheduledPersonalPropertyItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zd5joencat3ep2cm32h3e5cdmj9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPValuablePersonalPropertyItem () : productmodel.HOPValuablePersonalPropertyItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zc9iqhupesj0fbpvo8ltn4526b8") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPValuablePersonalPropertyItem
  }
  
  property get HOPValuablePersonalPropertyItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zc9iqhupesj0fbpvo8ltn4526b8") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}