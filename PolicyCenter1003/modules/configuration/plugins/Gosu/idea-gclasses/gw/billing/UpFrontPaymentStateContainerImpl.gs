package gw.billing

uses com.guidewire.pl.system.dependency.PLDependencies
uses entity.Job
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.locale.DisplayKey
uses gw.api.payment.paymentgateway.PaymentGatewayResponse
uses gw.api.payment.paymentgateway.PaymentInformation
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.api.util.LocationUtil
uses gw.api.web.PebblesUtil
uses gw.payment.paymentgateway.PaymentGatewayConfig
uses gw.payment.paymentgateway.PaymentGatewayResponseProcessor
uses gw.payment.paymentgateway.PaymentInformationHelper
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.Plugins
uses gw.plugin.paymentgateway.PaymentGatewayPlugin

uses java.lang.Exception
uses java.lang.IllegalArgumentException

/**
 * Class that backs the inputs of the Up Front Payment part of the Payments Screen.
 * Also provides methods to create and remove the UpFrontPayment entities
 */
@Export
class UpFrontPaymentStateContainerImpl implements UpFrontPaymentStateContainer {

  private static final var OTHER_INSTRUMENT_TYPE = DisplayKey.get('Web.UpFrontPaymentDV.Other')

  var _upFrontPaymentMethod : UpFrontPaymentMethod as UpFrontPaymentMethod
  var _job : Job
  var _downPayment : MonetaryAmount
  var _deposit : MonetaryAmount

  //Backs the corresponding field in the UI
  var _paymentInstrument : String as UpFrontPaymentInstrument
  //Backs the corresponding field in the UI
  var _reference : String as Reference
  //Backs the corresponding field in the UI
  var _amount : MonetaryAmount as Amount

  construct(job : Job, downPayment : MonetaryAmount, deposit : MonetaryAmount){
    if(downPayment == null and deposit == null){
      throw new IllegalArgumentException("Down payment and deposit can't be null at the same time")
    }
    _job = job
    _downPayment = downPayment
    _deposit = deposit
    updateSuggestedAmountToPay()
  }

  /**
   * Sets the Amount to the remaining amount to pay, that is the
   * the down payment or deposit minus the amount paid so far.
   */
  function updateSuggestedAmountToPay(job : Job, downPayment : MonetaryAmount, deposit : MonetaryAmount){
    _job = job
    _downPayment = downPayment
    _deposit = deposit
    updateSuggestedAmountToPay()
  }

  /**
   * Sets the Amount to the remaining amount to pay, that is the
   * the down payment or deposit minus the amount paid so far.
   */
  function updateSuggestedAmountToPay(){
    var settlementCurrency = _downPayment.Currency ?: _deposit.Currency
    if (settlementCurrency == null) {
      return
    }
    final var ZERO = new MonetaryAmount(0, settlementCurrency)
    var suggestedAmountToPay = _downPayment
    if(_downPayment == null){
      suggestedAmountToPay = _deposit
    }
    var paidSoFar = _job.AmountPaid
    suggestedAmountToPay = suggestedAmountToPay - paidSoFar
    if(suggestedAmountToPay < ZERO){
      suggestedAmountToPay = ZERO
    }
    _amount = suggestedAmountToPay
  }

  /**
   * Creates the UpFrontPayment entity and re-initializes this object and the pcf iterator
   */
  function createPayment() {
    validate()
    var upfp = new UpFrontPayment(){
        :PaymentMethod = _upFrontPaymentMethod,
        :PaymentInstrument = _paymentInstrument,
        :Reference = _reference,
        :Amount = _amount
        }
    _job.addToUpFrontPayments(upfp)
    reset()
  }

