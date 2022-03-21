package gw.account

/**
 * Creates a new ContactSearchCriteria from an AccountSearchCriteria's values.
 */
@Export
class AccountToContactSearchCriteriaConverter {
  private construct() {
  }

  static function convert(accountSearchCritera: AccountSearchCriteria): ContactSearchCriteria {
    var contactSearchCritera = new ContactSearchCriteria()
    if (accountSearchCritera.CompanyName != null) {
      contactSearchCritera.Keyword        = accountSearchCritera.CompanyName
      contactSearchCritera.KeywordKanji   = accountSearchCritera.CompanyNameKanji
      contactSearchCritera.ContactSubtype = TC_COMPANY
    } else {
      contactSearchCritera.Keyword        = accountSearchCritera.LastName
      contactSearchCritera.KeywordKanji   = accountSearchCritera.LastNameKanji
      contactSearchCritera.FirstName      = accountSearchCritera.FirstName
      contactSearchCritera.FirstNameKanji = accountSearchCritera.FirstNameKanji
      contactSearchCritera.ContactSubtype = TC_PERSON
    }
    contactSearchCritera.Address.AddressLine1      = accountSearchCritera.AddressLine1
    contactSearchCritera.Address.AddressLine1Kanji = accountSearchCritera.AddressLine1Kanji
    contactSearchCritera.Address.AddressLine2      = accountSearchCritera.AddressLine2
    contactSearchCritera.Address.AddressLine2Kanji = accountSearchCritera.AddressLine2Kanji
    contactSearchCritera.Address.City              = accountSearchCritera.City
    contactSearchCritera.Address.CityKanji         = accountSearchCritera.CityKanji
    contactSearchCritera.Address.County            = accountSearchCritera.County
    contactSearchCritera.Address.State             = accountSearchCritera.State
    contactSearchCritera.Address.PostalCode        = accountSearchCritera.PostalCode
    contactSearchCritera.Address.Country           = accountSearchCritera.Country
    return contactSearchCritera
  }

}