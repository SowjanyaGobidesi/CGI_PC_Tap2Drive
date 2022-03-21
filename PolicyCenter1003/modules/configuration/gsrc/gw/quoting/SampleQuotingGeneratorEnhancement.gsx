package gw.quoting

uses gw.command.critical.SamplePolicyGenerator

/**
 */
@Export
enhancement SampleQuotingGeneratorEnhancement: SamplePolicyGenerator {

  static function wHVQuote() : PolicyPeriod {
    return QuotingSampleDataUtil.createPAPolicyPeriod(DRAFT, false)
  }
}
