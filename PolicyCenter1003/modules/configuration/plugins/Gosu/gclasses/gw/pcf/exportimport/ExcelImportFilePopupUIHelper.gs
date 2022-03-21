package gw.pcf.exportimport

uses gw.api.locale.DisplayKey
uses gw.api.util.LocationUtil
uses gw.api.web.util.PCWebFileUtil
uses gw.exportimport.validation.CustomizableImportValidationMapper
uses gw.exportimport.validation.ImportValidationResult

uses java.io.ByteArrayInputStream
uses java.io.InputStream
uses java.util.Date
uses gw.exportimport.AsynchronousExcelImporter
uses gw.exportimport.validation.ImportValidationSummaryLog
uses gw.api.web.job.JobWizardHelper
uses gw.api.web.WebFile
uses gw.exportimport.ExcelFileWriter
uses gw.api.tree.RowTreeRootNode
uses gw.exportimport.ExcelImporter
uses gw.web.productmodel.ProductModelSyncIssueWrapper
uses org.joda.time.Period
uses gw.util.StreamUtil

@Export
class ExcelImportFilePopupUIHelper {

  var _period : PolicyPeriod as Period
  var _isImported : Boolean as IsImported
  var _waiting : Boolean as Waiting
  var _validationResult : ImportValidationResult as ValidationResult
  var _numberOfRowsWithErrors : int as NumberOfRowsWithErrors
  var _summaryLog : ImportValidationSummaryLog as SummaryLog
  var _excelFile : WebFile as ExcelFile
  var _testPath : String as TestPath
  var _importDiffs : RowTreeRootNode as ImportDiffs
  var _excelImporter : ExcelImporter as ExcelImporter

  construct (policyPeriod : PolicyPeriod) {
    _period = policyPeriod
    _isImported = false
    _waiting = false
    _excelImporter = new ExcelImporter()
  }

  function import(asynchronousImporter : AsynchronousExcelImporter) {
    var importStream = getImportStream()
    asynchronousImporter.initialize(importStream, Period)
    asynchronousImporter.execute()
    Waiting = true
  }

  function importDone(asynchronousImporter : AsynchronousExcelImporter, jobWizardHelper : JobWizardHelper) {
    IsImported = true
    Waiting = false
    ValidationResult = asynchronousImporter.Result
    displayResults(jobWizardHelper)
  }

  function displayResults(jobWizardHelper : JobWizardHelper) {
    SummaryLog = ValidationResult.SummaryLog
    NumberOfRowsWithErrors = getNumberOfErrorRows()
    if (ValidationResult.hasErrors() ) {
      LocationUtil.addRequestScopedErrorMessage(
          ValidationResult.HasFatalErrors ? DisplayKey.get("Import.Alerts.Fatal") : DisplayKey.get("Import.Alerts.Errors") )
    }
    else {
      ValidationResult.SyncIssueWrappers.where( \ i -> i.ShouldDisplayDuringNormalSync ).each(\i -> jobWizardHelper.addSyncIssueToWebMessages( i as ProductModelSyncIssueWrapper ))
    }
    if ( ValidationResult.hasWarnings() ) {
      LocationUtil.addRequestScopedWarningMessage(DisplayKey.get("Import.Alerts.Warnings") )
    }
  }

  function exportLog() {
    var exportBytes = StreamUtil.toBytes(buildLog())
    var stream = new ByteArrayInputStream(exportBytes)
    PCWebFileUtil.copyStreamToClient("application/vnd.ms-word", "ImportLog.${SummaryLog.Type.DisplayName}_${Date.CurrentDate.XmlDateTime}.doc", stream, exportBytes.Count)
  }

  function getNumberOfErrorRows() : int {
    var errorRowCount = ValidationResult.Validations.length

    if ( ValidationResult.getGeneralValidation() != null ) {
      errorRowCount -= 1
    }

    return errorRowCount
  }

  function isShowChangesButtonVisible() : Boolean {
    return IsImported and ImportDiffs == null and not ValidationResult.HasFatalErrors
  }

  function showConfirmMessageForImportButton() : Boolean {
    return IsImported and ExcelImporter.showConfirmationMessageOnImport(getImportStream(), Period)
  }

  function isNoDifferencesLabelVisible() : Boolean {
    return ImportDiffs != null and ImportDiffs.NumChildren == 0
  }

  function isDiffTreePanelSetVisible() : Boolean {
    return ImportDiffs != null and ImportDiffs.NumChildren > 0
  }

  function createDiffTree() {
    ImportDiffs = ExcelImporter.createDiffTree(Period)
  }

  function getFatalErrorMessagesString(label : String) : String {
    if (ValidationResult.HasFatalErrors) {
      return
          label
              + CustomizableImportValidationMapper.rowValidationToString(ValidationResult.getGeneralValidation(), ImportValidationResult.ALL_ERRORS).trim()
    }
    return ""
  }

  function getErrorMessagesString(label : String) : String {
    if ( ValidationResult.HasNonFatalErrors) {
      var errorString = label
      // don't include fatal errors (errors on the general, non-row specified validation)...
      errorString += ValidationResult.Validations.subtract({ValidationResult.getGeneralValidation()}).orderBy(\ r -> r.Row )
          .map(\ r -> CustomizableImportValidationMapper.rowValidationToString(r, ImportValidationResult.ALL_ERRORS)).join("").trim()

      return errorString
    }

    return ""
  }

  function getWarningMessagesString(label : String) : String {
    if (ValidationResult?.hasWarnings()) {
      var warningString = label
      warningString += CustomizableImportValidationMapper.rowValidationToString(ValidationResult.getGeneralValidation(), ImportValidationResult.ALL_WARNINGS)
      warningString += ValidationResult.Validations.subtract({ValidationResult.getGeneralValidation()}).orderBy(\ r -> r.Row )
          .map(\ r -> CustomizableImportValidationMapper.rowValidationToString(r, ImportValidationResult.ALL_WARNINGS)).join("").trim()

      return warningString
    }
    return ""
  }

  function buildLog() : String {
    var exportString = DisplayKey.get("Import.SummaryLog.Summary", "\n\n")
    exportString += getFatalErrorMessagesString(DisplayKey.get("Import.Validation.FatalErrors", "", "\n\n"))
    if (not ValidationResult.HasFatalErrors) {
      exportString += SummaryLog.logAsString(NumberOfRowsWithErrors)
    }
    exportString += getErrorMessagesString(DisplayKey.get("Import.Validation.Errors", "\n\n", "\n\n"))
    exportString += getWarningMessagesString(DisplayKey.get("Import.Validation.Warnings", "\n\n", "\n\n"))
    return exportString
  }

  function getImportStream() : InputStream {
    return inTestMode() ? new java.io.FileInputStream(new java.io.File(TestPath)) : ExcelFile.InputStream
  }

  private function inTestMode() : boolean {
    return ExcelFile == null
  }
}