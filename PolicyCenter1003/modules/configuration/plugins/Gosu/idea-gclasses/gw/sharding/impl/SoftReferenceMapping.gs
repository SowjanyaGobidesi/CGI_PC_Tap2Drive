package gw.sharding.impl

uses gw.api.beantransfer.BeanTransferException
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.TypeUtil
uses gw.entity.IEntityType
uses gw.lang.reflect.IPropertyInfo
uses gw.lang.reflect.features.PropertyReference
uses gw.pl.persistence.core.Key
uses gw.sharding.ReferencedBeanNotFoundException


/**
 * Helps process properties with softentityreference data types as well as the Message/MessageHistory's ObjectKey and
 * EventRootKey properties during account transfer. These soft references need to be explicitly handled before export
 * and before import in {@link SoftEntityReferenceExportHandler}, {@link SoftEntityReferenceImportHandler},
 * {@link MessageExportHandler}, and {@link MessageImportHandler}
 * <p>
 * Before the export, a mapping is created between a soft reference's encodedId (EntityType:DatabaseID) and the publicId
 * of the referenced entity. On import, the mapping is used to look up a referenced entity by PublicID and reset the
 * reference's value to the new referenced entity's DatabaseID
 * <p>
 * 'Defaulting' references are those for which the referenced entity cannot be found in the source shard or for which
 * it is known that the referenced entity will not be transfered to the target shard. These references must default to
 * a new value when being imported to avoid silently clashing with a IDs on the target shard. These references are
 * commonly defaulted to 'null'.
 * <p>
 * For references to entities that were found on the source shard and are expected to be present on the target shard,
 * throw {@link BeanTransferException} if they cannont be resolved on import.
 *
 */
@Export
class SoftReferenceMapping {

  protected var _encodedIdsToRefId : Map<String, SoftReferenceHandlerUtil.SoftRefIdentifier> = new HashMap<String, SoftReferenceHandlerUtil.SoftRefIdentifier>()

  /**
   * Adds a new entry to the mapping.
   *
   * @param bean contains the soft reference
   * @param prop on the bean
   * @param refType of the soft reference
   * @throws BeanTransferException if the reference cannot be added to the mapping
   */
  function addSoftEntityReference(bean : KeyableBean, prop : PropertyReference, refType : IEntityType) {
    var refValue = prop.get(bean)
    if (refValue == null) {
      throw new BeanTransferException(DisplayKey.get("BeanTransfer.SoftReference.NullSoftEntityReferenceValue", prop.PropertyInfo.DisplayName, bean.IntrinsicType.DisplayName, bean.PublicID))
    }
    var key = new Key(refType, refValue as Long)

    try {
      addKey(bean, key)
    } catch (e : ReferencedBeanNotFoundException) {
      PCLoggerCategory.BEAN_TRANSFER.warn("Unable to resolve the softenetityreference property ${prop.PropertyInfo.DisplayName} on "
          + "${bean.IntrinsicType.DisplayName} bean ${bean.PublicID} in this system during export. The reference will be set to have a default value on import.")
      addDefaultingReference(key)
    }
  }

  /**
   * Adds a new 'defaulting' entry to the mapping. This should be used for soft entity references that cannot use the
   * reference from the source shard either because the reference no longer exists in the source shard or because it
   * will not exist in the target shard e.g. references that have a value in the source shard, but should be set to null
   * on the target shard. On import, the default value can be specified. See {@link SoftReferenceMapping#resetSoftEntityReference}
   *
   * @param bean contains the soft reference
   * @param prop on the bean
   * @param refType of the soft reference
   * @throws BeanTransferException if the reference is already null
   */
  function addDefaultingSoftEntityReference(bean : KeyableBean, prop : PropertyReference, refType : IEntityType) {
    var refValue = prop.get(bean)
    if (refValue == null) {
      throw new BeanTransferException(DisplayKey.get("BeanTransfer.SoftReference.NullSoftEntityReferenceValue", prop.PropertyInfo.DisplayName, bean.IntrinsicType.DisplayName, bean.PublicID))
    }

    var key = new Key(refType, refValue as Long)
    addDefaultingReference(key)
  }

  /**
   * Adds a new entry to the mapping.
   *
   * @param bean contains the soft reference
   * @param encodedBeanKey the referenced entity
   * @throws BeanTransferException if the encoded key cannot be resolved or if it cannot be added to the mapping
   * @throws ReferencedBeanNotFoundException if the reference is valid, but it cannot be added because the referenced bean cannot be found in the system
   */
  function addEncodedKey(bean : KeyableBean, encodedBeanKey : String) {
    if (encodedBeanKey == null) {
      return
    }

    var resolvedKey = SoftReferenceHandlerUtil.resolveEncodedKey(encodedBeanKey)
    if (resolvedKey == null) {
      throw new BeanTransferException(DisplayKey.get("BeanTransfer.SoftReference.UnableToResolveEncodedKey", encodedBeanKey, bean.IntrinsicType.DisplayName, bean.PublicID))
    }

    addKey(bean, resolvedKey)
  }

