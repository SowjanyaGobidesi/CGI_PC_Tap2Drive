package gw.search

uses gw.contact.ContactQueryBuilder
uses gw.contact.PolicyContactRoleQueryBuilder

/**
 * Name criteria commonly used in other search criteria.
 */
@Export
class NameCriteriaImpl implements gw.search.NameCriteria {

  var _firstName        : String  as FirstName
  var _lastName         : String  as LastName
  var _companyName      : String  as CompanyName

  var _firstNameKanji   : String  as FirstNameKanji
  var _lastNameKanji    : String  as LastNameKanji
  var _companyNameKanji : String  as CompanyNameKanji

  var _officialId       : String  as OfficialId

  var _firstNameRestrictor   : StringColumnRestrictor  // data for FirstNameExact property
  var _lastNameRestrictor    : StringColumnRestrictor  // data for LastNameExact property
  var _companyNameRestrictor : StringColumnRestrictor  // data for CompanyNameExact property

  construct() {
    FirstNameExact = false
    LastNameExact = false
    CompanyNameExact = false
  }

  property get FirstNameExact() : boolean {
    return _firstNameRestrictor == EqualsIgnoringCase
  }

  property set FirstNameExact(value : boolean) {
    _firstNameRestrictor = value ? EqualsIgnoringCase : StartsWithIgnoringCase
  }

  property get LastNameExact() : boolean {
    return _lastNameRestrictor == EqualsIgnoringCase
  }

  property set LastNameExact(value : boolean) {
    _lastNameRestrictor = value ? EqualsIgnoringCase : StartsWithIgnoringCase
  }

  property get CompanyNameExact() : boolean {
    return _companyNameRestrictor == EqualsIgnoringCase
  }

  property set CompanyNameExact(value : boolean) {
    _companyNameRestrictor = value ? EqualsIgnoringCase : StartsWithIgnoringCase
  }

  property get HasPersonNameCriteria() : boolean {
    return _firstName.NotBlank or _lastName.NotBlank or _firstNameKanji.NotBlank or _lastNameKanji.NotBlank
  }

  property get HasCompanyNameCriteria() : boolean {
    return _companyName.NotBlank or _companyNameKanji.NotBlank
  }

  property get HasAnyNameCriteria() : boolean {
    return HasAnyNameCriteriaOtherThanOfficialID
        or _officialId.NotBlank
  }

  property get HasAnyNameCriteriaOtherThanOfficialID() : boolean {
    return _firstName.NotBlank
        or _lastName.NotBlank
        or _companyName.NotBlank
        or _firstNameKanji.NotBlank
        or _lastNameKanji.NotBlank
        or _companyNameKanji.NotBlank
  }

  function configureFromNameCriteria(builder : ContactQueryBuilder) : ContactQueryBuilder {
    return builder.withFirstNameRestricted(_firstName, _firstNameRestrictor)
        .withLastNameRestricted(_lastName, _lastNameRestrictor)
        .withCompanyNameRestricted(_companyName, _companyNameRestrictor)
        .withFirstNameKanjiStarting(_firstNameKanji)
        .withLastNameKanjiStarting(_lastNameKanji)
        .withCompanyNameKanjiStarting(_companyNameKanji)
        .withOfficialId(_officialId)
  }

  function configureFromNameCriteria(builder : PolicyContactRoleQueryBuilder) : PolicyContactRoleQueryBuilder {
    return builder.withFirstNameInternalRestricted(_firstName, _firstNameRestrictor)
        .withLastNameInternalRestricted(_lastName, _lastNameRestrictor)
        .withCompanyNameInternalRestricted(_companyName, _companyNameRestrictor)
        .withFirstNameKanjiInternalStarting(_firstNameKanji)
        .withLastNameKanjiInternalStarting(_lastNameKanji)
        .withCompanyNameKanjiInternalStarting(_companyNameKanji)
  }

}
