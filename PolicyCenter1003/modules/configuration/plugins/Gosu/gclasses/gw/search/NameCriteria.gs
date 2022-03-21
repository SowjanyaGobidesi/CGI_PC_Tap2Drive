package gw.search

uses gw.contact.ContactQueryBuilder
uses gw.contact.PolicyContactRoleQueryBuilder

/**
 * Name criteria commonly used in other search criteria.
 */
@Export
interface NameCriteria {

  property get FirstName() : String
  property set FirstName(value: String)

  property get LastName() : String
  property set LastName(value: String)

  property get CompanyName() : String
  property set CompanyName(value : String)

  property get FirstNameKanji() : String
  property set FirstNameKanji(value: String)

  property get LastNameKanji() : String
  property set LastNameKanji(value: String)

  property get CompanyNameKanji() : String
  property set CompanyNameKanji(value : String)

  property get OfficialId() : String
  property set OfficialId(value : String)

  /**
   * True if the first name should match exactly.
   */
  property get FirstNameExact() : boolean
  /**
   * True if the first name should match exactly.
   */
  property set FirstNameExact(value : boolean)

  /**
   * True if the last name should match exactly.
   */
  property get LastNameExact() : boolean
  /**
   * True if the last name should match exactly.
   */
  property set LastNameExact(value : boolean)

  /**
   * True if the company name should match exactly.
   */
  property get CompanyNameExact() : boolean
  /**
   * True if the company name should match exactly.
   */
  property set CompanyNameExact(value : boolean)

  /**
   * True if any person name criteria is set with something meaningful.
   */
  property get HasPersonNameCriteria() : boolean
  /**
   * True if any company name criteria is set with something meaningful.
   */
  property get HasCompanyNameCriteria() : boolean
  /**
   * True if any criteria is set with something meaningful.
   */
  property get HasAnyNameCriteria() : boolean
  /**
   * True if any criteria (other than OfficalID) is set with something meaningful.
   */
  property get HasAnyNameCriteriaOtherThanOfficialID() : boolean

  /**
   * Configure the given builder and return it.
   */
  function configureFromNameCriteria(builder : ContactQueryBuilder) : ContactQueryBuilder

  /**
   * Configure the given builder and return it.  Note, this method doesn't handle OfficialId since OOTB,
   * PolicyContactRoles don't store OfficialID.
   */
  function configureFromNameCriteria(builder : PolicyContactRoleQueryBuilder) : PolicyContactRoleQueryBuilder

}
