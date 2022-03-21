package gw.pcf.rating.rtm

uses gw.api.util.DisplayableException
uses gw.api.locale.DisplayKey
uses gw.pcf.rating.ParameterSetHelper
uses gw.rating.rtm.valueprovider.CustomValueProviderData
uses java.util.List

@Export
class RateTableParameterSetHelper extends ParameterSetHelper implements IRateTableParameterSetHelper {

  final var _tableDefinition : RateTableDefinition
  var _usedInPromotedRateBook: Boolean = null // value cached lazily...

  construct(tableDefinition : RateTableDefinition) {
    _tableDefinition = tableDefinition
  }

  private property get UsedInPromotedRateBook(): boolean {
    if (_usedInPromotedRateBook == null) {
      _usedInPromotedRateBook = _tableDefinition.UsedInPromotedRateBook
    }
    return _usedInPromotedRateBook
  }

  function getParamSets() : List<CalcRoutineParameterSet> {
    return getParamSets(_tableDefinition.PolicyLine)
  }

  function getHelpStringForParamTypes() : String {
    return getHelpStringForParamTypes(_tableDefinition.getParameterSet())
  }

  function getStringForParamTypes() : String {
    return getStringForParamTypes(_tableDefinition.getParameterSet())
  }

  function enforceSortOrder(columnDef : RateTableColumn) : String {
    if (columnDef.New) {
      var tablesUsingRatebook = _tableDefinition.tablesUsingDefinition().where(\rt -> rt.RateBook != null)
      var isTableUsedInPromotedRateBook = tablesUsingRatebook.hasMatch(\rt -> rt.RateBook.Status != TC_DRAFT)

      if (isTableUsedInPromotedRateBook) {
        var maxExistingPriority = _tableDefinition.SortedParameters.lastWhere(\p -> not p.New).SortOrder
        if (columnDef.SortOrder <= maxExistingPriority) {
          return DisplayKey.get("Web.Rating.Errors.NewMatchOpMustHaveHigherPriorityThanExistingMatchOps", columnDef.ColumnLabel)
        }
      }
    }
    return null
  }

  /**
   * Determines if the parameter may be removed from the RTD.
   * A parameter may be removed from a RTD if:
   * <ul>
   *   <li>no rate routine (used in promoted books) uses its parameters in a rate table lookup, and
   *   <li>no rate tables have non-null values in its column.
   * </ul>
   * @return {@code true} if the above criteria are met, and {@code false} otherwise.
   */
  function canRemoveParameter(param : RateTableColumn) : boolean {
    return not (_tableDefinition.isParamUsedInRateRoutineInPromotedRB(param)
        or _tableDefinition.isParameterUsedInAnyRateTable(param))
  }

  /**
   * Determines if the matchOp may be edited in the RTD.
   */
  function canEditMatchOp(matchOp: RateTableMatchOp): boolean {
    return matchOp == null or matchOp.New or canEditParameter(matchOp.Params.first())
  }

  /**
   * Determines if the parameter may be edited in the RTD.
   * A parameter may be edited in a RTD if:
   * <ul>
   *   <li>no rate routine uses its parameters in a rate table lookup, and
   *   <li>no rate tables have non-null values in its column.
   * </ul>
   * @return {@code true} if the above criteria are met, and {@code false} otherwise.
   */
  function canEditParameter(param: RateTableColumn): boolean {
    return not (UsedInPromotedRateBook or _tableDefinition.isParamUsedInAnyRateRoutine(param)
        or _tableDefinition.isParameterUsedInAnyRateTable(param))
  }

  /**
   * Determines if the factor may be removed from the RTD.
   * A factor may be removed from a RTD if:
   * <ul>
   *   <li>no rate routine (used in promoted books) uses its factors in a rate table lookup, and
   *   <li>no rate tables have non-null values in its column.
   * </ul>
   * @return {@code true} if the above criteria are met, and {@code false} otherwise.
   */
  function canRemoveFactor(factor: RateTableColumn): boolean {
    return not (UsedInPromotedRateBook or _tableDefinition.isFactorUsedInRateRoutineInPromotedRB(factor)
        or _tableDefinition.isFactorUsedInAnyRateTable(factor))
  }

  /**
   * Determines if the factor may be edited in the RTD.
   * A factor may be edited in a RTD if:
   * <ul>
   *   <li>no rate routine uses its factors in a rate table lookup, and
   *   <li>no rate tables have non-null values in its column.
   * </ul>
   * @return {@code true} if the above criteria are met, and {@code false} otherwise.
   */
  function canEditFactor(factor: RateTableColumn): boolean {
    return not (UsedInPromotedRateBook or _tableDefinition.isFactorUsedInAnyRateRoutine(factor)
        or _tableDefinition.isFactorUsedInAnyRateTable(factor))
  }

