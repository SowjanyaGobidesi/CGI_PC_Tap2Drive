package gw.pcf.rating.impact

uses gw.api.web.document.DocumentsHelper
uses gw.document.DocumentContentsInfo
uses gw.rating.flow.util.QueryUtils
uses gw.rating.impact.ImpactBatchUtil
uses gw.rating.impact.RatingExportUtil
uses gw.rating.rtm.excel.ExcelExport
uses gw.util.concurrent.LocklessLazyVar

uses java.util.Set
uses gw.api.database.Query
uses java.util.List

@Export
class ImpactTestingPrepareUIHelper {

  var _testCase : ImpactTestingTestCase
  var _policyLinePatternCodes = new LocklessLazyVar<Set<String>>() {
    override function init(): Set<String> {
      return RelevantLinePatternCodesForRateBooks
    }
  }

  construct(testCase : ImpactTestingTestCase) {
    _testCase = testCase
  }

  function exportPeriodsToExcel() {
    _testCase.Result = new ImpactTestCaseResult()
    _testCase.Result.Complete = false
    _testCase.Bundle.commit()
    RatingExportUtil.CANCEL_SIGNAL.Cancel = false
    ImpactBatchUtil.startBatchJob(TC_IMPACTTESTINGEXPORT)
  }

  function cancelCreateExportFileJob() : void{
    ImpactBatchUtil.cancelBatchJob(TC_IMPACTTESTINGEXPORT)
    _testCase.Result = null
    RatingExportUtil.CANCEL_SIGNAL.Cancel = true
    _testCase.Bundle.commit()
  }

  function downloadExportFile() {
    // Currently we only support a single ImpactTestingTestCase
    var impactTestCase = Query.make(ImpactTestingTestCase).select().first()
    var title = RatingExportUtil.getFileName(impactTestCase)

    using (var inputStream = impactTestCase.Result.Data.toInputStream()) {
      var excelFileName = "${title}.xlsx"
      var dci = new DocumentContentsInfo(DocumentContentsInfo.ContentResponseType.DOCUMENT_CONTENTS, inputStream, ExcelExport.EXCEL_MIME_TYPE)
      DocumentsHelper.renderDocumentContentsWithDownloadDisposition(excelFileName, dci)
    }
  }

  private function getSelectableBooks(linePatternCodes : Set<String>) : List<RateBook> {
    if (linePatternCodes.size() == 0) {
      return QueryUtils.AllRateBooks
    } else if (linePatternCodes.size() == 1) {
      return QueryUtils.getRateBooksForLine(linePatternCodes.single())
    } else {
      return QueryUtils.getRateBooksForMultipleLines(linePatternCodes.toTypedArray())
    }
  }

  /**
   * Has side effect of updating TestCase.Progress
   */
  property get AllSelectableActiveRateBooks() : List<RateBook> {
    var books = getSelectableBooks(_policyLinePatternCodes.get())
        .where(\ b -> b.Status == TC_ACTIVE).toSet()

    if (_testCase.Ratebooks.Count != 0) {
      books.removeAll(_testCase.Ratebooks.map(\ i -> i.RateBook)?.toList())
    }
    return books.toList()
  }

  property get AllSelectableStageOrApprovedRateBooks() : List<RateBook> {
    var books = getSelectableBooks(_policyLinePatternCodes.get())
        .where(\ b -> b.Status == TC_STAGE or b.Status == TC_APPROVED)

    if (_testCase.Ratebooks.Count != 0) {
      books.removeAll(_testCase.Ratebooks.map(\ i -> i.RateBook)?.toList())
    }
    return books
  }

  function selectRateBooks(rateBooks : RateBook[]) {
     rateBooks.each(\ c -> {
       var iaRateBook = new ImpactTestingRateBook()
       iaRateBook.ImpactTestingTestCase = _testCase
       iaRateBook.RateBook = c
     })
     invalidateTestQuotes()
     _testCase.Bundle.commit()
  }

  function unselectRateBooks(rateBooks : ImpactTestingRateBook[]) {
    rateBooks.each(\ i -> {
      _testCase.removeFromRatebooks(i)
    })
    invalidateTestQuotes()
    _testCase.Bundle.commit()
  }

  function invalidateTestQuotes() {
     _testCase.Periods.each(\ i -> {i.TestRunProgress = TC_WAITING
                                    i.TestRunErrorMessage = null
                                    i.TestRunResult = null
                                    if (i.TestPeriod != null) {
                                      i.TestPeriod.setFieldValue("Locked", false)
                                      i.TestPeriod.edit()
                                    }
     })

  }

  /**
   * Infer the relevant PolicyLinePatternCodes from the PolicyPeriods of the TestCase
   */
  private property get RelevantLinePatternCodesForRateBooks() : Set<String> {
    return _testCase.Periods*.OriginalPeriod*.LinePatterns*.PublicID.toSet()
  }

  property get SelectedRateBooks()  : ImpactTestingRateBook[] {
    return this._testCase.Ratebooks
  }
}
