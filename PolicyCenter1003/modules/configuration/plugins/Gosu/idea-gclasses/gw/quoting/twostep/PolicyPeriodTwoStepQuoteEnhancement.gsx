package gw.quoting.twostep

enhancement PolicyPeriodTwoStepQuoteEnhancement: entity.PolicyPeriod  {

  /**
   * Returns whether two-step quoting is available for this policy period
   */
  property get TwoStepQuotingAvailable() : boolean {
    return this.Lines.allMatch(\line -> line.TwoStepQuotingAvailable) and this.JobProcess.TwoStepQuotingAvailable
  }
}
