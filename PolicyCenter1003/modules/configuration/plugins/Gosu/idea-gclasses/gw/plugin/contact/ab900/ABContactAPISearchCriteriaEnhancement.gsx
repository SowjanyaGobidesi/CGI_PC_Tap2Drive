
package gw.plugin.contact.ab900

uses wsi.remote.gw.webservice.ab.ab900.abcontactapi.types.complex.ABContactAPIAddressSearch
uses wsi.remote.gw.webservice.ab.ab900.abcontactapi.types.complex.ABContactAPISearchCriteria
uses wsi.remote.gw.webservice.ab.ab900.abcontactapi.anonymous.types.complex.ABContactAPISearchCriteria_Tags

@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement ABContactAPISearchCriteriaEnhancement : ABContactAPISearchCriteria {
  
  function sync(searchCriteria : ContactSearchCriteria){
    var isPerson = gw.api.util.TypeUtil.isNominallyOrStructurallyAssignable(Person.Type, searchCriteria.ContactIntrinsicType)
    this.ContactType = isPerson ? "ABPerson" : "ABCompany"
    this.FirstName = searchCriteria.FirstName
    this.Keyword = searchCriteria.Keyword
    this.TaxID = searchCriteria.TaxID
    this.OrganizationName = searchCriteria.OrganizationName
    this.FirstNameKanji = searchCriteria.FirstNameKanji
    this.KeywordKanji = searchCriteria.KeywordKanji


    var address = new ABContactAPIAddressSearch()
    address.City = searchCriteria.Address.City
    address.State = searchCriteria.Address.State.Code
    address.PostalCode = searchCriteria.Address.PostalCode
    address.Country = searchCriteria.Address.Country.Code
    address.CityKanji = searchCriteria.Address.CityKanji

    this.Address.$TypeInstance = address
    this.Tags.$TypeInstance = new ABContactAPISearchCriteria_Tags()
    this.Tags.Entry.add(ContactTagType.TC_CLIENT.Code)
  }
}
