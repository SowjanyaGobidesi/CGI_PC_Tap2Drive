package gw.quoting.impl

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.beantransfer.BeanExportHandler
uses gw.beantransfer.BeanImportHandler
uses gw.beantransfer.BeanTransferUtil
uses gw.beantransfer.impl.BeanImportGraph
uses gw.entity.IEntityType
uses gw.api.quoting.QuoteDataManagerException
uses org.w3c.dom.Document

/**
 * This handler will do the bookkeeping needed to archive an {@link UWCompany} reference and be able to locate the referenced
 * entity in a different system.
 *
 * The handler will use the following properties to uniquely key an {@link UWCompany} across the systems:
 * - UWCompany.Code
 */
@Export
class UWCompanyHandler implements BeanExportHandler, BeanImportHandler {
  internal static final var UWCOMPANY_HANDLER_TAG : String = "UWCompanyHandler"
  internal static final var UWCOMPANY_ELEMENT_TAG : String = "UWCompany"

  var _additionalInfoDoc : Document
  public static final var NS : String = ArchiveXmlQuoteConverter.GW_QUOTE_SIDECAR_NS_PREFIX

  construct(additionalInfoDoc : Document) {
    _additionalInfoDoc = additionalInfoDoc
  }

  /**
   * Generates a sidecar element for UWCompany references.
   *
   * The sidecar is of the following format:
   * <UWCompanyHandler>
   *   <UWCompany> code="{Code} uwCompanyID="{PublicID}" </UWCompany>
   * </UWCompanyHandler>
   */
  override function handlePostExport(graph : BeanImportGraph) {
    //prepare the document by adding a "UWCompanyHandler" element
    var root = _additionalInfoDoc.getElementsByTagName("AdditionalEntity").item(0)
    var uwCompanyHandlerElement = _additionalInfoDoc.createElement(UWCOMPANY_HANDLER_TAG)
    root.appendChild(uwCompanyHandlerElement)

    //add an "UWCompany" element for each UWCompanyID
      //do a query on ID and get the UWCompany entity
    var elements = graph.getAssignableElementsForType(UWCompany)

    var uwCompanys = Query.make(UWCompany).compareIn("PublicID", elements*.PublicId).select()
    uwCompanys.each(\uwCompanyInSystem -> {
      var uwCompanyPublicId = uwCompanyInSystem.PublicID

      //add UWCompany Element using UWCompany.Code
      var uwCompanyElement = _additionalInfoDoc.createElement(UWCOMPANY_ELEMENT_TAG)
      uwCompanyHandlerElement.appendChild(uwCompanyElement)
      uwCompanyElement.setAttribute("code", uwCompanyInSystem.Code.Code)
      uwCompanyElement.setAttribute("uwCompanyID", uwCompanyPublicId)

    })
  }

  override function findEntityById(entityType : IEntityType, publicId : String) : KeyableBean {
    if (BeanTransferUtil.isSourceTypeAssignable(UWCompany.Type, entityType)) {

      if (_additionalInfoDoc.getDocumentElement() != null) {
        return getLocatedUWCompanyEntity(publicId)
      } else {
        throw new QuoteDataManagerException(DisplayKey.get("Quoting.Handler.CannotLocateAdditionalInfo"))
      }
    }

    return null
  }

  private function getLocatedUWCompanyEntity(publicId : String): KeyableBean {
    var uwCompanyCodeInDoc : String

    //Only one UWCompanyHandlerElement
    var criteriaNode = createCriteriaNode(_additionalInfoDoc, ArchiveXmlQuoteConverter.createGWNamespaceContext(),
        "/${NS}:AdditionalEntity/${NS}:${UWCOMPANY_HANDLER_TAG}")
    var nodeList = criteriaNode.ChildNodes
    for (var i in 0..|nodeList.Length) {
      var node = nodeList.item(i)
      if (node.NodeName == UWCOMPANY_ELEMENT_TAG and node.Attributes.getNamedItem("uwCompanyID").TextContent == publicId) {
        uwCompanyCodeInDoc = node.Attributes.getNamedItem("code").TextContent
      }
    }

    if(uwCompanyCodeInDoc==null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.UWCompanyHandler.Missing.InputStream"))
    }

    //in order to locate the same UWCompany, we use UWCompany.Code, which is a unique to a UWCompany
    var locatedUWCompany = Query.make(UWCompany).compare(UWCompany#Code, Equals, UWCompanyCode.getTypeKey(uwCompanyCodeInDoc))
        .select().AtMostOneRow

    if(locatedUWCompany==null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.UWCompanyHandler.Missing.System.UWCompany", uwCompanyCodeInDoc))
    }

    return locatedUWCompany
  }
}