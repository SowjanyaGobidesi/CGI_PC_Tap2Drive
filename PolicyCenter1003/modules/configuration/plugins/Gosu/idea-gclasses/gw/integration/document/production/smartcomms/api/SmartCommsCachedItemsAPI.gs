package gw.integration.document.production.smartcomms.api

uses gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider
uses gw.integration.document.production.smartcomms.client.SmartCommsRestClient

/**
 * Retrieves content by location.
 * There is also an API call to delete cached item but it's not implemented.
 */
@Export
class SmartCommsCachedItemsAPI {
  var _restClient: SmartCommsRestClient

  construct(client: SmartCommsRestClient) {
    _restClient = client
  }

  /**
   * Retrieves a cached item from the appliance or the cloud.
   *
   * @param partId The value of the 'partLocation', 'reviewCaseLocation', or
   *               'dataModelValuesLocation' property
   * @return item content
   */
  function getCachedItem(partId: String): byte[] {
    return _restClient.get(
        SmartCommsConfigurationProvider.Configuration.DocumentRetrievalURL +
            partId, {})
  }
}