package gw.integration.document.production.smartcomms.client

uses gw.integration.document.production.client.DocumentProductionClient
uses gw.integration.document.production.client.RestClientConfig
uses gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider
uses gw.integration.document.production.smartcomms.api.SmartCommsBulkAPI
uses gw.integration.document.production.smartcomms.api.SmartCommsCachedItemsAPI
uses gw.integration.document.production.smartcomms.api.SmartCommsCorrespondenceAPI
uses gw.integration.document.production.smartcomms.api.SmartCommsJobAPI
uses gw.plugin.document.production.dto.DocumentContent
uses gw.plugin.document.production.dto.DocumentTemplate

/**
 * It's the main entry point to interact with different Smart Communications APIs.
 */

@Export
class SmartCommsDocumentProductionClient implements DocumentProductionClient {
  var _correspondenceAPI: SmartCommsCorrespondenceAPI
  var _jobAPI: SmartCommsJobAPI
  var _cachedItemsAPI: SmartCommsCachedItemsAPI
  var _bulkAPI: SmartCommsBulkAPI

  construct() {
    var restClientConfig = new RestClientConfig()
    var client = new SmartCommsRestClient(restClientConfig)
    _correspondenceAPI = new SmartCommsCorrespondenceAPI(client)
    _jobAPI = new SmartCommsJobAPI(client)
    _cachedItemsAPI = new SmartCommsCachedItemsAPI(client)
    _bulkAPI = new SmartCommsBulkAPI(client)
  }

  /**
   * For tests.
   *
   * @param correspondenceAPI
   * @param jobAPI
   * @param cachedItemsAPI
   * @param bulkAPI
   */
  internal construct(correspondenceAPI: SmartCommsCorrespondenceAPI,
                     jobAPI: SmartCommsJobAPI,
                     cachedItemsAPI: SmartCommsCachedItemsAPI,
                     bulkAPI: SmartCommsBulkAPI) {
    _correspondenceAPI = correspondenceAPI
    _jobAPI = jobAPI
    _cachedItemsAPI = cachedItemsAPI
    _bulkAPI = bulkAPI
  }

  override function searchTemplates(templateName: String, keywords: Collection<String>, effectiveDate: Date): DocumentTemplate[] {
    return _correspondenceAPI.searchTemplates(templateName, keywords, effectiveDate)
  }

  override function createDraft(transactionData: String): String {
    return _jobAPI.createDraft(
        SmartCommsConfigurationProvider.Configuration.TemplateSelectorID,
        transactionData).ReviewCaseLocation
  }

  override function finalizeDraft(draftContent: String): DocumentContent {
    return _jobAPI.finalizeDraft(draftContent)
  }

  override function generateDocument(transactionData: String): DocumentContent {
    return _jobAPI.generateDocument(SmartCommsConfigurationProvider.Configuration.TemplateSelectorID,
        transactionData)
  }

  override function getCachedItem(location: String): byte[] {
    return _cachedItemsAPI.getCachedItem(location)
  }

  override function submitJob() {
    _bulkAPI.submitJob(SmartCommsConfigurationProvider.Configuration.ApplianceQueue,
        SmartCommsTransactionType.get(SmartCommsConfigurationProvider.Configuration.BulkTransactionType),
        SmartCommsConfigurationProvider.Configuration.ApplianceStorageLocation,
        SmartCommsConfigurationProvider.Configuration.TemplateSelectorID,
        SmartCommsConfigurationProvider.Configuration.BulkJobName,
        null)
  }
}