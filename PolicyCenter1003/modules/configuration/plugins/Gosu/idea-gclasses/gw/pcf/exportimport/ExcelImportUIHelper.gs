package gw.pcf.exportimport

uses com.guidewire.commons.entity.EntityBundleVersion
uses com.guidewire.pl.system.bundle.EntityBundleImpl
uses gw.api.locale.DisplayKey
uses gw.api.system.PCConfigParameters
uses gw.api.util.DisplayableException
uses gw.api.util.LocaleUtil
uses gw.api.validation.EntityValidationException
uses gw.internal.xml.util.StreamUtil
uses gw.pl.util.StringUtil
uses gw.rating.flow.util.QueryUtils
uses gw.rating.rtm.RateTableFactory
uses gw.rating.rtm.domain.ErrorCollector
uses gw.rating.rtm.domain.RateTableFactorListController
uses gw.rating.rtm.domain.table.RateBookModel
uses gw.rating.rtm.domain.table.RateTableModel
uses gw.rating.rtm.excel.ExcelExport
uses gw.rating.rtm.excel.ExcelHeader
uses gw.rating.rtm.excel.ExcelSheetPopulator
uses gw.rating.rtm.excel.RateTableErrorExportVisitor
uses org.apache.poi.xssf.usermodel.XSSFSheet
uses org.apache.poi.xssf.usermodel.XSSFWorkbook

uses java.security.MessageDigest

@Export
class ExcelImportUIHelper {

  var _workbook: XSSFWorkbook as Workbook
  var _errorValidationMap: Map<RateTableDefinition, ErrorCollector>
  var _errorScanMap : Map<RateTableDefinition, ErrorCollector>
  var _routineWorksheets: List<XSSFSheet>as RoutineWorksheets
  var _tableWorksheets: List<XSSFSheet>as RateTableWorksheets
  var _overviewWorksheet: XSSFSheet as OverviewWorksheet
  var _invalidSheets: List<XSSFSheet>as InvalidWorksheets
  var _rateTableModelList: List<RateTableModel>as readonly RateTableModelList
  var _scanSuccessful: boolean as readonly ScanCompletedSuccessfully
  var _populatedControllerList: boolean
  var _rateBook: RateBook as RateBook
  var _controllers: List<RateTableFactorListController>
  protected var _scanResultMap: Map<RateTable, ExcelSheetPopulator>
  var _importRateTableStatus: Map<String, importedRateTableStatus>as readonly ImportRateTableStatus

  var _stateOfRateBookRateTablesInEditMode: Set<String>

  var _beforeImportBundleVersion: EntityBundleVersion
  var _beforeImportHashCode: byte[]

  enum importedRateTableStatus {
    NEW_RATETABLE("rate_table_import_add", DisplayKey.get("Web.Rating.Import.Add")),
    CHANGED_RATETABLE("rate_table_import_edit", DisplayKey.get("Web.Rating.Import.ChangedRateTable")),
    TOO_LARGE_RATETABLE("rate_table_import_question", DisplayKey.get("Web.Rating.Import.TooLarge")),
    NEW_AND_TOO_LARGE_RATETABLE("rate_table_import_question", DisplayKey.get("Web.Rating.Import.TooLarge")),

    var _iconName: String as readonly Icon
    var _displayKey: String

    private construct(iconName: String, displayKey: String) {
      _iconName = iconName
      _displayKey = displayKey
    }

    property get IconLabel(): String {
      return _displayKey
    }
  }


  construct(rateBook: RateBook) {
    _rateBook = rateBook
    _stateOfRateBookRateTablesInEditMode = _rateBook.RateTables*.Definition*.TableCode.toSet()
    resetUIHelper()
  }

  property get ErrorCollectorMap() : Map<RateTableDefinition, ErrorCollector> {
    var allErrors = new HashMap<RateTableDefinition, ErrorCollector>(_errorValidationMap)
    allErrors.putAll(_errorScanMap)
    return allErrors
  }

  property get HasScanErrors() : boolean {
    return not _errorScanMap.Empty
  }

  property get HasValidationErrors() : boolean {
    return not _errorValidationMap.Empty
  }

  property get HasErrors() : boolean {
    return HasScanErrors or HasValidationErrors
  }

  function exportErrorFile() {
    if (Workbook == null) {
      throw new IllegalStateException(DisplayKey.get("Web.Rating.Errors.NoImportFileFound"))
    }
    //create model with import tables
    var bookModelWithErrors = new RateBookModel(_rateBook, RateTableModelsWithErrors)
    new ExcelExport().exportRateTableImportErrors(Workbook, bookModelWithErrors, ErrorCollectorMap)
  }

