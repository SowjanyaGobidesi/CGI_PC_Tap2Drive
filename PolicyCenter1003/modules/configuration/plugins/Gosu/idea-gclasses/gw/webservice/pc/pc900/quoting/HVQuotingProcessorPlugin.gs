package gw.webservice.pc.pc900.quoting

uses gw.api.locale.DisplayKey
uses gw.api.database.Query
uses gw.api.productmodel.ProductLookup
uses gw.api.system.PCLoggerCategory
uses gw.api.webservice.exception.BadIdentifierException
uses gw.job.JobProcess
uses gw.job.JobProcessUWIssueEvaluator
uses gw.pl.persistence.core.Bundle
uses gw.plugin.Plugins
uses gw.plugin.quoting.QuoteData
uses gw.plugin.quoting.QuotingDataPlugin

uses java.io.ByteArrayInputStream
uses java.nio.charset.StandardCharsets
uses java.util.Date
uses gw.api.profiler.Profiler
uses gw.api.profiler.PCProfilerTag
uses gw.plugin.quoting.QuotingProcessorPlugin
uses gw.quoting.QuoteDataImpl
uses gw.quoting.QuotingUtil
uses gw.xml.XmlElement
uses org.slf4j.Logger

/**
 * High Volume Quoting Processor.
 * @deprecated Please use QuoteDataManager instead.
 */
@gw.lang.Deprecated(:value="Use QuoteDataManager instead", :version="9.1.0")
@Export
class HVQuotingProcessorPlugin implements QuotingProcessorPlugin {

  protected static final var LOGGER : Logger = PCLoggerCategory.QUOTING
  protected var _plugin : QuotingDataPlugin
  
  construct() {
    _plugin = Plugins.get(QuotingDataPlugin)
  }
  
  // Get an Account entity
  protected function getAccount(policyPeriodData : gw.webservice.pc.pc900.gxmodel.quotingpolicyperiodmodel.PolicyPeriod)
      : Account {
    var startFrame = Profiler.push(PCProfilerTag.DIST_QUOTE_GET_ACCOUNT);
    var account : Account
    try {
      account = _plugin.getAccount(policyPeriodData)
    } finally {
      Profiler.pop(startFrame);
    }

    LOGGER.debug("Quoting Account used: " + account.DisplayName)
    return account
  }

  // Get a ProducerCode for the specified Account.  
  protected function getProducerCode(account : Account) : ProducerCode {
    var query = Query.make(ProducerCode)
    var producerCodesWithSpecifiedAccount = query.join(AccountProducerCode, "ProducerCode")
        .compare("Account", Equals, account)
    return producerCodesWithSpecifiedAccount.select().first()
  }
  
  protected function startSubmission(bundle : Bundle, productCode : String,
      policyPeriodData : gw.webservice.pc.pc900.gxmodel.quotingpolicyperiodmodel.PolicyPeriod) : PolicyPeriod {
        
    var product = ProductLookup.getByPublicID(productCode)
    if (product == null){
      throw new BadIdentifierException(DisplayKey.get("Quoting.Submission.Error.CannotFindProductCode", productCode))
    }

    var account = bundle.add(getAccount(policyPeriodData))
    var submission = account.createSubmission(Date.Today, product, getProducerCode(account), \ period -> {
      if (policyPeriodData != null) {
        policyPeriodData.$TypeInstance.populatePolicyPeriod(period)
      }
    })
    // don't know why we have to do this but if we don't the period will new instead of draft
    var policyPeriod = submission.LatestPeriod
    policyPeriod.SubmissionProcess.beginEditing()
    return policyPeriod
  }

  /**
   * Quote a submission in PolicyCenter. The submission is not committed into the database.
   * 
   * The XML representation of the returning quote (PolicyPeriod GX Model) is persisted into the external database
   * by the plugin.
   *
   * @param productCode the code of the product (e.g., PersonalAuto, WorkersComp)
   * @param policyPeriodData the GX model request data used to populate the new policy period
   *
   * @return a QuoteData
   */
  function quoteSubmission(productCode : String, policyPeriodData : XmlElement) : QuoteData {
    var policyPeriodDataGX = policyPeriodData as gw.webservice.pc.pc900.gxmodel.quotingpolicyperiodmodel.PolicyPeriod
    LOGGER.debug("Quote Request:\n" + policyPeriodData.asUTFString())
    var policyPeriod = QuotingUtil.runInThrowAwayBundle(\bundle -> {
      var policyPeriod = startSubmission(bundle, productCode, policyPeriodDataGX)
      quoteMaybeSkippingEvaluation(policyPeriod.SubmissionProcess, true, ValidationLevel.TC_QUICKQUOTABLE, RatingStyle.TC_QUICKQUOTE)

      return policyPeriod
    })
    var model = new gw.webservice.pc.pc900.gxmodel.quotingpolicyperiodmodel.PolicyPeriod(policyPeriod)
    var xml = model.asUTFString()
    LOGGER.debug("Quote Response:\n" + xml)

    var startFrame = Profiler.push(PCProfilerTag.DIST_QUOTE_SEND_DATA);
    var quoteID : Object
    try {
      quoteID = _plugin.sendQuotingData(new ByteArrayInputStream(xml.getBytes(StandardCharsets.UTF_8)))
    } finally {
      Profiler.pop(startFrame)
    }
    var quoteData = new QuoteDataImpl() {
      :PolicyQuoteID = quoteID,
      :PolicyPeriod = model
    }
    return quoteData
  }

  /**
   * @param skipEvaluation allows quote even if there are UW issues with the policy period being quoted.
   */
  protected function quoteMaybeSkippingEvaluation(jobProcess : JobProcess, skipEvaluation : boolean, 
      valLevel: ValidationLevel, ratingStyle : RatingStyle) {
    var prevEvaluator = jobProcess.JobProcessEvaluator
    try {
      if (skipEvaluation) {
        jobProcess.JobProcessEvaluator = JobProcessUWIssueEvaluator.NO_OP_EVALUATOR
      }
      jobProcess.requestQuote(valLevel, ratingStyle)
    } finally {
      jobProcess.JobProcessEvaluator = prevEvaluator
    }  
  }

}
