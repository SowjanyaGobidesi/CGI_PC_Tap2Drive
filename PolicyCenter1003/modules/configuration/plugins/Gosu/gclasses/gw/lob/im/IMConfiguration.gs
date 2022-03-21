package gw.lob.im

uses gw.plugin.rateflow.IRateRoutineConfig
uses gw.policy.PolicyLineConfiguration
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.productmodel.PolicyLinePatternLookup
uses java.util.List

@Export
class IMConfiguration extends PolicyLineConfiguration {

  override property get RateRoutineConfig(): IRateRoutineConfig {
    return null
  }

  override property get AllowedCurrencies(): List<Currency> {
    var pattern = PolicyLinePatternLookup.getByPublicID(InstalledPolicyLine.TC_IM.UnlocalizedName)
    return pattern.AvailableCurrenciesByPriority
  }
}