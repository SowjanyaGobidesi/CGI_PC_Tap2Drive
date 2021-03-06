package gw.plugin.billing.bc1000

uses gw.plugin.billing.BillingPaymentInfo
uses gw.plugin.billing.BillingUtilityMethods
uses wsi.remote.gw.webservice.bc.bc1000.billingsummaryapi.types.complex.AccountBillingSettings

/**
* Implementation of the BillingPaymentInfo interface that is used to set/get
* Billing Methods.
*
 */

@Export
class BCAccountBillingSettingsWrapper implements BillingPaymentInfo {

  var _invoiceDeliveryMethod : InvoiceDeliveryMethod as InvoiceDeliveryMethod
  var _paymentMethod : AccountPaymentMethod as PaymentMethod

  construct(soapObject : AccountBillingSettings) {
    _invoiceDeliveryMethod = InvoiceDeliveryMethod.get(soapObject.InvoiceDeliveryMethod)
    var paymentMethod = soapObject.PaymentInstrumentRecord.PaymentMethod.GosuValue
    _paymentMethod = BillingUtilityMethods.convertPaymentMethodToAccountPaymentMethod(paymentMethod)

  }

  /**
   * Set the delivery method for an invoice
   */
  override property set InvoiceDeliveryMethod(value : InvoiceDeliveryMethod) {
    _invoiceDeliveryMethod = InvoiceDeliveryMethod.get(value.Code)
  }

  /**
   * Set the payment method
   *
   * @param value The Account Payment Method type
   */
  override property set PaymentMethod(value : AccountPaymentMethod) {
    _paymentMethod = AccountPaymentMethod.get(value.Code)
  }
}
