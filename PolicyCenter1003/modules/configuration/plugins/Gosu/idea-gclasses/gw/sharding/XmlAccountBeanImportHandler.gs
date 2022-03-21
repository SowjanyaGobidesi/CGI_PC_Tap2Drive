package gw.sharding

uses gw.beantransfer.BeanImportHandler
uses gw.beantransfer.impl.BeanImportGraph
uses gw.sharding.impl.XmlAccountTransferManager
uses org.w3c.dom.Document
uses org.w3c.dom.Node
uses org.w3c.dom.NodeList

uses javax.xml.xpath.XPathConstants
uses javax.xml.xpath.XPathFactory

/**
 * Base implementation for bean import handlers used in the Account Transfer feature. This provides access to the
 * bean import graph and read functionality from the additional info file that is exported along with the account xml
 */
@Export
abstract class XmlAccountBeanImportHandler implements BeanImportHandler,BeanHandlerMethods {

  var _importGraph : BeanImportGraph as ImportGraph
  var _additionalInfo : Document as AdditionalInfo
  protected static final var NS : String = XmlAccountTransferManager.GW_SHARDING_SIDECAR_NS_PREFIX

  construct(importGraph : BeanImportGraph, additionalInfo : Document) {
    _importGraph = importGraph
    _additionalInfo = additionalInfo
  }


  /**
   * Reads all nodes from the additional info file on the given handler's path
   *
   * @param handlerPath xml path in the format handlerName/nodeName, this should be unique to each export handler
   * @return list of string to string maps. Each map represents a node and its entries contain the node's
   * attribute name and values in the entry key and value respectively
   * @throws IllegalArgumentException is handlerPath format is not recognized
   */
  function getAdditionalInfoForHandler(handlerPath : String) : List<Map<String,String>> {
    var xpath = XPathFactory.newInstance().newXPath()
    xpath.setNamespaceContext(XmlAccountTransferManager.createGWNamespaceContext())

    var splitHandlerPath = validateAndSplitHandlerPath(handlerPath)

    var xPathString = "/${NS}:${XmlAccountTransferManager.GW_SHARDING_SIDECAR_ROOT_ELEM}"
    for (element in splitHandlerPath) {
      xPathString+= "/${NS}:${element}"
    }

    var objectRefs = xpath.compile(xPathString)
        .evaluate(AdditionalInfo, XPathConstants.NODESET) as NodeList

    var resultList = new ArrayList<Map<String,String>>();

    for (i in 0..|objectRefs.Length) {
      var node = objectRefs.item(i)
      resultList.add(xmlNodeToAttributeMap(node))
    }

    return resultList
  }

  private function xmlNodeToAttributeMap(node : Node) : Map<String,String> {
    var resultMap = new HashMap<String,String>()
    if (node.hasAttributes()) {
      for (i in 0..|node.Attributes.Length) {
        var attrNode = node.Attributes.item(i)
        resultMap.put(attrNode.getNodeName(),attrNode.getTextContent())
      }
    }
    return resultMap
  }

}