package gw.sharding.impl

uses gw.beantransfer.impl.BeanImportGraph
uses gw.sharding.XmlAccountBeanImportHandler
uses org.w3c.dom.Document

/**
 * Soft Entity Reference Import handler. Entities can include softentityreference properties, which refer to other
 * entitities in the database. The property's value is the databaseId value of an entity, and it does not include
 * type information. This requires special handling when exporting and importing.
 *
 * The import handler uses the handlePostImport method and the account transfer sidecar file to reset the values of the
 * soft entity reference properties as the entities are being imported into the new system.
 */
@Export
class SoftEntityReferenceImportHandler extends XmlAccountBeanImportHandler {

  protected var _refMapping : SoftReferenceMapping = new SoftReferenceMapping()

  construct(importGraph : BeanImportGraph, additionalInfo : Document) {
    super(importGraph, additionalInfo)
  }

  /**
   * Callback for bean import. This method is called after all the beans have been created and added to the bundle.
   * The EffDated beans in the bundle are unsliced. It is used to perform any post processing of the bean(s) related to
   * this handler.
   *
   * Retired beans are handled as a special case. There is no need for an export handler or sidecar for them.
   *
   * Uses the account transfer side car file to reset softentityreference properties to the correct database ids on the
   * new shard.
   * @throws gw.api.beantransfer.BeanTransferException if the bean referenced by the property cannot be found in the new shard
   */
  override function handlePostImport(info : Set<RootInfo>) {
    handleRetiredBeans(info)

    initMapping()
    handleWorkflows(info)
    handleRICedingWorkItems(info)
    handleMessageHistories(info)
  }

  /**
   * If retired, a beans Retired softentityreferences property points to the beans own row. Reserve an ID in the new system
   * and reset the value of the property.
   *
   * @param info
   */
  function handleRetiredBeans(info : Set<RootInfo>) {
    var retiredBeans = extractImportedBeansFromRootBundle(Retireable, info, true).where(\elt -> elt.Retired)
    retiredBeans.each(\retiredBean -> resetRetiredValue(retiredBean))
  }

  /**
   * Reset the MessageHistory property. Default to null if it was not found in the source system.
   *
   * @param info
   */
  function handleWorkflows(info : Set<RootInfo>) {
    var workflows = extractImportedBeansFromRootBundle(Workflow, info, true)
    for (workflow in workflows) {
      _refMapping.resetSoftEntityReference(workflow, Workflow#MessageHistoryID, MessageHistory, \b-> getNullReference(b))
    }
  }

  /**
   * Reset the ProcessHistory property by defaulting it to null.
   *
   * @param info
   */
  function handleRICedingWorkItems(info : Set<RootInfo>) {
    var riCedingWorkItems = extractImportedBeansFromRootBundle(RICedingWorkItem, info, true)
    for (workItem in riCedingWorkItems) {
      _refMapping.resetSoftEntityReference(workItem, RICedingWorkItem#ProcessHistoryID, ProcessHistory, \b-> getNullReference(b))
    }
  }

  /**
   * Reset the OrigMsgId property. It cannot be set to null, so default a OrigMsgId reference by creating a new message,
   * reservering an ID, and then removing the message.
   *
   * @param info
   */
  function handleMessageHistories(info : Set<RootInfo>) {
    var msgHistories = extractImportedBeansFromRootBundle(MessageHistory, info, true)
    for (msgHistory in msgHistories) {
      _refMapping.resetSoftEntityReference(msgHistory, MessageHistory#OrigMsgId, Message, \b-> getNewOrigMsgId(b))
    }
  }

  function resetRetiredValue(retiredBean : Retireable) {
    var beanID = SoftReferenceHandlerUtil.getOrReserveImportedBeanID(retiredBean)
    retiredBean.setFieldValue(Retireable#RetiredValue.PropertyInfo.Name, beanID.Value)
  }

  function initMapping() {
    var entryList = getAdditionalInfoForHandler(SoftReferenceMappingConstants.SOFT_ENTITY_REF_HANDLER_PATH)
    _refMapping.initMapping(entryList)
  }

  /**
   * Get a new ID for a {@link Message} by creating a bean, reserving an ID, and then deleting the bean.
   *
   * @param bean in the import bundle
   * @return
   */
  private function getNewOrigMsgId (bean : KeyableBean) : Long {
    var bundle = bean.Bundle
    var tempMessage = new Message()
    try {
      bundle.add(tempMessage)
      var newOrigMsgID = SoftReferenceHandlerUtil.getOrReserveImportedBeanID(tempMessage)
      return newOrigMsgID.Value
    } finally {
      bundle.delete(tempMessage)
    }
  }

  /**
   * Used to reset a defaulting reference to null.
   *
   * @param bean in the import bundle
   * @return
   */
  private function getNullReference(bean : KeyableBean) : Long {
    return null
  }
}