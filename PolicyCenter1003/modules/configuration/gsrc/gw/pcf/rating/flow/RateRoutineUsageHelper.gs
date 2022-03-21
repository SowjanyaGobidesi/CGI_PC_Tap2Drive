package gw.pcf.rating.flow

uses gw.api.locale.DisplayKey

@Export
class RateRoutineUsageHelper {

  private static function isConditionalSubOperand(aValueDelegate: CalcStepValueDelegate): boolean {
    return aValueDelegate typeis CalcStepDefinitionOperand and aValueDelegate.OperandOrder != 0
  }

  static function getValueDelegateUsage(aValueDelegate: CalcStepValueDelegate): String {
    if (isConditionalSubOperand(aValueDelegate))
      return DisplayKey.get("Web.Rating.Flow.CalcRoutine.Usage.ConditionalOperand")
    return (aValueDelegate typeis CalcStepDefinitionOperand)? DisplayKey.get("Web.Rating.Flow.CalcRoutine.Usage.Operand") : DisplayKey.get("Web.Rating.Flow.CalcRoutine.Usage.Argument")
  }  
}