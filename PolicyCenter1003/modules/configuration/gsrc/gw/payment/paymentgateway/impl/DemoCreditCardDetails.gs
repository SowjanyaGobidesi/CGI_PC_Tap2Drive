package gw.payment.paymentgateway.impl

uses gw.api.payment.paymentgateway.PaymentInstrumentDetails

/**
 * Demo credit card value object.
 */
@Export
class DemoCreditCardDetails implements PaymentInstrumentDetails {

  private var _number : String as Number
  private var _expiryMonth : String  as ExpiryMonth
  private var _expiryYear : String as ExpiryYear
  private var _cVV : String as CVV
  private var _addressLine1 : String as AddressLine1
  private var _addressLine2 : String as AddressLine2
  private var _country : Country as Country

}