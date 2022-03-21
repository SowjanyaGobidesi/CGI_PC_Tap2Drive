package gw.billing

enhancement InvoiceStreamOverridesEnhancement : InvoiceStreamOverrides {

  /**
   * Clear stale override values, setting them to null. This is used in {@link gw.job.JobProcess#setPaymentInfoWithNewQuote}
   * to reset override fields that should be cleared after a quote. This will stop stale values from being sent
   * to the billing system.
   */
  function clearStaleValues() {
    this.DueDateBilling = null
    this.LeadTimeDayCount = null
    this.FirstDayOfMonth = null
    this.SecondDayOfMonth = null
    this.DayOfWeek = null
    this.AnchorDate = null
    this.Description = null
    this.PaymentInstrumentID = null
  }
}
