package gw.account
uses gw.api.locale.DisplayKey
uses gw.search.*
uses gw.api.database.IQueryBeanResult
uses gw.contact.ContactQueryBuilder
uses gw.address.AddressArea
uses gw.address.AddressQueryBuilder
uses java.util.Date

/**
 * @see gw.account.AccountSearchCriteria700 for the PolicyCenter 7.0.x version
 */
@Export
class AccountSearchCriteria extends EntitySearchCriteria<AccountSummary> implements AddressArea, gw.search.NameCriteria {

  var _searchReason : AccountSearchReason

  // account
  var _accountNumber   : String         as AccountNumber
  var _accountOrgType  : AccountOrgType as AccountOrgType
  var _accountStatus   : AccountStatus  as AccountStatus
  var _excludedAccount : Account        as ExcludedAccount
  var _industryCode    : IndustryCode   as IndustryCode
  var _originationDate : Date           as OriginationDate
  var _primaryLanguage : LanguageType   as PrimaryLanguage
  var _producer        : Organization   as Producer
  var _producerCode    : ProducerCode   as ProducerCode
  var _relatedTo       : Account        as RelatedTo
  var _producerCodeSecurityUser : User  // data for Secure property

  // account holder contact
  delegate _accountHolderNameCriteria represents gw.search.NameCriteria
  var _phone            : String  as Phone

  // Address
  var _addressLine1     : String  as AddressLine1
  var _addressLine1Kanji: String  as AddressLine1Kanji
  var _addressLine2     : String  as AddressLine2
  var _addressLine2Kanji: String  as AddressLine2Kanji
  var _city             : String  as City
  var _cityKanji        : String  as CityKanji
  var _country          : Country as Country
  var _county           : String  as County
  var _postalCode       : String  as PostalCode
  var _state            : State   as State

  // minimum search criteria directives
  var _bypassMinimumSearchCriteriaUsingProducerCodeSecurity = false
  var _restrictiveMinimumSearchCriteriaForPersonName        = false

  public construct() {
    this(AccountSearchReason.SearchAccounts)
  }

  public construct(searchReason : AccountSearchReason) {
    _searchReason = searchReason
    _accountHolderNameCriteria = new gw.search.NameCriteriaImpl()
  }

  property get Secure() : boolean {
    return _producerCodeSecurityUser != null
  }
  
  property set Secure(value : boolean) {
    _producerCodeSecurityUser = value ? User.util.CurrentUser : null
  }

  /**
   * Directs the search criteria to allow users using producer code security to
   * bypass the minimum criteria sufficiency checks and run unconstrained searches.
   * You might want to allow this if each producer code is responsible for only a
   * small subset of the total policies.
   * <p>
   * The default value is false.
   */
  property set BypassMinimumSearchCriteriaUsingProducerCodeSecurity(value : boolean) {
    _bypassMinimumSearchCriteriaUsingProducerCodeSecurity = value
  }

  /**
   * Directs the search criteria to apply more restrictions on what it considers minimally
   * sufficient search criteria when using person names.
   * <p>
   * The default value is false.
   */
  property set RestrictiveMinimumSearchCriteriaForPersonName(value : boolean) {
    _restrictiveMinimumSearchCriteriaForPersonName = value
  }
  
  override protected property get InvalidSearchCriteriaMessage() : String {
    if (HasPersonName and HasCompanyName) {
      return DisplayKey.get("Web.AccountSearch.CannotSpecifyBothPersonAndCompany")
    }
    if (_accountNumber != null and _accountNumber == _excludedAccount.AccountNumber) {
      return DisplayKey.get(_searchReason.RequireDifferentAccountNumberErrorDisplayKey, _accountNumber)
    }
    return null
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    if (_accountHolderNameCriteria.OfficialId.NotBlank
        or _accountNumber.NotBlank
        or _phone.NotBlank
        or _producer != null
        or _producerCode != null
        or CanBypassMinimumSearchCriteriaUsingProducerCodeSecurity
        or HasMinimumSearchCriteriaForRelatedTo
        or HasMinimumSearchCriteriaForCompanyName
        or HasMinimumSearchCriteriaForPersonName) {
      return null
    } else {
      return DisplayKey.get("Web.AccountSearch.MinimumSearchCriteriaRequirement")
    }
  }
  
  internal property get CanBypassMinimumSearchCriteriaUsingProducerCodeSecurity() : boolean {
    return _bypassMinimumSearchCriteriaUsingProducerCodeSecurity and _producerCodeSecurityUser.UseProducerCodeSecurity
  }
  
  internal property get HasMinimumSearchCriteriaForRelatedTo() : boolean {
    return _relatedTo != null
  }
  
  internal property get HasMinimumSearchCriteriaForCompanyName() : boolean {
    return isNonBlankAndExactOrMinimumLength(_accountHolderNameCriteria.CompanyName, CompanyNameExact, 5)
        or _accountHolderNameCriteria.CompanyNameKanji.NotBlank
  }
  
