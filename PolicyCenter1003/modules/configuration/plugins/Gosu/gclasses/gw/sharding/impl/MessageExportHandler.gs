package gw.sharding.impl

uses gw.beantransfer.impl.BeanImportGraph
uses gw.sharding.FlatAccountTransferContent
uses gw.sharding.XmlAccountBeanExportHandler
uses org.w3c.dom.Document

/**
 * Message Export handler. Messages and MessageHistories include "encoded references" to beans in the entityType:databaseId format which
 * require special handling when exporting and importing.
 *
 * The export handler adds a mapping of encoded ID to public ID on the account transfer sidecar file which will be
 * read by the handler to perform the required mapping in the new system
 */
@Export
class MessageExportHandler extends XmlAccountBeanExportHandler {

  protected var _refMapping : SoftReferenceMapping = new SoftReferenceMapping()

  construct(accTransferContent : FlatAccountTransferContent, additionalInfo : Document) {
    super(accTransferContent, additionalInfo)
  }

  /**
   * Callback for bean export. This method is called before the bean is exported. If the bean is a Message or MessageHistory then the
   * bean's ObjectKey and EventRootKey properties are resolved and scheduled for inclusion in the account transfer
   * sidecar file during handlePostExport
   *
   * @param bean the KeyableBean to be exported
   * @return the processed bean to be exported; null if the bean is not to be exported.
   */
  override function handleBeanExport(bean : KeyableBean) : KeyableBean {
    if (bean typeis Message) {
      _refMapping.addEncodedKey(bean, bean.ObjectKey)
      _refMapping.addEncodedKey(bean, bean.EventRootKey)
    } else if (bean typeis MessageHistory) {
      _refMapping.addEncodedKey(bean, bean.ObjectKey)
      _refMapping.addEncodedKey(bean, bean.EventRootKey)
    }
    return bean
  }

  /**
   * Callback for bean export. This method is called after the export. It is used to perform any post processing
   * related to this handler.
   *
   * This handler will add a mapping of encodedId to publicId to the account transfer sidecar file so that the
   * message import handler can resolve the ObjectKey and EventRootKey properties on the new system
   *
   * @param graph the Graph representation of the bean XML
   */
  override function handlePostExport(graph: BeanImportGraph) {
    var entryList = _refMapping.EntryList
    addToAdditionalInfo(SoftReferenceMappingConstants.MESSAGE_HANDLER_PATH, entryList)
  }

}