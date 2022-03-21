package gw.billing

uses gw.api.util.LocationUtil
uses gw.billing.caching.BillingInvoiceStreamsCache
uses gw.billing.caching.BillingPaymentInstrumentsCache
uses gw.lang.reflect.IType
uses gw.plugin.billing.BillingInvoiceStreamInfo
uses gw.plugin.billing.BillingPaymentInstrument
uses gw.api.locale.DisplayKey
uses gw.plugin.billing.BillingUnappliedFundInfo
uses gw.plugin.billing.PaymentPlanData

@Export
class InvoiceStreamStateContainerImpl implements InvoiceStreamStateContainer {
  var _container : PolicyPeriodBillingInstructionsManager
  delegate _invoiceStreamState : AbstractInvoiceStreamState represents InvoiceStreamStateContainer
  var _invoiceStreamCache : BillingInvoiceStreamsCache
  var _paymentInstrumentsCache : BillingPaymentInstrumentsCache

  property get UnappliedFunds() : BillingUnappliedFundInfo[] {
    return _container.UnappliedFunds
  }

  construct(container : PolicyPeriodBillingInstructionsManager) {
    _invoiceStreamState = AbstractInvoiceStreamState.createInvoiceStreamState(this, container.PeriodInternal.InvoicingMethod)
    _container = container
    _invoiceStreamCache = new BillingInvoiceStreamsCache()
    _invoiceStreamCache.setExpireAfterRead(5)
    _paymentInstrumentsCache = new BillingPaymentInstrumentsCache()
    _paymentInstrumentsCache.setExpireAfterRead(5)
  }

  final function populateFromPolicyPeriod(period : PolicyPeriod) {
    _invoiceStreamState = AbstractInvoiceStreamState.createInvoiceStreamState(this, period.InvoicingMethod)
    _invoiceStreamState.populateFromPolicyPeriod(period)
  }

  protected function selectInvoiceStreamState(invoicingMethod : InvoicingMethod) {
    updateInvoiceStreamState(invoicingMethod)
    resetInvoiceStreamsAndPaymentInstruments()
  }

  private function updateInvoiceStreamState(invoicingMethod : InvoicingMethod) {
    if (invoicingMethod != InvoicingMethod) {
      _invoiceStreamState = AbstractInvoiceStreamState.createInvoiceStreamState(this, invoicingMethod)
    }
  }

  private property get InvoiceStreamsCache() : BillingInvoiceStreamsCache {
    if (!_container.UseCaches) {
      invalidateCaches()
    }
    return _invoiceStreamCache
  }

  private property get PaymentInstrumentsCache() : BillingPaymentInstrumentsCache {
    if (!_container.UseCaches) {
      invalidateCaches()
    }
    return _paymentInstrumentsCache
  }

  function invalidateCaches() {
    _invoiceStreamCache.invalidate()
    _paymentInstrumentsCache.invalidate()
  }

  final function saveStateToPolicyPeriod(period : PolicyPeriod) {
    _invoiceStreamState.saveStateToPolicyPeriod(period)
  }

  function validate() {
    _invoiceStreamState.validate()
  }

  private function clearNewInvoicingAttributes() {
    _invoiceStreamState.clearNewInvoicingAttributes()
    AccountUnapplied = false
  }

  function resetInvoiceStreamsAndPaymentInstruments() {
    _invoiceStreamState.resetInvoiceStreamsAndPaymentInstruments()
  }

  function updateInvoiceStreamAccordingToPaymentPlan(plan : PaymentPlanData) {
    _invoiceStreamState.updateInvoiceStreamAccordingToPaymentPlan(plan)
  }

  property get NewUnappliedFund() : boolean {
    return !AccountUnapplied and UnappliedFundID == null
  }

  property set NewUnappliedFund(setTo : boolean) {
    if (setTo) {
      clearUnappliedFund()
    } else {
      initializeUnappliedFund()
    }
  }

