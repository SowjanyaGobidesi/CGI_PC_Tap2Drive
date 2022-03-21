package gw.lob.bop

uses gw.plugin.rateflow.IRateRoutineConfig
uses gw.policy.PolicyLineConfiguration
uses gw.api.productmodel.PolicyLinePatternLookup
uses java.util.List

@Export
class BOPConfiguration extends PolicyLineConfiguration {

  override property get RateRoutineConfig(): IRateRoutineConfig {
    return null
  }

  override property get AllowedCurrencies(): List<Currency> {
    var pattern = PolicyLinePatternLookup.getByPublicID(InstalledPolicyLine.TC_BOP.UnlocalizedName)
    return pattern.AvailableCurrenciesByPriority
  }
}