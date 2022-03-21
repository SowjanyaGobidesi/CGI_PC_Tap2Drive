package gw.pcf.rating.ratebook

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException


@Export
class RateBookDetailsScreenUIHelper {

  var _rateBook: RateBook as RateBook

  construct(rateBook : RateBook) {
    _rateBook = rateBook
  }

  function removeCurrentBook() {
    if (_rateBook.ExportLock) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.CannotDeleteRateBookLockedForExport"))
    }
    _rateBook.removeRateBook()
    gw.transaction.Transaction.getCurrent().commit()
    pcf.RateBooks.go(_rateBook)
  }

  function processInTx(bloc : block(book : RateBook)) {
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      var bundled = bundle.add(_rateBook)
      bloc(bundled)
    })
  }

  function getWarningMessages(warnings : List<String>) : String {
    return warnings.join("\n")
  }

  function progressBarPercentage(exportType : RateBookExportType) : Double {
    if(exportType != null){
      var exportResult = retrieveExportResultByType(exportType)
      if (exportResult != null) {
        return exportResult.CompletionPercentage
      }
    }
    return 0
  }

  function progressBarStatus(exportType : RateBookExportType) : String {
    if(exportType != null){
      var exportResult = retrieveExportResultByType(exportType)
      if (exportType == RateBookExportType.TC_EXCEL) {
        if(exportResult.ExportFailed) {
          return DisplayKey.get("Web.Rating.RateBooks.ExportToSpreadsheetFailed")
        }
        return DisplayKey.get("Web.Rating.RateBooks.ProcessingExportToSpreadsheet", exportResult != null ? exportResult.ExportedCount : 0, _rateBook.TotalItemsToProcessInRateBookExport)
      } else {
        if(exportResult.ExportFailed) {
          return DisplayKey.get("Web.Rating.RateBooks.ExportToXMLFailed")
        }
        return DisplayKey.get("Web.Rating.RateBooks.ProcessingExportToXML", exportResult != null ? exportResult.ExportedCount : 0, _rateBook.TotalItemsToProcessInRateBookExport)
      }
    }
    return ""
  }

  function isExportCompleted(exportType : RateBookExportType) : boolean {
    var exportResult = retrieveExportResultByType(exportType)
    if(exportResult != null){
      return exportResult.CompletionPercentage == 100
    }
    return false
  }

  function isExportFailed(exportType : RateBookExportType) : boolean {
    return retrieveExportResultByType(exportType).ExportFailed
  }

  function getExportResultDateTimeStampLabel(exportType : RateBookExportType) : String {
    if (exportType == RateBookExportType.TC_EXCEL) {
      if(_rateBook.ExcelExportResultFromDB.ExportFailed) {
        return DisplayKey.get("Web.Rating.RateBooks.FailedExcelExportResultDateTimeStamp")
      }
      return DisplayKey.get("Web.Rating.RateBooks.ExcelExportResultDateTimeStamp")
    }
    if (exportType == RateBookExportType.TC_XML){
      if(_rateBook.XMLExportResultFromDB.ExportFailed) {
        return DisplayKey.get("Web.Rating.RateBooks.FailedXMLExportResultDateTimeStamp")
      }
      return DisplayKey.get("Web.Rating.RateBooks.XMLExportResultDateTimeStamp")
    }
    throw new IllegalArgumentException("Unexpected type for rate book export " + exportType)
  }

  private function retrieveExportResultByType(exportType : RateBookExportType) : RateBookExportResult {
    if (exportType == RateBookExportType.TC_EXCEL) {
      return _rateBook.ExcelExportResultFromDB
    }
    if (exportType == RateBookExportType.TC_XML){
      return _rateBook.XMLExportResultFromDB
    }
    throw new IllegalArgumentException("Unexpected type for rate book export " + exportType)
  }
}