  private function clearUnappliedFund() {
    AccountUnapplied = false
    UnappliedFundID = null
  }

  private function initializeUnappliedFund() {
    if (UnappliedFunds.IsEmpty) {
      AccountUnapplied = true
      UnappliedFundID = null
      UnappliedFundDescription = null
    } else {
      UnappliedFundID = UnappliedFunds.first().PublicID
    }
  }

  function invoicingOptionChanged() {
    InvoiceStreamCode = null
    clearNewInvoicingAttributes()
    if (NewInvoicing) {
      PaymentInstrument = PaymentInstruments.first()
    }
    else {
      if (!InvoiceStreams.IsEmpty) {
        InvoiceStreamCode = InvoiceStreams.first().PublicID
      }
    }
    if (OverriddenInvoiceStream) {
      PaymentInstrument = PaymentInstruments.first()
    }
  }

  property get DisplayAccountUnappliedOrExisting() : String {
    return UnappliedFunds.IsEmpty ? DisplayKey.get("Web.Policy.Payment.AccountUnapplied") : DisplayKey.get("Web.Policy.Payment.Existing")
  }


  function retrieveAvailableInvoiceStreams() : BillingInvoiceStreamInfo[] {
    if (BillingAccountNumber.isEmpty()) {
      return {}
    }

    try {
      return InvoiceStreamsCache.getInvoiceStreams(BillingAccountNumber, PreferredSettlementCurrency, PaymentPlanChoice)
    } catch (e : Exception) {
      LocationUtil.addRequestScopedErrorMessage(DisplayKey.get("Web.BillingAdjustmentsDV.Error.RetrieveInvoiceStreams"))
      return {}
    }
  }

  /**
   * Return an array of available payment instruments from BC. It also updates the selected payment instrument
   * if it doesn't exist anymore in BC or it was never selected because there was none available.
   *
   * @return An array of available PaymentInstruments
   */
  function refreshPaymentInstrumentValues() : BillingPaymentInstrument[] {
    var availablePaymentInstruments = retrieveAvailablePaymentInstruments()
    // If the currently selected payment instrument is not available anymore, select the first payment instrument
    // in the list.
    if (availablePaymentInstruments.firstWhere(\pi -> pi.PublicID == PaymentInstrument.PublicID) == null) {
      PaymentInstrument = availablePaymentInstruments.first()
    }
    return availablePaymentInstruments
  }

  protected function retrieveAvailablePaymentInstruments() : BillingPaymentInstrument[] {
    if (BillingAccountNumber.isEmpty()) {
      return {}
    }
    try {
      var allInstruments = PaymentInstrumentsCache.getExistingPaymentInstruments(BillingAccountNumber, PreferredSettlementCurrency).cast(BillingPaymentInstrument)
      return allInstruments.where(\b -> b.PaymentMethod == TC_ACH || b.PaymentMethod == TC_CREDITCARD)
    } catch(e : java.lang.Exception) {
      LocationUtil.addRequestScopedErrorMessage(DisplayKey.get("Web.BillingAdjustmentsDV.Error.RetrievePaymentInstruments"))
      return {}
    }
  }

  private property get BillingAccountNumber() : String {
    return _container.BillingAccountNumber
  }
  private property get PreferredSettlementCurrency() : Currency {
    return _container.PreferredSettlementCurrency
  }

  protected property get PaymentPlanChoice() : PaymentPlanData {
    return _container.PaymentPlanChoice
  }
  protected property get AllowNewInvoicing() : boolean {
    return _container.AllowNewInvoicing
  }

  protected property get AllowOverriddenInvoiceStream() : boolean {
    return _container.AllowOverriddenInvoiceStream
  }

  protected property get AllowResponsive() : boolean {
    return _container.AllowResponsive
  }

  protected function invalidatePCFElementIterators(iType : IType) {
    _container.invalidatePCFElementIterators(iType)
  }
}