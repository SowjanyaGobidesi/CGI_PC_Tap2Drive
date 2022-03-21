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
 * This handler will do the bookkeeping needed to archive a {@link User} reference and be able to locate the referenced
 * entity in a different system.
 * <p>
 * The handler will use the following properties to uniquely key an {@link User} across the systems:
 * - User.UserName
 */
@Export
class UserHandler implements BeanExportHandler, BeanImportHandler {

  var _additionalInfoDoc : Document
  public static final var NS : String = ArchiveXmlQuoteConverter.GW_QUOTE_SIDECAR_NS_PREFIX

  construct(additionalInfoDoc : Document) {
    _additionalInfoDoc = additionalInfoDoc
  }

  /**
   * Generates a sidecar element for User references.
   * <p>
   * The sidecar is of the following format:
   * <UserHandler>
   * <userInSystem> userName="{userName}" userID="{userPublicID}" </userInSystem>
   * </UserHandler>
   */
  override function handlePostExport(graph : BeanImportGraph) {
    //prepare the document by adding a "User" element
    var root = _additionalInfoDoc.getDocumentElement()
    var userHandlerElement = _additionalInfoDoc.createElement("UserHandler")
    root.appendChild(userHandlerElement)

    //for each user in the graph, do a query on ID and get the user
    var elements = graph.getAssignableElementsForType(User)

    var users = Query.make(User).compareIn("PublicID", elements*.PublicId).select()
    users.each(\userInSystem -> {
      var userPublicId = userInSystem.PublicID
      var userName = userInSystem.Credential.UserName

      //add User Element using UserName as the unique identifier
      var userElement = _additionalInfoDoc.createElement("userInSystem")
      userHandlerElement.appendChild(userElement)
      userElement.setAttribute("userName", userName)
      userElement.setAttribute("userID", userPublicId)
    })
  }

  override function findEntityById(entityType : IEntityType, publicId : String) : KeyableBean {
    if (BeanTransferUtil.isSourceTypeAssignable(User.Type, entityType)) {

      if (_additionalInfoDoc.getDocumentElement() != null) {
        var locatedUser = getLocatedUserEntity(publicId)
        return locatedUser
      } else {
        throw new QuoteDataManagerException(DisplayKey.get("Quoting.Handler.CannotLocateAdditionalInfo"))
      }
    }

    return null
  }

  private function getLocatedUserEntity(publicId: String) : KeyableBean {
    var userNameInDoc : String
    var locatedUser : User

    //Only one UserHandlerElement
    var criteriaNode = createCriteriaNode(_additionalInfoDoc, ArchiveXmlQuoteConverter.createGWNamespaceContext(),
        "/${NS}:AdditionalEntity/${NS}:UserHandler")

    var nodeList = criteriaNode.ChildNodes
    for (var i in 0..|nodeList.Length) {
      var node = nodeList.item(i)
      if (node.NodeName == "userInSystem" and node.Attributes.getNamedItem("userID").TextContent == publicId) {
        userNameInDoc = node.Attributes.getNamedItem("userName").TextContent
      }
    }

    if (userNameInDoc != null) {
      //in order to locate the same user, we use username which is an unique identifier of User
      locatedUser = Query.make(User).join("Credential", Credential, "ID")
          .compare(Credential#UserName, Equals, userNameInDoc)
          .select().AtMostOneRow
    }

    return locatedUser
  }
}