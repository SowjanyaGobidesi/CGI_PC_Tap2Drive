package gw.plugin.billing

enhancement BillingInvoiceStreamInfoEnhancement : gw.plugin.billing.BillingInvoiceStreamInfo {

  /**
   * Returns true if this billing invoice stream is compatible for the given payment plan.
   */
  function isCompatibleWith(paymentPlan : PaymentPlanData) : boolean {
    if (this.PaymentMethod == AccountPaymentMethod.TC_UNSUPPORTED) {
      return false
    }

    if (paymentPlan == null) {
      return true
    }

    var validInterval = this.Interval == paymentPlan.PaymentFrequency
    var validPaymentMethod = paymentPlan.AllowedPaymentMethods.contains(TC_RESPONSIVE) or (this.PaymentMethod != TC_RESPONSIVE)
    return (validInterval and validPaymentMethod)
  }

}
