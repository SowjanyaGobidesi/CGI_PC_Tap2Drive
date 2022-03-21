package gw.payment.paymentgateway.impl

uses gw.api.payment.paymentgateway.PaymentInstrumentDetails

/**
 * Credit card details class.
 */
@Export
class TokenizedCreditCardDetails implements PaymentInstrumentDetails {

  private var _cardName : String as CardName
  private var _token : String as Token

}