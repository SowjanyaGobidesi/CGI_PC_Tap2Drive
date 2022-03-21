package gw.billing

@Export
class InvoiceStreamStateFactory {

  static function createInvoiceStreamState(parent : InvoiceStreamStateContainerImpl, invoicingMethod : InvoicingMethod)
      : AbstractInvoiceStreamState {
    switch (invoicingMethod) {
      case TC_CUSTOMBILLING:
        return new CustomBillingInvoiceStreamState(parent)
      case TC_OVERRIDDENINVOICESTREAM:
        return new OverriddenInvoiceStreamState(parent)
      default:
        return new DefaultBillingInvoiceStreamState(parent)
    }
  }

}