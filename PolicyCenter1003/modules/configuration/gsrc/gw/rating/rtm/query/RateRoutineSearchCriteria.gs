package gw.rating.rtm.query

uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.search.EntitySearchCriteria
uses gw.rating.GenericRateBookFieldSearch

@Export
class RateRoutineSearchCriteria extends EntitySearchCriteria<CalcRoutineDefinition> implements GenericRateBookFieldSearch {
  var _policyLine : String as PolicyLine
  var _code : String
  var _name : String

  construct() {
    _code = ""
    _name = ""
  }

  property set RoutineCode(code : String) {
    _code = code ?: ""
  }

  property get RoutineCode() : String {
    return _code
  }

  property set RoutineName(name : String) {
    _name = name ?: ""
  }

  property get RoutineName() : String {
    return _name
  }

  override protected function doSearch() : IQueryBeanResult<CalcRoutineDefinition> {
    var query = Query.make(CalcRoutineDefinition)
    if (PolicyLine.NotBlank) {
      if (PolicyLine == GENERIC_POLICY_LINE_CODE) {
        query.compare(CalcRoutineDefinition#PolicyLinePatternCode, Equals, null)
      } else {
        query.contains(CalcRoutineDefinition#PolicyLinePatternCode, PolicyLine, true)
      }
    }
    if (RoutineCode.NotBlank) {
      query.contains(CalcRoutineDefinition#Code, RoutineCode, true)
    }
    if (RoutineName.NotBlank) {
      query.contains(CalcRoutineDefinition#Name, RoutineName, true)
    }
    return query.select()
  }

  override property get InvalidSearchCriteriaMessage() : String {
    return null
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    return null
  }

}
