package gw.integration.document.production.smartcomms.plugin.impl

uses gw.api.locale.DisplayKey
uses gw.plugin.document.production.DraftDocumentHandler
uses gw.integration.document.production.smartcomms.payload.SmartCommsPayloadGenerator
uses gw.pl.util.ArgCheck
uses gw.plugin.Plugins
uses gw.plugin.document.production.DocumentProductionService
uses org.slf4j.LoggerFactory

uses java.lang.invoke.MethodHandles

/**
 * Smart Communications draft document handler plugin implementation
 */
@Export
class SmartCommsDraftDocumentHandler implements DraftDocumentHandler {

  static final var LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass())

  override function createDraft(document: Document): String {
    ArgCheck.nonNull(document, DisplayKey.get("Integration.Document.Production.SmartComms.CreateDraft.Error.InputDocumentIsNull"))
    var payload = new SmartCommsPayloadGenerator().generatePayload(document)
    ArgCheck.nonBlank(payload, DisplayKey.get("Integration.Document.Production.SmartComms.CreateDraft.Error.GeneratedPayloadIsNull"))
    return Plugins.get(DocumentProductionService).createDraft(payload)
  }

  // TODO: we don't need that because:
  // 1. there nothing smartcomms specific and
  // 2. should be done at UI level where we can control bundles and stuff.
  override function storeDraft(document: Document, draftDocumentContent: String) {
    if (not draftDocumentContent.HasContent) {
      throw new IllegalArgumentException(DisplayKey.get("Integration.Document.Production.SmartComms.DraftDocument.Store.Error.DraftDocumentContentIsNull"))
    }
    ArgCheck.nonNull(document, DisplayKey.get("Integration.Document.Production.SmartComms.DraftDocument.Store.Error.DocumentIsNull"))
    ArgCheck.isNull(document.DraftDocument, "Draft document already exist")
    var draftDocument = new DraftDocument()
    draftDocument.Content = draftDocumentContent
    document.Bundle.add(draftDocument)
    document.DraftDocument = draftDocument
  }
}