  /**
   * Removes the UpFrontPayment entity and re-initializes this object and the pcf iterator
   * only when credit transaction is successful.
   */
  function removePayment(payment : UpFrontPayment){
    var plugin = Plugins.get(PaymentGatewayPlugin)
    if (payment.PaymentMethod == UpFrontPaymentMethod.TC_ELECTRONIC) {
      var job = payment.Job
      var amount = payment.getAmount()
      var paymentInstrument = payment.PaymentInstrument
      var paymentInformation = PaymentInformationHelper.createPaymentInformation(job, null, null, false, paymentInstrument, amount)
      paymentInformation.TransactionID = payment.Reference
      paymentInformation.TransactionAmount = payment.Amount
      var response = plugin.refundFullAmountForTransaction(paymentInformation)
      var responseProcessor = new PaymentGatewayResponseProcessor(response)
      responseProcessor.processPaymentResponse()
    } else {
      _job.removeFromUpFrontPayments(payment)
    }
    reset()
  }

  property get AgentAmount() : MonetaryAmount {
    if (this.UpFrontPaymentMethod != UpFrontPaymentMethod.TC_AGENT) {
      return null
    }
    return this.Amount
  }

  property set AgentAmount(value : MonetaryAmount) {
    if (this.UpFrontPaymentMethod != UpFrontPaymentMethod.TC_AGENT) {
      return
    }
    this.Amount = value
  }
  property get CheckAmount() : MonetaryAmount {
    if (this.UpFrontPaymentMethod != UpFrontPaymentMethod.TC_CHECK) {
      return null
    }
    return this.Amount
  }

  property set CheckAmount(value : MonetaryAmount) {
    if (this.UpFrontPaymentMethod != UpFrontPaymentMethod.TC_CHECK) {
      return
    }
    this.Amount = value
  }

  property get CashAmount() : MonetaryAmount {
    if (this.UpFrontPaymentMethod != UpFrontPaymentMethod.TC_CASH) {
      return null
    }
    return this.Amount
  }

  property set CashAmount(value : MonetaryAmount) {
    if (this.UpFrontPaymentMethod != UpFrontPaymentMethod.TC_CASH) {
      return
    }
    this.Amount = value
  }

  property get ElectronicAmount() : MonetaryAmount {
    if (this.UpFrontPaymentMethod != UpFrontPaymentMethod.TC_ELECTRONIC) {
      return null
    }
    return this.Amount
  }

  property set ElectronicAmount(value : MonetaryAmount) {
    if (this.UpFrontPaymentMethod != UpFrontPaymentMethod.TC_ELECTRONIC) {
      return
    }
    this.Amount = value
  }

  private function reset() {
    _upFrontPaymentMethod = null
    _paymentInstrument = null
    _amount = null
    _reference = null
    updateSuggestedAmountToPay()
    if (PLDependencies.getNavigator() != null) {
      PebblesUtil.invalidateIterators(PLDependencies.getNavigator().getTopLocation(), typeof _job.UpFrontPayments)
    }
  }

  private function validate() {
    if (_amount == null or _amount.IsNegative or _amount.IsZero) {
      throw new DisplayableException(DisplayKey.get('Web.UpFrontPaymentDV.AmountCheck'))
    }
    if (_upFrontPaymentMethod == UpFrontPaymentMethod.TC_ELECTRONIC and _paymentInstrument == null) {
      throw new DisplayableException(DisplayKey.get('Web.UpFrontPaymentDV.PaymentInstrumentCheck'))
    }
    if (not _job.UpFrontPayments.allMatch(\payment -> payment.Amount.Currency == _amount.Currency)) {
      throw new DisplayableException(DisplayKey.get('Web.UpFrontPaymentDV.DifferentCurrencies'))
    }
  }