  internal property get HasMinimumSearchCriteriaForPersonName() : boolean {
    var hasFirstName = isNonBlankAndExactOrMinimumLength(_accountHolderNameCriteria.FirstName, FirstNameExact, 3)
    var hasLastName = isNonBlankAndExactOrMinimumLength(_accountHolderNameCriteria.LastName, LastNameExact, 3)
    var sufficientNameInfo = hasFirstName and hasLastName

    var additionalAddressInfo = _postalCode.NotBlank or ((_city.NotBlank or _cityKanji.NotBlank) and _state != null)

    var sufficientKanjiInfo = _accountHolderNameCriteria.LastNameKanji.NotBlank or _accountHolderNameCriteria.FirstNameKanji.NotBlank

    if (_restrictiveMinimumSearchCriteriaForPersonName) {
      return (sufficientNameInfo and (LastNameExact or additionalAddressInfo)) or sufficientKanjiInfo
    } else {
      return sufficientNameInfo or sufficientKanjiInfo
    }
  }
  
  internal static function isNonBlankAndExactOrMinimumLength(arg : String, exact : boolean, minimumLength : int) : boolean {
    return arg.NotBlank and (exact or arg.length >= minimumLength)
  }
  
  override protected function doSearch() : IQueryBeanResult {
    var accountSummaryQueryBuilder = configureAccountSummaryQueryBuilder(new AccountSummaryQueryBuilder())
    if (ShouldAddAccountHolderContactQueryBuilder) {
      var accountHolderContact = new ContactQueryBuilder()
      accountSummaryQueryBuilder.withAccountHolderContact(configureAccountHolderContactQueryBuilder(accountHolderContact))
      if (ShouldAddPrimaryAddressAddressQueryBuilder) {
        accountHolderContact.withPrimaryAddress(configurePrimaryAddressAddressQueryBuilder(new AddressQueryBuilder()))
      }
    }
    return accountSummaryQueryBuilder.build().select()
  }
  
  protected property get HasPersonName() : boolean {
    return _accountHolderNameCriteria.FirstName.NotBlank or _accountHolderNameCriteria.LastName.NotBlank
  }
  
  protected property get HasCompanyName() : boolean {
    return _accountHolderNameCriteria.CompanyName.NotBlank
  }
  
  internal function configureAccountSummaryQueryBuilder(builder : AccountSummaryQueryBuilder) : AccountSummaryQueryBuilder {
    return builder.withAccountNumber(_accountNumber)
      .withAccountOrgType(_accountOrgType)
      .withAccountStatus(_accountStatus)
      .withExcludedAccount(_excludedAccount)
      .withFrozen(false)
      .withIndustryCode(_industryCode)
      .withOriginationDate(_originationDate)
      .withPrimaryLanguage(_primaryLanguage)
      .withProducer(_producer)
      .withProducerCode(_producerCode)
      .withProducerCodeSecurityFor(_producerCodeSecurityUser)
      .withRelatedTo(_relatedTo)
  }
  
  internal property get ShouldAddAccountHolderContactQueryBuilder() : boolean {
    return _accountHolderNameCriteria.HasAnyNameCriteria
        or _phone.NotBlank
        or _addressLine1.NotBlank
        or _addressLine2.NotBlank
        or _city.NotBlank
        or _addressLine1Kanji.NotBlank
        or _addressLine2Kanji.NotBlank
        or _cityKanji.NotBlank
        or _country != null
        or _county.NotBlank
        or _postalCode.NotBlank
        or _state != null
  }
  
  internal function configureAccountHolderContactQueryBuilder(builder : ContactQueryBuilder) : ContactQueryBuilder {
    return _accountHolderNameCriteria.configureFromNameCriteria(builder)
        .withWorkPhone(_phone)
        .withCityDenormStarting(_city)
        .withCityKanjiDenormStarting(_cityKanji)
        .withPostalCodeDenormStarting(_postalCode)
        .withCountryDenorm(_country)
        .withStateDenorm(_state)
  }
  
  internal property get ShouldAddPrimaryAddressAddressQueryBuilder() : boolean {
    return
        _addressLine1.NotBlank
        or _addressLine1Kanji.NotBlank
        or _addressLine2.NotBlank
        or _addressLine2Kanji.NotBlank
        or _county.NotBlank
  }
  
  internal function configurePrimaryAddressAddressQueryBuilder(builder : AddressQueryBuilder) : AddressQueryBuilder {
    // _city, _cityKanji, _postalCode, and _state are handled by configureAccountHolderContactQueryBuilder()
    return builder
        .withAddressLine1(_addressLine1)
        .withAddressLine1KanjiStarting(_addressLine1Kanji)
        .withAddressLine2(_addressLine2)
        .withAddressLine2KanjiStarting(_addressLine2Kanji)
        .withCountyStarting(_county)
  }

  function toContactSearchCriteria() : ContactSearchCriteria {
    return AccountToContactSearchCriteriaConverter.convert(this)
  }
  
}
