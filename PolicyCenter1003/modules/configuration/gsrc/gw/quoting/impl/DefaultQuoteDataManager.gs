package gw.quoting.impl

uses gw.account.AccountSearchCriteria
uses gw.api.locale.DisplayKey
uses gw.api.profiler.PCProfilerTag
uses gw.api.quoting.QuoteRepresentation
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.job.JobProcess
uses gw.job.JobProcessUWIssueEvaluator
uses gw.job.QuoteProcess
uses gw.job.uw.UWAuthorityBlocksProgressException
uses gw.pl.util.ArgCheck
uses gw.api.quoting.QuoteDataManagerException
uses gw.api.quoting.QuoteKey
uses gw.api.quoting.RestoreQuoteRepresentation
uses gw.quoting.QuoteDataManager
uses gw.quoting.QuotingFactory

/**
 * Default implementation of a QuoteManager.
 */
@Export
class DefaultQuoteDataManager implements QuoteDataManager {

  static final var LOGGER = PCLoggerCategory.QUOTING

  protected var _factory : QuotingFactory

  internal construct(factory : QuotingFactory) {
    _factory = factory
  }

  override function generateAndExportQuote(requestPeriod : PolicyPeriod) : QuoteKey {
    if (!HVQServer) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Quoting.QuoteDataManager.NonHVQEnabledError"))
    }
    ArgCheck.nonNull(requestPeriod, "PolicyPeriod")

    if (requestPeriod.Job.Subtype != typekey.Job.TC_SUBMISSION || requestPeriod.Status != PolicyPeriodStatus.TC_DRAFT) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.QuoteDataManager.InvalidPeriodStatusOrType", requestPeriod))
    }

    LOGGER.debug("Quote Request: " + requestPeriod.DisplayName)

    requestQuoteAndHandleUWIssues(requestPeriod.SubmissionProcess)

    //export period
    var quoteConverter = _factory.createQuoteConverter()
    var convertedQuote = quoteConverter.convertQuotePeriod(requestPeriod)

    //store period in QuoteStore
    var quoteKey : QuoteKey
    try {
      quoteKey = _factory.createQuoteStore().storeQuote(convertedQuote, requestPeriod)
    } catch (t : Throwable) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Quoting.QuoteDataManager.Error", t.Message), t)
    }
    requestPeriod.QuoteIdentifier = quoteKey.PolicyQuoteID
    return quoteKey
  }

  override function retrieveQuote(quoteKey : QuoteKey) : RestoreQuoteRepresentation {
    if (!HVQEnabled) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Quoting.QuoteDataManager.NonHVQEnabledError"))
    }
    var restoreQuoteRepresentation : RestoreQuoteRepresentation
    try {
      restoreQuoteRepresentation = _factory.createQuoteStore().retrieveQuote(quoteKey)
    } catch (t : Throwable) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Quoting.QuoteDataManager.Error", t.Message), t)
    }
    return restoreQuoteRepresentation
  }

  override function createAccountSearchCriteria(quoteRepresentation : QuoteRepresentation) : AccountSearchCriteria {
    if (!HVQEnabled) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Quoting.QuoteDataManager.NonHVQEnabledError"))
    }
    var quoteConverter = _factory.createQuoteConverter()
    return quoteConverter.createAccountSearchCriteria(quoteRepresentation)
  }

  /**
   * Request quotes and handle UW Issues.
   *
   * @param jobProcess the JobProcess containing the quote request
   */
  private function requestQuoteAndHandleUWIssues(jobProcess : JobProcess) {
    var prevEvaluator = jobProcess.JobProcessEvaluator
    try {
      // Create a JobProcessEvaluator that checks for UWIssues, but no blocking until bind.
      jobProcess.JobProcessEvaluator = new JobProcessUWIssueEvaluator() {
        override function evaluateAndFindBlockingUWIssues(branch : PolicyPeriod, bp : UWIssueBlockingPoint) : entity.UWIssue[] {
          return {}
        }

        override function findBlockingIssues(branch : PolicyPeriod, bp : UWIssueBlockingPoint) : entity.UWIssue[] {
          return {}
        }
      }
      jobProcess.requestRate(ValidationLevel.TC_QUICKQUOTABLE, RatingStyle.TC_QUICKQUOTE)
    } finally {
      jobProcess.JobProcessEvaluator = prevEvaluator
    }
  }

  override function reconstituteQuote(restoreQuoteRepresentation : RestoreQuoteRepresentation, account : Account = null) : PolicyPeriod {
    if (!HVQEnabled) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Quoting.QuoteDataManager.NonHVQEnabledError"))
    }

    var quoteConverter = _factory.createQuoteConverter()
    var period : PolicyPeriod
    try {
      period = quoteConverter.restoreQuotePeriod(restoreQuoteRepresentation, account)
      period.QuoteIdentifier = restoreQuoteRepresentation.QuoteKey.PolicyQuoteID

      var quoteProcess = new QuoteProcess(period.JobProcess)
      PCProfilerTag.JOB_REQUEST_QUOTE.execute(\-> quoteProcess.requestPostRatingQuote(null))

      _factory.createQuoteStore().onReconstitute(restoreQuoteRepresentation, period, true)
      return period
    } catch (ex : UWAuthorityBlocksProgressException) {
      // Continue with reconstituting the quote. The PolicyPeriod would require approval for the UWIssues before binding.
      _factory.createQuoteStore().onReconstitute(restoreQuoteRepresentation, period, true, ex)
      return period
    } catch (t : Throwable) {
      _factory.createQuoteStore().onReconstitute(restoreQuoteRepresentation, period, false, t)
      throw new QuoteDataManagerException(DisplayKey.get("Java.Quoting.QuoteDataManager.Error", t.Message), t)
    } finally {
      if (period != null) {
        period.Bundle.commit()
      }
    }
  }

  override function removeQuote(quoteKey : QuoteKey) : boolean {
    if (!HVQEnabled) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Quoting.QuoteDataManager.NonHVQEnabledError"))
    }

    try {
      return _factory.createQuoteStore().removeQuote(quoteKey)
    } catch (t : Throwable) {
      throw new QuoteDataManagerException(DisplayKey.get("Java.Quoting.QuoteDataManager.Error", t.Message), t)
    }
  }

  private property get HVQServer() : boolean {
    return PCConfigParameters.HVQServer.getValue()
  }

  private property get HVQEnabled() : boolean {
    return PCConfigParameters.HVQEnabled.getValue()
  }

}