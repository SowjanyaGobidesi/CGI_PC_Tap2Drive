package gw.quoting.impl

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.util.StringUtil
uses gw.beantransfer.BeanExportHandler
uses gw.beantransfer.BeanImportHandler
uses gw.beantransfer.BeanTransferUtil
uses gw.beantransfer.impl.BeanImportGraph
uses gw.entity.IEntityType
uses gw.api.quoting.QuoteDataManagerException
uses org.w3c.dom.Document

uses java.text.SimpleDateFormat

/**
 * This handler will do the bookkeeping needed to archive a {@link IndustryCode} reference and be able to locate the referenced
 * entity in a different system.
 * <p>
 * The handler will use the following properties to uniquely key an {@link IndustryCode} across the systems:
 * - IndustryCode.Code
 * -IndustryCode.Domain
 * -IndustryCode.EffectiveDate
 */
@Export
class IndustryCodeHandler implements BeanExportHandler, BeanImportHandler {
  var _additionalInfoDoc : Document
  public static final var NS : String = ArchiveXmlQuoteConverter.GW_QUOTE_SIDECAR_NS_PREFIX

  construct(additionalInfoDoc : Document) {
    _additionalInfoDoc = additionalInfoDoc
  }

  /**
   * Generates a sidecar element for IndustryCode references.
   * <p>
   * The sidecar is of the following format:
   * <IndustryCodeHandler>
   * <IndustryCode> code="{code}" domainName="{domainName}" effectiveDate="{effectiveDate}" industryCodeID="{industryCodePublicId}" </IndustryCode>
   * </IndustryCodeHandler>
   */
  override function handlePostExport(graph: BeanImportGraph) {

    //prepare the document by adding a "IndustryCodeHandler" element
    var root = _additionalInfoDoc.getElementsByTagName("AdditionalEntity").item(0)
    var industryCodeHandlerElement = _additionalInfoDoc.createElement("IndustryCodeHandler")
    root.appendChild(industryCodeHandlerElement)

    //for each IndustryCode in the graph, do a query on ID and get the IndustryCode
    var elements = graph.getAssignableElementsForType(IndustryCode)

    var industryCodes = Query.make(IndustryCode).compareIn("PublicID", elements*.PublicId).select()
    industryCodes.each(\industryCodeInSystem -> {
      var industryCodePublicId = industryCodeInSystem.PublicID

      //add IndustryCode Element using IndustryCode.Code, IndustryCode.Domain, IndustryCode.EffectiveDate and industryCodeID
      var industryCodeElement = _additionalInfoDoc.createElement("IndustryCode")
      industryCodeHandlerElement.appendChild(industryCodeElement)
      industryCodeElement.setAttribute("code", industryCodeInSystem.Code)
      industryCodeElement.setAttribute("domainName", industryCodeInSystem.Domain.Code)
      industryCodeElement.setAttribute("effectiveDate", StringUtil.formatDate(industryCodeInSystem.EffectiveDate, "yyyy-MM-dd HH:mm:ss.SSS"))
      industryCodeElement.setAttribute("industryCodeID", industryCodePublicId)
    })
  }

  override function findEntityById(entityType: IEntityType, publicId: String): KeyableBean {
    if (BeanTransferUtil.isSourceTypeAssignable(IndustryCode.Type, entityType)) {

      if (_additionalInfoDoc.getDocumentElement() != null) {
        return getLocatedIndustryCodeEntity(publicId)
      } else {
        throw new QuoteDataManagerException(DisplayKey.get("Quoting.Handler.CannotLocateAdditionalInfo"))
      }
    }
    return null
  }

  private function getLocatedIndustryCodeEntity(publicId: String): KeyableBean {
    var industryCodeInDoc : String
    var domainNameInDoc : String
    var effDateInDoc : String
    // look up under IndustryCodeHandlerElement
    var criteriaNode = createCriteriaNode(_additionalInfoDoc, ArchiveXmlQuoteConverter.createGWNamespaceContext(),
        "/${NS}:AdditionalEntity/${NS}:IndustryCodeHandler")
    var nodeList = criteriaNode.ChildNodes

    for (var i in 0..|nodeList.Length) {
      var node = nodeList.item(i)
      if (node.NodeName == "IndustryCode" and node.Attributes.getNamedItem("industryCodeID").TextContent == publicId) {
        industryCodeInDoc = node.Attributes.getNamedItem("code").TextContent
        domainNameInDoc = node.Attributes.getNamedItem("domainName").TextContent
        effDateInDoc = node.Attributes.getNamedItem("effectiveDate").TextContent
      }
    }

    if (industryCodeInDoc == null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.IndustryCodeHandler.Missing.InputStream"))
    }
    var industryCode = Query.make(IndustryCode)
        .compare(IndustryCode#Code, Equals, industryCodeInDoc)
        .compare(IndustryCode#Domain, Equals, IndustryCodeType.getTypeKey(domainNameInDoc))
        .compare(IndustryCode#EffectiveDate, Equals, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").parse(effDateInDoc))
        .select().AtMostOneRow

    if (industryCode == null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.IndustryCodeHandler.Missing.System.IndustryCode", industryCodeInDoc))
    }
    return industryCode
  }

}