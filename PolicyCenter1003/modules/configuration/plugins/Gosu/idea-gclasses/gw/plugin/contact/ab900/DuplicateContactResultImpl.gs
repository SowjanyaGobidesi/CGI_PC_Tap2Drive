package gw.plugin.contact.ab900

uses gw.plugin.contact.ContactSystemPlugin
uses gw.plugin.contact.DuplicateContactResult
uses gw.plugin.Plugins
uses java.util.Date
uses wsi.remote.gw.webservice.ab.ab900.abcontactapi.types.complex.ABContactAPIFindDuplicatesResult
uses java.lang.Double

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class DuplicateContactResultImpl extends AbstractContactResultExternal implements DuplicateContactResult {
    
  private var _cellPhone : String as readonly CellPhone
  private var _cellPhoneCountry : PhoneCountryCode as readonly CellPhoneCountry
  private var _cellPhoneExtension : String as readonly CellPhoneExtension
  private var _companyName : String as readonly CompanyName
  private var _companyNameKanji : String as readonly CompanyNameKanji
  private var _abUID : String as readonly ContactAddressBookUID
  private var _contactType : typekey.Contact as readonly ContactType
  private var _dob : Date as readonly DateOfBirth
  private var _email1 : String as readonly EmailAddress1
  private var _email2 : String as readonly EmailAddress2
  private var _exact : boolean as readonly ExactMatch
  private var _faxPhone : String as readonly FaxPhone
  private var _faxPhoneCountry : PhoneCountryCode as readonly FaxPhoneCountry
  private var _faxPhoneExtension : String as readonly FaxPhoneExtension
  private var _firstName : String as readonly FirstName
  private var _firstNameKanji : String as readonly FirstNameKanji
  private var _homePhone : String as readonly HomePhone
  private var _homePhoneCountry : PhoneCountryCode as readonly HomePhoneCountry
  private var _homePhoneExtension : String as readonly HomePhoneExtension
  private var _lastName : String as readonly LastName
  private var _lastNameKanji : String as readonly LastNameKanji
  private var _middleName : String as readonly MiddleName
  private var _preferred : Boolean as readonly PreferredVendor
  private var _prefix : NamePrefix as readonly Prefix
  private var _city : String as readonly PrimaryAddressCity
  private var _country : Country as readonly PrimaryAddressCountry
  private var _county : String as readonly PrimaryAddressCounty
  private var _desc : String as readonly PrimaryAddressDescription
  private var _line1 : String as readonly PrimaryAddressLine1
  private var _line2 : String as readonly PrimaryAddressLine2
  private var _line3 : String as readonly PrimaryAddressLine3
  private var _postalCode : String as readonly PrimaryAddressPostalCode
  private var _state : State as readonly PrimaryAddressState
  private var _addressType : AddressType as readonly PrimaryAddressType
  private var _valUntil : Date as readonly PrimaryAddressValidUntil
  private var _phoneType : PrimaryPhoneType as readonly PrimaryPhoneType
  private var _score : Double as readonly Score
  private var _suffix : NameSuffix as readonly Suffix
  private var _vendorType : VendorType as readonly VendorType
  private var _workPhone : String as readonly WorkPhone
  private var _workPhoneCountry : PhoneCountryCode as readonly WorkPhoneCountry
  private var _workPhoneExtension : String as readonly WorkPhoneExtension
  private var _taxID : String as readonly TaxID
  private var _addressLine1Kanji : String as readonly AddressLine1Kanji
  private var _addressLine2Kanji : String as readonly AddressLine2Kanji
  private var _cityKanji : String as readonly CityKanji
  
  construct(rawResult : ABContactAPIFindDuplicatesResult) {
    _contactType = translateContactType(rawResult.ContactType)
    _cellPhone = rawResult.CellPhone
    _cellPhoneCountry = typekey.PhoneCountryCode.get(rawResult.CellPhoneCountry)
    _cellPhoneExtension = rawResult.CellPhoneExtension
    _companyName = rawResult.Name
    _companyNameKanji = rawResult.NameKanji
    _abUID = rawResult.LinkID
    _dob = rawResult.DateOfBirth
    _email1 = rawResult.EmailAddress1
    _email2 = rawResult.EmailAddress2
    _exact = rawResult.Exact
    _faxPhone = rawResult.FaxPhone
    _faxPhoneCountry = typekey.PhoneCountryCode.get(rawResult.FaxPhoneCountry)
    _faxPhoneExtension = rawResult.FaxPhoneExtension
    _firstName = rawResult.FirstName
    _firstNameKanji = rawResult.FirstNameKanji
    _homePhone = rawResult.HomePhone
    _homePhoneCountry = typekey.PhoneCountryCode.get(rawResult.HomePhoneCountry)
    _homePhoneExtension = rawResult.HomePhoneExtension
    _lastName = rawResult.LastName
    _lastNameKanji = rawResult.LastNameKanji
    _middleName = rawResult.MiddleName
    _preferred = rawResult.Preferred
    _prefix = typekey.NamePrefix.get(rawResult.Prefix)
    _city = rawResult.PrimaryAddress.City
    _country = typekey.Country.get(rawResult.PrimaryAddress.Country)
    _county = rawResult.PrimaryAddress.County
    _desc = rawResult.PrimaryAddress.Description
    _line1 = rawResult.PrimaryAddress.AddressLine1
    _line2 = rawResult.PrimaryAddress.AddressLine2
    _line3 = rawResult.PrimaryAddress.AddressLine3
    _postalCode = rawResult.PrimaryAddress.PostalCode
    _state = typekey.State.get(rawResult.PrimaryAddress.State)
    _addressType = typekey.AddressType.get(rawResult.PrimaryAddress.AddressType)
    _valUntil = rawResult.PrimaryAddress.ValidUntil
    _phoneType = typekey.PrimaryPhoneType.get(rawResult.PrimaryPhone)
    _score = rawResult.Score
    _suffix = typekey.NameSuffix.get(rawResult.Suffix)
    _vendorType = typekey.VendorType.get(rawResult.VendorType)
    _workPhone = rawResult.WorkPhone
    _workPhoneCountry = typekey.PhoneCountryCode.get(rawResult.WorkPhoneCountry)
    _workPhoneExtension = rawResult.WorkPhoneExtension
    _taxID = rawResult.TaxID
    _addressLine1Kanji = rawResult.PrimaryAddress.AddressLine1Kanji
    _addressLine2Kanji = rawResult.PrimaryAddress.AddressLine2Kanji
    _cityKanji = rawResult.PrimaryAddress.CityKanji
  }
  
  override function overwriteContactFields(contact : Contact) {
    Plugins.get(ContactSystemPlugin).overwriteContactWithLatestValues(contact, ContactAddressBookUID)
  }
}
