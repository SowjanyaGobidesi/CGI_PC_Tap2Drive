package gw.pcf.rating.flow

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.api.util.LocaleUtil
uses gw.api.web.document.DocumentsHelper
uses gw.document.DocumentContentsInfo
uses gw.i18n.DateTimeFormat
uses gw.rating.flow.domain.util.RateRoutinesJarGenerator

uses java.io.FileInputStream

@Export
final class RateBookSearchScreenUIHelper {
  static final var _logger = PCLoggerCategory.RTM

  static final var JAR_MIME_TYPE = "application/java-archive"
  static final var DOWNLOAD_JAR_FILENAME = "rateroutines.jar"

  static final var _jarGenerator = new RateRoutinesJarGenerator()

  // Don't allow instantiation.
  private construct() {
  }

  static function download() {
    if (_jarGenerator.Path == null) {
      _logger.error("Invalid attempt to download rate routines JAR without first generating it.")
      throw new DisplayableException(DisplayKey.get("Web.Rating.RateBooks.RatingJarNotAvailable"))
    }

    try {
      using (var inputStream = new FileInputStream(_jarGenerator.Path)) {
        var jarContentsInfo = new DocumentContentsInfo(DocumentContentsInfo.ContentResponseType.DOCUMENT_CONTENTS, inputStream, JAR_MIME_TYPE)

        DocumentsHelper.renderDocumentContentsWithDownloadDisposition(DOWNLOAD_JAR_FILENAME, jarContentsInfo)
      }
    } catch (notFoundOrSecurityEx) {
      _logger.error("Exception encountered in trying to download generated JAR '${_jarGenerator.Path}'", notFoundOrSecurityEx)
      throw new DisplayableException(DisplayKey.get("Web.Rating.RateBooks.RatingJarMissing", notFoundOrSecurityEx.Message))
    }
  }

  static function generate() {
    _jarGenerator.generate()
  }

  static function cancel() {
    _jarGenerator.cancel()
  }

  static function waitForCompletion() {
    _jarGenerator.waitForCompletion()
  }

  static property get Path() : String {
    return _jarGenerator.Path
  }

  static property get GenerationInProgress() : boolean {
    return _jarGenerator.GenerationInProgress
  }

  static property get CompletedPercentage() : int {
    return _jarGenerator.CompletedPercentage
  }

  static property get ProgressBarStatus() : String {
    return _jarGenerator.ProgressBarStatus
  }

  static property get LastGeneratedJarDate() : Date {
    return _jarGenerator.LastGeneratedJarDate
  }

  static property get LastGenerationStartDate() : Date {
    return _jarGenerator.LastGenerationStartDate
  }

  static property get ProgressSectionLabel() : String {
    return _jarGenerator.ProgressSectionLabel
  }

  static property get Canceled(): boolean {
    return _jarGenerator.Canceled
  }

  @SuppressWarnings("HiddenPackageReference")
  static property get DownloadJARTooltip(): String {
    return LastGeneratedJarDate == null ? "" :
        LocaleUtil.CurrentLocale.getOutputDateFormat(DateTimeFormat.MEDIUM, DateTimeFormat.LONG).format(LastGeneratedJarDate)
  }
}