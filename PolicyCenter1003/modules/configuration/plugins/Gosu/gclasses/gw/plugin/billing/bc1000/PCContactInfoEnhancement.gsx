package gw.plugin.billing.bc1000

uses wsi.remote.gw.webservice.bc.bc1000.entity.anonymous.elements.PCContactInfo_ContactAddresses
uses wsi.remote.gw.webservice.bc.bc1000.entity.anonymous.elements.PCContactInfo_PrimaryAddress
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.AddressInfo
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PCContactInfo
uses entity.Contact

@Export
enhancement PCContactInfoEnhancement : PCContactInfo
{
  /**
   * When both PC and Billing System are integrated to Contact Manager, any shared 
   * contact between the 3 systems need to be synced to Contact Manager first before
   * sending to Billing System.
   */
  function sync(contact: Contact) {
    this.ContactType = contact typeis Person ? ContactType.TC_PERSON.Code
        : ContactType.TC_COMPANY.Code
    if (contact typeis Company) {
      this.Name = contact.Name
      this.NameKanji = contact.NameKanji
    } else {
      this.FirstName = (contact as Person).FirstName
      this.LastName = (contact as Person).LastName
      this.FirstNameKanji = (contact as Person).FirstNameKanji
      this.LastNameKanji = (contact as Person).LastNameKanji
      this.Particle = (contact as Person).Particle
    }

    // if locally created contact, substitute ExternalID for AddressBookUID
    if(contact.IsLocalOnly) {
      this.AddressBookUID = contact.ExternalID
    } else {
      this.AddressBookUID = contact.AddressBookUID
    }

    this.EmailAddress1 = contact.EmailAddress1
    this.PublicID = contact.PublicID
    this.WorkPhoneCountry = contact.WorkPhoneCountry.Code
    this.WorkPhone = contact.WorkPhone
    this.WorkPhoneExtension = contact.WorkPhoneExtension

    populatePrimaryAddress(contact)

    populateContactAddresses(contact)

    // send the list of accounts to BC so that BC can update their names
    this.AccountNumbers = contact.findHeldAccounts()*.AccountNumber.toList()
    this.AccountName = contact.AccountName
    this.AccountNameKanji = contact.AccountNameKanji
  }

  private function populatePrimaryAddress(contact : Contact) {
    if (contact.PrimaryAddress != null) {
      var pcContactInfo_primaryAddress = new PCContactInfo_PrimaryAddress()
      pcContactInfo_primaryAddress.$TypeInstance = translateToAddressInfo(contact.PrimaryAddress)
      this.PrimaryAddress = pcContactInfo_primaryAddress
    }
  }

  private function populateContactAddresses(contact : Contact) {
    for(contactAddress in contact.ContactAddresses) {
      var contactAddressInfo = new PCContactInfo_ContactAddresses()
      // if locally created ContactAddress, substitute ExternalID for AddressBookUID
      if(contactAddress.IsLocalOnly) {
        contactAddressInfo.AddressBookUID = contactAddress.ExternalID
      } else {
        contactAddressInfo.AddressBookUID = contactAddress.AddressBookUID
      }

      var address = contactAddress.Address
      var addressInfo = translateToAddressInfo(address)
      contactAddressInfo.Address.$TypeInstance = addressInfo

      this.ContactAddresses.add(contactAddressInfo)
    }
  }

  private function translateToAddressInfo(address : Address) : AddressInfo {
    var addressInfo = new AddressInfo()
    // if locally created address, substitute ExternalID for AddressBookUID
    if(address.IsLocalOnly) {
      addressInfo.AddressBookUID = address.ExternalID
    } else {
      addressInfo.AddressBookUID = address.AddressBookUID
    }

    addressInfo.AddressLine1 = address.AddressLine1
    addressInfo.AddressLine2 = address.AddressLine2
    addressInfo.AddressLine1Kanji = address.AddressLine1Kanji
    addressInfo.AddressLine2Kanji = address.AddressLine2Kanji
    addressInfo.City = address.City
    addressInfo.CityKanji = address.CityKanji
    addressInfo.State = address.State.Code
    addressInfo.PostalCode = address.PostalCode
    addressInfo.CEDEX = address.CEDEX
    addressInfo.CEDEXBureau = address.CEDEXBureau
    addressInfo.Country = address.Country.Code
    return addressInfo

  }
}
