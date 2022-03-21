package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement IMAccountsRecPartCoverageEnhancement : entity.IMAccountsRecPart {
  property get AccountsRecOffPremisesProperty () : productmodel.AccountsRecOffPremisesProperty {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("AccountsRecOffPremisesProperty") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.AccountsRecOffPremisesProperty
  }
  
  property get AccountsRecOffPremisesPropertyExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("AccountsRecOffPremisesProperty") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}