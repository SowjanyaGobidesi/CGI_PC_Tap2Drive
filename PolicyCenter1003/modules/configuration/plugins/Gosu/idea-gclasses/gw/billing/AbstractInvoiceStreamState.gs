package gw.billing

uses gw.plugin.billing.BillingInvoiceStreamInfo
uses gw.plugin.billing.BillingPaymentInstrument
uses gw.plugin.billing.PaymentPlanData

/**
 * This class provides the common implementation and interface for InvoiceStreamStateContainer
 */
@Export
abstract class AbstractInvoiceStreamState implements InvoiceStreamStateContainer {
  var _container : InvoiceStreamStateContainerImpl as Container
  var _invoiceStreamCode : String as InvoiceStreamCode
  var _invoiceStreamInterval : BillingPeriodicity as InvoiceStreamInterval
  var _invoiceStreamAutomatic : boolean as Automatic
  var _unappliedFundID : String as UnappliedFundID
  var _accountUnapplied : boolean as AccountUnapplied
  var _unappliedFundDescription : String as UnappliedFundDescription
  var _paymentInstrument : BillingPaymentInstrument as PaymentInstrument
  var _paymentInstruments : BillingPaymentInstrument[] as PaymentInstruments
  var _dueDateBilling : Boolean as DueDateBilling
  var _firstDayOfMonth : Integer as FirstDayOfMonth
  var _secondDayOfMonth : Integer as SecondDayOfMonth
  var _dayOfWeek : DayOfWeek as DayOfWeek
  var _firstAnchorDate : Date as FirstAnchorDate
  var _description : String as Description

  var _invoiceStreams : BillingInvoiceStreamInfo[] as InvoiceStreams
  var _newInvoicing : boolean as NewInvoicing

  protected construct(parent : InvoiceStreamStateContainerImpl) {
    _container = parent
  }

  static function createInvoiceStreamState(parent : InvoiceStreamStateContainerImpl, streamStateType : InvoicingMethod) : AbstractInvoiceStreamState{
    var result = InvoiceStreamStateFactory.createInvoiceStreamState(parent, streamStateType)
    result.clearInvoiceStreamState()
    return result
  }

  function populateFromPolicyPeriod(period: PolicyPeriod) {
    // do nothing
  }

  function validate() {

  }

  function saveStateToPolicyPeriod(period : PolicyPeriod) {
    period.InvoicingMethod = InvoicingMethod
    period.InvoiceStreamCode = InvoiceStreamCode
  }


  override property get NewInvoicing() : boolean {
    return _newInvoicing and Container.AllowNewInvoicing
  }


  property set Automatic(value : boolean) {
    _invoiceStreamAutomatic = value
    if (Automatic) {
      var instrument = Container.retrieveAvailablePaymentInstruments().first()
      PaymentInstrument = instrument
      Container.invalidatePCFElementIterators(BillingPaymentInstrument)
    } else {
      PaymentInstrument = null
    }
  }

  override property set CustomBilling(isCustom : boolean) {
    if (isCustom != CustomBilling) {
      var invoicingMethod : InvoicingMethod = isCustom
          ? TC_CUSTOMBILLING
          : (OverriddenInvoiceStream ? InvoicingMethod.TC_OVERRIDDENINVOICESTREAM : TC_DEFAULTBILLING)
      Container.selectInvoiceStreamState(invoicingMethod)
    }
  }

  property get CustomBilling() : boolean {
    return InvoicingMethod == TC_CUSTOMBILLING
  }

  override property set OverriddenInvoiceStream(isOverridden : boolean) {
    if (isOverridden != OverriddenInvoiceStream) {
      var invoicingMethod : InvoicingMethod = isOverridden
          ? TC_OVERRIDDENINVOICESTREAM
          : (CustomBilling ? InvoicingMethod.TC_CUSTOMBILLING: TC_DEFAULTBILLING)
      Container.selectInvoiceStreamState(invoicingMethod)
    }
  }

  property get OverriddenInvoiceStream() : boolean {
    return InvoicingMethod == TC_OVERRIDDENINVOICESTREAM
  }

  function updateInvoicingMethodType(type : InvoicingMethod) {
    if (type == InvoicingMethod) {
      return
    }
    Container.selectInvoiceStreamState(type)
  }

  property get InvoiceStream() : BillingInvoiceStreamInfo {
    return InvoiceStreams == null
        ? null
        : InvoiceStreams.firstWhere(\elt -> elt.PublicID == InvoiceStreamCode)
  }

  protected property get Container() : InvoiceStreamStateContainerImpl {
    return _container
  }

  /**
   * Resets the state back to default values
   */
  function clearInvoiceStreamState() {
    _invoiceStreamCode = null
    _invoiceStreamInterval = BillingPeriodicity.TC_MONTHLY
    _invoiceStreamAutomatic = true
    _newInvoicing = true
    clearNewInvoicingAttributes()
  }

  /**
   * Resets the state back to default values
   */
  protected function clearNewInvoicingAttributes() {
    _unappliedFundID = null
    _unappliedFundDescription = null
    clearInvoiceStreamOverridesAttributes()
  }

  /**
   * Resets the state back to default values
   */
  function clearInvoiceStreamOverridesAttributes() {
    _dueDateBilling = null
    _firstDayOfMonth = null
    _secondDayOfMonth = null
    _dayOfWeek = null
    _firstAnchorDate = null
    _description = null
    _paymentInstrument = null
  }

  abstract function updateInvoiceStreamAccordingToPaymentPlan(plan : PaymentPlanData)
  protected abstract function resetInvoiceStreamsAndPaymentInstruments()

  property get PaymentDateVisible() : boolean{
    return not (DayOfWeekVisible or FirstDayOfMonthVisible)
  }

  property get DayOfWeekVisible() : boolean{
    return InvoiceStreamInterval == BillingPeriodicity.TC_EVERYWEEK
  }

  property get FirstDayOfMonthVisible() : boolean{
    return InvoiceStreamInterval == BillingPeriodicity.TC_MONTHLY or InvoiceStreamInterval == BillingPeriodicity.TC_TWICEPERMONTH
  }

  property get SecondDayOfMonthVisible() : boolean{
    return InvoiceStreamInterval == BillingPeriodicity.TC_TWICEPERMONTH
  }
}