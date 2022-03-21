package gw.billing

/**
 * Defines enhancements for UpFrontPayment.
 */
enhancement UpFrontPayment: UpFrontPayment {

  property get PaymentInstrumentOrMethodName() : String {
    return this.PaymentInstrument != null ? this.PaymentInstrument.toString() : this.PaymentMethod.DisplayName
  }
}
