package gw.lookup

uses entity.LookupTableColumn
uses entity.LookupTableDefinition
uses gw.api.database.Query
uses gw.plugin.lookup.LookupSourceColumnDTO
uses gw.plugin.lookup.LookupSourceDefinitionDTO

uses java.util.ArrayList
uses java.util.List

@Export
public class LookupDefinitionDTO implements LookupSourceDefinitionDTO {

  private var _name : String as Name
  private var _description : String as Description
  private var _sourceTable : String as SourceTable
  private var _isNew : boolean as New
  private var _lookupColumns : List<LookupSourceColumnDTO> as LookupColumns
  private var _existence : boolean as Existence
  private var _tableCode : String as TableCode

  public construct(lookupDef : LookupTableDefinition) {
    _name = lookupDef.TableName
    _isNew = lookupDef.New
    _description = lookupDef.TableDesc
    _sourceTable = lookupDef.EntityName
    _lookupColumns = lookupDef.AllInputsAndOutput.toList().map(\column -> new LookupColumnDTO(column))
    _existence = lookupDef.Existence
    _tableCode = lookupDef.isNew() ? UniqueTableCode : lookupDef.TableCode
  }

  public function removeColumn(lookupColumnDTO : LookupSourceColumnDTO) {
    _lookupColumns.remove(lookupColumnDTO)
  }

  public function addColumn(lookupColumnDTO : LookupSourceColumnDTO) {
    _lookupColumns.add(lookupColumnDTO)
  }

  public function removeAllColumnDTOs() {
    _lookupColumns.clear()
  }

  public function isCommitted() : boolean {
    return !_isNew
  }

  public function populateLookupTableDefinitionAndColumns(lookupDef : LookupTableDefinition) {
    lookupDef.EntityName = _sourceTable
    lookupDef.TableName = _name
    lookupDef.TableDesc = _description
    lookupDef.Existence = _existence
    lookupDef.TableCode = _tableCode

    removeColumns(lookupDef)
    modifyColumns(lookupDef)
    addColumns(lookupDef)
  }

  public property get EntityBackedLookupTable() : boolean {
      return _sourceTable != null;
  }

  private function removeColumns(lookupDef : LookupTableDefinition) {
    var columnsToRemove = new ArrayList<LookupTableColumn>()

    var lookupParamDTOColumnNames = _lookupColumns.where(\elt -> elt.Input)*.ColumnName
    lookupDef.Inputs.each(\input -> {
      if (!lookupParamDTOColumnNames.contains(input.ColumnName) ) {
        columnsToRemove.add(input)
      }
    })

    var lookupFactorDTOColumnNames = _lookupColumns.where(\elt -> not elt.Input)*.ColumnName
    if (lookupDef.Output != null and not lookupFactorDTOColumnNames.contains(lookupDef.Output.ColumnName)) {
      columnsToRemove.add(lookupDef.Output)
    }

    columnsToRemove.each(\elt -> elt.remove())
  }

  private function modifyColumns(lookupDef : LookupTableDefinition) {
  }

  private function addColumns(lookupDef : LookupTableDefinition) {
    var lookupColumnNames = lookupDef.AllInputsAndOutput*.ColumnName
    _lookupColumns.each(\columnDTO -> {
      if (!lookupColumnNames.contains(columnDTO.ColumnName)) {
        columnDTO.createLookupTableColumn(lookupDef)
      }
    })
  }

  private property get UniqueTableCode() : String {
    var tempTableCode = UUID.randomUUID().toString()
    while (not isTableCodeUnique(tempTableCode)) {
      tempTableCode = UUID.randomUUID().toString()
    }
    return tempTableCode
  }

  private function isTableCodeUnique(tableCode : String) : Boolean {
    var existInLookupTableDef = Query.make(LookupTableDefinition).compare(LookupTableDefinition#TableCode, Equals, tableCode).select().isEmpty()
    var existInRuleLookupTableDef = Query.make(RuleLookupRequestDef).compare(RuleLookupRequestDef#TableID, Equals, tableCode).select().isEmpty()
    return existInLookupTableDef and existInRuleLookupTableDef
  }

}
