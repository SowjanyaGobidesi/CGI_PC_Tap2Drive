package gw.webservice.pc.pc1000.contact

uses entity.Address
uses gw.api.database.Query
uses gw.pl.persistence.core.Bundle
uses gw.webservice.pc.pc1000.contact.IAddressData
uses gw.webservice.pc.pc1000.contact.IAddressService

@Export
class AddressService implements IAddressService {

  static final var _instance : gw.webservice.pc.pc1000.contact.AddressService as readonly Instance = new gw.webservice.pc.pc1000.contact.AddressService()
  
  private construct() {
  }

  /**
   * Updates address with given ID by calling #updateAddressAndLinkedAddresses by default.
   * This behavior can be changed.
   * 
   * @param addressData The address data to be copied to the address with given public ID
   * @param copyNulls If true, then copy null addressData fields.
   * @param publicId The ID of the address to be updated
   * @param bundle The bundle of the encapsulating transaction
   * @returns Address The found and changed address. Will be null if the address could not be found
   */
  function updateAddress(addressData : IAddressData, copyNulls : boolean, publicId : String, bundle : Bundle) : Address {
    // Modify following line to change the default behavior
    return updateAddressAndLinkedAddresses(addressData as gw.webservice.pc.pc1000.contact.AddressData, copyNulls, publicId, bundle)
  }

  /**
   * Updates address with given ID without updating potentially linked addresses.
   *
   * @param addressData The address data to be copied to the address with given public ID
   * @param copyNulls If true, then copy null addressData fields.
   * @param publicId The ID of the address to be updated
   * @param bundle The bundle of the encapsulating transaction
   * @returns Address The found and changed address. Will be null if the address could not be found
   */
  function updateAddressOnly(addressData : gw.webservice.pc.pc1000.contact.AddressData, copyNulls : boolean, publicId : String, bundle : Bundle) : Address {
    return findAddressAndCopyTo(addressData, copyNulls, publicId, bundle)
  }

  /**
   * Updates address with given ID and all its linked addresses.
   *
   * @param addressData The address data to be copied to the address with given public ID
   * @param copyNulls If true, then copy null addressData fields.
   * @param publicId The ID of the address to be updated
   * @param bundle The bundle of the encapsulating transaction
   * @returns Address The found and changed address. Will be null if the address could not be found
   */
  function updateAddressAndLinkedAddresses(addressData : gw.webservice.pc.pc1000.contact.AddressData, copyNulls : boolean, publicId : String, bundle : Bundle) : Address {
    var foundAddress = findAddressAndCopyTo(addressData, copyNulls, publicId, bundle)
    if (foundAddress == null) {
      return null
    }
    foundAddress.updateLinkedAddresses()
    return foundAddress
  }

  /**
   * Updates address with given ID and unlinks it if it was linked before.
   *
   * @param addressData The address data to be copied to the address with given public ID
   * @param copyNulls If true, then copy null addressData fields.
   * @param publicId The ID of the address to be updated
   * @param bundle The bundle of the encapsulating transaction
   * @returns Address The found and changed address. Will be null if the address could not be found
   */
  function updateAddressAndUnlink(addressData : gw.webservice.pc.pc1000.contact.AddressData, copyNulls : boolean, publicId : String, bundle : Bundle) : Address {
    var foundAddress = findAddressAndCopyTo(addressData, copyNulls, publicId, bundle)
    if (foundAddress == null) {
      return null
    }
    if (foundAddress.LinkedAddress != null) {
      foundAddress.unlink()
    }
    return foundAddress
  }

  /**
   * @See #updateAddress(addressData, copyNulls, publicId, bundle)
   */
  function updateAddress(address : Address, publicId : String, bundle : Bundle) : Address {
    return updateAddress(gw.webservice.pc.pc1000.contact.AddressData.of(address), true, publicId, bundle)
  }

  /**
   * @See #updateAddressOnly(addressData, copyNulls, publicId, bundle)
   */
  function updateAddressOnly(address : Address, publicId : String, bundle : Bundle) : Address {
    return updateAddressOnly(gw.webservice.pc.pc1000.contact.AddressData.of(address), true, publicId, bundle)
  }

  /**
   * @See #updateAddressAndLinkedAddresses(addressData, copyNulls, publicId, bundle)
   */
  function updateAddressAndLinkedAddresses(address : Address, publicId : String, bundle : Bundle) : Address {
    return updateAddressAndLinkedAddresses(gw.webservice.pc.pc1000.contact.AddressData.of(address), true, publicId, bundle)
  }

  /**
   * @See #updateAddressAndUnlink(addressData, copyNulls, publicId, bundle)
   */
  function updateAddressAndUnlink(address : Address, publicId : String, bundle : Bundle) : Address {
    return updateAddressAndUnlink(gw.webservice.pc.pc1000.contact.AddressData.of(address), true, publicId, bundle)
  }

  private function findAddressAndCopyTo(addressData : gw.webservice.pc.pc1000.contact.AddressData, copyNulls : boolean, publicId : String, bundle : Bundle) : Address {
    var foundAddress = findAddress(publicId)
    if (foundAddress == null) {
      return null
    }
    foundAddress = bundle.add(foundAddress)
    new gw.webservice.pc.pc1000.contact.AddressDataCopier(addressData, copyNulls).copyInto(foundAddress)
    return foundAddress
  }
  
  private function findAddress(publicId: String) : Address {
    var query = Query.make(Address)
    query.compare("PublicID", Equals, publicId)
    return query.select().AtMostOneRow
  }
}
