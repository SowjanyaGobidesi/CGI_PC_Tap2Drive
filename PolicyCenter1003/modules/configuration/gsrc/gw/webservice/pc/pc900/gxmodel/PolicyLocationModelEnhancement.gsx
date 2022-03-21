package gw.webservice.pc.pc900.gxmodel
uses gw.api.database.Query
uses gw.webservice.pc.pc900.gxmodel.policylocationmodel.anonymous.elements.PolicyLocation_TerritoryCodes_Entry

@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement PolicyLocationModelEnhancement : gw.webservice.pc.pc900.gxmodel.policylocationmodel.types.complex.PolicyLocation {

  function populatePolicyLocation(location : PolicyLocation) {
    SimpleValuePopulator.populate(this, location)
    this.AccountLocation.$TypeInstance.populateAccountLocation(location.AccountLocation)
    location.copyPolicyContractDataUnchecked()
    location.TerritoryCodes.each(\ t -> t.fillWithFirst())
    location.FireProtectClass = typekey.FireProtectClass.get(this.FireProtectClass as String)
    location.IndustryCode = Query.make(IndustryCode).compare(IndustryCode#Code, Equals, this.IndustryCode.Code).select().AtMostOneRow
  }

  function copy(location : PolicyLocation) : gw.webservice.pc.pc900.gxmodel.policylocationmodel.types.complex.PolicyLocation {
    location.TerritoryCodes.each(\ t -> {
      var entry = new PolicyLocation_TerritoryCodes_Entry()
      entry.Code = t.Code
      this.TerritoryCodes.Entry.add(entry)
    })
    return this
  }

}
