package gw.rating.flow.domain

uses gw.api.rating.flow.ValidateSetByRateflow
uses gw.api.rating.flow.VisibleInRateflow
uses gw.plugin.rateflow.ICostDataWrapper
uses gw.rating.CostData

uses java.lang.Integer
uses java.math.BigDecimal
uses java.math.RoundingMode

@Export
class CalcRoutineCostData implements ICostDataWrapper {

  protected var _costData : CostData
  protected var _defaultRoundingMode : RoundingMode
  protected var _defaultRoundingLevel : Integer

  construct(costData : CostData, defaultRoundingLevel : Integer, defaultRoundingMode : RoundingMode) {
    _costData = costData
    _defaultRoundingMode = defaultRoundingMode
    _defaultRoundingLevel = defaultRoundingLevel
  }

  property get ProrationMethod()  : ProrationMethod {
    return _costData.ProrationMethod
  }

  property set ProrationMethod(method : ProrationMethod) {
    _costData.ProrationMethod = method
  }

  override property get BaseRate() : BigDecimal {
    return _costData.StandardBaseRate
  }

  @ValidateSetByRateflow
  override property set BaseRate(rate : BigDecimal) {
    _costData.StandardBaseRate = rate
  }

  override property get AdjustedRate() : BigDecimal {
    return _costData.StandardAdjRate
  }

  @ValidateSetByRateflow
  override property set AdjustedRate(rate : BigDecimal) {
    _costData.StandardAdjRate = rate
  }

  override property get TermAmount() : BigDecimal {
    return _costData.StandardTermAmount
  }

  @ValidateSetByRateflow
  override property set TermAmount(value : BigDecimal) {
    _costData.StandardTermAmount = value.setScale(RoundingLevelToUse, RoundingModeToUse)
  }

  override property get Basis() : BigDecimal {
    return _costData.Basis
  }

  @ValidateSetByRateflow(false) // We do not require this to be set
  override property set Basis(value : BigDecimal) {
    _costData.Basis = value
  }

  @VisibleInRateflow(false)
  override function setRounding(level : Integer, mode : RoundingMode) {
    _costData.RoundingLevel = level
    _costData.RoundingMode = mode
  }

  @VisibleInRateflow(false)
  property get RoundingModeToUse() : RoundingMode {
    return _costData.RoundingMode ?: _defaultRoundingMode
  }

  @VisibleInRateflow(false)
  property get RoundingLevelToUse() : Integer {
    return _costData.RoundingLevel ?: _defaultRoundingLevel
  }
}
