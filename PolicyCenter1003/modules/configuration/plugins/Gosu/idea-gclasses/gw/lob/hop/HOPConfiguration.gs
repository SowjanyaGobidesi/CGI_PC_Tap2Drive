package gw.lob.hop

uses gw.policy.PolicyLineConfiguration
uses gw.plugin.rateflow.IRateRoutineConfig
uses gw.lob.hop.rating.HOPRateRoutineConfig
uses gw.api.productmodel.PolicyLinePatternLookup

@Export
class HOPConfiguration extends PolicyLineConfiguration {

  override property get RateRoutineConfig(): IRateRoutineConfig {
    return new HOPRateRoutineConfig()
  }

  override property get AllowedCurrencies(): List<Currency> {
    var pattern = PolicyLinePatternLookup.getByPublicID(InstalledPolicyLine.TC_HOP.UnlocalizedName)
    return pattern.AvailableCurrenciesByPriority
  }

}
