package gw.rating.rtm.validation

uses gw.api.locale.DisplayKey
uses gw.api.database.Query
uses gw.pl.util.ArgCheck
uses gw.rating.rtm.valueprovider.CustomValueProviderData
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses gw.validation.PCValidationResult
uses gw.validation.ValidationUtil

@Export
class RateTableDefinitionValidation extends PCValidationBase {

  final var _rateTableDefinition : RateTableDefinition
  
  /**
   * @return true only if the opCode corresponds to an interpolated match
   */
  function isInterpolationOpCode(opCode : String) : boolean {
    return {"Interpolate", "InterpolateWithRelax"}.contains(opCode)
  }
  
  /**
   * @return true only if the opCode corresponds to a match that does not rely on sorting by score 
   */
  function isNonSortingOpCode(opCode : String) : boolean {
    return {"ExactMatch", "RangeMatchMaxIncl", "RangeMatchMaxExcl"}.contains(opCode)
  }

  construct(valContext : PCValidationContext, definition : RateTableDefinition) {
    super(valContext)
    ArgCheck.nonNull(definition, "definition")
    _rateTableDefinition = definition
  }

  override protected function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    atLeastOneMatchOp()
    atLeastOneFactor()
    atLeastOneArgumentSourceSet()
    decimalPlacesFieldForDecimalFactorsAreZeroOrGreater()
    decimalPlacesForDecimalFactorsDoNotExceedBackingColumnScales()
    decimalPlacesFieldForDecimalParamsAreZeroOrGreater()
    decimalPlacesForDecimalParamsDoNotExceedBackingColumnScales()
    allParamsInSameMatchOpHaveSameColumnScale()
    validCustomEntity()
    duplicateSortOrder()
    uniqueMatchOpNames()
    uniqueParameterNames()
    uniqueTableCode()
    onlyOneInterpolation()
    onlyExactMatchOrRangeBeforeInterpolation()
    validateMatchOpAreInSortedOrder()
    parameterDoesNotDependOnMultiValueParameter()
    addNewArgumentSourceSetToUseParameter()
    parameterSetForArgSourceIsValid()
  }

  static function validateRateTableDefinition(definition: RateTableDefinition) {
    PCValidationContext.doPageLevelValidation(\ context -> {
      columnProviderArgs(definition, context.Result)
      var validation = new RateTableDefinitionValidation(context, definition)
      validation.validate()
    })
  }

  static function validatePostEnter(definition: RateTableDefinition) {
    PCValidationContext.doPageLevelValidation(\context -> {
      for (column in definition.AllColumns) {
        new CustomValueProviderData(column).processRateTableColumnOnEnter(context.Result)
      }
    })
  }

  private static function columnProviderArgs(definition: RateTableDefinition, result: PCValidationResult) {
    for (column in definition.AllColumns) {
      new CustomValueProviderData(column).processRateTableColumnOnExit(result)
    }
  }

  function atLeastOneMatchOp() {
    Context.addToVisited(this, "atLeastOneMatchOp")
    if (_rateTableDefinition.MatchOps.Count < 1) {
      Result.addError(_rateTableDefinition, TC_DEFAULT,
        DisplayKey.get("Validation.Rating.RateTableDefinition.MissingMatchOp"))
    }
  }

  function atLeastOneFactor() {
    Context.addToVisited(this, "atLeastOneFactor")
    if (_rateTableDefinition.Factors.Count < 1) {
      Result.addError(_rateTableDefinition, TC_DEFAULT,
        DisplayKey.get("Validation.Rating.RateTableDefinition.MissingFactors"))
    }
  }

  function atLeastOneArgumentSourceSet() {
    Context.addToVisited(this, "atLeastOneArgumentSourceSet")
    if (_rateTableDefinition.ArgumentSourceSets.Count < 1) {
      Result.addError(_rateTableDefinition, TC_DEFAULT,
          DisplayKey.get("Validation.Rating.RateTableDefinition.MissingArgumentSourceSet"))
    }
  }

  function decimalPlacesForDecimalFactorsDoNotExceedBackingColumnScales() {
    Context.addToVisited(this, "factorScalesDoNotExceedBackingColumn")
    if (_rateTableDefinition.Factors.Count > 0) {
      _rateTableDefinition.Factors
        .where(\factor -> factor.ColumnType == TC_DECIMAL)
        .each(\factor -> {
          if (factor.ColumnScale > factor.Scale) {
            Result.addError(_rateTableDefinition, TC_DEFAULT,
              DisplayKey.get("Validation.Rating.RateTableDefinition.DecimalPlacesTooBig", factor.ColumnName, factor.Scale))
          }
        })
    }
  }

  function decimalPlacesForDecimalParamsDoNotExceedBackingColumnScales() {
    Context.addToVisited(this, "paramScalesDoNotExceedBackingColumn")
    if (_rateTableDefinition.SortedParameters.Count > 0) {
      _rateTableDefinition.MatchOps*.Params
        .where(\param -> param.ColumnType == TC_DECIMAL)
        .each(\param -> {
          if (param.ColumnScale > param.Scale) {
            Result.addError(_rateTableDefinition, TC_DEFAULT,
              DisplayKey.get("Validation.Rating.RateTableDefinition.Parameter.DecimalPlacesTooBig", param.ColumnName, param.Scale))
          }
        })
    }
  }

  function decimalPlacesFieldForDecimalFactorsAreZeroOrGreater() {
    Context.addToVisited(this, "factorScalesShouldNotBeNegative")
    if (_rateTableDefinition.Factors.Count > 0) {
      _rateTableDefinition.Factors
        .where(\factor -> factor.ColumnType == TC_DECIMAL)
        .each(\factor -> {
          if (factor.ColumnScale < 0) {
            Result.addError(_rateTableDefinition, TC_DEFAULT,
              DisplayKey.get("Validation.Rating.RateTableDefinition.DecimalPlacesMustBeGreaterThanZero", factor.ColumnName))
          }
        })
    }
  }

  function decimalPlacesFieldForDecimalParamsAreZeroOrGreater() {
    Context.addToVisited(this, "paramScalesShouldNotBeNegative")
    if (_rateTableDefinition.SortedParameters.Count > 0) {
      _rateTableDefinition.MatchOps*.Params
        .where(\param -> param.ColumnType == TC_DECIMAL)
        .each(\param-> {
          if (param.ColumnScale < 0) {
            Result.addError(_rateTableDefinition, TC_DEFAULT,
              DisplayKey.get("Validation.Rating.RateTableDefinition.Parameter.DecimalPlacesMustBeGreaterThanZero", param.ColumnName))
          }
        })
    }
  }

  function allParamsInSameMatchOpHaveSameColumnScale() {
    Context.addToVisited(this, "paramScalesInSameMatchOpShouldBeEqual")
    if (_rateTableDefinition.MatchOps.Count > 0) {
      _rateTableDefinition.MatchOps.where(\ op -> op.Params.Count > 1).each(\ op -> {
        var paramScales = op.Params.where(\ param -> param.ColumnType == TC_DECIMAL)*.ColumnScale.toSet()
        if (paramScales.Count > 1) {
          Result.addError(_rateTableDefinition, TC_DEFAULT,
              DisplayKey.get("Validation.Rating.RateTableDefinition.Parameter.DecimalPlacesMustBeTheSameUnderOneMatchOp", op.DisplayName))
        }
      })
    }
  }

  function validCustomEntity() {
    Context.addToVisited(this, "validCustomEntity")
    if (not _rateTableDefinition.hasValidEntity()) {
      Result.addError(_rateTableDefinition, TC_DEFAULT,
        DisplayKey.get("Validation.Rating.RateTableDefinition.InvalidEntity", _rateTableDefinition.EntityName))
    }
  }

  function duplicateSortOrder() {
    Context.addToVisited(this, "duplicateSortOrder")
    var rateTableColumns = _rateTableDefinition.MatchOps.flatMap( \ elt -> elt.Params)

    var parameterColumnPriorities = rateTableColumns.map(\ c -> c.SortOrder)
    if (parameterColumnPriorities.length > parameterColumnPriorities.toSet().size()) {
      Result.addError(_rateTableDefinition, TC_DEFAULT, DisplayKey.get("Validation.Rating.RateTableDefinition.DuplicateSortOrder"))
    }

    var factorPriorities = _rateTableDefinition.Factors.map(\ c -> c.SortOrder)
    if (factorPriorities.length > factorPriorities.toSet().size()) {
      Result.addError(_rateTableDefinition, TC_DEFAULT, DisplayKey.get("Validation.Rating.RateTableDefinition.DuplicateFactorSortOrder"))
    }
  }

  function uniqueMatchOpNames() {
    Context.addToVisited(this, "uniqueMatchOpNames")
    if (_rateTableDefinition.MatchOps*.Name.toSet().Count != _rateTableDefinition.MatchOps.Count) {
      Result.addError(_rateTableDefinition, TC_DEFAULT,
        DisplayKey.get("Validation.Rating.RateTableDefinition.DuplicateMatchOpName"))
    }
  }

  function uniqueParameterNames() {
    Context.addToVisited(this, "uniqueParameterNames")
    if (_rateTableDefinition.SortedParameters*.ColumnName.toSet().Count != _rateTableDefinition.SortedParameters*.ColumnName.Count) {
      Result.addError(_rateTableDefinition, TC_DEFAULT,
        DisplayKey.get("Validation.Rating.RateTableDefinition.DuplicateParameterName"))
    }
  }

  function uniqueTableCode() {
    Context.addToVisited(this, "uniqueTableCode")
    var q = Query.make(RateTableDefinition)
    q.compare(RateTableDefinition#TableCode, Equals, _rateTableDefinition.TableCode)
    q.compare(RateTableDefinition#PolicyLine, Equals, _rateTableDefinition.PolicyLine)
    for (var rtd in q.select()) {
      if (rtd.ID != _rateTableDefinition.ID) {
        Result.addError(_rateTableDefinition, TC_DEFAULT,
          DisplayKey.get("Validation.Rating.RateTableDefinition.DuplicateTableCode", _rateTableDefinition.TableCode))
        return
      }
    }
  }
  
  function onlyOneInterpolation() {
    Context.addToVisited(this, "onlyOneInterpolation")
    if(_rateTableDefinition.MatchOps.countWhere(\ mo-> isInterpolationOpCode(mo.MatchOpDefinition.OpCode)) > 1) {
      Result.addError(_rateTableDefinition, TC_DEFAULT,
          DisplayKey.get("Validation.Rating.RateTableDefinition.MoreThanOneInterpolation"))
    }   
  }

  // Enforce the property that only matchops which <em>do not rely on sorting by score</em>
  // are allowed to be higher priority than the exactMatchOp
  function onlyExactMatchOrRangeBeforeInterpolation() {
    Context.addToVisited(this, "onlyExactMatchOrRangeBeforeInterpolation")

    var sawOtherOp = false

    for (op in _rateTableDefinition.SortedMatchOps) {
      var opCode = op.MatchOpDefinition.OpCode
      if (isInterpolationOpCode(opCode)) {
        if (sawOtherOp) {
          Result.addError(_rateTableDefinition, TC_DEFAULT,
              DisplayKey.get("Validation.Rating.RateTableDefinition.NoSortedMatchOpBeforeInterpolation"))
        }
        break
      }

      sawOtherOp = sawOtherOp or not isNonSortingOpCode(opCode)
    }
  }

  function validateMatchOpAreInSortedOrder() {
    Context.addToVisited(this, "validateMatchOpAreInSortedOrder" )
    var prevRateTableColSortOrder : java.lang.Integer = 0
    var prevRateTableColName = ""
    var rateTableColumns =
        _rateTableDefinition.SortedMatchOps.flatMap( \ elt -> elt.sortedParams())

    for (rateTableCol in rateTableColumns){
      if (prevRateTableColSortOrder.compareTo(rateTableCol.SortOrder) > 0)    {
        var msg = DisplayKey.get("Validation.Rating.RateTableDefinition.MatchOpsAreInPriorityOrder", rateTableCol.MatchOp.Name, prevRateTableColName)
        Result.addError(_rateTableDefinition, TC_DEFAULT, msg)
      } else {
        prevRateTableColSortOrder =  rateTableCol.SortOrder
        prevRateTableColName = rateTableCol.MatchOp.Name
      }
    }
  }

  static function validateRateTableDefinitionsBeforeExport(definitions : List<RateTableDefinition>, valLevel : ValidationLevel) {
    var context = ValidationUtil.createContext(valLevel)
    definitions.each(\ c -> { var defContext = ValidationUtil.createContext(valLevel)
      var validation = new RateTableDefinitionValidation(defContext, c)
      validation.validate()
      defContext.Result.Errors.each(\ o -> context.Result.addError(c, valLevel, c.TableCode + ": " + (o as  gw.api.validation.ValidationIssue).Reason))
      defContext.Result.Warnings.each(\ o -> context.Result.addWarning(c, valLevel, c.TableCode + ": " + (o as  gw.api.validation.ValidationIssue).Reason))
    })
    context.raiseExceptionIfProblemsFound()
  }

  function parameterDoesNotDependOnMultiValueParameter() {
    Context.addToVisited(this, "parameterDoesNotDependOnMultiValueParameter")
    if (_rateTableDefinition.SortedParameters.Count > 1 and _rateTableDefinition.AllColumns.hasMatch( \ column -> column.MultiSelect)) {
      var rateTableColumns =
          _rateTableDefinition.SortedMatchOps.flatMap( \ elt -> elt.sortedParams())

      for (rateTableCol in rateTableColumns){
         if(rateTableCol.DependsOn.MultiSelect){
           Result.addError(_rateTableDefinition, TC_DEFAULT, DisplayKey.get("Validation.Rating.RateTableDefinition.DependsOnMultiValueParameterError"))
         }
      }
    }
  }

  function addNewArgumentSourceSetToUseParameter(){
    Context.addToVisited(this, "addNewArgumentSourceSetToUseParameter")

    if (_rateTableDefinition.ArgumentSourceSets.HasElements) {
      var existingParametersCovered = _rateTableDefinition.ArgumentSourceSets*.RateTableArgumentSources*.Parameter.toSet()
      if (not existingParametersCovered.containsAll(_rateTableDefinition.MatchOps.toSet()) and _rateTableDefinition.IsInPromotedRateBookViaRateRoutine){
        Result.addWarning(_rateTableDefinition, TC_DEFAULT, DisplayKey.get("Validation.Rating.RateTableDefinition.AddArgumentSourceSetForNewParameters"))
      }
    }
  }

  function parameterSetForArgSourceIsValid() {
    Context.addToVisited(this, "parameterSetForArgSourceIsValid")

    var argumentSourceSets = _rateTableDefinition.ArgumentSourceSets
    if (argumentSourceSets.HasElements) {
      var params = _rateTableDefinition.getParameterSet().Parameters*.Code.toSet()
      var argumentSources = argumentSourceSets*.RateTableArgumentSources
      var argSrcRoots = argumentSources*.Root.toSet().where( \ elt -> elt != null)
      if (not params.containsAll(argSrcRoots)) {
        Result.addError(_rateTableDefinition, TC_DEFAULT, DisplayKey.get("Validation.Rating.RateTableDefinition.ParameterSetNoLongerInScope"))
      }
    }
  }
}
