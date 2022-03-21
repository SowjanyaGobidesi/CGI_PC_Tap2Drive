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
 * This handler will do the bookkeeping needed to archive an UWIssueType reference and be able to locate the referenced
 * entity in a different system.
 * <p>
 * The handler will use the following properties to uniquely key an UWIssueType across the systems:
 * Primary:
 * - UWIssueType.PublicID
 * <p>
 * Secondary:
 * - UWIssueType.Code
 * <p>
 * For UWIssueType, we expect the PublicIds to be uniform across production systems. To facilitate the testing purposes,
 * we do a secondary "loose match" with Code if there is not match with PublicIDs and the system is not set for production.
 */
@Export
class UWIssueTypeHandler implements BeanExportHandler, BeanImportHandler {
  static final var UW_ISSUE_TYPE_HANDLER_TAG = "UWIssueTypeHandler"
  static final var UW_ISSUE_TYPE_ELEMENT_TAG = "UWIssueType"

  var _additionalInfoDoc : Document
  public static final var NS : String = ArchiveXmlQuoteConverter.GW_QUOTE_SIDECAR_NS_PREFIX

  construct(additionalInfoDoc : Document) {
    _additionalInfoDoc = additionalInfoDoc
  }

  /**
   * Generates a sidecar element for UWIssueType references.
   * <p>
   * The sidecar is of the following format:
   * <UWIssueTypeHandler>
   * <UWIssueType> code="{Code} uwIssueTypeID="{PublicID}" </UWIssueType>
   * </UWIssueTypeHandler>
   */
  override function handlePostExport(graph : BeanImportGraph) {
    //prepare the document by adding a "UWIssueTypeHanlder" element
    var root = _additionalInfoDoc.getElementsByTagName("AdditionalEntity").item(0)
    var uwIssueTypeHandlerElement = _additionalInfoDoc.createElement(UW_ISSUE_TYPE_HANDLER_TAG)
    root.appendChild(uwIssueTypeHandlerElement)

    //add an "UWIssueType" element for each UWIssueTypeID
     //do a query on ID and get the UWIssueType entity
    var elements = graph.getAssignableElementsForType(UWIssueType)

    var uwIssueTypes = Query.make(UWIssueType).compareIn("PublicID", elements*.PublicId).select()
    uwIssueTypes.each(\uwIssueTypeInSystem -> {
      var uwIssueTypePublicId = uwIssueTypeInSystem.PublicID

      //add UWIssueType Element using UWIssueType.Code
      var uwIssueTypeElement = _additionalInfoDoc.createElement(UW_ISSUE_TYPE_ELEMENT_TAG)
      uwIssueTypeHandlerElement.appendChild(uwIssueTypeElement)
      uwIssueTypeElement.setAttribute("code", uwIssueTypeInSystem.Code)
      uwIssueTypeElement.setAttribute("uwIssueTypeID", uwIssueTypePublicId)

    })
  }

  override function findEntityById(entityType : IEntityType, publicId : String): KeyableBean {
    if (BeanTransferUtil.isSourceTypeAssignable(UWIssueType.Type, entityType)) {

      if (_additionalInfoDoc.getDocumentElement() != null) {
        return getLocatedUWIssueTypeEntity(publicId)
      } else {
        throw new QuoteDataManagerException(DisplayKey.get("Quoting.Handler.CannotLocateAdditionalInfo"))
      }
    }

    return null
  }

  private function getLocatedUWIssueTypeEntity(publicId : String): KeyableBean {
    var uwIssueTypeCodeInDoc : String

    //Only one UWIssueTypeHandlerElement
    var criteriaNode = createCriteriaNode(_additionalInfoDoc, ArchiveXmlQuoteConverter.createGWNamespaceContext(),
        "/${NS}:AdditionalEntity/${NS}:${UW_ISSUE_TYPE_HANDLER_TAG}")

    var nodeList = criteriaNode.ChildNodes
    for (var i in 0..|nodeList.Length) {
      var node = nodeList.item(i)
      if (node.NodeName == UW_ISSUE_TYPE_ELEMENT_TAG and node.Attributes.getNamedItem("uwIssueTypeID").TextContent == publicId) {
        uwIssueTypeCodeInDoc = node.Attributes.getNamedItem("code").TextContent
      }
    }

    if (uwIssueTypeCodeInDoc == null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.UWIssueTypeHandler.Missing.InputStream"))
    }

    //match using the public id. We expect public ids for UWIssueType to be the same accross production systems
    var locatedUWIssueType = Query.make(UWIssueType).compare(UWIssueType#PublicID, Equals, publicId)
        .select().AtMostOneRow

    if (locatedUWIssueType == null) {
      //if in production mode, throw an exception
      if (gw.api.system.PLDependenciesGateway.getServerMode().isProduction()) {
        throw new QuoteDataManagerException(DisplayKey.get("Quoting.UWIssueTypeHandler.Missing.System.UWIssueType", publicId))
      } else {
        //else attempt a loose match on UWiSSueType.Code
        var looselyMachedUWIssueType = Query.make(UWIssueType).compare(UWIssueType#Code, Equals, uwIssueTypeCodeInDoc).select().first()

        if (looselyMachedUWIssueType == null) {
          throw new QuoteDataManagerException(DisplayKey.get("Quoting.UWIssueTypeHandler.Missing.System.UWIssueTypeNonProductionMode", publicId, uwIssueTypeCodeInDoc))
        }

        return looselyMachedUWIssueType
      }
    }

    return locatedUWIssueType
  }
}