package gw.quoting

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.command.critical.Constants
uses gw.command.critical.SamplePolicyGenerator
uses gw.quoting.impl.DefaultQuotingFactory
uses gw.command.Argument

/**
 */
enhancement QuotingPolicyEnhancement : gw.command.critical.Policy {

  @Argument("PolicyLine", Constants.POLICY_TYPES)
  function wQuoteHVQ() : PolicyPeriod {
    var policyLine = this.getArgumentAsString("PolicyLine")
    var period = draftHVQPeriod(policyLine)
    var quoteKey = new DefaultQuotingFactory().createQuoteDataManager().generateAndExportQuote(period)
    PCLoggerCategory.QUOTING.info("Generated Quote: " + quoteKey)
    // If the UI is already on the HVQSearch page, we need to go to another page and come back so it is refreshed.
    pcf.PolicySearch.go()
    pcf.HVQSearch.go(quoteKey)
    return period
  }

  function draftHVQPeriod(policyLine : String) : PolicyPeriod {
    var period: PolicyPeriod
    switch ((policyLine ?: "pa").toLowerCase()) {
      case "pa":
        period = SamplePolicyGenerator.wHVQuote()
        break
      default:
        throw new DisplayableException(DisplayKey.get("Quoting.RunCommand.UnsupportedPolicyLine", policyLine))
    }
    return period
  }
}

