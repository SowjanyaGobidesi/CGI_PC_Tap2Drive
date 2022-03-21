package gw.integration.document.production.smartcomms.api

uses gw.api.locale.DisplayKey
uses gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider
uses gw.integration.document.production.smartcomms.client.SmartCommsRestClient
uses gw.integration.document.production.smartcomms.dto.bulk.BulkJobRequest

/**
 * The Smart Communications Bulk API containing operations for bulk related tasks
 */
@Export
class SmartCommsBulkAPI {

  static final var SUBMIT_JOB = "/jobs"

  var _smartClient: SmartCommsRestClient

  construct(client: SmartCommsRestClient) {
    _smartClient = client
  }

  /**
   * Triggers the bulk document process
   *
   * @param queue Name of the queue as defined in Smart Communications
   * @param type One of TRANSACTION_FILE or TRANSACTION_FOLDER. Only TRANSACTION_FOLDER is supported at the moment
   * @param input Full path to the folder containing the files to be processed relative to the bulk appliance
   * @param config The resource ID of the Template Selector you want to use for this job
   * @param name The name of the job, used to track it on Smart Communications web interface (optional)
   * @param project Smart Communications Project ID
   * @throws IllegalStateException if the BulkServiceURL is not configured
   */
  function submitJob(queue: String, type: SmartCommsTransactionType, input: String, config: String, name: String, project: String) {
    if(type != SmartCommsTransactionType.TC_TRANSACTION_FOLDER){
      throw new UnsupportedOperationException(DisplayKey.get("Integration.Document.Production.SmartComms.Bulk.Error.WrongTransactionType", SmartCommsTransactionType.TC_TRANSACTION_FOLDER))
    }
    var bulkJobRequest = new BulkJobRequest()
    bulkJobRequest.Queue = queue
    bulkJobRequest.Type = type.Code
    bulkJobRequest.Input = input
    bulkJobRequest.Config = config
    bulkJobRequest.Name = name
    bulkJobRequest.Project = project
    _smartClient.post(bulkJobRequest, getPath(SUBMIT_JOB), {})
  }

  /**
   * Expands path to resource of this API.
   *
   * @param part e.g. '/jobs'
   * @return URL
   */
  private function getPath(part: String): String {
    if (SmartCommsConfigurationProvider.Configuration.BulkServiceURL == null) {
      throw new IllegalStateException(DisplayKey.get('Integration.Document.Production.SmartComms.Bulk.Error.URLNotConfigured'))
    }
    return SmartCommsConfigurationProvider.Configuration.BulkServiceURL + part
  }
}