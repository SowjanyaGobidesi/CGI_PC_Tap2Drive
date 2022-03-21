package gw.lob.cp.rating
uses gw.pc.rating.flow.util.InScopeUsageBase
uses gw.plugin.rateflow.IRateRoutineConfig
uses gw.plugin.rateflow.ICostDataWrapper
uses java.math.RoundingMode
uses java.lang.Integer
uses gw.plugin.rateflow.CostDataBase
uses gw.lang.reflect.IType
uses gw.rating.flow.domain.CalcRoutineCostDataWithTermOverride
uses gw.rating.CostDataWithOverrideSupport
uses gw.rating.flow.domain.CalcRoutineCostDataWithAmountOverride
uses gw.lang.reflect.IPropertyInfo
uses gw.pc.rating.flow.AvailableCoverageWrapper
uses gw.api.productmodel.CoveragePattern
uses gw.api.system.PCDependenciesGateway
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.locale.DisplayKey
uses java.util.List
uses gw.api.upgrade.PCCoercions
uses gw.rating.flow.util.ItemFilter

@Export
class CPRateRoutineConfig implements IRateRoutineConfig {

  // no-args constructor required
  construct() { }

  override function getCostDataWrapperType(paramSet : CalcRoutineParameterSet) : IType {
     return CalcRoutineCostDataWithTermOverride
  }

  override function makeCostDataWrapper(
          paramSet : CalcRoutineParameterSet, 
          costData : CostDataBase, 
          defaultRoundingLevel : Integer, 
          defaultRoundingMode : RoundingMode) : ICostDataWrapper {  

    return new CalcRoutineCostDataWithTermOverride(costData as CostDataWithOverrideSupport, 
            CalcRoutineCostDataWithAmountOverride.OverrideMode.APPROXIMATE_STANDARD_RATES,
            defaultRoundingLevel,
            defaultRoundingMode)
  }

  override function worksheetsEnabledForLine(p0: String): boolean {
    return true
  }

  override function includeProperty(policyLinePatternCode: String, prop: IPropertyInfo): Boolean {
    return null
  }

  override function getCoverageWrappersForLine(linePatternCode: String): AvailableCoverageWrapper[] {
    return {new AvailableCoverageWrapper () {
      override property get AcceptsCoverages() : List<CoveragePattern> {
        var clauses = PCDependenciesGateway.getClausePatternsForPolicyLinePattern(PCCoercions.makeProductModel<PolicyLinePattern>(linePatternCode))
        var patterns = {"CPBPPCov", "CPBldgCov"}.toSet()
        return clauses.where( \ c -> c typeis CoveragePattern && patterns.contains(c.PublicID)).cast(CoveragePattern)
      }

      override property get WrapperType() : IType {
        return gw.lob.cp.rating.CPCoverageWrapper
      }

      override property get Name() : String {
        return DisplayKey.get("Web.Rating.CP.CoverageWrapper")
      }

    }}

  }

  override function filterIrrelevantItems(input: List<InScopeUsageBase>, policyLinePatternCode: String): List<InScopeUsageBase> {
    return ItemFilter.applyDefaultFilters(input)
  }

}
