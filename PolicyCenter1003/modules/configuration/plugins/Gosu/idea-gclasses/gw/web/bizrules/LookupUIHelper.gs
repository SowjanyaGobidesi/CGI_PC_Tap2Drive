package gw.web.bizrules

uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.locale.DisplayKey
uses gw.api.path.Paths
uses gw.lang.reflect.TypeSystem
uses gw.api.util.DisplayableException
uses gw.lookup.LookupDefinitionDTO
uses gw.lookup.LookupTableDefinitionValidation
uses gw.plugin.Plugins
uses gw.plugin.lookup.LookupCreationPlugin
uses gw.plugin.lookup.LookupSourceColumnDTO
uses gw.validation.PCValidationContext

@Export
class LookupUIHelper {

  private var _lookupDefinition : LookupTableDefinition
  private var _lookupDefDTO : LookupDefinitionDTO as readonly LookupDefinitionDTO
  private var _lastGeneratedTableName : String = null
  private var _showExistenceMessage : boolean as readonly ShowExistenceMessage = false
  private var _showDeleteMessage : boolean as readonly ShowDeleteMessage = false

  construct() {
  }

  construct(lookupDef: LookupTableDefinition) {
    _lookupDefDTO = new LookupDefinitionDTO(lookupDef)
    _lookupDefinition = lookupDef
  }

  property get MessageDismissed() : boolean {
    return not _showExistenceMessage
  }

  property set MessageDismissed(value : boolean) {
    _showExistenceMessage = not value
  }

  /**
   * Find all existing lookup table definition
   * @return array of LookupTableDefinition
   */
  public static function findExistingLookups() : LookupTableDefinition[] {
    return Query.make(LookupTableDefinition).select().toTypedArray()
  }

  /**
   * Remove the given lookup table definitions
   * @param lookupDefs array of lookup table definitions
   */
  public function removeLookups(lookupDefs : LookupTableDefinition[]) {
    var lookupInUse = false
    lookupDefs.each(\lookupDef -> {
      if (lookupDef.IsLookupInUse) {
        lookupInUse = true
      } else {
        lookupDef.remove()
        lookupDef.Bundle.commit()
      }
    })
    _showDeleteMessage = lookupInUse
  }

  /**
   * Populate lookup columns of LookupDefinitionDTO
   */
  public function populateLookupDefinitionDTOAndColumns() {
    _lookupDefDTO.removeAllColumnDTOs()
    _lookupDefDTO.LookupColumns = getAllLookupTableColumnsForEntity()
  }

  /**
   * Populate a default name of LookupDefinitionDTO
   */
  public function populateDefaultName() {
    if (_lookupDefDTO.Name == _lastGeneratedTableName) {
      _lookupDefDTO.Name = generateTableName(TypeSystem.getByRelativeName(_lookupDefDTO.SourceTable).DisplayName)
      _lastGeneratedTableName = _lookupDefDTO.Name
    }
  }

  /**
   * Get available lookup table columns
   * @return array of LookupSourceColumnDTO
   */
  public property get AvailableLookupTableColumns() : LookupSourceColumnDTO[] {
    var columns = getAllLookupTableColumnsForEntity()
    columns.removeWhere(\column -> _lookupDefDTO.LookupColumns*.ColumnName.contains(column.ColumnName))
    return columns.toTypedArray()
  }

  /**
   * Remove lookup table column
   * @param lookupColumn lookup column
   */
  public function removeLookupTableColumn(lookupColumn : LookupSourceColumnDTO) {
    _lookupDefDTO.removeColumn(lookupColumn)
  }

  /**
   * Add lookup table column
   * @param lookupColumn lookup column
   */
  public function addLookupTableColumn(lookupColumn : LookupSourceColumnDTO) {
    _lookupDefDTO.addColumn(lookupColumn)
  }

  /**
   * Get lookup columns of LookupDefinitionDTO
   * @return list of LookupSourceColumnDTO
   */
  public property get LookupColumns() : List<LookupSourceColumnDTO> {
    return _lookupDefDTO.LookupColumns
  }

  /**
   * Commit lookup table definition
   */
  public function commitLookupTableDefinition() {
    _lookupDefDTO.populateLookupTableDefinitionAndColumns(_lookupDefinition)
    validateLookup()
    _lookupDefinition.Bundle.commit()
  }

