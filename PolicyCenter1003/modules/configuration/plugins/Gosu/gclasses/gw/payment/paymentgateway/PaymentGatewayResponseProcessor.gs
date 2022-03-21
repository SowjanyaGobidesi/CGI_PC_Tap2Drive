package gw.payment.paymentgateway

uses com.guidewire.pc.web.job.wizard.JobWizard
uses com.guidewire.pl.web.config.PCFTypeUtil
uses com.guidewire.pl.web.widget.WebMessage
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.locale.DisplayKey
uses gw.api.payment.paymentgateway.PaymentGatewayResponse
uses gw.api.payment.paymentgateway.PaymentInformation
uses gw.api.util.DisplayableException
uses gw.payment.paymentgateway.impl.TokenizedCreditCardDetails
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.Plugins
uses gw.plugin.billing.BillingPaymentInstrument
uses gw.plugin.billing.BillingPaymentInstrumentImpl
uses gw.plugin.billing.IBillingSystemPlugin
uses gw.plugin.paymentgateway.PaymentGatewayPlugin
uses org.apache.commons.lang.StringUtils
uses org.apache.log4j.Logger
uses pcf.JobForward
uses pcf.PolicyForward
uses pcf.api.Location

uses java.lang.IllegalArgumentException
uses java.lang.invoke.MethodHandles

/**
 * This class contains all helper method for processing payments with payment gateway.
 */
@Export
class PaymentGatewayResponseProcessor {

  /** Logger for class */
  private final var LOGGER = Logger.getLogger(MethodHandles.lookup().lookupClass())

  /** Billing Info wizard step */
  private final var BILLING_INFO_WIZARD_STEP = "BillingInfo"

  /** User for all transactions */
  private final var TRANSACTION_USER = "su"

  /** Whitespace character */
  private final var WHITESPACE = " "

  /** plugins for payment gateway and billing system */
  private final var _paymentGatewayPlugin = Plugins.get(PaymentGatewayPlugin)
  private final var _billingSystemPlugin = Plugins.get(IBillingSystemPlugin)

  /** response object */
  private var _response : PaymentGatewayResponse

  /** payment information object */
  private var _paymentInformation : PaymentInformation

  /** response reference number */
  private var _responseReferenceNumber : String

  /** policy period object */
  private var _policyPeriod : PolicyPeriod

  /** flag indicating save of payment instrument for future use */
  private var _saveForFutureUse : boolean

  /** saved transaction details */
  private var _savedTransactionDetails : PaymentGatewayTransaction

  construct(response : PaymentGatewayResponse) {
    _response = response
    _responseReferenceNumber = getReferenceNumberFromResponse()
    _savedTransactionDetails = lookupSavedTransaction()
    _policyPeriod = _savedTransactionDetails.PolicyPeriod
    _saveForFutureUse = _savedTransactionDetails.SaveForFutureUse
  }

  construct(response : PaymentGatewayResponse, paymentInformation : PaymentInformation) {
    this(response)
    _paymentInformation = paymentInformation
  }

  /**
   * Method responsible for processing incoming response from payment gateway UI.
   */
  function processPaymentResponse() {
    if (_response.IsVoidedTransaction) {
      if (_response.IsSaleTransaction
          or _response.IsInquiryTransaction) {
        deleteSaveTransaction()
        throw new DisplayableException(DisplayKey.get("Web.UpFrontPaymentDV.Error.VoidedTransaction"))
      } else if (_response.IsCreditTransaction) {
        removeUpFrontPaymentRecordForCreditTransaction()
        LOGGER.warn("Transaction ${_responseReferenceNumber} will not be credited because it has been voided. An UpFrontPayment record will be removed from database.")
      }
    } else if (_response.IsApprovedTransaction) {
      if (_response.IsSaleTransaction
          or _response.IsInquiryTransaction) {
        processSaleAndInquiryTransaction()
        deleteSaveTransaction()
      } else if (_response.IsCreditTransaction) {
        removeUpFrontPaymentRecordForCreditTransaction()
      } else {
        throw new DisplayableException(DisplayKey.get("Web.UpFrontPaymentDV.Error.UnsupportedTransactionType", _response.TransactionType))
      }
    } else {
      throw new DisplayableException(DisplayKey.get("Web.UpFrontPaymentDV.Error.CouldNotProcessPaymentGatewayResponse", _response.ResponseMessage))
    }
  }

  /**
   * Method responsible for processing synchronized payment responses.
   */
  function processSynchronizedPaymentResponse() {
    try {
      if (_response.IsApprovedTransaction) {
        processSaleAndInquiryTransaction()
      } else {
        throw new IllegalArgumentException(DisplayKey.get("Web.UpFrontPaymentDV.Error.UnableToProcessPaymentGatewayResponse", _response.ResponseMessage))
      }
    } finally {
      deleteSaveTransaction()
    }
  }

