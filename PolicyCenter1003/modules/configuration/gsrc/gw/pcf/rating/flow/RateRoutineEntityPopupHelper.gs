package gw.pcf.rating.flow

uses java.util.Map
uses java.util.LinkedHashMap
uses gw.rating.flow.util.InScopeUsage
uses gw.api.web.PebblesUtil
uses com.guidewire.pl.system.filters.BeanBasedQueryFilter
uses gw.lang.reflect.IType
uses gw.rating.flow.util.TypeMaps
uses gw.rating.flow.util.RatingEntityGraphTraverser
uses java.util.Set
uses gw.rating.flow.LocalVariable
uses org.apache.commons.lang3.ObjectUtils

uses java.util.List
uses java.util.function.Predicate
uses java.util.stream.Collectors
uses java.util.stream.Stream

@Export
class RateRoutineEntityPopupHelper {

  private var _tabCodeNameMap : Map<String, String>
  private var _allPreviousVariableNames : List<LocalVariable>
  private var _valueDelegate : CalcStepValueDelegate
  private var _step : CalcStepDefinition
  private var _restrictToTargetDataTypes : Set<IType>
  private var _currentLocation : pcf.RateRoutineEntityPopup

  construct(currentLocation : pcf.RateRoutineEntityPopup, valueDelegate : CalcStepValueDelegate, step : CalcStepDefinition, restrictToTargetDataTypes : Set<IType>) {
    _currentLocation = currentLocation
    _step = step
    _valueDelegate = valueDelegate
    _restrictToTargetDataTypes = restrictToTargetDataTypes
  }

  function filterInScopeParamDropDownRange(valueToFilter : typekey.CalcRoutineParamName) : boolean {
    return RateRoutinePullRightMenuHelper.filterInScopeParam(_step.CalcRoutineDefinition.ParameterSet, valueToFilter)
  }

  function parseRateTables() : Map<String, String> {
    if (_tabCodeNameMap != null) {
      return _tabCodeNameMap
    }
    _tabCodeNameMap = new LinkedHashMap<String, String>()
    var rTables = _step.CalcRoutineDefinition.availableTables()
    if (rTables.Count > 0) {
      rTables.each(\rt -> _tabCodeNameMap.put(rt.TableCode, rt.TableName))
    }
    return _tabCodeNameMap
  }

  function getAllPreviousVariableName() : List<LocalVariable> {
    if (_allPreviousVariableNames != null) {
      return _allPreviousVariableNames
    }
    _allPreviousVariableNames = _step.getAllExistingVariableNames(false)
    return _allPreviousVariableNames
  }

  //Deprecated in PC 9.0.5 to rename.
  //Use #calcualteInScopeUsages(boolean, CalcRoutineParmaName):List<InScopeUsage> instead
  @java.lang.Deprecated
  function fetchInScopeUsages(limitedToModifier : boolean) : List<InScopeUsage> {
    return calculateInScopeUsages(limitedToModifier, null, null)
  }

  //Deprecated in PC 9.0.5 to rename.  This doesn't fetch, it mutates the value.
  //Use #calcualteInScopeUsages(boolean, CalcRoutineParmaName):List<InScopeUsage> instead
  @java.lang.Deprecated
  function fetchInScopeUsages(limitedToModifier : boolean, selectedEntity : CalcRoutineParamName) : List<InScopeUsage> {
    return calculateInScopeUsages(limitedToModifier, selectedEntity, null)
  }

  function calculateInScopeUsages(limitedToModifier : boolean, selectedEntity : CalcRoutineParamName, textFilter : String) : List<InScopeUsage> {
    return calculateInScopeUsagesWithTextFilter(limitedToModifier, selectedEntity, textFilter)
  }

  function calculateInScopeUsagesWithTextFilter(limitedToModifier : boolean, selectedEntity : CalcRoutineParamName, textFilter : String) : List<InScopeUsage> {
    if (selectedEntity != null) {
      _valueDelegate.resetInScope();
      _valueDelegate.InScopeParam = selectedEntity;
    }

    var allTargetElements = getAllTargetElements().stream()
    return filterInScopeUsages(allTargetElements, _restrictToTargetDataTypes, limitedToModifier, textFilter)
  }

