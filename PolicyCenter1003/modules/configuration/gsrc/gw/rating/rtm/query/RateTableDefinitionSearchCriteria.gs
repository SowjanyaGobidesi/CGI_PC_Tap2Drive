package gw.rating.rtm.query

uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.search.EntitySearchCriteria
uses gw.api.productmodel.PolicyLinePatternLookup
uses gw.rating.GenericRateBookFieldSearch

@Export
class RateTableDefinitionSearchCriteria extends EntitySearchCriteria<RateTableDefinition> implements GenericRateBookFieldSearch {
  var _code : String
  var _name : String
  var _policyLine : String as PolicyLine

  construct() {
    _code = ""
    _name = ""
  }

  property set TableCode(code : String) {
    _code = code ?: ""
  }

  property get TableCode() : String {
    return _code
  }

  property set TableName(name : String) {
    _name = name ?: ""
  }

  property get TableName() : String {
    return _name
  }

  override protected function doSearch() : IQueryBeanResult<RateTableDefinition> {
    var query = Query.make(RateTableDefinition)

    if (PolicyLine.NotBlank) {
      if (PolicyLine == GENERIC_POLICY_LINE_CODE) {
        query.compare(RateTableDefinition#PolicyLine, Equals, null)
      } else {
        query.contains(RateTableDefinition#PolicyLine, PolicyLine, true)
      }
    }
    if (TableCode.NotBlank)  query.contains(RateTableDefinition#TableCode, TableCode, true)
    if (TableName.NotBlank)  query.contains(RateTableDefinition#TableName, TableName, true)

    return query.select()
  }

  override protected property get InvalidSearchCriteriaMessage() : String {
    return null
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    return null
  }

}
