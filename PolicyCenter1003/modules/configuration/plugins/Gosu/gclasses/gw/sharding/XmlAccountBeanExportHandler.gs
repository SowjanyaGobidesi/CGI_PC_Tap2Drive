package gw.sharding

uses gw.api.beantransfer.BeanTransferException
uses gw.api.locale.DisplayKey
uses gw.beantransfer.BeanExportHandler
uses gw.sharding.impl.XmlAccountTransferManager
uses org.apache.xml.utils.XMLChar
uses org.w3c.dom.Document
uses org.w3c.dom.Node

/**
 * Base implementation for bean export handlers used in the Account Transfer feature. This provides access to the
 * beans being exported and write functionality to the additional info file that is exported along with the account xml
 */
@Export
abstract class XmlAccountBeanExportHandler implements BeanExportHandler,BeanHandlerMethods {

  var _accTransferContent : FlatAccountTransferContent as AccountTransferContent
  var _additionalInfo : Document as AdditionalInfo

  construct(accTransferContent : FlatAccountTransferContent, additionalInfo : Document) {
    _accTransferContent = accTransferContent
    _additionalInfo = additionalInfo
  }

  /**
   * Add a list of nodes to the additional info file with the specified attribute/value pairs on the given handler's path
   *
   * @param handlerPath xml path in the format handlerName/nodeName, this should be unique to each export handler
   * pair
   * @param entryList list of string to string maps. Each map represents a node to be entered in the xml and its entries
   * contain the node's attribute name and values in the entry key and value respectively
   * the additional info file
   * @throws IllegalArgumentException is handlerPath format is null, empty or not recognized
   */
  function addToAdditionalInfo(handlerPath : String, entryList : List<Map<String, String>>) {
    var root = AdditionalInfo.getElementsByTagName(XmlAccountTransferManager.GW_SHARDING_SIDECAR_ROOT_ELEM).item(0)
    if (entryList == null) {
      throw new IllegalArgumentException("Entry list cannot be null")
    }

    var splitHandlerPath = validateAndSplitHandlerPath(handlerPath)

    var parentElem = root
    for (elemIndex in 0..|splitHandlerPath.length-1) {
      var newTag = splitHandlerPath[elemIndex]
      if (hasChildNodeMatchingTag(parentElem,newTag)) {
        throw new BeanTransferException(DisplayKey.get("BeanTransfer.XmlAccountBeanExportHandler.HandlerConflict",handlerPath))
      }
      var elem = AdditionalInfo.createElement(newTag)
      parentElem.appendChild(elem)
      parentElem = elem
    }

    var nodeElemType = splitHandlerPath.last()

    for (entry in entryList) {
      var newElement = AdditionalInfo.createElement(nodeElemType)
      for (attr in entry.Keys) {
        if (!XMLChar.isValidName(attr) || !XMLChar.isValidName(entry.get(attr))) {
          throw new IllegalArgumentException("Attribute/value pair "+attr+"="+entry.get(attr)+" are empty or contain invalid characters")
        }
        newElement.setAttribute(attr, entry.get(attr))
      }
      parentElem.appendChild(newElement)
    }
  }

  private function hasChildNodeMatchingTag(node : Node, tag : String) : boolean {
    if (node.hasChildNodes()) {
      var cNodeList = node.ChildNodes
      for (i in 0..|cNodeList.Length) {
        if (cNodeList.item(i).NodeName == tag) {
          return true
        }
      }
    }
    return false
  }

}