  /**
   * Adds a new entry to the mapping
   *
   * @param bean contains the soft reference
   * @param key the referenced entity
   * @throws BeanTransferException if the referenced bean cannot be found or if a unique key for it cannot be established
   * @throws ReferencedBeanNotFoundException if the reference is valid, but it cannot be added because the referenced bean cannot be found in the system
   */
  function addKey(bean : KeyableBean, key : Key) {
    var encodedBeanKey = SoftReferenceHandlerUtil.encodeKey(key)
    if (not _encodedIdsToRefId.containsKey(encodedBeanKey)) {
      var referencedBean = bean.Bundle.loadBean(key)
      if (referencedBean == null) {
        throw new ReferencedBeanNotFoundException(bean, key)
      }
      var beanRefMapping = getObjectRefMappingForBean(encodedBeanKey, referencedBean)
      if (beanRefMapping != null) {
        _encodedIdsToRefId.put(encodedBeanKey, beanRefMapping)
      } else {
        throw new BeanTransferException(DisplayKey.get("BeanTransfer.SoftReference.UniquePropNotFound", bean.IntrinsicType.DisplayName, encodedBeanKey))
      }
    }
  }

  /**
   * Attempts to reset the value of the encoded key using an existing mapping to the referenced entity.
   * This should be called during import.
   *
   * @param bean the soft reference
   * @param prop the old encoded key of the referenced entity
   * @throws BeanTransferException if the reference cannot be reset
   * @throws ReferencedBeanNotFoundException if the reference is valid, but it cannot be reset because the referenced bean cannot be found in the system
   */
  function resetEncodedKeyReference(bean : KeyableBean, prop : PropertyReference) {
    var refToResolve = prop.get(bean) as String
    if (refToResolve == null) {
      return
    }

    var objRefMapping = _encodedIdsToRefId.get(refToResolve)
    SoftReferenceHandlerUtil.resetEncodedKey(bean, prop, refToResolve, objRefMapping)
  }

  /**
   * Attempts to reset the value of the softentityreference property using an existing mapping to the referenced entity.
   * Assigns a default value to the reference if the this is a 'defaulting' reference. This should be called during import.
   *
   * @param bean the soft reference
   * @param prop the old databaseId value of the refererenced entity
   * @param referenceType the type of the referenced entity
   * @param getDefaultValue used to get a new value for the soft entity reference if this reference was flagged as a
   *                        'defaulting' reference during export. The reference must have been added with {@link SoftReferenceMapping#addDefaultingSoftEntityReference}
   * @throws BeanTransferException if the reference cannot be reset
   * @throws ReferencedBeanNotFoundException if the reference is valid, but it cannot be reset because the referenced bean cannot be found in the system
   */
  function resetSoftEntityReference(bean : KeyableBean, prop : PropertyReference, referenceType : IEntityType, getDefaultValue(bean : KeyableBean) : Long) {
    var refValue = prop.get(bean)
    if (refValue == null) {
      return
    }
    var refToResolve = new Key(referenceType, refValue as long)
    var objRefMapping = _encodedIdsToRefId.get(SoftReferenceHandlerUtil.encodeKey(refToResolve))

    if (objRefMapping == null) {
      throw new BeanTransferException(DisplayKey.get("BeanTransfer.SoftReference.MissingMappingForReference", prop.PropertyInfo.DisplayName, bean.IntrinsicType.DisplayName, bean.PublicID))
    }

    resetSoftEntityReference(bean, prop, referenceType, objRefMapping, getDefaultValue)
  }

  /**
   * @return a list of all the entries in the mapping
   */
  property get EntryList() : List<Map<String, String>> {
    var entryList = _encodedIdsToRefId.values().map(\elt -> ({
        SoftReferenceMappingConstants.ENCODED_REF_ATTR -> elt.EncodedRef,
        SoftReferenceMappingConstants.ID_FIELD_ATTR -> elt.Field,
        SoftReferenceMappingConstants.ID_VALUE_ATTR -> elt.Value,
        SoftReferenceMappingConstants.IS_DEFAULTING_ATTR -> elt.IsDefaulting.toString()})
    )

    return entryList
  }

