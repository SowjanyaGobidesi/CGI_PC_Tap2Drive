package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement ContractorsEquipPartExclusionEnhancement : entity.ContractorsEquipPart {
  property get ExcludeTheft () : productmodel.ExcludeTheft {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ExcludeTheft") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.ExcludeTheft
  }
  
  property get ExcludeTheftExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ExcludeTheft") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get ExcludeVandalism () : productmodel.ExcludeVandalism {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ExcludeVandalism") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.ExcludeVandalism
  }
  
  property get ExcludeVandalismExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ExcludeVandalism") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}