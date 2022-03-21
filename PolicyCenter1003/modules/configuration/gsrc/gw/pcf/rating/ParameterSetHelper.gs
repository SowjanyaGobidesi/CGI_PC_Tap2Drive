package gw.pcf.rating

uses gw.api.database.IQuerySelectColumn
uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.path.Paths
uses gw.rating.rtm.util.ProductModelUtils
uses java.util.List
uses java.util.stream.Collectors
uses java.util.stream.StreamSupport

@Export
class ParameterSetHelper {

  final var ORDERBY_NAME_SELECT_COLUMN: IQuerySelectColumn
  final var POLICY_LINE_PATTERN_CODE_SELECT: IQuerySelectColumn[]

  construct() {
    ORDERBY_NAME_SELECT_COLUMN = QuerySelectColumns.path(Paths.make(CalcRoutineParameterSet#Name))
    POLICY_LINE_PATTERN_CODE_SELECT =
        {QuerySelectColumns.path(Paths.make(CalcRoutineParameterSet#PolicyLinePatternCode))}
  }

  property get AllParamSets(): List<CalcRoutineParameterSet> {
    return makeParamSetsQuery().select().orderBy(ORDERBY_NAME_SELECT_COLUMN).toList()
  }

  function getParamSets(polLinePatternCode: String): List<CalcRoutineParameterSet> {
    var paramSetQuery = makeParamSetsQuery()
    paramSetQuery.or(\expr -> {
      var policyLinePatternCodeProp = CalcRoutineParameterSet.POLICYLINEPATTERNCODE_PROP.get()
      expr.compare(policyLinePatternCodeProp, Equals, null)
      expr.compare(policyLinePatternCodeProp, Equals, polLinePatternCode)
    })
    return paramSetQuery.select().orderBy(ORDERBY_NAME_SELECT_COLUMN).toList()
  }

  // TODO: does this do what we want, or was param sets a heuristic for "there is Rateflow data for this LOB?"
  property get AllLOBsWithParamSets(): String[] {
    var activePolicyPatternCodes = StreamSupport.stream(
            makeParamSetsQuery().withDistinct(true).select(POLICY_LINE_PATTERN_CODE_SELECT).spliterator(), false)
        .map(\row -> row.getColumn(0) as String)
        .collect(Collectors.toSet())
    // a parameter set with a null policy line is available on any line
    if (activePolicyPatternCodes.contains(null)) {
      return ProductModelUtils.getAllPolicyLines().toTypedArray()
    }
    return ProductModelUtils.getAllPolicyLines().where(\code -> activePolicyPatternCodes.contains(code)).toTypedArray()
  }

  static function isParameterSetDeleted(paramSet: CalcRoutineParameterSet): boolean {
    var paramSetQuery = makeParamSetsQuery().compare(CalcRoutineParameterSet.ID_PROP.get(), Equals, paramSet)

    return paramSetQuery.select().Empty // doesn't exist...
  }

  function getHelpStringForParamTypes(paramSet : CalcRoutineParameterSet) : String {
    var params = paramSet.Parameters
    if (params.Count>0) {
      return params.map(\param -> param.Code.DisplayName + " (" + param.ParamType + ")").join(", ")
    } else {
      return ""
    }
  }

  function getStringForParamTypes(paramSet : CalcRoutineParameterSet) : String {
    var params = paramSet.Parameters
    if (params.Count>0) {
      return params.map(\param -> param.Code.DisplayName).join(", ")
    } else {
      return ""
    }
  }

  static function makeParamSetsQuery(): Query<CalcRoutineParameterSet> {
    return Query.make(CalcRoutineParameterSet)
  }
}