  /**
   * Trigger process for electronic payment creation.
   */
  @Param("billingStateContainer", "Current state of all object for open policy period")
  @Param("policyPeriod", "A policy period for which payment will be created")
  @Param("saveForFutureUse", "value of checkbox that indicates new payment instrument creation")
  function createElectronicPayment(billingStateContainer : PolicyPeriodBillingInstructionsManager,
                                   policyPeriod : PolicyPeriod,
                                   saveForFutureUse : boolean) {
    validate()

    var billingAccountNumber = billingStateContainer.BillingAccountNumber
    var amount = _amount
    var paymentInstrument = _paymentInstrument
    var paymentInformation = PaymentInformationHelper
        .createPaymentInformation(policyPeriod.Job, billingAccountNumber, policyPeriod, saveForFutureUse, paymentInstrument, amount)
    takeElectronicPayment(paymentInformation)

    reset()
  }

  /**
   * This method will call take payment with new or existing payment instrument
   * depending on payment instrument type chosen.
   */
  @Param("paymentInformation", "Payment information necessary for correct payment gateway call")
  function takeElectronicPayment(paymentInformation : PaymentInformation) {
    var plugin = Plugins.get(PaymentGatewayPlugin)
    var response : PaymentGatewayResponse
    if (paymentInformation.PaymentInstrument == OTHER_INSTRUMENT_TYPE) {
      if (PaymentGatewayConfig.RedirectToPaymentGateway) {
        response = plugin.requestSecureToken(paymentInformation)
      }
    } else {
      response = plugin.takePaymentUsingPaymentInstrument(paymentInformation)
    }
    var responseProcessor = new PaymentGatewayResponseProcessor(response, paymentInformation)
    if (response.IsApprovedTransaction) {
      responseProcessor.saveTransactionDetails()
      if (paymentInformation.PaymentInstrument == OTHER_INSTRUMENT_TYPE && PaymentGatewayConfig.RedirectToPaymentGateway) {
        plugin.redirectToPaymentGateway(response, paymentInformation)
      } else {
        responseProcessor.processPaymentResponse()
      }
    } else {
      responseProcessor.processPaymentResponse()
    }

  }

  /**
   * This method will check if there are unprocessed payment transactions.
   *
   * @param policyPeriod a policy period for which we should check pending transactions
   */
  function hasPendingPaymentGatewayTransactions(policyPeriod: PolicyPeriod) : boolean {
    return findTransactionsForPolicyPeriod(policyPeriod).HasElements
  }

  /**
   * This method will check if unprocessed transactions were approved
   * and create UpFrontPayment record if required.
   *
   * @param policyPeriod a policy period for which we should check pending transactions
   */
  function synchronizePendingPaymentGatewayTransactions(policyPeriod : PolicyPeriod) {
    try {
      var plugin = Plugins.get(PaymentGatewayPlugin)
      for (record in findTransactionsForPolicyPeriod(policyPeriod)) {
        var response = plugin.inquiryPaymentGatewayTransaction(record.Reference)
        try {
          new PaymentGatewayResponseProcessor(response).processSynchronizedPaymentResponse()
        } catch (e : IllegalArgumentException) {
          PCLoggerCategory.BILLING.warn(e.Message)
        }
      }
      addInfoMessageToLocation(DisplayKey.get("Web.UpFrontPaymentDV.SynchronizationSuccessful"))
    } catch (e : Exception) {
      PCLoggerCategory.BILLING.error(e.Message)
      throw new DisplayableException(DisplayKey.get("Web.UpFrontPaymentDV.SynchronizationUnsuccessful"))
    }
  }

  /**
   * This method finds all unprocessed transactions for given policy period.
   * @param policyPeriod a policy period
   * @return list of unprocessed transactions details
   */
  private function findTransactionsForPolicyPeriod(policyPeriod : PolicyPeriod) : IQueryBeanResult<PaymentGatewayTransaction> {
    return Query.make(entity.PaymentGatewayTransaction)
        .compare(PaymentGatewayTransaction#PolicyPeriod, Relop.Equals, policyPeriod)
        .select()
  }

  /**
   * Adds info message to location.
   * @param message a message to be added
   */
  private function addInfoMessageToLocation(message : String) {
    if (PLDependencies.getNavigator() != null) {
      LocationUtil.addRequestScopedInfoMessage(message)
    }
  }
}
