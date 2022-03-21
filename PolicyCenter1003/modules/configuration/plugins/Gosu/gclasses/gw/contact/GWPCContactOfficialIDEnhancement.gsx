package gw.contact

enhancement GWPCContactOfficialIDEnhancement: entity.Contact {

  property get NCCIintrastateOfficialID(): String {
    return this.getOfficialID(TC_NCCIINTRASTATE)
  }

  property set NCCIintrastateOfficialID(id: String) {
    this.setOfficialID(TC_NCCIINTRASTATE, id)
  }
}