  /**
   * Method responsible for processing incoming response from payment gateway UI
   * with redirection to proper job screen (submission or change).
   */
  function processPaymentResponseAndRedirect() {
    if (_savedTransactionDetails != null
        && _response.IsApprovedTransaction) {
      try {
        processPaymentResponse()
        JobForward.go(_policyPeriod.Job, _policyPeriod, BILLING_INFO_WIZARD_STEP)
      } catch (ex: DisplayableException) {
        addErrorWebMessages(JobForward.go(_policyPeriod.Job, _policyPeriod, BILLING_INFO_WIZARD_STEP), ex.LocalizedMessages.toList())
      }
    } else if (_savedTransactionDetails == null
        && _response.IsApprovedTransaction){
      LOGGER.warn("Ignoring request due to empty saved transaction details. Probably return link was clicked more than one time.")
      PolicyForward.go()
    } else {
      LOGGER.error(DisplayKey.get("Web.UpFrontPaymentDV.Error.CouldNotProcessPaymentGatewayResponse",_response.ResponseMessage))
      addErrorWebMessages(PolicyForward.go(), {DisplayKey.get("Web.UpFrontPaymentDV.Error.CouldNotProcessPaymentGatewayResponse",_response.ResponseMessage)})
    }
  }

  /**
   * Method responsible for processing incoming response from payment gateway post back.
   */
  function processPostBackPaymentResponse() {
    if (_response.IsApprovedTransaction) {
      if (_response.IsSaleTransaction
          or _response.IsInquiryTransaction) {
        processSaleAndInquiryTransaction()
      } else {
        LOGGER.error(DisplayKey.get("Web.UpFrontPaymentDV.Error.UnsupportedTransactionType", _response.TransactionType))
      }
    } else {
      LOGGER.error(DisplayKey.get("Web.UpFrontPaymentDV.Error.UnableToProcessPaymentGatewayResponse", _response.ResponseMessage))
    }
  }

  /**
   * This method saves transaction before redirecting to Payment Gateway.
   */
  function saveTransactionDetails() {
    gw.transaction.Transaction.runWithNewBundle( \ bundle -> {
      var paymentGatewayTransaction = new PaymentGatewayTransaction() {
          :Reference = (_response.Token != null ? _response.Token : _response.ReferenceNumber),
          :PolicyPeriod = _paymentInformation.PolicyPeriod,
          :SaveForFutureUse = _paymentInformation.SaveForFutureUse
          }
      bundle.add(paymentGatewayTransaction)
    }, TRANSACTION_USER)
    synchronizeTransactionDetails()
  }

  /**
   * Adds error messages to the specified location for display in the UI.
   * One message at the error level will be added for each string contained
   * in messages.
   *
   * @param location the location to which to add the messages
   * @param messages the messages to be added
   */
  private function addErrorWebMessages(location : Location, messages : List<String>) {
    var wizard = PCFTypeUtil.getLocationWidget(location) as JobWizard
    for (message in messages) {
      var webMessage = new WebMessage(null, WebMessage.Severity.ERROR, message)
      var parentWebContext = wizard.ParentWebMessageContext
      var webContext = wizard.WebMessageContext
      var contextToShowMessage = (parentWebContext == null ? webContext : parentWebContext)
      contextToShowMessage.addMessage(webMessage)
    }
  }

  /**
   * Method in order to synchronize transaction details after
   * saving it to database.
   */
  private function synchronizeTransactionDetails() {
    _savedTransactionDetails = lookupSavedTransaction()
    _policyPeriod = _savedTransactionDetails.PolicyPeriod
    _saveForFutureUse = _savedTransactionDetails.SaveForFutureUse
  }

  /**
   * Remove saved transaction details from database.
   */
  private function deleteSaveTransaction() {
    gw.transaction.Transaction.runWithNewBundle( \ bundle -> {
      bundle.delete(_savedTransactionDetails)
    }, TRANSACTION_USER)
  }