  protected static function filterInScopeUsages(usages : Stream<InScopeUsage>, restrictedDataTypes : Set<IType>, limitedToModifier : boolean, textFilter : String) : List<InScopeUsage> {
    if (usages == null){
      return {}
    }
    var stream = usages
    if (limitedToModifier) {
      stream = stream.filter(\u -> u.IsModifier == limitedToModifier)
    }
    if (restrictedDataTypes != null && restrictedDataTypes.HasElements) {
      stream = stream.filter(\u -> {
        return TypeMaps.isAssignable(restrictedDataTypes, u.FeatureType)
      })
    }
    if (textFilter != null && textFilter.length() > 0) {
      stream = stream.filter(\u -> u.Path != null && u.Path.contains(textFilter))
    }
    stream = stream.sorted(\ o1 : InScopeUsage, o2 : InScopeUsage -> ObjectUtils.compare(o1.UserFriendlyPath, o2.UserFriendlyPath))
    return stream.collect(Collectors.toList<InScopeUsage>())
  }

  function noneSelected(): boolean {
    //InScopeValue itself can be null (i.e. when it is the selected entity "(this)") therefore check for InScopeValueType
    return _valueDelegate.InScopeValueType == null
  }

  function changeSelectEntityTo( selectedEntity : CalcRoutineParamName  ) : List<InScopeUsage>{

    _valueDelegate.resetInScope();
    _valueDelegate.InScopeParam = selectedEntity;
    PebblesUtil.invalidateIterators(_currentLocation, InScopeUsage)
    return calculateInScopeUsages(false, null, null)

  }

  static function filtersForDataTypes( usages : List<InScopeUsage>, restrictToDataTypes : Set<IType>): BeanBasedQueryFilter[] {
    return createFilters(usages, restrictToDataTypes, \u -> true)
  }

  private static function createFilter(final str : String) : BeanBasedQueryFilter {
    return new BeanBasedQueryFilter() {
      override function applyFilter(obj : Object) : boolean {
        var usage = obj as InScopeUsage
        return usage.UserFriendlyDataType == str
      }

      override function toString() : String {
        return str
      }
    }
  }

  private static function createFilters( usages : List<InScopeUsage>, restrictToDataTypes : Set<IType>, test : Predicate<InScopeUsage>) : BeanBasedQueryFilter[] {
    if (usages == null){
      return new BeanBasedQueryFilter[0]
    }
    return usages.stream()
        .filter(test)
        .filter(\u -> restrictToDataTypes == null || restrictToDataTypes.hasMatch(\i -> TypeMaps.isAssignable(i, u.FeatureType)))
        .map(\u -> u.UserFriendlyDataType)
        .distinct()
        .sorted()
        .map(\str -> createFilter(str))
        .toArray<BeanBasedQueryFilter>(\ i -> new BeanBasedQueryFilter[i])
  }
   
  static function filtersForModifierDataTypes( usages : List<InScopeUsage>, restrictToDataTypes : Set<IType>): BeanBasedQueryFilter[] {
    return createFilters(usages, restrictToDataTypes, \u -> u.IsModifier)
  }
   
  private function getAllTargetElements() : List<InScopeUsage> {

    var selectedParamName = _valueDelegate.InScopeParam

    if (selectedParamName == null or selectedParamName == TC_COSTDATA) {
      return {}
    }

    var paramSet = _step.CalcRoutineDefinition.ParameterSet
    var selectedParam = paramSet.Parameters.singleWhere(\ c -> c.Code == selectedParamName)

    var regt = new RatingEntityGraphTraverser(paramSet)
    var usages = regt.getTargetableElementsForParameterSet(paramSet)

    return usages.getOrDefault(selectedParam.Code, {}) //getAllTargetElements(selectedParam, calcStep.CalcRoutineDefinition.PolicyLinePatternCode)
  }

  function commitEntitySelection() {
    if (_valueDelegate typeis CalcStepDefinitionArgument) {
      _valueDelegate.OverrideSource = true
    }
    
    _currentLocation.commit()    
  }

}
