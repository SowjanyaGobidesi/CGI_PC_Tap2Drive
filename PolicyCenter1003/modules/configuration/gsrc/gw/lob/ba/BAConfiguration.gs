package gw.lob.ba

uses gw.plugin.rateflow.IRateRoutineConfig
uses gw.policy.PolicyLineConfiguration
uses gw.api.productmodel.PolicyLinePatternLookup
uses java.util.List

@Export
class BAConfiguration extends PolicyLineConfiguration {

  override property get RateRoutineConfig(): IRateRoutineConfig {
    return null
  }

  override property get AllowedCurrencies(): List<Currency> {
    var pattern = PolicyLinePatternLookup.getByPublicID(InstalledPolicyLine.TC_BA.UnlocalizedName)
    return pattern.AvailableCurrenciesByPriority
  }
}