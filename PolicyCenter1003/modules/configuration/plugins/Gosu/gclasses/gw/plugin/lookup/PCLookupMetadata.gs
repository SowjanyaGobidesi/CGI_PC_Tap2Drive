package gw.plugin.lookup

uses gw.api.locale.DisplayKey
uses gw.plugin.lookup.impl.PCSystemTableLookupPlugin
uses org.apache.commons.collections.CollectionUtils

/**
 * Implementation of LookupMetadata associated with LookupTableDefinition
 */
@Export
class PCLookupMetadata implements LookupMetadata {

  // Output column for existence lookup
  public static final var EXISTENCE_COLUMN : LookupMetaColumn = new LookupMetaColumn(DisplayKey.get("LookupTable.Execution.ExistenceColumn.ColumnName"), DisplayKey.get("LookupTable.Execution.ExistenceColumn.ColumnName"), Boolean)

  private var _lookupTableDefinition : LookupTableDefinition as LookupTableDefinition

  construct(lookupTableDef : LookupTableDefinition) {
    _lookupTableDefinition = lookupTableDef
  }

  override property get TableID(): String {
    return _lookupTableDefinition.TableCode
  }

  override property get TableName(): String {
    return _lookupTableDefinition.TableName
  }

  override property get Description(): String {
    return _lookupTableDefinition.TableDesc
  }

  override property get Inputs(): List<LookupMetaColumn> {
    return _lookupTableDefinition.Inputs.map(\input -> new LookupMetaColumn(input.ColumnName, input.ColumnName, input.IType)).toList()
  }

  override property get Output(): LookupMetaColumn {
    // Currently output can only contains one column
    var output = _lookupTableDefinition.Output
    if (output == null) {
      return EXISTENCE_COLUMN
    }
    return new LookupMetaColumn(output.ColumnName, output.ColumnName, output.IType)
  }

  override function equals(o : Object) : boolean {
    if (o == null || this.Class != o.Class) {
      return false
    }
    var metadata = o as PCLookupMetadata
    if (this.TableID != null ? this.TableID != metadata.TableID : metadata.TableID != null) {
      return false
    }
    if (this.TableName != null ? this.TableName != metadata.TableName : metadata.TableName != null) {
      return false
    }
    if (this.Description != null ? this.Description != metadata.Description : metadata.Description != null) {
      return false
    }
    //Ensure inputs with different order are equal
    return CollectionUtils.isEqualCollection(this.Inputs, metadata.Inputs) && this.Output == metadata.Output
  }

  override function hashCode() : int {
    var result = (this.TableID != null ? this.TableID.hashCode() : 0) +
        (this.TableName != null ? this.TableName.hashCode() : 0) +
        (this.Description != null ? this.Description.hashCode() : 0)
    //Ensure hashcode of inputs with different order are equal
    result = 31 * result + (this.Inputs != null ? this.Inputs.sum(\elt -> elt.hashCode()) : 0) + (this.Output != null ? this.Output.hashCode() : 0)
    return result
  }
}
