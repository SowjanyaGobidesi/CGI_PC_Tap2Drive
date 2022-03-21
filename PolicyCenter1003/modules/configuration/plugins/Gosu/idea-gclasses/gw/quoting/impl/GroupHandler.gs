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
 * This handler will do the bookkeeping needed to archive an Group reference and be able to locate the referenced
 * entity in a different system.
 * <p>
 * The handler will use the following properties to uniquely key a Group across the systems:
 * <p>
 * - Group.Name
 */
@Export
class GroupHandler implements BeanExportHandler, BeanImportHandler {
  var _additionalInfoDoc : Document
  public static final var NS : String = ArchiveXmlQuoteConverter.GW_QUOTE_SIDECAR_NS_PREFIX

  construct(additionalInfoDoc : Document) {
    _additionalInfoDoc = additionalInfoDoc
  }

  /**
   * Generates a sidecar element for Group references.
   *
   * The sidecar is of the following format:
   * <GroupHandler>
   *   <OrganizationName orgName="{name}" groupID="{groupPublicID}"/>
   *   <GroupInSystem> groupName="{groupName}" groupID="{groupPublicID}" </GroupInSystem>
   * </GroupHandler>
   */
  override function handlePostExport(graph: BeanImportGraph) {
    //prepare the document by adding a "Group" element
    var root = _additionalInfoDoc.getDocumentElement()
    var groupHandlerElement = _additionalInfoDoc.createElement("GroupHandler")
    root.appendChild(groupHandlerElement)

    //for each group in the graph, do a query on ID and get the group
    var elements = graph.getAssignableElementsForType(Group)

    var groups = Query.make(Group).compareIn("PublicID", elements*.PublicId).select()
    groups.each(\groupInSystem -> {
      var groupPublicId = groupInSystem.PublicID
      var groupName = groupInSystem.Name
      var organization = groupInSystem.Organization

      //add Organization Element using Organization Name and groupID
      var organizationName = _additionalInfoDoc.createElement("OrganizationName")
      groupHandlerElement.appendChild(organizationName)
      organizationName.setAttribute("orgName", organization.Name)
      organizationName.setAttribute("groupID", groupPublicId)

      //add group Element using group.Name as the unique identifier within the same Organization
      var groupElement = _additionalInfoDoc.createElement("GroupInSystem")
      groupHandlerElement.appendChild(groupElement)
      groupElement.setAttribute("groupName", groupName)
      groupElement.setAttribute("groupID", groupPublicId)
    })
  }

  override function findEntityById(entityType: IEntityType, publicId: String): KeyableBean {
    if (BeanTransferUtil.isSourceTypeAssignable(Group.Type, entityType)) {

      if (_additionalInfoDoc.getDocumentElement() != null) {
        var locatedGroup = getLocatedGroupEntity(publicId)
        return locatedGroup
      } else {
        throw new QuoteDataManagerException(DisplayKey.get("Quoting.Handler.CannotLocateAdditionalInfo"))
      }
    }

    return null
  }

  private function getLocatedGroupEntity(publicId : String): KeyableBean {
    var groupNameInDoc : String
    var organizationNameInDoc : String

    //look up under GroupHandlerElement
    var criteriaNode = createCriteriaNode(_additionalInfoDoc, ArchiveXmlQuoteConverter.createGWNamespaceContext(),
        "/${NS}:AdditionalEntity/${NS}:GroupHandler")

    var nodeList = criteriaNode.ChildNodes
    for (var i in 0..|nodeList.Length) {
      var node = nodeList.item(i)
      if (node.NodeName == "OrganizationName" and node.Attributes.getNamedItem("groupID").TextContent == publicId) {
        organizationNameInDoc = node.Attributes.getNamedItem("orgName").TextContent
      }
      if (node.NodeName == "GroupInSystem" and node.Attributes.getNamedItem("groupID").TextContent == publicId) {
        groupNameInDoc = node.Attributes.getNamedItem("groupName").TextContent
      }
    }

    if(organizationNameInDoc == null or groupNameInDoc==null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.GroupHandler.Missing.InputStream"))
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

    //in order to locate the same group, we use group.name which is an unique identifier of Group
    //but only within the same organization
    var locatedGroup = Query.make(Group)
        .compare(Group#Organization, Equals, organization)
        .compare(Group#Name, Equals, groupNameInDoc)
        .select().AtMostOneRow

    if(locatedGroup==null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.GroupHandler.Missing.System.GroupName", groupNameInDoc))
    }

    return locatedGroup
  }

}