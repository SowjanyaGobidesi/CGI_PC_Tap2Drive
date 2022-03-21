package gw.lookup

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.entity.IEntityType
uses gw.lang.reflect.TypeSystem
uses gw.plugin.Plugins
uses gw.plugin.lookup.LookupCreationPlugin
uses gw.plugin.lookup.LookupSourceColumnDTO
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext

@Export
class LookupTableDefinitionValidation extends PCValidationBase {

  private var _definition : LookupTableDefinition
  private var _criticalFailure : boolean as readonly CriticalFailure = false

  public construct(valContext : PCValidationContext, definition : LookupTableDefinition) {
    super(valContext)
    _definition = definition
  }

  protected override function validateImpl() {
    Context.addToVisited(this, "validateImpl")

    if (_definition.IsEntityBackedLookupTable) {
      validateSystemTableEntityBackedTableExists()
      if (_criticalFailure) {
        return
      }
    }

    validateColumnDataNamesAndTypes()
    validateAtLeastOneInputColumn()
    validateCorrectNumberOfOutputColumns()
  }

  private function validateSystemTableEntityBackedTableExists() {
    var addError = false
    try {
      var type = TypeSystem.getByRelativeName(_definition.EntityName)
      addError = not (type typeis IEntityType)
    } catch(ce : ClassNotFoundException) {
      addError = true
    }

    if (addError) {
      _criticalFailure = true
      Result.addError(_definition, TC_DEFAULT, DisplayKey.get("Validation.Lookup.LookupTableDefinition.BackingSystemTableNotFound", _definition.DisplayName, _definition.EntityName))
    }
  }
  private function validateColumnDataNamesAndTypes() {
    var plugin = Plugins.get(LookupCreationPlugin)
    var existingColumns : List<LookupSourceColumnDTO>

    existingColumns = plugin.getLookupSourceColumns(new LookupDefinitionDTO(_definition))

    _definition.AllInputsAndOutput.each(\columnToCheck -> {
      try {
        var existingColumn = existingColumns.singleWhere(\elt -> elt.ColumnName == columnToCheck.ColumnName)
        if (existingColumn.DataType.Name != columnToCheck.DataType) {
          Result.addError(_definition, ValidationLevel.TC_DEFAULT, DisplayKey.get("Validation.Lookup.LookupTableDefinition.ColumnDataTypeMismatch",
              _definition.DisplayName, _definition.EntityName, columnToCheck.ColumnName, columnToCheck.DataType, existingColumn.DataType))
        }
      } catch (exception : IllegalStateException) { // .singleWhere fails because column was not found
        Result.addError(_definition, ValidationLevel.TC_DEFAULT, DisplayKey.get("Validation.Lookup.LookupTableDefinition.ColumnNameMismatch",
            _definition.DisplayName, _definition.EntityName, columnToCheck.ColumnName, columnToCheck.DataType))
      }
    })
  }

  private function validateAtLeastOneInputColumn() {
    if(_definition.Inputs.IsEmpty) {
      Result.addError(_definition, ValidationLevel.TC_DEFAULT, DisplayKey.get("Validation.Lookup.LookupTableDefinition.MissingInput", _definition.DisplayName))
    }
  }

  private function validateCorrectNumberOfOutputColumns() {
    if(_definition.Existence and _definition.Output != null) {
      Result.addError(_definition, ValidationLevel.TC_DEFAULT, DisplayKey.get("Validation.Lookup.LookupTableDefinition.HasOutputForExistence", _definition.DisplayName))
    }

    if(not _definition.Existence and _definition.Output == null) {
      Result.addError(_definition, ValidationLevel.TC_DEFAULT, DisplayKey.get("Validation.Lookup.LookupTableDefinition.MissingOutputForNonExistence", _definition.DisplayName))
    }
  }
}