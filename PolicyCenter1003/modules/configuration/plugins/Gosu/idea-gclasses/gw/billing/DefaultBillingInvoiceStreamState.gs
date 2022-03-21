package gw.billing

uses gw.plugin.billing.PaymentPlanData

/**
 *
 */
@Export
class DefaultBillingInvoiceStreamState extends AbstractInvoiceStreamState {

  protected construct(parent : InvoiceStreamStateContainerImpl) {
    super(parent)
  }

  override property get InvoicingMethod() : InvoicingMethod {
    return TC_DEFAULTBILLING
  }

  override function updateInvoiceStreamAccordingToPaymentPlan(plan: PaymentPlanData) {
    // Note that we are not updating InvoiceStreamInterval here because it is not used for DefaultBillingInvoiceStreamState.
  }

  override protected function resetInvoiceStreamsAndPaymentInstruments() {
    clearInvoiceStreamState()
  }
}