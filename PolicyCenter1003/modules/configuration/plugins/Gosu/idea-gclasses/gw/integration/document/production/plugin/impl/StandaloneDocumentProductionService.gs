package gw.integration.document.production.plugin.impl

uses gw.plugin.document.production.DocumentProductionService
uses gw.plugin.document.production.dto.DocumentContent
uses gw.plugin.document.production.dto.DocumentTemplate
uses gw.util.StreamUtil

/**
 * Standalone implementation of the document production service.
 * This example plugin implementation here so you can develop w/o
 * need to be connected to 3rd party. Do not use it for anything else.
 */

@Export
class StandaloneDocumentProductionService implements DocumentProductionService {

  var templates: DocumentTemplate[]as Templates
  var documentContent = new DocumentContent(){
      :Name = "example.pdf",
      :MimeType = "application/pdf",
      // The smallest pdf
      // http://stackoverflow.com/a/17280876/167044
      :Data = StreamUtil.toBytes("%PDF-1.\ntrailer<</Root<</Pages<</Kids[<</MediaBox[0 0 3 3]>>]>>>>>>")
      }

  construct() {
    var template1 = new DocumentTemplate(){
        :TemplateID = "1",
        :Name = "Stand-alone Template 1",
        :EffectiveDate = Date.CurrentDate,
        :ExpirationDate = Date.CurrentDate,
        :Description = "Stand-alone Template 1 Description"
        }
    var template2 = new DocumentTemplate(){
        :TemplateID = "2",
        :Name = "Stand-alone Template 2",
        :EffectiveDate = Date.CurrentDate,
        :ExpirationDate = Date.CurrentDate,
        :Description = "Stand-alone Template 2 Description"
        }
    templates = {template1, template2}
  }

  override function searchTemplates(templateName: String, keywords: Collection<String>, effectiveDate: Date): DocumentTemplate[] {
    return templates
  }

  /**
   * Creates a sample response for requests to generate a draft document.
   * The payload is ignored and the same blank document draft xml is returned for every request.
   *
   * @param payload String containing doc data
   * @return draft document xml based on the blank policy document template
   */
  override function createDraft(payload: String): String {
    return MockDraftXML.renderToString()
  }

  override function createDocumentFromDraft(draft: String): DocumentContent {
    return documentContent
  }

  override function createDocument(payload: String): DocumentContent {
    return documentContent
  }

  override function submitJob() {}
}