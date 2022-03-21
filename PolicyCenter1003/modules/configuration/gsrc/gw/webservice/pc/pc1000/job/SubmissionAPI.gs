package gw.webservice.pc.pc1000.job

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.ProductLookup
uses gw.api.system.PCLoggerCategory
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.DataConversionException
uses gw.api.webservice.exception.EntityStateException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPException
uses gw.transaction.Transaction
uses gw.webservice.SOAPUtil
uses gw.xml.ws.annotation.WsiPermissions

/**
 * API to create submissions for all LOBs.
 */
@gw.xml.ws.annotation.WsiWebService("http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/job/SubmissionAPI")
@Export
class SubmissionAPI {

  /**
   * Start a draft submission in PolicyCenter. The policy data is passed
   * in as policyPeriodData string which will be parsed by Guidewire's PolicyPeriod GX model schema.
   *
   * @param accountNumber    account number; must not be null.
   * @param productCode      the code of the product (e.g., PersonalAuto, WorkersComp); must not be null.
   * @param producerCodeId   public id of the producer code; must not be null.
   * @param policyPeriodData the data used to populate the new policy period
   * @param parseOptions     the options passed to the parser to parse policyPeriodData
   * @return the job number of the submission
   */
  @Throws(SOAPException, "If communication fails")
  @Throws(RequiredFieldException, "If any required field (accountNumber, producerCodeId or productCode) is null")
  @Throws(BadIdentifierException, "If cannot find an account, producer code or product with the specified id")
  @Throws(DataConversionException, "If cannot populate policy period from policyPeriodData.")
  @Param("accountNumber", "account number; must not be null.")
  @Param("productCode", "the code of the product (e.g., PersonalAuto, WorkersComp); must not be null.")
  @Param("producerCodeId", "public id of the producer code; must not be null.")
  @Param("policyPeriodData", "the data used to populate the new policy period")
  @Param("parseOptions", "the options passed to the parser to parse policyPeriodData")
  @WsiPermissions({SystemPermissionType.TC_CREATESUBMISSION})
  @Returns("the job number of the submission")
  function startDraftSubmission(accountNumber: String,
                                productCode: String,
                                producerCodeId: String,
                                policyPeriodData: String,
                                parseOptions: String): String {
    var policyPeriod = startSubmission(accountNumber, productCode, producerCodeId,
        policyPeriodData, parseOptions)
    return policyPeriod.Job.JobNumber
  }

  /**
   * Quote a submission in PolicyCenter.
   *
   * @param accountNumber    account number
   * @param productCode      the code of the product (e.g., PersonalAuto, WorkersComp)
   * @param producerCodeId   public id of the producer code
   * @param policyPeriodData the data used to populate the new policy period
   * @param parseOptions     the options passed to the parser to parse policyPeriodData
   * @return the job number of the submission
   */
  @Throws(SOAPException, "If communication fails")
  @Throws(RequiredFieldException, "If any required field (accountNumber, producerCodeId or productCode) is null")
  @Throws(BadIdentifierException, "If cannot find an account, producer code or product with the specified id")
  @Throws(DataConversionException, "If cannot populate policy period from policyPeriodData.")
  @Param("accountNumber", "account number; must not be null.")
  @Param("productCode", "the code of the product (e.g., PersonalAuto, WorkersComp); must not be null.")
  @Param("producerCodeId", "public id of the producer code; must not be null.")
  @Param("policyPeriodData", "the data used to populate the new policy period")
  @Param("parseOptions", "the options passed to the parser to parse policyPeriodData")
  @WsiPermissions({SystemPermissionType.TC_QUOTE, SystemPermissionType.TC_EDITSUBMISSION})
  @Returns("the job number of the submission")
  function quoteSubmission(accountNumber: String,
                           productCode: String,
                           producerCodeId: String,
                           policyPeriodData: String,
                           parseOptions: String): String {
    var policyPeriod = startSubmission(accountNumber, productCode, producerCodeId,
        policyPeriodData, parseOptions)
    Transaction.runWithNewBundle(\bundle -> {
      policyPeriod = bundle.add(policyPeriod)
      policyPeriod.SubmissionProcess.requestQuote()
    })
    return policyPeriod.Job.JobNumber
  }

