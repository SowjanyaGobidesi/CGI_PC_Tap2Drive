package gw.pcf.rating.flow

uses com.google.common.collect.ImmutableSet
uses gw.api.web.PebblesUtil
uses gw.pcf.rating.rateroutine.RateRoutineInstructionUIHelper
uses gw.rating.flow.util.InScopeUsage
uses gw.rating.flow.util.RatingEntityGraphTraverser

@Export
class RateRoutineEntityInstructionPopupHelper {

  final private var _step: CalcStepDefinition
  final private var _currentLocation : pcf.RateRoutineEntityInstructionPopup
  final private var _restrictToTargetDataTypes : ImmutableSet<Type>

  construct(currentLocation : pcf.RateRoutineEntityInstructionPopup, step: CalcStepDefinition, restrictToTargetDataTypes : Set<Type>) {
    _currentLocation = currentLocation
    _step = step
    _restrictToTargetDataTypes = restrictToTargetDataTypes == null ? ImmutableSet.of<Type>() : ImmutableSet.copyOf(restrictToTargetDataTypes)
  }

  function filterInScopeParamDropDownRange(valueToFilter : typekey.CalcRoutineParamName) : boolean {
    return RateRoutinePullRightMenuHelper.filterInScopeParam(_step.CalcRoutineDefinition.ParameterSet,valueToFilter)
  }

  function calculateInScopeUsages(selectedEntity : CalcRoutineParamName, textFilter : String) : List<InScopeUsage> {
    if (selectedEntity != null) {
      new RateRoutineInstructionUIHelper(_step).resetStepAndSetDefaultOperatorType()
      _step.InScopeParam = selectedEntity;
    }
    return loadAllTargetElements(textFilter)
  }

  function noneSelected(): boolean {
    //InScopeValue itself can be null (i.e. when it is the selected entity "(this)") therefore check for InScopeValueType
    return _step.InScopeValue == null
  }

  function changeSelectEntityTo( selectedEntity : CalcRoutineParamName  ) : List<InScopeUsage>{
    _step.InScopeValue = null
    _step.InScopeParam = selectedEntity;
    PebblesUtil.invalidateIterators(_currentLocation, InScopeUsage)
    return calculateInScopeUsages(null, null)
  }


  private function loadAllTargetElements(textFilter : String) : List<InScopeUsage> {
    var selectedParamName = _step.InScopeParam
    if (selectedParamName == null or selectedParamName == TC_COSTDATA) {
      return {}
    }
    var paramSet = _step.CalcRoutineDefinition.ParameterSet
    var selectedParam = paramSet.Parameters.singleWhere(\ c -> c.Code == selectedParamName)
    var usages = new RatingEntityGraphTraverser(paramSet).getWritableTargetElementsForParameter(selectedParam).stream()
    return RateRoutineEntityPopupHelper.filterInScopeUsages(usages, _restrictToTargetDataTypes, false, textFilter)
  }

  function commitEntitySelection() {
    _currentLocation.commit()
  }

  static function afterEnterEntityPopup(selectedEntity: CalcRoutineParamName,
                                        inScopeUsages: List<gw.rating.flow.util.InScopeUsage>) {
    if (selectedEntity != null) {
      inScopeUsages.clear()
    }
  }

  static function showEntityPopupMenu(inScopeParameter: CalcRoutineParameter,
                                      step: CalcStepDefinition): boolean {
    return inScopeParameter.Code != CalcRoutineParamName.TC_COSTDATA &&
        (numUsages(inScopeParameter, step) > RateRoutinePullRightMenuHelper.PopUpThreshold)
  }

  private static function numUsages(inScopeParameter: CalcRoutineParameter,
                                    step: CalcStepDefinition): int {
    var paramSet = step.CalcRoutineDefinition.ParameterSet
    var usages = new RatingEntityGraphTraverser(paramSet).getTargetableElementsForWritableParameterSet(paramSet)
    return usages.getOrDefault(inScopeParameter.Code, Collections.emptyList()).size()
  }

  static function showEntityPullRightMenu(inScopeParameter : CalcRoutineParameter,
                                          step: CalcStepDefinition) : boolean {
    if (inScopeParameter.Code == TC_COSTDATA){
      return true
    }
    var numInScopeUsages = numUsages(inScopeParameter, step)
    return (numInScopeUsages > 0) && (numInScopeUsages <= RateRoutinePullRightMenuHelper.PopUpThreshold)
  }

}
