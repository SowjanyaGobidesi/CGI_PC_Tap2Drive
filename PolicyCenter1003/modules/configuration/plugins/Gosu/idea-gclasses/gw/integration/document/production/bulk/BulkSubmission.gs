package gw.integration.document.production.bulk

uses gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider
uses gw.plugin.Plugins
uses gw.plugin.document.production.DocumentProductionService
uses gw.processes.BatchProcessBase
uses org.slf4j.LoggerFactory

uses java.io.File
uses java.lang.invoke.MethodHandles

/**
 * {@code BulkSubmission} job takes document transaction files(from bulk input folder)
 * and invokes the Bulk job to process the transaction files and creates documents
 * in bulk output folder.
 */
@Export
class BulkSubmission extends BatchProcessBase {
  static final var LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass())

  public construct() {
    super(BatchProcessType.TC_BULKSUBMISSION)
  }

  protected override function doWork() {
    try {
      var documentProductionService = Plugins.get(DocumentProductionService)
      var configuration = SmartCommsConfigurationProvider.Configuration
      var transactionFiles = new File(configuration.ApplianceInputFolder).listFiles()
      if (transactionFiles != null and transactionFiles.HasElements) {
        LOGGER.info("Submitting document transaction files to Bulk Processing Job.")
        documentProductionService.submitJob()
      } else {
        LOGGER.info("No transaction files found in bulk input folder for submitting Bulk Processing Job.")
      }
    } catch (ex: Exception) {
      LOGGER.error("Caught Exception while submiting Bulk Processing Job. Error = {}", ex.StackTraceAsString)
    }
  }
}