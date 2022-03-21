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
 * This handler will do the bookkeeping needed to archive a {@link ProducerCode} reference and be able to locate the referenced
 * entity in a different system.
 * <p>
 * The handler will use the following properties to uniquely key an {@link ProducerCode} across the systems:
 * - ProducerCode.Code
 */
@Export
class ProducerCodeHandler implements BeanExportHandler, BeanImportHandler {
  var _additionalInfoDoc : Document
  public static final var NS : String = ArchiveXmlQuoteConverter.GW_QUOTE_SIDECAR_NS_PREFIX

  construct(additionalInfoDoc : Document) {
    _additionalInfoDoc = additionalInfoDoc
  }

  /**
   * Generates a sidecar element for ProducerCode references.
   * <p>
   * The sidecar is of the following format:
   * <ProducerCodeHandler>
   * <OrganizationName name="{name}" producerCodeID="{producerCodePublicId}"/>
   * <ProducerCode code="{code}" producerCodeID="{producerCodePublicId}"/>
   * </ProducerCodeHandler>
   */
  override function handlePostExport(graph: BeanImportGraph) {
    //prepare the document by adding a "ProducerCodeHandler" element
    var root = _additionalInfoDoc.getElementsByTagName("AdditionalEntity").item(0)
    var producerCodeHandlerElement = _additionalInfoDoc.createElement("ProducerCodeHandler")
    root.appendChild(producerCodeHandlerElement)

    //for each ProducerCode in the graph, do a query on ID and get the ProducerCode and Organization Entity
    var elements = graph.getAssignableElementsForType(ProducerCode)

    var producerCodes = Query.make(ProducerCode).compareIn("PublicID", elements*.PublicId).select()
    producerCodes.each(\producerCodeInSystem -> {
      var producerCodePublicId = producerCodeInSystem.PublicID
      var organization = producerCodeInSystem.Organization

      //add Organization Element using Organization Name and producerCodeID
      var organizationName = _additionalInfoDoc.createElement("OrganizationName")
      producerCodeHandlerElement.appendChild(organizationName)
      organizationName.setAttribute("name", organization.Name)
      organizationName.setAttribute("producerCodeID", producerCodePublicId)

      //add ProducerCode Element using ProducerCode.Code and producerCodeID
      var producerCodeElement = _additionalInfoDoc.createElement("ProducerCode")
      producerCodeHandlerElement.appendChild(producerCodeElement)
      producerCodeElement.setAttribute("code", producerCodeInSystem.Code)
      producerCodeElement.setAttribute("producerCodeID", producerCodePublicId)

    })
  }

  override function findEntityById(entityType: IEntityType, publicId: String): KeyableBean {
    if (BeanTransferUtil.isSourceTypeAssignable(ProducerCode.Type, entityType)) {

      if (_additionalInfoDoc.getDocumentElement() != null) {
        //Only one ProducerCodeHandlerElement
        var locatedProducerCode = getLocatedProducerCodeEntity(publicId)
        return locatedProducerCode
      } else {
        throw new QuoteDataManagerException(DisplayKey.get("Quoting.Handler.CannotLocateAdditionalInfo"))
      }
    }

    return null
  }

  private function getLocatedProducerCodeEntity(publicId: String): KeyableBean {
    var organizationNameInDoc: String
    var producerCodeInDoc: String

    //look up under ProducerCodeHandlerElement
    var criteriaNode = createCriteriaNode(_additionalInfoDoc, ArchiveXmlQuoteConverter.createGWNamespaceContext(),
        "/${NS}:AdditionalEntity/${NS}:ProducerCodeHandler")
    var nodeList = criteriaNode.ChildNodes
    for (var i in 0..|nodeList.Length) {
      var node = nodeList.item(i)
      if (node.NodeName == "OrganizationName" and node.Attributes.getNamedItem("producerCodeID").TextContent == publicId) {
        organizationNameInDoc = node.Attributes.getNamedItem("name").TextContent
      }
      if (node.NodeName == "ProducerCode" and node.Attributes.getNamedItem("producerCodeID").TextContent == publicId) {
        producerCodeInDoc = node.Attributes.getNamedItem("code").TextContent
      }
    }

    if (organizationNameInDoc == null or producerCodeInDoc == null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.ProducerCodeHandler.Missing.InputStream"))
    }

    //in order to locate the same organization, we use Organization.Name
    //NOTE : OOTB it's not an unique identifier in the database
    var organizationQuery = Query.make(Organization).compare(Organization#Name, Equals, organizationNameInDoc)
        .select()

    if (organizationQuery.Count == 0 ) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.Handler.Missing.System.Organization", organizationNameInDoc))
    } else if(organizationQuery.Count >1 ) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.Handler.Multiple.System.Organization", organizationNameInDoc))
    }

    var organization = organizationQuery.AtMostOneRow

    //ProducerCode.Code is also an unique identifier but only within the same organization
    var producerCode = Query.make(ProducerCode).compare(ProducerCode#Organization, Equals, organization)
        .compare(ProducerCode#Code, Equals, producerCodeInDoc)
        .select().AtMostOneRow

    if (producerCode == null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.ProducerCodeHandler.Missing.System.ProducerCode", producerCodeInDoc, organizationNameInDoc))
    }

    return producerCode
  }
}