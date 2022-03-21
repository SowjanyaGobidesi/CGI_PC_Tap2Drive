package gw.pcf.rating.ratebook

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.web.WebFile
uses gw.plugin.Plugins
uses gw.plugin.rateflow.RateBookEvent
uses gw.plugin.rateflow.RateBookPreloadPlugin
uses gw.rating.rtm.domain.migration.RateBookImporter
uses gw.rating.rtm.mock.MockWebFile
uses gw.rating.rtm.util.WebFileWrapper

uses java.io.File
uses java.io.FileInputStream

@Export
class RateBookXMLImportUIHelper {
  var _importer : RateBookImporter as Importer
  var _importFile : WebFileWrapper as ImportFileWrapper
  var _testPath : String as TestPath
  var _errorLogs : String[] as ErrorLogs

  construct(importer : RateBookImporter, importFile : WebFileWrapper, testPath : String, errorLogs : String[]) {
    _importer = importer
    _importFile = importFile
    _testPath = testPath
    _errorLogs = errorLogs
  }

  //Creating a test import because tests will complain for unknown gosu/class if we use "doImport" for testFile.
  function doTestImport() {
    var book = Importer.import(ImportFile)
    if (book == null) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Rating.Import.RateBookAlreadyExists"))
    }
    pcf.RateBookDetail.go(book, true, Importer.getWarnings())
    return
  }

  /**
   * Need this for testing.
   *
   * @return imported rate book on success, <code>null</code> else
   */
  function doServerImport(): RateBook {
    checkValidPath()
    if(!inTestMode() and Importer.isValidBeforeCommit(ImportFile)) {
      Importer.import()
      var book = Importer.ImportedBook
      if (book == null) {
        throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Rating.Import.RateBookAlreadyExists"))
      }

      Plugins.get(RateBookPreloadPlugin)?.update(RateBookEvent.IMPORT)

      return book
    } else {
      ErrorLogs = Importer.getPLLevelErrors()
      ErrorLogs.each(\ error -> PCLoggerCategory.RATING.error(error))
      return null
    }
  }

  /**
   * This code enables testing of the import feature. It checks if we are in 'Test' mode
   * and if so reads the path from a different widget (HIdden Input) that is accessible
   * to our smoke tests.
   */
  function doImport() {
    var book = doServerImport()
    if (book != null) {
      pcf.RateBookDetail.go(book, true, Importer.getWarnings())
    }
  }

  private function checkValidPath() {
    if (TestPath.Empty and ImportFile == null) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Rating.Import.MissingPath"))
    }
  }

  property get ImportFile() : WebFile {
    return inTestMode() ? TestFile : ImportFileWrapper.File
  }

  private function inTestMode() : boolean {
    return ImportFileWrapper == null || ImportFileWrapper.File == null
  }

  private property get TestFile() : gw.api.web.WebFile {
    //noinspection IOResourceOpenedButNotSafelyClosed This stream is returned by the function
    var is = new FileInputStream(new File(TestPath))
    return new MockWebFile(is)
  }

}