package gw.quoting

uses gw.api.database.IQueryBeanResult
uses gw.api.database.ISelectQueryBuilder
uses gw.api.locale.DisplayKey
uses gw.api.quoting.QuoteDataManagerException
uses gw.api.quoting.QuoteKey
uses gw.api.util.PhoneUtil
uses gw.contact.ContactQueryBuilder
uses gw.job.JobQueryBuilder
uses gw.quoting.impl.QuoteStoreSummaryQueryBuilder
uses gw.quoting.impl.QuotingContactQueryBuilder
uses gw.search.SearchCriteria
uses typekey.*
uses typekey.Job

/**
 * This class defines the search criteria for a quote search.
 */
@Export
class QuoteSearchCriteria extends SearchCriteria<QuoteSummarySearchResult> {

  var _firstName : String as FirstName
  var _lastName : String  as LastName
  var _companyName : String as CompanyName
  var _quoteID : String as QuoteID
  var _phoneNum : String as WorkPhone
  var _resultLimit : int as ResultLimit
  var _emailAddress : String as Email
  var _hvqFilter : boolean as HVQFilter
  var _factory : QuotingFactory

  construct(factory : QuotingFactory, limit : int = 0) {
    _factory = factory
    _resultLimit = limit
  }

  property get FirstName() : String { return _firstName }
  property set FirstName(value : String) { _firstName = (value != null) ? value.trim() : null }
  property get LastName() : String { return _lastName }
  property set LastName(value : String) { _lastName = (value != null) ? value.trim() : null }
  property get CompanyName() : String { return _companyName }
  property set CompanyName(value : String) { _companyName = (value != null) ? value.trim() : null }
  property get WorkPhone() : String { return _phoneNum }
  property set WorkPhone(value : String) { _phoneNum = (value != null) ? value.trim() : null }
  property get Email() : String { return _emailAddress }
  property set Email(value : String) { _emailAddress = (value != null) ? value.trim() : null }
  property get QuoteID() : String { return _quoteID }
  property set QuoteID(value : String) { _quoteID = (value != null) ? value.trim() : null }

  protected override property get HasMinimumSearchCriteria() : boolean {
    return ((FirstName?.NotBlank and LastName?.NotBlank) or CompanyName?.NotBlank)
        or _emailAddress?.NotBlank
        or _quoteID?.NotBlank
        or _phoneNum?.NotBlank
  }

  protected override property get MinimumSearchCriteriaMessage() : String {
    return DisplayKey.get("Quoting.PerformSearch.MinimumSearchCriteria")
  }

  protected override function doSearch() : QuoteSummarySearchResult[] {
    var searchResult = searchQuoteStore()
    if (not HVQFilter) {
      searchResult.addAll(searchSystemOfRecord().map(\elt -> new QuoteSummarySearchResult(
          elt.QuoteIdentifier == null ? null : QuoteKey.valueOf(elt.QuoteIdentifier), elt.Contact) {
        :SubmissionNumber = elt.SubmissionNumber
      }))
    }
    return searchResult.sortByDescending(\result -> result.QuoteKey.PolicyQuoteID).toTypedArray()
  }

  private function searchQuoteStore() : List<QuoteSummarySearchResult> {
    return _factory.createQuoteStore().search(this)
  }

  private function searchSystemOfRecord() : IQueryBeanResult<QuoteStoreSummary> {
    var queryBuilder = populateQueryBuilder()
    var query = queryBuilder.build() as ISelectQueryBuilder<QuoteStoreSummary>
    var results = query.select()
    if (ResultLimit != 0 and results.getCountLimitedBy(ResultLimit) > ResultLimit + 1) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Search.TooManyResults", ResultLimit))
    }
    return results
  }

  private function populateQueryBuilder() : QuoteStoreSummaryQueryBuilder {
    var queryBuilder = new QuoteStoreSummaryQueryBuilder()
        .withJob(new JobQueryBuilder().withSubtype(Job.TC_SUBMISSION).isOpen(Boolean.TRUE))

    var contactQueryBuilder = createContactQueryBuilder()
    if (contactQueryBuilder != null) {
      queryBuilder.withPrimaryNamedInsuredContactDenorm(contactQueryBuilder)
    }

    if ((FirstName.NotBlank or LastName.NotBlank) and CompanyName.NotBlank) {
      throw new QuoteDataManagerException(DisplayKey.get("Web.AccountSearch.CannotSpecifyBothPersonAndCompany"))
    }
    if (QuoteID?.NotBlank) {
      queryBuilder.withQuoteID(QuoteID)
    }
    return queryBuilder
  }

  private function createContactQueryBuilder() : ContactQueryBuilder {
    var isContactQueryUsed = false
    var contactQueryBuilder = new QuotingContactQueryBuilder()
    if (FirstName?.NotBlank) {
      contactQueryBuilder.withFirstName(FirstName)
      isContactQueryUsed = true
    }
    if (LastName?.NotBlank) {
      contactQueryBuilder.withLastName(LastName)
      isContactQueryUsed = true
    }
    if (CompanyName?.NotBlank) {
      contactQueryBuilder.withCompanyName(CompanyName)
      isContactQueryUsed = true
    }
    if (Email?.NotBlank) {
      contactQueryBuilder.withEmail(Email)
      isContactQueryUsed = true
    }
    if (WorkPhone?.NotBlank) {
      var formattedPhone = PhoneUtil.format(WorkPhone, PhoneUtil.getDefaultPhoneCountryCode())
      contactQueryBuilder.withWorkPhone(formattedPhone)
      isContactQueryUsed = true
    }

    if (!isContactQueryUsed) {
      return null
    }
    return contactQueryBuilder
  }
}