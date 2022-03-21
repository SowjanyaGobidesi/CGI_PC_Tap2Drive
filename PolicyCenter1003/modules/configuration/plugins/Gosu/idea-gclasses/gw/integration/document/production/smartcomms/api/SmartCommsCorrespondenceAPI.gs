package gw.integration.document.production.smartcomms.api

uses gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider
uses gw.integration.document.production.smartcomms.client.SmartCommsRestClient
uses gw.integration.document.production.smartcomms.dto.search.DocumentTemplateQuery
uses gw.integration.document.production.smartcomms.dto.search.DocumentTemplateQueryRequest
uses gw.plugin.document.production.dto.DocumentTemplate
uses org.slf4j.LoggerFactory

uses java.lang.invoke.MethodHandles
uses java.text.SimpleDateFormat

/**
 * The Smart Communications Correspondence API connects to Smart Comms endpoint /queryTemplate
 * to retrieve the templates and return them in JSON format.
 */

@Export
class SmartCommsCorrespondenceAPI {

  static final var LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass())

  static final var QUERY_TEMPLATE_PATH = "/queryTemplate"
  static final var DATE_FORMAT = "yyyyMMddHHmmss"

  var _smartClient: SmartCommsRestClient

  construct(client: SmartCommsRestClient) {
    _smartClient = client
  }

  /**
   * Retrieves document templates from Smart Communications with given template name and keywords
   * @param templateName template name
   * @param keywords keywords to match against the template
   * @param effectiveDate effective data
   * @return document templates
   */
  function searchTemplates(templateName: String, keywords: Collection<String>, effectiveDate: Date): DocumentTemplate[] {
    LOGGER.maybeTrace(\-> "searchTemplates(${templateName}, ${keywords?.join(', ')}, ${effectiveDate})")
    var queryRequest = new DocumentTemplateQueryRequest()
    if (templateName.HasContent) {
      queryRequest.ResourceName = templateName
    }
    if (effectiveDate == null) {
      effectiveDate = Date.CurrentDate
    }
    queryRequest.EffectiveDate = convertDateToLong(effectiveDate)
    queryRequest.Keywords = keywords
    var response = _smartClient.post(queryRequest, QueryTemplateURI, {}, List<DocumentTemplateQuery>)
    return response*.toDocumentTemplate()
  }

  /**
   * @param date date to convert
   * @return Date converted to Smartcomms long integer format.
   */
  static function convertDateToLong(date: Date): Long {
      return new SimpleDateFormat(DATE_FORMAT).format(date).toLong()
  }

  /**
   * @return CorrespondenceAPI service end point url
   */
  private property get BaseResource(): StringBuffer {
    return new StringBuffer(SmartCommsConfigurationProvider.Configuration.CorrespondenceServiceURL)
  }

  /**
   * @return Query template url
   */
  private property get QueryTemplateURI(): String {
    return BaseResource.append(QUERY_TEMPLATE_PATH).toString()
  }
}