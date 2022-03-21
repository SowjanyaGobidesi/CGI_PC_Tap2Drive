package gw.api.web.dashboard.ui.contact

uses entity.Contact
uses gw.api.address.AddressOwner
uses gw.api.locale.DisplayKey
uses pcf.ContactFile_Accounts
uses pcf.ContactFile_Details

@Export
class ContactDetailHelper {
  private var _phoneLabels: Map<PrimaryPhoneType, String> = {
      PrimaryPhoneType.TC_HOME -> "Web.ContactDetail.Person.HomePhone",
      PrimaryPhoneType.TC_WORK -> "Web.ContactDetail.Person.WorkPhone",
      PrimaryPhoneType.TC_MOBILE -> "Web.ContactDetail.Person.CellPhone"
  }

  var _contact: Contact
  var _primaryContact: Contact
  var _addressOwner: AddressOwner

  construct(contact: Contact) {
    _contact = contact
    _primaryContact = contact.PrimaryContact
    _addressOwner = new gw.pcf.contacts.AddressInputSetAddressOwner(_contact.PrimaryAddress, false, true)
  }

  property get DisplayName(): String {
    return _contact.DisplayName
  }

  property get Address(): String {
    return new gw.api.address.AddressFormatter().format(_addressOwner.AddressDelegate, "\n")
  }

  property get AddressLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.AddressType", _contact.PrimaryAddress.AddressType.DisplayName)
  }

  property get Email(): String {
    return _contact.EmailAddress1 ?: ""
  }

  property get PrimaryPhone(): String {
    return _contact.PrimaryPhoneValue ?: ""
  }

  property get PrimaryPhoneLabel(): String {
    var primaryPhone = DisplayKey.get("Web.ContactDetail.Person.PrimaryPhone")
    var primary = DisplayKey.get("Web.Dashboard.Tile.ContactDetails.Primary")
    return Optional
      .ofNullable(_contact.PrimaryPhone)
      .filter(\primaryPhoneType -> _phoneLabels.containsKey(primaryPhoneType))
      .map(\primaryPhoneType -> "${DisplayKey.get(_phoneLabels[primaryPhoneType])} (${primary})")
      .orElse(primaryPhone)
  }

  property get PrimaryContact(): String {
    return _primaryContact.DisplayName ?: ""
  }

  function viewMore() {
    ContactFile_Accounts.push(_contact)
  }

  function editContact() {
    ContactFile_Details.push(_contact, true)
  }
}