package gw.quoting.impl

uses gw.api.locale.DisplayKey
uses gw.api.quoting.QuoteDataManagerException
uses gw.api.quoting.QuoteKey
uses gw.api.quoting.QuoteRepresentation
uses gw.api.quoting.RestoreQuoteRepresentation
uses gw.api.system.PCLoggerCategory
uses gw.api.util.PhoneUtil
uses gw.api.util.phone.GWPhoneMatchType
uses gw.pl.util.ArgCheck
uses gw.quoting.QuoteSearchCriteria
uses gw.quoting.QuoteStore
uses gw.quoting.QuoteSummarySearchResult
uses org.slf4j.Logger

uses java.util.concurrent.atomic.AtomicInteger
uses java.util.concurrent.ConcurrentHashMap

/**
 * A standalone implementation of the Quote Store that's used as an example (or demo) only.
 */
@Export
class StandAloneQuoteStore implements QuoteStore {
  protected static final var LOGGER : Logger = PCLoggerCategory.QUOTING

  public static final var INSTANCE : StandAloneQuoteStore = new StandAloneQuoteStore()
  var _idCounter = new AtomicInteger(-1)
  var _quoteByID = new ConcurrentHashMap<String, RestoreQuoteRepresentation>()
  var _searchMetadataByID = new ConcurrentHashMap<String, QuoteSearchMetadata>()

  private construct() {}

  override function storeQuote(data : QuoteRepresentation, policyPeriod : PolicyPeriod) : QuoteKey {
    ArgCheck.nonNull(data, "QuoteDataRepresentation")

    var id = String.valueOf(_idCounter.incrementAndGet())
    _searchMetadataByID[id] = new QuoteSearchMetadata(policyPeriod)
    _quoteByID[id] = ArchiveXmlRestoreQuoteRepresentation.createQuoteRepresentation(data.QuoteInputStream,
        data.AdditionalInfoInputStream, QuoteKey.valueOf(id))

    return new QuoteKey(id)
  }

  override function retrieveQuote(quoteKey : QuoteKey) : RestoreQuoteRepresentation {
    ArgCheck.nonNull(quoteKey, "QuoteKey")
    return _quoteByID[quoteKey.PolicyQuoteID]
  }

  override function removeQuote(quoteKey : QuoteKey) : boolean {
    _searchMetadataByID.remove(quoteKey.PolicyQuoteID)
    return _quoteByID.remove(quoteKey.PolicyQuoteID) != null
  }

  override function search(searchCriteria : QuoteSearchCriteria) : List<QuoteSummarySearchResult> {
    var resultList = new ArrayList<QuoteSummarySearchResult>()
    if (searchCriteria.QuoteID?.NotBlank) {
      var searchMetadata = _searchMetadataByID[searchCriteria.QuoteID]
      addToResultIfMatchesQuote(resultList, searchCriteria.QuoteID, searchCriteria, searchMetadata)
    } else {
      _searchMetadataByID.eachKeyAndValue(\id, searchMetadata ->
          addToResultIfMatchesQuote(resultList, id, searchCriteria, searchMetadata)
      )
    }
    if (searchCriteria.ResultLimit != 0 && resultList.size() > searchCriteria.ResultLimit + 1) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Search.TooManyResults", searchCriteria.ResultLimit))
    }
    return resultList
  }

  override function onReconstitute(quoteRepresentationOfReconstitutedQuote : RestoreQuoteRepresentation,
      reconstitutedQuote : PolicyPeriod, isSuccessfullyReconstituted : boolean, cause : Throwable = null) {
    if (isSuccessfullyReconstituted) {
      LOGGER.info("Successfully reconstituted quote " + reconstitutedQuote.QuoteIdentifier)
    } else {
      LOGGER.info("Failed to reconstitute quote.")
    }
  }

  private function addToResultIfMatchesQuote(resultList : List<QuoteSummarySearchResult>,
                                             id : String, searchCriteria : QuoteSearchCriteria, searchMetadata : QuoteSearchMetadata) {
    if (searchMetadata != null and hasMatch(searchMetadata, searchCriteria)) {
      var searchResult = new QuoteSummarySearchResult(QuoteKey.valueOf(id))
      searchResult.Name = searchMetadata.Name
      searchResult.FirstName = searchMetadata.FirstName
      searchResult.LastName = searchMetadata.LastName
      searchResult.CompanyName = searchMetadata.CompanyName
      searchResult.Person = searchMetadata.Person
      searchResult.WorkPhone = searchMetadata.WorkPhone
      searchResult.Email = searchMetadata.Email
      searchResult.FromQuoteStore = true
      resultList.add(searchResult)
    }
  }

  function hasMatch(searchMetadata : QuoteSearchMetadata, searchCriteria : QuoteSearchCriteria) : boolean {
    return filterOnName(searchMetadata, searchCriteria)
        and filterOnEmail(searchMetadata, searchCriteria)
        and filterOnPhone(searchMetadata, searchCriteria)
  }

  function filterOnName(searchMetadata : QuoteSearchMetadata, searchCriteria : QuoteSearchCriteria) : boolean {
    var hasMatch = true
    if (searchCriteria.FirstName?.NotBlank) {
      hasMatch = searchMetadata.FirstName == searchCriteria.FirstName
    }
    if (searchCriteria.LastName?.NotBlank) {
      hasMatch = hasMatch and searchMetadata.LastName == searchCriteria.LastName
    }
    if (searchCriteria.CompanyName?.NotBlank) {
      hasMatch = searchMetadata.CompanyName == searchCriteria.CompanyName
    }
    return hasMatch
  }

  function filterOnEmail(searchMetadata: QuoteSearchMetadata, searchCriteria : QuoteSearchCriteria) : boolean {
    if(searchCriteria.Email?.NotBlank) {
      return searchCriteria.Email.compareToIgnoreCase(searchMetadata.Email) == 0
    }
    return true
  }

  function filterOnPhone(searchMetadata: QuoteSearchMetadata, searchCriteria : QuoteSearchCriteria) : boolean {
    if(searchCriteria.WorkPhone?.NotBlank) {
      var country = PhoneUtil.getDefaultPhoneCountryCode()
      var criteriaPhone = PhoneUtil.parse(searchCriteria.WorkPhone, country)
      if (criteriaPhone == null) {
        throw new QuoteDataManagerException(DisplayKey.get("Java.PhoneUtil.Error.ParseError", searchCriteria.WorkPhone))
      }
      var metadataPhone = PhoneUtil.parse(searchMetadata.WorkPhone, country)
      var matchType = criteriaPhone.isMatch(metadataPhone)
      return matchType == GWPhoneMatchType.NSN_MATCH or matchType == GWPhoneMatchType.EXACT_MATCH
    }
    return true
  }
}
