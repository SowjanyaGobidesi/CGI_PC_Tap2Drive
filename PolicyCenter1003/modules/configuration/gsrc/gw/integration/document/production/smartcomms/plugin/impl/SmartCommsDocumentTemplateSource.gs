package gw.integration.document.production.smartcomms.plugin.impl

uses gw.api.locale.DisplayKey
uses gw.api.util.LocaleUtil
uses gw.document.DocumentProduction
uses gw.i18n.ILocale
uses gw.lang.reflect.features.PropertyReference
uses gw.plugin.Plugins
uses gw.plugin.document.IDocumentTemplateDescriptor
uses gw.plugin.document.IDocumentTemplateSource
uses gw.plugin.document.production.DocumentProductionService
uses org.apache.commons.lang.StringUtils
uses org.slf4j.LoggerFactory

uses java.io.InputStream
uses java.lang.invoke.MethodHandles

/**
 * SmartComms implementation of document template source.
 */
@Export
public class SmartCommsDocumentTemplateSource implements IDocumentTemplateSource {

  static final var LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass())
  static final var VALUE_DELIMITER = ","
  static final var KNOWN_KEYWORDS_KEYS = {DocumentProduction.TYPE_ATTRIB, DocumentProduction.REQUIRED_SYMBOLS}
  static final var KEYWORD_CONCATENATION_CHARACTER = "="

  var _documentProductionService: DocumentProductionService

  construct() {
    _documentProductionService = Plugins.get(DocumentProductionService)
  }

  override function getTemplateAsStream(strTemplateId: String): InputStream {
    throw new UnsupportedOperationException(
        DisplayKey.get("Integration.Document.Production.SmartComms.DocumentTemplateSource.Error.GetTemplateAsStreamUnsupported"))
  }

  override function getTemplateAsStream(strTemplateId: String, locale: ILocale): InputStream {
    return getTemplateAsStream(strTemplateId)
  }

  override function getDocumentTemplate(strTemplateId: String): IDocumentTemplateDescriptor {
    return getDocumentTemplate(strTemplateId, null)
  }

  override function getDocumentTemplate(strTemplateId: String, locale: ILocale): IDocumentTemplateDescriptor {
    // BaseDocumentTemplateSource does not throw on multiple matching templates. So do we.
    var keywords = new ArrayList<String>()
    if (locale != null) {
      keywords.add('language=${locale.Code}')
    }
    var template = _documentProductionService.searchTemplates(StringUtils.EMPTY, keywords, Date.CurrentDate)
        .firstWhere(\elt -> elt.TemplateID == strTemplateId)
    LOGGER.maybeDebug(\ -> "getDocumentTemplate(${strTemplateId}, ${locale}) found ${template?.TemplateID}")
    return (template == null)
        ? null
        : new SmartCommsDocumentTemplateDescriptor(template, locale)
  }

  override function getDocumentTemplates(date: Date, valuesToMatch: Map<Object, Object>, maxResults: int): IDocumentTemplateDescriptor[] {
    var searchKeywords = getValue(valuesToMatch, DocumentTemplateSearchCriteria#Keywords)
    searchKeywords.addAll(extractKnownKeywords(valuesToMatch))
    var templates = _documentProductionService.searchTemplates(StringUtils.EMPTY, searchKeywords, date)
    var templateDescriptorList = new ArrayList<IDocumentTemplateDescriptor>()
    templates?.each(\elt -> templateDescriptorList.add(new SmartCommsDocumentTemplateDescriptor(elt, LocaleUtil.DefaultLocale)))
    return templateDescriptorList.toArray(new IDocumentTemplateDescriptor[templateDescriptorList.size()])
  }

  /**
   * Extracts the value of a property from the given map
   *
   * @param map  a map with properties
   * @param prop a property to extract
   * @return value(s) extracted from property
   */
  private function getValue(map: Map, prop: PropertyReference): Collection<String> {
    var values = new ArrayList<String>()
    var stringValue = map.get(prop.PropertyInfo.DisplayName.toLowerCase()) as String
    if (StringUtils.isNotEmpty(stringValue)) {
      values.addAll(StringUtils.split(stringValue, VALUE_DELIMITER).toList())
    }
    return values
  }

  /**
   * Extracts known keywords
   *
   * @param map map of properties
   * @return known keywords list
   */
  private function extractKnownKeywords(map: Map): Collection<String> {
    var keywords = new ArrayList<String>()
    foreach(knownKeywordKey in KNOWN_KEYWORDS_KEYS) {
      var knownKeywordValue = map.get(knownKeywordKey) as String
      if (StringUtils.isNotEmpty(knownKeywordValue)) {
        keywords.add(knownKeywordKey + KEYWORD_CONCATENATION_CHARACTER + knownKeywordValue)
      }
    }
    return keywords
  }
}