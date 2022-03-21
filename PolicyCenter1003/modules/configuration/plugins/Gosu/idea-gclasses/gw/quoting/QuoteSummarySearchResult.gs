package gw.quoting

uses gw.api.quoting.QuoteKey

@Export
class QuoteSummarySearchResult {
  var _quoteKey : QuoteKey as QuoteKey

  var _displayName : String as Name
  var _firstName : String as FirstName
  var _lastName : String as LastName
  var _isPerson : Boolean as Person
  var _companyName : String as CompanyName
  var _workPhone : String as WorkPhone
  var _email : String as Email

  var _isFromQuoteStore : boolean as FromQuoteStore
  var _submissionNumber : String as SubmissionNumber

  construct(quoteKey : QuoteKey) {
    this(quoteKey, null)
  }

  construct(quoteKey : QuoteKey, contact : Contact) {
    _quoteKey = quoteKey

    if (contact == null) {
      return
    }
    if (contact typeis Person) {
      _firstName = contact.FirstName
      _lastName = contact.LastName
      _displayName = contact.DisplayName
      _isPerson = true
    } else if (contact typeis Company) {
      _companyName = contact.Name
      _displayName = contact.DisplayName
      _isPerson = false
    }
    _workPhone = contact.WorkPhone
    _email = contact.EmailAddress1

  }
}