  /**
   * Process sale and inquiry transactions.
   */
  private function processSaleAndInquiryTransaction() {
    if (not doesUpFrontPaymentExist()) {
      var instrument = getOrCreateNewPaymentInstrument()
      gw.transaction.Transaction.runWithNewBundle( \ bundle -> {
        var upFrontPayment = new UpFrontPayment() {
            :PaymentMethod = typekey.UpFrontPaymentMethod.TC_ELECTRONIC,
            :PaymentInstrument = instrument != null ? instrument.DisplayName
            : typekey.UpFrontPaymentMethod.TC_ELECTRONIC.DisplayName,
            :Reference = _response.ReferenceNumber,
            :Job = _policyPeriod.Job,
            :Amount = new MonetaryAmount(_response.Amount + WHITESPACE + _policyPeriod.PreferredSettlementCurrency)
            }
        bundle.add(_policyPeriod.Job)
        _policyPeriod.Job.addToUpFrontPayments(upFrontPayment)
      }, TRANSACTION_USER)
    }
  }

  /**
   * Remove UpFrontPayment record from database
   * for credit transaction.
   */
  private function removeUpFrontPaymentRecordForCreditTransaction() {
    gw.transaction.Transaction.runWithNewBundle( \ bundle -> {
      var existingUpFrontPayment = bundle.add(getExistingUpFrontPaymentRecord())
      existingUpFrontPayment.Job.removeFromUpFrontPayments(existingUpFrontPayment)
    }, TRANSACTION_USER)
  }

  /**
   * Get transaction reference number.
   *
   * @return response reference number
   */
  private function getReferenceNumberFromResponse() : String {
    var referenceNumber : String
    if (_response.Token != null) {
      referenceNumber = _response.Token
    } else if (_response.OriginalTransactionID != null) {
      referenceNumber = _response.OriginalTransactionID
    } else {
      referenceNumber = _response.ReferenceNumber
    }
    return referenceNumber
  }

  /**
   * Creates new payment instrument and assigns it to correct account.
   * If payment instrument already exist it will return existing payment instrument.
   *
   * @return newly created or existing payment instrument
   */
  private function getOrCreateNewPaymentInstrument() : BillingPaymentInstrument {
    var instrument : BillingPaymentInstrument
    if (_saveForFutureUse
        and not StringUtils.isEmpty(_responseReferenceNumber)) {
      var cardDetails = _paymentGatewayPlugin.getCardDetails(_responseReferenceNumber) as TokenizedCreditCardDetails
      gw.transaction.Transaction.runWithNewBundle( \ bundle -> {
        var newBillingInstrument = new BillingPaymentInstrumentImpl(){
            :Detail = cardDetails.CardName,
            :PaymentMethod = typekey.AccountPaymentMethod.TC_CREDITCARD,
            :Token = cardDetails.Token
            }
        var billingAccount = getBillingAccountNumber()
        instrument = _billingSystemPlugin
            .addPaymentInstrumentTo(billingAccount,
                _policyPeriod.PreferredSettlementCurrency,
                newBillingInstrument)
      }, TRANSACTION_USER)
    } else {
      instrument = _billingSystemPlugin
          .getExistingPaymentInstruments(getBillingAccountNumber(),
              _policyPeriod.PreferredSettlementCurrency)
              ?.firstWhere(\ins -> ins.Token == _responseReferenceNumber)
    }
    return instrument
  }

  /**
   * Get billing account for given job.
   *
   * @return billing account number
   */
  private function getBillingAccountNumber() : String {
    return _policyPeriod.AltBillingAccountNumber
        ?: _policyPeriod.Job.Policy?.Account.AccountNumber
  }

  /**
   * Retrieve saved unprocessed transaction details using reference number.
   *
   * @return payment transaction that matched reference number
   */
  private function lookupSavedTransaction() : PaymentGatewayTransaction {
    var savedTransactions = Query.make(PaymentGatewayTransaction).select()
    for (transaction in savedTransactions) {
      var response = _paymentGatewayPlugin.inquiryPaymentGatewayTransaction(transaction.Reference)
      if (response?.OriginalTransactionID == _responseReferenceNumber) {
        return transaction
      }
    }
    return null
  }

  /**
   * Checks if UpFrontPayment record already exists.
   *
   * @return true or false depending on record existence
   */
  private function doesUpFrontPaymentExist() : boolean {
    return getExistingUpFrontPaymentRecord() != null
  }

  /**
   * Finds existing electronic up front payment record using reference number.
   *
   * @return null or upFrontPayment record
   */
  private function getExistingUpFrontPaymentRecord() : UpFrontPayment {
    return Query.make(UpFrontPayment)
        .compare(UpFrontPayment#PaymentMethod, Relop.Equals, UpFrontPaymentMethod.TC_ELECTRONIC)
        .or( \ restriction -> restriction
            .compare(UpFrontPayment#Reference, Relop.Equals, _response.ReferenceNumber)
            .compare(UpFrontPayment#Reference, Relop.Equals, _response.OriginalTransactionID)
        ).select().AtMostOneRow
  }
}