  property get RateTableModelsWithErrors(): List<RateTableModel> {
    return _rateTableModelList.where(\tableModel -> ErrorCollectorMap.keySet().contains(tableModel.RateTableDefinition))
  }

  function scan(workbook: XSSFWorkbook) {
    //take snapshot of rate tables
    var currentCodes = _rateBook.RateTables*.Definition*.TableCode

    resetUIHelper()
    _beforeImportBundleVersion = (gw.transaction.Transaction.Current as EntityBundleImpl).pushVersion()

    _rateBook.RateTables.where(\elt -> not currentCodes.contains(elt.Definition.TableCode)).each(\elt -> elt.removeWithFactors())
    Workbook = workbook
    partitionWorksheets()
    populateScanResultMap()
    populateModelsForSmallRateTables()
    _beforeImportHashCode = RateBookHashCode
    _scanSuccessful = true
  }

  property get TableCodesOfAddedTables(): List<String> {
    return _importRateTableStatus.filterByValues(\v -> v == NEW_RATETABLE).Keys.toList()
  }

  property get TableCodesOfChangedTables(): List<String> {
    return _importRateTableStatus.filterByValues(\v -> v == CHANGED_RATETABLE).Keys.toList()
  }

  property get TableCodesOfLargeTables(): List<String> {
    return _importRateTableStatus.filterByValues(\v -> v == TOO_LARGE_RATETABLE or v == NEW_AND_TOO_LARGE_RATETABLE).Keys.toList()
  }

  /**
   * Used to import a rate table from an excel spreadsheet when the table being imported
   * is not already known. This function will determine which table to import by looking
   * at the table code on the excel spreadsheet. The table will undergo normal rate table
   * validation, checking for things like duplicate rows, missing factors, and so on.
   */
  function doImportRateTables() {

    if (HasScanErrors) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.RateTableExcelImportUnresolvedErrors"))
    }

    if (Workbook == null) {
      return
    }

    if (not _populatedControllerList) {
      _scanResultMap.eachKeyAndValue(\rateTable, sheetPopulator -> {
        var controller = getOrCreateController(rateTable, sheetPopulator)
        var tableCode = rateTable.Definition.TableCode
        if (_importRateTableStatus.get(tableCode) == TOO_LARGE_RATETABLE or _importRateTableStatus.get(tableCode) == NEW_AND_TOO_LARGE_RATETABLE) {
          controller.createAndPopulateRateTableModel(rateTable)

          //update the too large rate tables status.  On scan we did not know if they were neww, changed, or the same
          //but now on update we will know if the large rate table is a new, changed, or the same.
          //This is only used if update fails.
          updateTooLargeRateTableIcons(tableCode, controller)

          _rateTableModelList.add(controller.RateTableModel)
        }
        try {
          if (controller.hasErrors()) {
            _errorScanMap.put(rateTable.Definition, controller.ErrorCollector)
          } else {
            controller.validateAndPersistRateTableModel()
          }
        } catch (e: EntityValidationException) {
          _errorValidationMap.put(rateTable.Definition, controller.ErrorCollector)
        }
      })
      _populatedControllerList = true
    }

