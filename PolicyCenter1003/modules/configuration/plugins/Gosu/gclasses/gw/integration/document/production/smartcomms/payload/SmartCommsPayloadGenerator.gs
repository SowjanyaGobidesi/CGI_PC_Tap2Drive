package gw.integration.document.production.smartcomms.payload

uses gw.api.locale.DisplayKey
uses gw.integration.document.production.dto.EmailDocumentContentSource
uses gw.integration.document.production.gxmodel.document.DocumentModelHelper
uses gw.integration.document.production.gxmodel.document.documentmodel.Document
uses gw.integration.document.production.gxmodel.email.EmailDocumentContentSourceModelHelper
uses gw.integration.document.production.smartcomms.api.SmartCommsJobAPI
uses gw.pl.util.ArgCheck
uses gw.xml.gx.PropertyLabel
uses org.slf4j.LoggerFactory

uses java.lang.invoke.MethodHandles

/**
 * Generates the payload in XML format
 */
@Export
class SmartCommsPayloadGenerator {

  static final var LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass())
  // ID of Policy_BasicWithPolicyPeriod_Document template.
  static final var TEMPLATEID_2 = "157674520"
  static final var TEMPLATEID_3 = "157706683"

  /**
   * Generates payload for {@link SmartCommsJobAPI#generateDocument(String, String)}.
   * @param document payload source
   * @return serialised payload
   */
  function generatePayload(document: entity.Document): String {
    ArgCheck.nonNull(document, DisplayKey.get("Integration.Document.Production.SmartComms.CreateDraft.Error.InputDocumentIsNull"))
    var templateID = document.TemplateID
    ArgCheck.nonNull(templateID, DisplayKey.get("Integration.Document.Production.SmartComms.CreateDraft.Error.TemplateIDIsNull"))

    var gxModelLabels : Collection<PropertyLabel>
    switch (templateID) {
      case TEMPLATEID_2:
        gxModelLabels = DocumentModelHelper.BasicPolicyModelLabels
        break
      case TEMPLATEID_3:
        gxModelLabels = DocumentModelHelper.BasicDocumentModelLabels
        break
      default:
        gxModelLabels = DocumentModelHelper.BlankDocumentModelLabels
    }
    LOGGER.maybeDebug(\-> "generatePayload with labels: ${gxModelLabels.join(', ')}")
    var documentGXModel = new Document(document, gxModelLabels)
    return documentGXModel.asUTFString()
  }

  /**
   * Generates payload for {@link SmartCommsJobAPI#generateDocument(String, String)}.
   * @param document payload source
   * @return serialised payload
   */
  function generatePayload(source: EmailDocumentContentSource): String {
    var model = new gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource(
        source,
        EmailDocumentContentSourceModelHelper.BasicDocumentModelLabels)
    return model.asUTFString()
  }
}