  /**
   * Rate a submission in PolicyCenter.
   *
   * @param accountNumber    account number
   * @param productCode      the code of the product (e.g., PersonalAuto, WorkersComp)
   * @param producerCodeId   public id of the producer code
   * @param policyPeriodData the data used to populate the new policy period
   * @param parseOptions     the options passed to the parser to parse policyPeriodData
   * @return the job number of the submission
   */
  @Throws(SOAPException, "If communication fails")
  @Throws(RequiredFieldException, "If any required field (accountNumber, producerCodeId or productCode) is null")
  @Throws(BadIdentifierException, "If cannot find an account, producer code or product with the specified id")
  @Throws(DataConversionException, "If cannot populate policy period from policyPeriodData.")
  @Param("accountNumber", "account number; must not be null.")
  @Param("productCode", "the code of the product (e.g., PersonalAuto, WorkersComp); must not be null.")
  @Param("producerCodeId", "public id of the producer code; must not be null.")
  @Param("policyPeriodData", "the data used to populate the new policy period")
  @Param("parseOptions", "the options passed to the parser to parse policyPeriodData")
  @WsiPermissions({SystemPermissionType.TC_QUOTE, SystemPermissionType.TC_EDITSUBMISSION})
  @Returns("the job number of the submission")
  function rateSubmission(accountNumber: String,
                          productCode: String,
                          producerCodeId: String,
                          policyPeriodData: String,
                          parseOptions: String): String {
    var policyPeriod = startSubmission(accountNumber, productCode, producerCodeId,
        policyPeriodData, parseOptions)
    Transaction.runWithNewBundle(\bundle -> {
      policyPeriod = bundle.add(policyPeriod)
      policyPeriod.SubmissionProcess.requestRate()
    })
    return policyPeriod.Job.JobNumber
  }

  /**
   * Post-rating quote a rated submission in PolicyCenter.
   *
   * @return the job number of the submission
   * @Param jobNumber The Job Number of the submission. Cannot be null.
   */
  @Throws(SOAPException, "If communication fails")
  @Throws(RequiredFieldException, "If jobNumber is null")
  @Throws(BadIdentifierException, "If the submission specified cannot be found in PolicyCenter")
  @Throws(EntityStateException, "If the submission is not rated yet.")
  @Param("jobNumber", "The Job Number of the submission. Cannot be null.")
  @WsiPermissions({SystemPermissionType.TC_QUOTE, SystemPermissionType.TC_EDITSUBMISSION})
  @Returns("the job number of the submission")
  function postRatingQuoteSubmission(jobNumber: String): String {
    var submission = getSubmissionByJobNumber(jobNumber)
    var policyPeriod = submission.LatestPeriod
    var status = policyPeriod.Status
    if (status != TC_RATED) {
      throw new EntityStateException(DisplayKey.get("SubmissionAPI.Error.CannotPostRatingQuote", jobNumber, status.DisplayName))
    }
    Transaction.runWithNewBundle(\bundle -> {
      policyPeriod = bundle.add(policyPeriod)
      policyPeriod.SubmissionProcess.requestPostRatingQuote()
    })
    return policyPeriod.Job.JobNumber
  }

  /**
   * Internal
   */
  private function startSubmission(accountNumber: String,
                                   productCode: String,
                                   producerCodeId: String,
                                   policyPeriodData: String,
                                   parseOptions: String): PolicyPeriod {
    SOAPUtil.require(accountNumber, "accountNumber")
    SOAPUtil.require(productCode, "productCode")
    SOAPUtil.require(producerCodeId, "producerCodeId")

    var account = Account.finder.findAccountByAccountNumber(accountNumber)
    if (account == null) {
      throw new BadIdentifierException(DisplayKey.get("SubmissionAPI.Error.AccountNotFound", accountNumber))
    }

    var producerCodeQuery = Query.make(ProducerCode).compare(ProducerCode#PublicID, Equals, producerCodeId)
    var producerCode = producerCodeQuery.select().AtMostOneRow
    if (producerCode == null) {
      throw new BadIdentifierException(DisplayKey.get("SubmissionAPI.Error.ProducerCodeNotFound", producerCodeId))
    }
    var product = ProductLookup.getByPublicID(productCode)
    if (product == null) {
      throw new BadIdentifierException(DisplayKey.get("SubmissionAPI.Error.ProductCodeNotFound", productCode))
    }

    var policyPeriod: PolicyPeriod
    Transaction.runWithNewBundle(\bundle -> {
      account = bundle.add(account)
      try {
        var submission = account.createSubmission(Date.Today, product, producerCode,
            \period -> {
              if (policyPeriodData != null and policyPeriodData.NotBlank) {
                var model = gw.webservice.pc.pc1000.gxmodel.policyperiodmodel.PolicyPeriod.parse(policyPeriodData)
                model.$TypeInstance.populatePolicyPeriod(period)
              }
            })
        // don't know why we have to do this but if we don't the period will new instead of draft
        policyPeriod = submission.LatestPeriod
        policyPeriod.SubmissionProcess.beginEditing()
      } catch (e: Exception) {
        PCLoggerCategory.API.error(e.getMessage(), e)
        throw new DataConversionException(e.Message)
      }
    })
    return policyPeriod
  }

  /**
   * Get a submission by job number, or throw a {@link BadIdentifierException} if it doesn't exist.
   */
  private function getSubmissionByJobNumber(jobNumber: String): Submission {
    SOAPUtil.require(jobNumber, "jobNumber")

    var submission = Job.finder.findJobByJobNumber(jobNumber)
    if (submission == null or not(submission typeis Submission)) {
      throw new BadIdentifierException(DisplayKey.get("SubmissionAPI.Error.JobNumberNotFound", jobNumber))
    }
    return submission as Submission
  }
}