  /**
   * Populates the mapping with a list of entries
   *
   * @param entryList
   */
  function initMapping(entryList : List<Map<String, String>>) {
    _encodedIdsToRefId = entryList.mapToKeyAndValue(\node -> node.get(SoftReferenceMappingConstants.ENCODED_REF_ATTR),
        \node -> new SoftReferenceHandlerUtil.SoftRefIdentifier(
            :field = node.get(SoftReferenceMappingConstants.ID_FIELD_ATTR),
            :value = node.get(SoftReferenceMappingConstants.ID_VALUE_ATTR),
            :encodedRef = node.get(SoftReferenceMappingConstants.ENCODED_REF_ATTR),
            :isDefaulting = Boolean.valueOf(node.get((SoftReferenceMappingConstants.IS_DEFAULTING_ATTR)))
        )
    )
  }

  private function resetSoftEntityReference(bean : KeyableBean, prop : PropertyReference, referenceType : IEntityType, objRef : SoftReferenceHandlerUtil.SoftRefIdentifier, getDefaultValue(bean : KeyableBean) : Long) {
    if (objRef.IsDefaulting) {
      setDefaultValue(bean, prop, objRef, getDefaultValue)
    } else {
      SoftReferenceHandlerUtil.resetSoftEntityReference(bean, prop, referenceType, objRef)
    }
  }

  private function setDefaultValue(bean : KeyableBean, prop : PropertyReference, objRef : SoftReferenceHandlerUtil.SoftRefIdentifier, getDefaultValue(bean : KeyableBean) : Long) {
    if (not objRef.DefaultIsSet) {
      // store the value in objRef.DefaultValue, so that if there are multiple softentityreferences that point to this SoftRefIdentifier, they will all be assigned the same value
      objRef.DefaultValue = getDefaultValue(bean)
      objRef.DefaultIsSet = true
    }

    PCLoggerCategory.BEAN_TRANSFER.warn("The softenetityreference property ${prop.PropertyInfo.DisplayName} on ${bean.IntrinsicType.DisplayName}"
                  + " bean ${bean.PublicID} could not be resolved during export, so it was assigned a new default value on import into this system.")
    prop.set(bean, objRef.DefaultValue)
  }

  private function addDefaultingReference(key : Key) {
    var encodedKey = SoftReferenceHandlerUtil.encodeKey(key)
    var nullObjRef = SoftReferenceHandlerUtil.SoftRefIdentifier.createDefaultingReference(encodedKey)
    _encodedIdsToRefId.put(encodedKey, nullObjRef)
  }

  private function getObjectRefMappingForBean(encodedBeanKey : String, bean : KeyableBean) : SoftReferenceHandlerUtil.SoftRefIdentifier {
    var candidateKeys = getCandidateKeysForType(bean.IntrinsicType)

    for (keyCandidate in candidateKeys) {
      var valueFromBean = keyCandidate.getAccessor().getValue(bean) as String
      if (valueFromBean != null && valueFromBean.HasContent) {
        return new SoftReferenceHandlerUtil.SoftRefIdentifier(
            :field = keyCandidate.Name,
            :value = valueFromBean,
            :encodedRef = encodedBeanKey,
            :isDefaulting = false
        )
      }
    }
    return null
  }

  /**
   * Returns a list of 'candidate identifier fields' for a particular entity type that are used to extract an identifier
   * to be added to the export sidecar file to help remapping of encoded IDs of non-exported entities. This does not form
   * a multi-key: properties are tested in the order they are present in the list and the first non-null found is used
   * as key
   *
   * @param type entity type
   * @return list of candidate key fields
   */
  protected function getCandidateKeysForType(type : IEntityType) : List<IPropertyInfo> {
    if (TypeUtil.isNominallyOrStructurallyAssignable(Contact.Type, type)) {
      return {AddressBookConvertable#AddressBookUID.PropertyInfo, Contact#ExternalID.PropertyInfo}
    } else if (TypeUtil.isNominallyOrStructurallyAssignable(Address.Type, type)) {
      return {AddressBookLinkable#AddressBookUID.PropertyInfo, Address#ExternalID.PropertyInfo}
    } else if (TypeUtil.isNominallyOrStructurallyAssignable(ContactAddress.Type, type)) {
      return {AddressBookLinkable#AddressBookUID.PropertyInfo, ContactAddress#ExternalID.PropertyInfo}
    } else if (TypeUtil.isNominallyOrStructurallyAssignable(entity.AddressBookConvertable.Type, type)) {
      return {AddressBookConvertable#AddressBookUID.PropertyInfo}
    } else if (TypeUtil.isNominallyOrStructurallyAssignable(AddressBookLinkable.Type, type)) {
      return {AddressBookLinkable#AddressBookUID.PropertyInfo}
    } else if (TypeUtil.isNominallyOrStructurallyAssignable(KeyableBean.Type, type)) {
      return {KeyableBean#PublicID.PropertyInfo}
    } else {
      throw new BeanTransferException(DisplayKey.get("BeanTransfer.SoftReference.IdentifierNotFound", type.DisplayName))
    }
  }

}
