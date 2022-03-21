package gw.sharding.impl

uses gw.beantransfer.impl.BeanImportGraph
uses gw.lang.reflect.features.PropertyReference
uses gw.sharding.XmlAccountBeanImportHandler
uses org.w3c.dom.Document


/**
 * Message Import handler. Messages and MessageHistories include "encoded references" to beans in the entityType:databaseId format which
 * require special handling when exporting and importing.
 *
 * The import handler uses the handlePostImport method and the account transfer side car file to re-key the
 * ObjectKey and EventRootKey properties on Message and MessageHistory entities to the correct database id on the new shard
 */
@Export
class MessageImportHandler extends XmlAccountBeanImportHandler {

  protected var _refMapping : SoftReferenceMapping = new SoftReferenceMapping()

  construct(importGraph : BeanImportGraph, additionalInfo : Document) {
    super(importGraph, additionalInfo)
  }

  /**
   * Callback for bean import. This method is called after all the beans have been created and added to the bundle.
   * The EffDated beans in the bundle are unsliced. It is used to perform any post processing of the bean(s) related to
   * this handler.
   *
   * Uses the account transfer side car file to re-key the ObjectKey and EventRootKey properties on Message and MessageHistory entities
   * to the correct database id on the new shard.
   * @throws gw.api.beantransfer.BeanTransferException if the bean referenced by the property cannot be found in the new shard
   */
  override function handlePostImport(info : Set<RootInfo>) {
    initMapping()
    var messages = extractImportedBeansFromRootBundle(Message,info,true)
    var messageHistories = extractImportedBeansFromRootBundle(MessageHistory,info,true)
    messages.each(\msg -> resetKeys(msg))
    messageHistories.each(\msg -> resetKeys(msg))
  }

  private function resetKeys(msg : Message) {
    resetKey(msg, Message#ObjectKey)
    resetKey(msg, Message#EventRootKey)
  }

  private function resetKeys(messageHistory : MessageHistory) {
    resetKey(messageHistory, MessageHistory#ObjectKey)
    resetKey(messageHistory, MessageHistory#EventRootKey)
  }

  private function resetKey(bean : KeyableBean, prop : PropertyReference) {
    _refMapping.resetEncodedKeyReference(bean, prop)
  }

  protected function initMapping() {
    var entryList = getAdditionalInfoForHandler(SoftReferenceMappingConstants.MESSAGE_HANDLER_PATH)
    _refMapping.initMapping(entryList)
  }

}