  /**
   * Determines if the factor may be added in the RTD.
   * A factor may be added in a RTD if it is not used in a promoted rate book via rate routine/rate table
   * @return {@code true} if the above criteria are met, and {@code false} otherwise.
   */
  function canAddFactor(): boolean {
    return not UsedInPromotedRateBook
  }

  function validateChange(): String {
    var parameterRemovedError = checkIfRemovedParametersHaveBeenUsed()
    if (parameterRemovedError != null) {
      return parameterRemovedError
    }

    var factorRemovedError = checkIfRemovedFactorsHaveBeenUsed()
    if (factorRemovedError != null) {
      return factorRemovedError
    }

    var argumentSourceSetRemovedError = checkIfRemovedArgumentSourceSetsHaveBeenUsed()
    if (argumentSourceSetRemovedError != null) {
      return argumentSourceSetRemovedError
    }

    return null
  }

  function checkIfRemovedFactorsHaveBeenUsed(): String {
    return null
  }

  function checkIfRemovedArgumentSourceSetsHaveBeenUsed(): String {
    return null
  }

  /**
   * When a user is removing a parameter from a RTD, it is possible that
   * in-between clicking "Remove" and clicking "Update," another user has
   * made use of the parameter being removed. This function detects if this
   * has happened, and returns an error message if so.
  */
  function checkIfRemovedParametersHaveBeenUsed() : String {
    var tablesUsingDef = _tableDefinition.tablesUsingDefinition()

    if (not tablesUsingDef.Empty) {
      var table = tablesUsingDef.first()
      var removedParams = table.Definition.MatchOps.subtract(_tableDefinition.MatchOps)
      var paramsInUse = removedParams.where(\ p -> not canRemoveParameter(p.Params.first()))
      if (not paramsInUse.Empty) {
        return DisplayKey.get("Web.Rating.Errors.InUseParameterCannotBeRemovedFromRTD", paramsInUse*.DisplayName.join(", "))
      }
    }

    return null
  }

  function deleteSelectedArgSrcSets(targetSourceSets : RateTableArgumentSourceSet[]) {
    if (targetSourceSets.Count == _tableDefinition.ArgumentSourceSets.Count) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.CanNotDeleteAllArgSourceSets"))
    } else if (_tableDefinition.ArgumentSourceSets.Count == (targetSourceSets.Count + 1)) {
      var targetCodes = targetSourceSets.map(\targetSet ->targetSet.Code)
      var remainingArgSrcSet = _tableDefinition.ArgumentSourceSets.singleWhere(\aSet ->!targetCodes.contains(aSet.Code))
      if (remainingArgSrcSet.Code.length == 0 or remainingArgSrcSet.Name.length == 0) {
        throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.LastSetMustHaveCodeAndName"))
      }
    }
    targetSourceSets.each(\targetSet -> {
      _tableDefinition.removeFromArgumentSourceSets(targetSet)
    })
  }

  override function addNewArgumentSourceSet(parameterSet : CalcRoutineParameterSet) : RateTableArgumentSourceSet {
    var argSourceSet = new RateTableArgumentSourceSet()
    if (_tableDefinition.ArgumentSourceSets.HasElements) {
      argSourceSet.Code = null
      argSourceSet.Name = null
    }
    argSourceSet.RateTableDefinition = _tableDefinition
    argSourceSet.CalcRoutineParameterSet = parameterSet

    _tableDefinition.MatchOps.each( \ matchOp -> {
      var argSource = new RateTableArgumentSource()
      matchOp.addToArgumentSources(argSource)
      argSourceSet.addToRateTableArgumentSources(argSource)
    })

    return argSourceSet
  }

  public function copyNameLabelAndLocalizationDataOnSingleParameterOps() {
    for (matchOp in _tableDefinition.MatchOps) {
      if (matchOp.Params.length == 1) {
        matchOp.Params.first().ColumnName = matchOp.Name
        matchOp.Params.first().ColumnLabel = matchOp.DisplayText
        copyLocalizationInformation(matchOp)
      }
    }
  }

  public function updateValuesForValueProviderChange(valueProviderProxy : CustomValueProviderData, columnDefinition : RateTableColumn) {
    valueProviderProxy.clearArguments()
    valueProviderProxy.createValueProviderString()
    columnDefinition.clearArgumentSources()
    if (valueProviderProxy.ClassName == null) {
      columnDefinition.MultiSelect = false
    }
  }

  private function copyLocalizationInformation(matchOp : RateTableMatchOp) {
    var defaultLanguage = gw.api.util.LocaleUtil.DefaultLanguageType

    for (language in gw.api.util.LocaleUtil.AllLanguages) {
      if (language.equals(defaultLanguage)) continue
      var paramLocalizedCode = "ColumnLabel" + "_" + language.Code
      var opLocalizedCode = "DisplayText" + "_" + language.Code
      if (matchOp[opLocalizedCode] != null) {
        matchOp.Params.first()[paramLocalizedCode] = matchOp[opLocalizedCode]
      }
    }
  }
}
