package gw.plugin.lookup.impl

uses gw.api.database.Queries
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.entity.IEntityType
uses gw.lang.reflect.TypeSystem
uses gw.plugin.lookup.LookupColumn
uses gw.plugin.lookup.LookupMetaColumn
uses gw.plugin.lookup.LookupMetadata
uses gw.plugin.lookup.Lookupable
uses gw.plugin.lookup.PCLookupMetadata
uses gw.plugin.lookup.PCSystemTableLookupRequestValidator

/**
 * Implementation of Lookupable plugin for system table lookup
 */
@Export
class PCSystemTableLookupPlugin implements Lookupable {

  protected var _lookupRequestValidator : PCSystemTableLookupRequestValidator = new PCSystemTableLookupRequestValidator()

  /**
   * List all registered common lookup tables
   * @return list of LookupMetadata
   */
  override function listRegisteredLookups(): List<LookupMetadata> {
    var lookupTableDefinitions = Query.make(LookupTableDefinition).select()
    return lookupTableDefinitions.map(\elt -> new PCLookupMetadata(elt))
  }

  /**
   * Executes the lookup with given inputs and output metadata, and returns the lookup result as a LookupColumn
   * @param tableCode identifier of lookup table
   * @param params input columns and value
   * @param valueDefinition metadata of output column
   * @return LookupColumn contains the lookup result
   */
  override function execute(tableCode: String, params: List<LookupColumn>, valueDefinition: LookupMetaColumn): LookupColumn {
    var lookupTableDef = _lookupRequestValidator.findLookupTableDefinition(tableCode, params, valueDefinition)

    var type : IEntityType
    try {
      // The relative name of entity is expected
      type = TypeSystem.getByRelativeName(lookupTableDef.EntityName) as IEntityType
    } catch(ce : ClassNotFoundException) {
      throw new DisplayableException(DisplayKey.get("LookupTable.Execution.Exception.SystemTableEntityIsNotFound", lookupTableDef.DisplayName, lookupTableDef.EntityName))
    }
    var outputColumn = lookupTableDef.Output
    try {
      var query = Queries.createQuery(type)
      params.each(\param -> {
        query.compare(param.Name, Relop.Equals, param.Value)
      })
      if (lookupTableDef.Existence) {
        // Existence lookup
        return new LookupColumn(PCLookupMetadata.EXISTENCE_COLUMN.Name, PCLookupMetadata.EXISTENCE_COLUMN.Name, PCLookupMetadata.EXISTENCE_COLUMN.DataType, query.select().HasElements)
      }
      var queryResult = query.select().AtMostOneRow
      if (queryResult == null) {
        return new LookupColumn(valueDefinition.Name, valueDefinition.Name, valueDefinition.DataType, null)
      }
      var value = queryResult[outputColumn.ColumnName]
      return new LookupColumn(outputColumn.ColumnName,outputColumn.ColumnName, outputColumn.IType, value)
    } catch (re : RuntimeException){
      // RuntimeException will be thrown if input/output column in lookup table definition is not consistent with DB or multiple rows matched
      throw new DisplayableException(DisplayKey.get("LookupTable.Exception.Exception.QueryError", lookupTableDef.DisplayName, re.Message))
    }
  }

}