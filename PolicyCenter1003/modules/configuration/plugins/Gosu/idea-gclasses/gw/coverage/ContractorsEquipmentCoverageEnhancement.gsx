package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement ContractorsEquipmentCoverageEnhancement : entity.ContractorsEquipment {
  property get ContractorsEquipSchedCov () : productmodel.ContractorsEquipSchedCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ContractorsEquipSchedCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.ContractorsEquipSchedCov
  }
  
  property get ContractorsEquipSchedCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ContractorsEquipSchedCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}