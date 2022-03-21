package gw.billing

/**
 * Defines enhancement for BillingInvoiceStream
 */
enhancement BillingInvoiceStreamEnhancement : entity.BillingInvoiceStream {
  
  property get Automatic() : boolean{
    return this.PaymentMethod != TC_RESPONSIVE
  }

  /**
   * Set default values based on the available automatic payment instruments defined for the invoice stream.
   */
  function setDefaultsWithAutomaticPayment() {
    var instrument = this.PolicyPeriod.AvailablePaymentInstruments.first()
    this.PaymentMethod = instrument.PaymentMethod
    this.PaymentInstrumentID = instrument.PublicID
  }
}
