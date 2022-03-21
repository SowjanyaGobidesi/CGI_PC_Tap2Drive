package gw.personaldata.obfuscation

uses gw.api.archiving.ArchiveDocumentReferencesUtil
uses gw.api.database.PCDatabaseReferenceTrackerUtility
uses gw.api.personaldata.obfuscation.PCPersonalDataObfuscator
uses gw.api.personaldata.obfuscation.RootPinnableObfuscator
uses gw.datatype.DataTypes
uses gw.entity.IEntityPropertyInfo
uses gw.util.StreamUtil
uses org.apache.commons.codec.digest.DigestUtils

@Export
class UserContactObfuscator extends RootPinnableObfuscator {

  private var _addressesToDelete : Collection<Address> = {}
  private var _linkedAddressToDelete : Collection<LinkedAddress> = {}
  private var _officialIDsToDelete : Collection<OfficialID> = {}

  construct(bean: UserContact) {
    super(bean)
  }

  override function beforeObfuscate() {
    var userContact = getOwner() as UserContact
    var primaryAddress = userContact.PrimaryAddress

    // retire primary address, which will be deleted after write to database
    if (canDeletePrimaryAddress(primaryAddress, userContact)) {
      if (canRemoveLinkedAddress(primaryAddress.LinkedAddress) ) {
        removeLinkedAddressAndUnlinkAddress(primaryAddress)
      }
      primaryAddress.remove()
      _addressesToDelete.add(primaryAddress)
    }

    // remove contact addresses, and retire the address that it is pointing to
    // contact addresses are not retireable, so will be deleted from the db on commit of the bundle
    if (userContact.ContactAddresses.HasElements) {
      removeUnreferencedContactAddresses(userContact.ContactAddresses)
    }

    // obfuscate or retire official IDs
    if (userContact.OfficialIDs.HasElements) {
      retireOrObfuscatedUnreferencedOfficialIDs(userContact.OfficialIDs)
    }

    getOwner().Bundle
        .addBundleTransactionCallback(
            new UserContactObfuscatorBundleTransactionCallback(_addressesToDelete, _linkedAddressToDelete,
                _officialIDsToDelete))
  }
  
  override function getObfuscatedValueForPersonalDataField(personalDataField : IEntityPropertyInfo,
                                                           tagValue : String) : Object {
    var bean = getOwner()

    var isTagValueUnique = (tagValue.compareToIgnoreCase(PersonalDataTagValue.TC_OBFUSCATEUNIQUE.Code) == 0) ? true : false

    if (isTagValueUnique) {
      var dataType = DataTypes.get(personalDataField)
      var dataTypeLength = dataType.asConstrainedDataType().getLength(null, personalDataField)
      var obfuscateUnique = bean.IntrinsicType.DisplayName + PCPersonalDataObfuscator.SEPARATOR + (bean as KeyableBean).PublicID
      var value = DigestUtils.md5Hex(StreamUtil.toBytes(obfuscateUnique))

      if (dataTypeLength != null and value typeis String and value.length() > dataTypeLength) {
        value = value.substring(0, dataTypeLength)
      }

      return value
    }

    return bean.getFieldValue(personalDataField)
  }

  private function canDeletePrimaryAddress(address : Address, contact : Contact): boolean {
    if (address == null) {
      return false
    }
    if (ArchiveDocumentReferencesUtil.isReferencedFromArchiveDocument(address)) {
      return false
    }
    var allBeans = PCDatabaseReferenceTrackerUtility.getBeansThatPointToMe(address)
    return (allBeans.Count == 1) ? true : false
  }

  private function canRemoveLinkedAddress(linkedAddress : LinkedAddress) : boolean {

    if (linkedAddress == null) {
      return false
    }

    var allBeans = PCDatabaseReferenceTrackerUtility.getBeansThatPointToMe(linkedAddress)
    if (allBeans.Count > 2) {
      return false
    }

    if (ArchiveDocumentReferencesUtil.isReferencedFromArchiveDocument(linkedAddress)) {
      return false
    }

    return (linkedAddress.Addresses.Count == 2)? true : false
  }

  private function removeLinkedAddressAndUnlinkAddress(address: Address) {
    var linkedAddress = address.LinkedAddress

    //unlink other address if there are only two address on linkedAddress
    if (linkedAddress.Addresses.Count == 2) {
      var otherAddress = linkedAddress.Addresses.singleWhere(\elt -> elt != address)
      otherAddress.LinkedAddress = null
      address.LinkedAddress = null
      linkedAddress.remove()
      _linkedAddressToDelete.add(linkedAddress)
    }
  }

  private function retireOrObfuscatedUnreferencedOfficialIDs(officialIDs : OfficialID[]) {
    officialIDs.each(\officialID -> {
      if (PCDatabaseReferenceTrackerUtility.isReferencedFromDatabase(officialID) or
          ArchiveDocumentReferencesUtil.isReferencedFromArchiveDocument(officialID)) {
        if (officialID.OfficialIDType == TC_SSN or officialID.OfficialIDType == TC_FEIN) {
          officialID.obfuscate()
        }
      } else {
        officialID.remove()
        _officialIDsToDelete.add(officialID)
      }
    })
  }

  private function removeUnreferencedContactAddresses(contactAddresses : ContactAddress[]) {
    contactAddresses.each(\contactAddress -> {
      if (PCDatabaseReferenceTrackerUtility.getBeansThatPointToMe(contactAddress).Empty) {
        var address = contactAddress.Address
        if (not ArchiveDocumentReferencesUtil.isReferencedFromArchiveDocument(address) and
            PCDatabaseReferenceTrackerUtility.getBeansThatPointToMe(address).Count == 1) {
          if (canRemoveLinkedAddress(address.LinkedAddress)) {
            removeLinkedAddressAndUnlinkAddress(address)
          }
          address.remove()
          _addressesToDelete.add(address)
        }
        contactAddress.remove()
      }
    })
  }
}