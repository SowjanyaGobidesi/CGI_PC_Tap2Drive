package gw.sharding.impl

uses gw.api.beantransfer.BeanTransferException
uses gw.api.locale.DisplayKey
uses gw.beantransfer.impl.BeanImportGraph
uses gw.datatype.DataTypes
uses gw.lang.reflect.IPropertyInfo
uses gw.sharding.FlatAccountTransferContent
uses gw.sharding.XmlAccountBeanExportHandler
uses org.w3c.dom.Document

/**
 * Soft Entity Reference Export handler. Entities can include softentityreference properties, which refer to other
 * entities in the database. The property's value is the database ID value of an entity, and it does not include
 * type information. The type information is explicitly provided when handling the references as part of this handler.
 * <p>
 * The export handler adds a mapping of encodedId to publicId on the account transfer sidecar file which will be
 * read by the import handler to perform the required mapping in the new system
 */
@Export
class SoftEntityReferenceExportHandler extends XmlAccountBeanExportHandler {

  protected var _refMapping : SoftReferenceMapping = new SoftReferenceMapping()

  construct(accTransferContent : FlatAccountTransferContent, additionalInfo : Document) {
    super(accTransferContent, additionalInfo)
  }

  /**
   * Callback for bean export. This method is called before the bean is exported. If the bean has soft entity references
   * then the bean's softentityreference properties are resolved and scheduled for inclusion in the account transfer
   * sidecar file during handlePostExport.
   *
   * @param bean the KeyableBean to be exported
   * @return the processed bean to be exported; null if the bean is not to be exported.
   * @throws BeanTransferException if the bean has an unhandled softentityreference
   */
  override function handleBeanExport(bean : KeyableBean) : KeyableBean {
    var nonNullSoftEntityReferences = getNonNullSoftEntityReferencesExcludingRetiredProperty(bean)
    var unhandledReferences : Set<IPropertyInfo> = {}

    for (softEntityReference in nonNullSoftEntityReferences) {
      if (softEntityReference == Workflow#MessageHistoryID.PropertyInfo) {
        _refMapping.addSoftEntityReference(bean, Workflow#MessageHistoryID, MessageHistory)
      } else if (softEntityReference == MessageHistory#OrigMsgId.PropertyInfo) {
        _refMapping.addSoftEntityReference(bean, MessageHistory#OrigMsgId, Message)
      } else if (softEntityReference == RICedingWorkItem#ProcessHistoryID.PropertyInfo) {
        // do not try to resolve the ProcessHistoryID reference, since the ProcessHistory will not be part of the graph or in the new system
        _refMapping.addDefaultingSoftEntityReference(bean, RICedingWorkItem#ProcessHistoryID, ProcessHistory)
      } else {
        unhandledReferences.add(softEntityReference)
      }
    }

    if (unhandledReferences.HasElements) {
      throwExceptionForUnhandledReferences(bean, unhandledReferences)
    }

    return bean
  }

  /**
   * Callback for bean export. This method is called after the export. It is used to perform any post processing
   * related to this handler.
   * <p>
   * This handler will add a mapping of encodedId to publicId to the account transfer sidecar file so that the
   * message import handler can resolve softentityreference properties on the new system
   *
   * @param graph the Graph representation of the bean XML
   */
  override function handlePostExport(graph : BeanImportGraph) {
    var entryList = _refMapping.EntryList
    addToAdditionalInfo(SoftReferenceMappingConstants.SOFT_ENTITY_REF_HANDLER_PATH, entryList)
  }

  private function getNonNullSoftEntityReferencesExcludingRetiredProperty(bean : KeyableBean) : Set<IPropertyInfo> {
    var nonNullSoftEntityReferences : Set<IPropertyInfo> = {}
    var entityProperties = bean.IntrinsicType.EntityProperties
    var retiredProp = entity.Retireable.RETIREDVALUE_DYNPROP.get(bean.IntrinsicType)
    var softEntityReferenceDataType = gw.datatype.DataTypes.softentityreference()

    for (entityProperty in entityProperties) {
      var dataType = DataTypes.get(entityProperty)
      if (dataType.Name == softEntityReferenceDataType.Name
          and bean.getFieldValue(entityProperty) != null
          and entityProperty != retiredProp) {
        nonNullSoftEntityReferences.add(entityProperty)
      }
    }
    return nonNullSoftEntityReferences
  }

  private function throwExceptionForUnhandledReferences(bean : KeyableBean, unhandledReferences : Collection<IPropertyInfo>) {
    throw new BeanTransferException(DisplayKey.get("BeanTransfer.SoftEntityReferenceHandler.UnhandledReferences", bean.IntrinsicType.DisplayName, bean.PublicID, unhandledReferences))
  }

}