  /**
   * Change other lookup columns to input
   * @param outputColumn lookup column
   */
  public function changeOtherLookupColumnsToInput(outputColumn : LookupSourceColumnDTO) {
    if (not _lookupDefDTO.Existence) {
      _lookupDefDTO.LookupColumns.where(\col -> col != outputColumn).each(\col -> { col.Input = true })
    } else {
      outputColumn.Input = true
      _showExistenceMessage = true
    }
  }

  /**
   * Process existence state
   */
  public function processExistenceState() {
    if (_lookupDefDTO.Existence) {
      _lookupDefDTO.LookupColumns.each(\col -> {
        _showExistenceMessage = col.Input == false or _showExistenceMessage == true
        col.Input = true
      })
    } else {
      _showExistenceMessage = false
    }
  }

  /**
   * Get option label for source table
   * @param tableName Table name
   * @return Relative name of the table
   */
  public function getOptionLabelForSourceTable(tableName : String) : String {
    try {
      return gw.lang.reflect.TypeSystem.getByRelativeName(tableName)?.DisplayName
    } catch (e : ClassNotFoundException) {
      return tableName
    }
  }

  /**
   * Validate table code is unique and not in-use.
   * @return Error message if the table code is in-use.
   */
  public function validateTableCodeIsInUse() : String {
    var isTableCodeUnique = Query.make(RuleLookupRequestDef).compare(RuleLookupRequestDef#TableID, Equals, _lookupDefDTO.TableCode).select().isEmpty()
    if (not isTableCodeUnique) {
      return DisplayKey.get("Validation.Lookup.LookupTableDefinition.TableCodeIsNotUnique", _lookupDefDTO.TableCode)
    }
    return null
  }

  private function generateTableName(possibleName : String) : String {
    var similarNames = Query.make(LookupTableDefinition)
        .startsWith(LookupTableDefinition#TableName, possibleName, false)
        .select({QuerySelectColumns.path(Paths.make(LookupTableDefinition#TableName))})
        .transformQueryRow(\row -> row.getColumn(0) as String)
        .toList()

    var checkUniqueName = possibleName
    var counter = 1
    while (similarNames.contains(checkUniqueName)) {
      checkUniqueName = possibleName + counter
      counter++
    }
    return checkUniqueName
  }

  private function getAllLookupTableColumnsForEntity() : List<LookupSourceColumnDTO> {
    var plugin = Plugins.get(LookupCreationPlugin)
    var columns = plugin.getLookupSourceColumns(_lookupDefDTO)
    return columns
  }

  private function validateLookup() {
    // When lookup is in-use, only table name/ table description can be udpated
    if (_lookupDefinition.IsLookupInUse && _lookupDefinition.getChangedFields().hasMatch(\field -> field != LookupTableDefinition.TABLENAME_PROP.Name && field != LookupTableDefinition.TABLEDESC_PROP.Name)) {
      throw new DisplayableException(DisplayKey.get("Web.BizRules.Lookup.LookupPage.EditInUseLookupAlert", _lookupDefinition.DisplayName, _lookupDefinition.RulesUsingLookup*.Name.join('\n')))
    }
    var context = new PCValidationContext(ValidationLevel.TC_DEFAULT)
    var validator = new LookupTableDefinitionValidation(context, _lookupDefinition)
    validator.validate()
    var errors = context.Result.ErrorMessages.toList()

    if(!errors.isEmpty()) {
      var uiErrors = errors.map(\error -> {
        if(error.equals(DisplayKey.get("Validation.Lookup.LookupTableDefinition.MissingInput", _lookupDefinition.DisplayName))) {
          return DisplayKey.get("Web.BizRules.Lookup.LookupPage.InputColumnError")
        }
        if(error.equals(DisplayKey.get("Validation.Lookup.LookupTableDefinition.HasOutputForExistence", _lookupDefinition.DisplayName))) {
          return DisplayKey.get("Web.BizRules.Lookup.LookupPage.ExistenceError")
        }
        if(error.equals(DisplayKey.get("Validation.Lookup.LookupTableDefinition.MissingOutputForNonExistence", _lookupDefinition.DisplayName))) {
          return DisplayKey.get("Web.BizRules.Lookup.LookupPage.NonExistenceError")
        }
        return error
      })
      _showExistenceMessage = false
      throw new DisplayableException(uiErrors.join('\n\n'))
    }
  }
}
