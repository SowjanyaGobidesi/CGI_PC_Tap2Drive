package gw.integration.document.production.smartcomms.plugin.impl

uses gw.integration.document.production.client.DocumentProductionClient
uses gw.integration.document.production.smartcomms.client.SmartCommsDocumentProductionClient
uses gw.plugin.document.production.DocumentProductionService
uses gw.plugin.document.production.dto.DocumentContent
uses gw.plugin.document.production.dto.DocumentTemplate
uses org.apache.log4j.Logger

uses java.lang.invoke.MethodHandles
uses java.nio.charset.Charset

/**
 * SmartComms implementation of the document production service.
 */
@Export
class SmartCommsDocumentProductionService implements DocumentProductionService {
  static final var LOGGER = Logger.getLogger(MethodHandles.lookup().lookupClass())

  var _client: DocumentProductionClient

  construct() {
    this(new SmartCommsDocumentProductionClient());
  }

  /**
   * For tests
   *
   * @param client
   */
  internal construct(client: DocumentProductionClient) {
    _client = client
  }

  override function searchTemplates(templateName: String, keywords: Collection<String>, effectiveDate: Date): DocumentTemplate[] {
    return _client.searchTemplates(templateName, keywords, effectiveDate)
  }

  override function createDraft(payload: String): String {
    var draftLocation = _client.createDraft(payload)
    return new String(_client.getCachedItem(draftLocation), Charset.forName('UTF-8'))
  }

  override function createDocumentFromDraft(draft: String): DocumentContent {
    return _client.finalizeDraft(draft)
  }

  override function createDocument(payload: String): DocumentContent {
    return _client.generateDocument(payload)
  }

  override function submitJob() {
    _client.submitJob()
  }
}