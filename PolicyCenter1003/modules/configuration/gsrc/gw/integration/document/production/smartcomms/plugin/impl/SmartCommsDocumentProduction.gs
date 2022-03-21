package gw.integration.document.production.smartcomms.plugin.impl

uses gw.api.locale.DisplayKey
uses gw.api.util.LocaleUtil
uses gw.document.DocumentContentsInfo
uses gw.integration.document.production.dto.EmailDocumentContentSource
uses gw.integration.document.production.gxmodel.policy.policymodel.*
uses gw.integration.document.production.smartcomms.payload.SmartCommsPayloadGenerator
uses gw.plugin.Plugins
uses gw.plugin.document.IDocumentProduction
uses gw.plugin.document.IDocumentTemplateDescriptor
uses gw.plugin.document.production.DocumentProductionService
uses gw.plugin.document.production.dto.DocumentContent
uses org.slf4j.LoggerFactory

uses java.io.ByteArrayInputStream
uses java.lang.invoke.MethodHandles

@Export
class SmartCommsDocumentProduction implements IDocumentProduction {

  static final var LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass())
  /**
   * Explicit value of document content source for parameters map.
   *
   * @see #createDocumentSynchronously(IDocumentTemplateDescriptor, Map)
   */
  public static final var CONTENT_SOURCE_KEY: String = '_content_source'

  var _payloadGenerator: SmartCommsPayloadGenerator

  construct() {
    _payloadGenerator = new SmartCommsPayloadGenerator()
  }

  override function synchronousCreationSupported(templateDescriptor: IDocumentTemplateDescriptor): boolean {
    return true
  }

  override function asynchronousCreationSupported(templateDescriptor: IDocumentTemplateDescriptor): boolean {
    return false
  }

  override function createDocumentAsynchronously(templateDescriptor: IDocumentTemplateDescriptor, parameters: Map<Object, Object>): String {
    return createDocumentAsynchronously(templateDescriptor, parameters, null)
  }


  /**
   * Invokes the configured MessageTransport and generates the document payload.
   * Later, those payloads will be processed through batch process and generates the documents
   *
   * @param templateDescriptor The template from which to create the document.
   * @param parameters         Any objects which may be required for document creation (for context object values, for document)
   * @param fieldValues        A name->value Map of values which should be set in the new Document's metadata, once it is created
   * @return document PublicID
   * @throws IllegalArgumentException If document entity not found in parameters map
   */
  @Throws(IllegalArgumentException, "If document entity not found in parameters map")
  override function createDocumentAsynchronously(templateDescriptor: IDocumentTemplateDescriptor, parameters: Map<Object, Object>, fieldValues: Map<Object, Object>): String {
    var document = parameters.values().firstWhere(\value -> value typeis Document) as Document
    if (document == null) {
      throw new IllegalArgumentException(DisplayKey.get("Integration.Document.Production.SmartComms.AsyncDocument.Entity.NotFound"))
    }
    document.TemplateID = templateDescriptor.TemplateId
    document.addEvent(SmartCommsDocumentMessageTransport.GENERATE_DOCUMENT_MSG)
    return document.PublicID
  }

  override function createDocumentSynchronously(
      templateDescriptor: IDocumentTemplateDescriptor,
      parameters: Map<Object, Object>): DocumentContentsInfo {
    return createDocumentSynchronously(templateDescriptor, parameters, null)
  }

  override function createDocumentSynchronously(
      templateDescriptor: IDocumentTemplateDescriptor,
      parameters: Map<Object, Object>,
      document: Document): DocumentContentsInfo {
    if (document != null) {
      document.Status = DocumentStatusType.TC_FINAL
      if (document.DraftDocument != null) {
        // Document is being created from a draft.
        var info = toDocumentContentsInfo(Plugins.get(DocumentProductionService)
            .createDocumentFromDraft(document.DraftDocument.Content))
        return info
      }
    }
    var payload = generatePayload(templateDescriptor, parameters, document)
    LOGGER.maybeTrace(\-> "payload ${payload}")
    var content = Plugins.get(DocumentProductionService).createDocument(payload)
    return toDocumentContentsInfo(content)
  }

  /**
   * Transforms DocumentProductionService result into DocumentContentsInfo
   * used though the application.
   *
   * @param content result of e.g. {@link DocumentProductionService#createDocument}
   * @return DocumentContentsInfo with data from content
   */
  private function toDocumentContentsInfo(content: DocumentContent): DocumentContentsInfo {
    return new DocumentContentsInfo(DocumentContentsInfo.ContentResponseType.DOCUMENT_CONTENTS,
        new ByteArrayInputStream(content.Data),
        content.MimeType)
  }

  /**
   * Generates payload from provided parameters.
   *
   * @param templateDescriptor template of file to be created
   * @param parameters         untyped map of information needed to produce
   *                           document source.
   *                           If parameters have CONTENT_SOURCE_KEY set then
   *                           this value is used as a root. All other
   *                           parameters and content of targetDocument are IGNORED.
   *                           <p>
   *                           Otherwise values are used to populate
   *                           Document entity which will be used as payload
   *                           source.
   * @return payload for document production
   * @throws UnsupportedOperationException if fails to extract information from
   *                                       parameters map or there is no way
   *                                       to generate payload for given
   *                                       CONTENT_SOURCE_KEY value.
   */
  private function generatePayload(
      templateDescriptor: IDocumentTemplateDescriptor,
      parameters: Map<Object, Object>,
      targetDocument: Document): String {
    if ((parameters != null) and parameters.containsKey(CONTENT_SOURCE_KEY)) {
      var source = parameters.get(CONTENT_SOURCE_KEY)
      if (source typeis EmailDocumentContentSource) {
        source.TemplateID = templateDescriptor.TemplateId
        source.Language = {
            source.Language,
            LocaleUtil.toLanguageType(templateDescriptor.Language),
            LocaleUtil.getDefaultLanguageType()
        }.firstWhere(\elt -> elt != null)
        return _payloadGenerator.generatePayload(source)
      }
      throw new UnsupportedOperationException('Cannot generate payload from ${source.getClass()}}')
    }
    var source = new Document()
    source.TemplateID = templateDescriptor.TemplateId
    source.Language = { targetDocument.Language,
      LocaleUtil.toLanguageType(templateDescriptor.Language),
      LocaleUtil.getDefaultLanguageType()}.firstWhere(\elt -> elt != null)
    LOGGER.maybeDebug(\-> 'generating payload for template ${source.TemplateID} language ${source.Language.Code}')
    DocumentParametersHelper.populatePayloadSource(parameters, targetDocument, source)
    var payload = _payloadGenerator.generatePayload(source)
    source.remove()
    LOGGER.maybeTrace(\-> 'payload: ${payload}')
    return payload
  }

  internal function setPayloadGeneratorForTest(generator: SmartCommsPayloadGenerator) {
    _payloadGenerator = generator
  }
}