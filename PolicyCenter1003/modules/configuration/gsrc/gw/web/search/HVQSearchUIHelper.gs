package gw.web.search

uses gw.account.AccountSearchCriteria
uses gw.api.locale.DisplayKey
uses gw.api.system.PCDependenciesGateway
uses gw.pl.util.ArgCheck
uses gw.api.quoting.QuoteKey
uses gw.quoting.QuoteSearchCriteria
uses gw.quoting.QuoteSummarySearchResult
uses gw.quoting.QuotingFactory
uses gw.quoting.impl.DefaultQuotingFactory

@Export
class HVQSearchUIHelper {

  public static final var FACTORY : QuotingFactory = new DefaultQuotingFactory()

  static function getJobForReconstitutedPeriodOnNewAccount(quoteId : String) : Job {
    ArgCheck.nonNull(quoteId, "QuoteId")
    var quoteDatamanager = FACTORY.createQuoteDataManager()
    var quoteRepresentation = quoteDatamanager.retrieveQuote(QuoteKey.valueOf(quoteId))
    var reconstitutedPeriod = quoteDatamanager.reconstituteQuote(quoteRepresentation)
    return reconstitutedPeriod.Job
  }

  static function getJobForReconstitutedPeriodOnExistingAccount(quoteId: String, accountSummary: AccountSummary) : Job {
    ArgCheck.nonNull(quoteId, "QuoteId")
    ArgCheck.nonNull(accountSummary.Account, "Account")
    var quoteDatamanager = FACTORY.createQuoteDataManager()
    var quoteRepresentation = quoteDatamanager.retrieveQuote(QuoteKey.valueOf(quoteId))
    var reconstitutedPeriod = quoteDatamanager.reconstituteQuote(quoteRepresentation, accountSummary.Account)
    return reconstitutedPeriod.Job
  }

  static function createAccountSearchCriteria(quoteStoreSummary : QuoteSummarySearchResult) : AccountSearchCriteria {
    var quoteDatamanager = FACTORY.createQuoteDataManager()
    var quoteRepresentation = quoteDatamanager.retrieveQuote(quoteStoreSummary.QuoteKey)
    return quoteDatamanager.createAccountSearchCriteria(quoteRepresentation)
  }

  static function quoteOrigin(isFromQuoteStore : boolean) : String {
    return isFromQuoteStore
      ? DisplayKey.get("Web.HVQSearch.Results.Origin.QuoteStore")
      : DisplayKey.get("Web.HVQSearch.Results.Origin.PolicyCenter")
  }

  static function toSubmission(submissionNumber : String) : Submission {
    return PCDependenciesGateway.JobFinder.findSubmissionByNumber(submissionNumber)
  }

  static function populateQuoteSearchCriteria(searchCriteria : QuoteSearchCriteria, quoteKey : QuoteKey) : boolean {
    if (quoteKey != null) {
      searchCriteria.QuoteID = quoteKey.PolicyQuoteID
    }
    return true
  }
}
