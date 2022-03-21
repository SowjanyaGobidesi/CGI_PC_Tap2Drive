package gw.plugin.contact.ab900

uses wsi.remote.gw.webservice.ab.ab900.abcontactapi.types.complex.AddressInfo
uses gw.api.upgrade.Coercions

@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement AddressInfoEnhancement : AddressInfo {
  
  function sync(address : Address) : AddressInfo{
    this.AddressType = address.AddressType as java.lang.String
    this.AddressLine1 = address.AddressLine1
    this.AddressLine2 = address.AddressLine2
    this.AddressLine3 = address.AddressLine3
    this.City = address.City
    this.State = address.State.Code
    this.County = address.County
    this.PostalCode = address.PostalCode
    this.Country = address.Country.Code
    this.Description = address.Description
    this.ValidUntil = Coercions.makeDateFrom(address.ValidUntil.Calendar)

    this.AddressLine1Kanji = address.AddressLine1Kanji
    this.AddressLine2Kanji = address.AddressLine2Kanji
    this.CityKanji = address.CityKanji
    this.CEDEX = address.CEDEX
    this.CEDEXBureau = address.CEDEXBureau

    return this
  }
}
