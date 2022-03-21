package gw.web.rating

uses gw.api.locale.DisplayKey
uses gw.api.tree.RowTreeRootNode

@Export
class RateTableDefinitionUIHelper {

  static function canUpdateDefinition(tableDefinition : RateTableDefinition,
      rateTablesUsingDefinition : List<RateTable>, errorStatus : ErrorStatus) {
    if (errorStatus.ErrorFound or (tableDefinition.tablesUsingDefinition().HasElements and rateTablesUsingDefinition.Empty)) {
      errorStatus.ErrorFound = true
      throw new gw.api.util.DisplayableException (DisplayKey.get("Web.Rating.RateTableDefinition.DefinitionInUse"))
    }
  }

  static function getOwningTables(rateTables : List<RateTable>) : RowTreeRootNode {
    var owningTables = rateTables.where(\ rt -> rt.Owned)
    return new RowTreeRootNode(owningTables, \ t -> (t as RateTable).ReferencingRateTables)
  }

  static class ErrorStatus {
    var _errorFound : boolean as ErrorFound
  }
}
