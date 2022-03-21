package gw.lookup

uses entity.LookupTableColumn
uses entity.LookupTableDefinition
uses entity.LookupTableInputColumn
uses entity.LookupTableOutputColumn
uses gw.lang.reflect.IType
uses gw.plugin.lookup.LookupSourceColumnDTO

@Export
public class LookupColumnDTO implements LookupSourceColumnDTO {

  private var _columnName : String as ColumnName
  private var _columnLabel : String as ColumnLabel
  private var _isInput: boolean as Input
  private var _dataType : IType as DataType
  public construct() {
  }

  public construct(tableColumn : LookupTableColumn) {
    _columnName = tableColumn.ColumnName
    _columnLabel = tableColumn.ColumnLabel
    _isInput = tableColumn typeis LookupTableInputColumn
    _dataType = tableColumn.IType
  }

  override public function equals(lookupColDTO : Object) : boolean {
    if (lookupColDTO === this) {
      return true
    } else if (lookupColDTO == null) {
      return false
    } else if (lookupColDTO typeis LookupColumnDTO) {
      return this.hashCode() == lookupColDTO.hashCode()
    } else {
      return false
    }
  }

  override public function hashCode() : int {
    return (_columnName != null ? _columnName.hashCode() : 0) + (_columnLabel != null ? _columnLabel.hashCode() : 0) + (_dataType != null ? _dataType.hashCode() : 0)
  }

  override public function createLookupTableColumn(definition : LookupTableDefinition) : LookupTableColumn {
    var column = _isInput ? new LookupTableInputColumn() : new LookupTableOutputColumn()
    column.ColumnName = _columnName
    column.ColumnLabel = _columnLabel
    column.DataType = _dataType.Name
    if (_isInput) {
      definition.addToInputs(column as LookupTableInputColumn)
    } else {
      definition.Output = column as LookupTableOutputColumn
    }
    return column
  }

}
