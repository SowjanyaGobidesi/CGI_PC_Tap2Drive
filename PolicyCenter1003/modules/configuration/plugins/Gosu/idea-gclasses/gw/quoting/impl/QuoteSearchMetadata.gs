package gw.quoting.impl

@Export
class QuoteSearchMetadata {

  var _displayName : String as Name
  var _firstName : String as FirstName
  var _lastName : String as LastName
  var _isPerson : Boolean as Person
  var _companyName : String as CompanyName
  var _workPhone : String as WorkPhone
  var _email : String as Email

  construct () {}

  construct(contact : Contact) {
    _displayName = contact.DisplayName
    if (contact typeis Person) {
      _firstName = contact.FirstName
      _lastName = contact.LastName
      _isPerson = true
    }
    else if (contact typeis Company) {
      _companyName = contact.Name
      _isPerson = false
    }
    _workPhone = contact.WorkPhone
    _email = contact.EmailAddress1
  }

  construct(period: PolicyPeriod) {
    this(period.PNIContactDenorm)
  }
}