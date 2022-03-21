package gw.sharding.impl

uses gw.api.beantransfer.BeanTransferException
uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.beantransfer.BeanTransferUtil
uses gw.beantransfer.impl.BeanImportGraph
uses gw.entity.IEntityType
uses gw.sharding.XmlAccountBeanImportHandler
uses org.w3c.dom.Document

/**
 * Import handler for AddressBookLinkable and AddressBookConvertable entities.
 * This handler finds the element in import graph using public id and reads the AddressBookUID of that element.
 * It then uses that to find existing AddressBookLinkable and AddressBookConvertable entities in the target system.
 * It works on the assumption that a non-null AddressBookUID is guaranteed to be same across the systems.
 */
@Export
class ABLinkableConvertableImportHandler extends XmlAccountBeanImportHandler {

  construct(importGraph : BeanImportGraph, additionalInfo : Document) {
    super(importGraph, additionalInfo)
  }

  /***
   * It uses public id to locate the bean in the import graph. Once the bean is found, it reads the
   * AddressBookUID value and uses it to find a matching bean in the target system. We expect
   * addressBookUIDs to be same across the systems. If ABUID of the bean is null,
   * it performs a loose match using public id and returns the result.
   * @param entityType the entityType it is to find.
   * @param publicId the public ID it is to find.
   * @return the matching bean or null if it doesn't exist.
   */
  override function findEntityById(entityType : IEntityType, publicId : String): KeyableBean {
    if (BeanTransferUtil.isSourceTypeAssignable(AddressBookLinkable, entityType)
        || BeanTransferUtil.isSourceTypeAssignable(AddressBookConvertable, entityType)) {
      var importedBean = this.ImportGraph.getElementByPublicId(entityType, publicId)

      // OOTB the entities that implement AddressBookLinkable and AddressBookConvertable delegates are:
      // Contact, Address, ContactAddress, ContactTag, ContactCategoryScore and ContactContact.
      // ContactContact is excluded from the PCContactDomainGraphSupport, so no need to check for that.
      if (BeanTransferUtil.isSourceTypeAssignable(Contact, entityType)) {
        return findABConvertableBeanByABUIDOrPublicId<Contact>(importedBean, publicId)
      } else if (BeanTransferUtil.isSourceTypeAssignable(Address, entityType)) {
        return findABLinkableBeanByABUIDOrPublicId<Address>(importedBean, publicId)
      } else if (BeanTransferUtil.isSourceTypeAssignable(ContactAddress, entityType)) {
        return findABLinkableBeanByABUIDOrPublicId<ContactAddress>(importedBean, publicId)
      } else if (BeanTransferUtil.isSourceTypeAssignable(ContactTag, entityType)) {
        return findABLinkableBeanByABUIDOrPublicId<ContactTag>(importedBean, publicId)
      } else if (BeanTransferUtil.isSourceTypeAssignable(ContactCategoryScore, entityType)) {
        return findABConvertableBeanByABUIDOrPublicId<ContactCategoryScore>(importedBean, publicId)
      } else {
        throw new BeanTransferException(DisplayKey.get("BeanTransfer.ABLinkableConvertableImportHandler.Error.UnknownEntityType", entityType.DisplayName))
      }
    }
    return null
  }

  private reified function findABLinkableBeanByABUIDOrPublicId<T extends KeyableBean>(bean : BeanImportGraph.BeanImportElement, publicId : String) : T {
    var abuid = bean.getAttribute(AddressBookLinkable#AddressBookUID.FeatureInfo.Name)
    return (abuid != null) ? Query.make(T).compare(AddressBookLinkable#AddressBookUID, Equals, abuid).select().AtMostOneRow
        : Query.make(T).compare(T#PublicID, Equals, publicId).select().AtMostOneRow
  }

  private reified function findABConvertableBeanByABUIDOrPublicId<T extends KeyableBean>(bean : BeanImportGraph.BeanImportElement, publicId : String) : T {
    var abuid = bean.getAttribute(AddressBookConvertable#AddressBookUID.FeatureInfo.Name)
    return (abuid != null) ? Query.make(T).compare(AddressBookConvertable#AddressBookUID, Equals, abuid).select().AtMostOneRow
        : Query.make(T).compare(T#PublicID, Equals, publicId).select().AtMostOneRow
  }
}