    if (HasErrors) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.RateTableExcelImportValidationError", ImportErrorsRateTableDefinitionCodes,
          DisplayKey.get("Web.Rating.Export.Errors")))
    }
  }

  //returns actual rate tables removed
  function removeTables(tables: List<RateTable>): List<RateTable> {
    var importTableList = _scanResultMap.Keys.toTypedArray()
    var removedTables = new ArrayList<RateTable>()
    importTableList.each(\elt -> {
      if (tables.contains(elt)) {
        _scanResultMap.remove(elt)
        _errorScanMap.remove(elt.Definition)
        _errorValidationMap.remove(elt.Definition)
        _importRateTableStatus.remove(elt.Definition.TableCode)
        removedTables.add(elt)
      }
    })
    _stateOfRateBookRateTablesInEditMode.removeAll(tables*.Definition*.TableCode.fastList())
    return removedTables
  }

  public function getIcon(rt: RateTable): String {
    return _importRateTableStatus.get(rt.Definition.TableCode)?.Icon
  }

  public function getIconLabel(rt: RateTable): String {
    return _importRateTableStatus.get(rt.Definition.TableCode)?.IconLabel
  }

  /*
    Import should be disabled if there is any change to the ratebook after any import is done during during the same commit.

    Currently, when tables are reimported, a bundle rollback is done to before the previous import.  This results in changes done after the previous import being lost.
   */
  public property get ReimportDisabled(): boolean {
    if (_beforeImportHashCode == null) {
      return false
    }

    return _beforeImportHashCode != RateBookHashCode
  }

  /*********
   * private methods
   **************/

  /*
   * On import if the Rate Tables that have rows are less than
   * SmallRateTableRowLimit which is set in config.xml, then it will create and
   * populate the rate tabble model with the imported rows.
   */
  private function populateModelsForSmallRateTables() {
    _scanResultMap.eachKeyAndValue(\rateTable, populator -> {
      var tableCode = rateTable.Definition.TableCode

      if (populator.NumberOfRateFactorRows <= PCConfigParameters.SmallRateTableRowLimit.Value) {
        var controller = getOrCreateController(rateTable, populator)
        controller.createAndPopulateRateTableModel(rateTable)
        _rateTableModelList.add(controller.RateTableModel)
        if (controller.hasErrors()) {
          _errorScanMap.put(rateTable.Definition, controller.ErrorCollector)
        }

        if (not(_importRateTableStatus.get(tableCode) == NEW_RATETABLE or controller.RateTableModel.areTableRowsEqual())) { //If the data for the RateTable is not the same then it is being overwritten
          _importRateTableStatus.put(tableCode, CHANGED_RATETABLE)
        }
      } else { // RateTable was too large we are not going to load the rows
        if (_importRateTableStatus.get(tableCode) == NEW_RATETABLE) {
          _importRateTableStatus.put(tableCode, NEW_AND_TOO_LARGE_RATETABLE)
        } else {
          _importRateTableStatus.put(tableCode, TOO_LARGE_RATETABLE)
        }
      }
    })

    if (not ErrorCollectorMap.Empty) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.RateTableExcelImportValidationError", ImportErrorsRateTableDefinitionCodes,
          DisplayKey.get("Web.Rating.Export.Errors")))
    }
  }

  private function partitionWorksheets(): void {
    // check if the first sheet is an overview/table of contents sheet
    var firstSheet = Workbook.getSheetAt(0)
    var nextSheetNumber = 0
    if (firstSheet.IsRateBookOverview) {
      OverviewWorksheet = firstSheet
      nextSheetNumber++
    }

    // for the remaining sheets partition by sheet type
    for (sheetNumber in nextSheetNumber..|Workbook.NumberOfSheets) {
      var nextSheet = Workbook.getSheetAt(sheetNumber)
      if (nextSheet.IsRateRoutine && isValidRateRoutine(nextSheet)) {
        RoutineWorksheets.add(nextSheet)
        continue
      }

      if (nextSheet.IsRateTable && isValidRateTable(nextSheet)) {
        RateTableWorksheets.add(nextSheet)
        continue
      }

      InvalidWorksheets.add(nextSheet)
    }

    if (InvalidWorksheets.HasElements) {
      var invalidWorksheetNames = StringUtil.formatObjectList(InvalidWorksheets.map(\elt -> elt.SheetName), ", ")
      resetUIHelper()
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.RateTableExcelImportInvalidSheet", invalidWorksheetNames))
    }
  }

  // this function isnt really needed right now. but i'll keep it anyway
  private function isValidRateRoutine(nextSheet: XSSFSheet): boolean {

    // the language code is different or not specified
    var localeRow = nextSheet.getRow(ExcelHeader.RATE_ROUTINE_LOCALE_ROW)
    if (LanguageType.get(localeRow.getCell(2)?.StringCellValue) != LocaleUtil.CurrentLanguageType) {
      return false
    }

    return true
  }

  private function isValidRateTable(nextSheet: XSSFSheet): boolean {

    // the language code is different or not specified
    var localeRow = nextSheet.getRow(ExcelHeader.RATE_TABLE_LOCALE_ROW)
    if (LanguageType.get(localeRow.getCell(1)?.StringCellValue) != LocaleUtil.CurrentLanguageType) {
      return false
    }

    var rateTable = getRateTable(getTableCode(nextSheet), _rateBook)
    if (rateTable == null) {
      return false
    }

    checkTableIsCompatible(nextSheet, rateTable)
    return true
  }

  private function checkTableIsCompatible(sheet: XSSFSheet, rateTable: RateTable) {
    var sheetPopulator = new ExcelSheetPopulator(sheet)
    if (!sheetPopulator.isCompatibleTable(rateTable)) {
      var tableName = rateTable.Definition.TableName
      resetUIHelper()
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.IncompatibleExcelFile", tableName))
    }
  }

  private function populateScanResultMap() {
    var tableCodesImported = new ArrayList<String>()
    var duplicateTableCodes = new HashSet<String>()

    for (sheet in RateTableWorksheets){
      var rateTableCode = getTableCode(sheet)
      if (tableCodesImported.contains(rateTableCode)) {
        duplicateTableCodes.add(rateTableCode)
      } else {
        tableCodesImported.add(rateTableCode)
        var rateTable = getRateTable(rateTableCode, _rateBook)
        var sheetPopulator = new ExcelSheetPopulator(sheet)
        _scanResultMap.put(rateTable, sheetPopulator)
      }
    }

    if (duplicateTableCodes.HasElements) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.RateTableExcelImportDuplicateRateTableCode", duplicateTableCodes.join(", ")))
    }
  }

  private function getOrCreateController(rateTable: RateTable, sheetPopulator: ExcelSheetPopulator): RateTableFactorListController {
    var controller = _controllers.firstWhere(\controller -> controller.RateTableModel.RateTable == rateTable)
    if (controller != null)
      return controller

    var newController = RateTableFactorListController.createExcelBasedController(sheetPopulator)
    _controllers.add(newController)
    return newController
  }

  private function getTableCode(worksheet: XSSFSheet): String {
    return worksheet.getRow(RateTableErrorExportVisitor.RATE_TABLE_CODE_PROPERTY_ROW)?.getCell(RateTableErrorExportVisitor.RATE_TABLE_CODE_PROPERTY_CELL)?.StringCellValue
  }

  private function getRateTable(tableCode: String, rateBook: RateBook): RateTable {
    var possibleRateTable = rateBook.RateTables.firstWhere(\table -> table.Definition.TableCode == tableCode)
    if (possibleRateTable != null) {
      /*
       * Entering edit mode the user can click remove rate table, but the rateBook has not been refreshed with the
       * removed rate table.  We are keeping the state of the current rate tables that exist in this ratebook.
       * If the rate table is not in the current state, then it is considered a new rate table
       */
      if (not _stateOfRateBookRateTablesInEditMode.contains(possibleRateTable.Definition.TableCode)) {
        _importRateTableStatus.put(tableCode, NEW_RATETABLE)
        _stateOfRateBookRateTablesInEditMode.add(possibleRateTable.Definition.TableCode)
      }
      return possibleRateTable
    }

    var tableDefinition = QueryUtils.getRateTableDefinitionForCodeAndLine(tableCode, rateBook.PolicyLine)
    if (tableDefinition == null) {
      return null
    }
    _importRateTableStatus.put(tableCode, NEW_RATETABLE)
    var rateTable = RateTableFactory.createNew(rateBook, tableDefinition)
    _stateOfRateBookRateTablesInEditMode.add(rateTable.Definition.TableCode)
    return rateTable
  }

  private function resetUIHelper() {
    resetScanData()
    resetImportData()
  }

  private function resetScanData() {
    _scanResultMap = {}
    _importRateTableStatus = {}
    RateTableWorksheets = {}
    RoutineWorksheets = {}
    InvalidWorksheets = {}
    OverviewWorksheet = null
    if (_beforeImportBundleVersion != null) {
      var currentBundle = gw.transaction.Transaction.Current as EntityBundleImpl
      currentBundle.rollbackVersion(_beforeImportBundleVersion)
      _beforeImportBundleVersion = (gw.transaction.Transaction.Current as EntityBundleImpl).pushVersion()
    }
  }

  private function resetImportData() {
    _controllers = {}
    _errorScanMap = {}
    _errorValidationMap = {}
    _rateTableModelList = {}
    _populatedControllerList = false
  }

  private property get RateBookHashCode(): byte[] {
    var md = MessageDigest.getInstance("MD5")
    md.reset()
    _rateBook.ChangedProperties.where(\elt -> not elt.FeatureType.Array).sortBy(\elt -> elt.Name).each(\elt -> {
      var fieldValue = _rateBook.getFieldValue(elt).toString()
      md.update(StreamUtil.toBytes(elt.Name))
      md.update(StreamUtil.toBytes(fieldValue))
    })
    _rateBook.RateTables*.Definition*.TableCode.sort().each(\code -> {
      md.update(StreamUtil.toBytes(code))
    })
    _rateBook.CalcRoutines*.Code.sort().each(\code -> {
      md.update(StreamUtil.toBytes(code))
    })
    return md.digest()
  }

  private property get ImportErrorsRateTableDefinitionCodes() : String {
    return ErrorCollectorMap.Keys.map(\elt -> elt.TableCode).join(",")
  }

  private function updateTooLargeRateTableIcons(tableCode : String, controller : RateTableFactorListController) {
    if (_importRateTableStatus.get(tableCode) == NEW_AND_TOO_LARGE_RATETABLE) {
      _importRateTableStatus.put(tableCode, NEW_RATETABLE)
    } else if (controller.RateTableModel.areTableRowsEqual()) {
      _importRateTableStatus.remove(tableCode)
    } else {
      _importRateTableStatus.put(tableCode, CHANGED_RATETABLE)
    }
  }
}
