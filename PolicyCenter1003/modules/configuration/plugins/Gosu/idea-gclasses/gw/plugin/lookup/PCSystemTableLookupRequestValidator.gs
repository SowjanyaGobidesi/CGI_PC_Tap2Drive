package gw.plugin.lookup

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.plugin.lookup.impl.PCSystemTableLookupPlugin

/**
 * Validator for Lookup Request
 */
@Export
class PCSystemTableLookupRequestValidator {

  /**
   * Validate lookup request and return associated lookup table definition if the request is valid
   * @param tableCode table code from the request
   * @param inputs input columns from the request
   * @param output output column from the request
   * @return lookup table definition associated with the system table
   */
  public function findLookupTableDefinition(tableCode : String, inputs : List<LookupColumn>, output : LookupMetaColumn) : LookupTableDefinition {

    // Null check for arguments
    if (tableCode == null || tableCode.Empty) {
      throw new DisplayableException(DisplayKey.get("LookupTable.Execution.Exception.NullTableCode"))
    }

    if (inputs == null) {
      throw new DisplayableException(DisplayKey.get("LookupTable.Execution.Exception.NullColumns", tableCode))
    }

    // Validate lookup table name
    var lookupTableDef = Query.make(LookupTableDefinition)
        .compare(LookupTableDefinition#TableCode, Equals, tableCode).select().AtMostOneRow
    if (lookupTableDef == null) {
      throw new DisplayableException(DisplayKey.get("LookupTable.Execution.Exception.TableCodeIsWrong", tableCode))
    }

    // Validate input parameters
    var lookupMetadata = new PCLookupMetadata(lookupTableDef)
    var paramDefs = lookupMetadata.Inputs
    if (paramDefs.Count != inputs.Count) {
      throw new DisplayableException(DisplayKey.get("LookupTable.Execution.Exception.InputCountNotMatch", lookupTableDef.DisplayName, paramDefs.Count, inputs.Count))
    }
    var inputColumns : Map<String, LookupMetaColumn>
    try {
      inputColumns = inputs.map(\column -> new LookupMetaColumn(column.Name, column.Name, column.DataType)).partitionUniquely(\column -> column.Name)
    } catch(ie : IllegalStateException) {
      throw new DisplayableException(DisplayKey.get("LookupTable.Execution.Exception.InputsHasDuplicates", lookupTableDef.DisplayName, ie.Message))
    }
    inputColumns.eachValue(\inputColumn -> {
      if (not paramDefs.contains(inputColumn)) {
        throw new DisplayableException(DisplayKey.get("LookupTable.Execution.Exception.InputIsWrong", lookupTableDef.DisplayName, inputColumn.Name, inputColumn.DataType))
      }
    })

    //Validate output, log discrepancy if any
    var outputColumn = lookupTableDef.Existence ? PCLookupMetadata.EXISTENCE_COLUMN : lookupMetadata.Output
    if (output?.Name != outputColumn.Name || output?.DataType != outputColumn.DataType) {
        PCLoggerCategory.LOOKUP_TABLE.warn("While executing lookup into '${lookupTableDef.DisplayName}' found discrepancy in expected output column. Expected output column '${outputColumn.Name}' of data type '${outputColumn.DataType}', passed in output column is '${output.Name}' of data type '${output.DataType}'.")
    }
    return lookupTableDef
  }
}