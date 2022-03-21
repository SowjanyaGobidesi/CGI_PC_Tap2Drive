package gw.sharding.impl

uses gw.beantransfer.impl.BeanImportGraph
uses gw.beantransfer.impl.EffDatedContainerPropertyHandler
uses gw.entity.IEntityType
uses gw.sharding.XmlAccountBeanImportHandler
uses org.w3c.dom.Document

/**
 * Proxy class to EffDatedContainerPropertyHandler that extends XmlAccountBeanImportHandler
 */
@Export
class AccountTransferEffDatedContainerPropertyHandler extends XmlAccountBeanImportHandler {

  private var _proxiedHandler : EffDatedContainerPropertyHandler

  construct(importGraph : BeanImportGraph, additionalInfo : Document) {
    super(importGraph, additionalInfo)
    _proxiedHandler = new EffDatedContainerPropertyHandler(importGraph)
  }

  override function findEntityById(entityType : IEntityType, publicId : String) : KeyableBean {
    return _proxiedHandler.findEntityById(entityType, publicId)
  }

  override function setIdOnBean(bean : KeyableBean, dbId : String) {
    _proxiedHandler.setIdOnBean(bean, dbId)
  }

  override function handlePostImport(rootInfo : Set<RootInfo>) {
    _proxiedHandler.handlePostImport(rootInfo)
  }

}