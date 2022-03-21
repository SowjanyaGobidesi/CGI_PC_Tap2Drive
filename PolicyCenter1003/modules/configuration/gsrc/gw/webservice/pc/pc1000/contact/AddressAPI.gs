package gw.webservice.pc.pc1000.contact

uses entity.Address
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPException
uses gw.pl.persistence.core.Bundle
uses gw.transaction.Transaction
uses gw.webservice.SOAPUtil
uses gw.xml.ws.annotation.WsiPermissions

/**
 * API for external systems to interact with addresses in PolicyCenter.
 */
@Export
@gw.xml.ws.annotation.WsiWebService( "http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/contact/AddressAPI" )
class AddressAPI {

  /**
   * Updates an address with given public ID by calling AddressService#updateAddress which
   * has the out-of-the-box default of updating the specified address and the addresses linked to it.
   * 
   * @param address The address data to use in updating the Address with the given public ID
   * @param publicId The public ID (unique identifier) for this address
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("address", "The address data to use in updating the Address with the given public ID")
  @Param("publicId", "The public ID (unique identifier) for this address")
  @WsiPermissions({SystemPermissionType.TC_EDITACCOUNTCONTACTS})
  function updateAddress(address : gw.webservice.pc.pc1000.contact.AddressData, publicId : String) {
    SOAPUtil.require(address, "address");
    executeApiCallAndAssertAddressNotNull(\ b -> AddressService.Instance.updateAddress(address, false, publicId, b), publicId)
  }

  /**
   * Updates an address with given public ID.
   * This method will NOT update linked addresses.
   *
   * @param address The address data to use in updating the Address with the given public ID
   * @param publicId The public ID (unique identifier) for this address
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("address", "The address data to use in updating the Address with the given public ID")
  @Param("publicId", "The public ID (unique identifier) for this address")
  @WsiPermissions({SystemPermissionType.TC_EDITACCOUNTCONTACTS})
  function updateAddressOnly(address : gw.webservice.pc.pc1000.contact.AddressData, publicId : String) {
    SOAPUtil.require(address, "address");
    executeApiCallAndAssertAddressNotNull(\ b -> AddressService.Instance.updateAddressOnly(address, false, publicId, b), publicId)
  }

  /**
   * Updates an address with given public ID and updates all linked addresses
   * if this address is linked.
   *
   * @param address The address data to use in updating the Address with the given public ID
   * @param publicId The public ID (unique identifier) for this address
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("address", "The address data to use in updating the Address with the given public ID")
  @Param("publicId", "The public ID (unique identifier) for this address")
  @WsiPermissions({SystemPermissionType.TC_EDITACCOUNTCONTACTS})
  function updateAddressAndLinkedAddresses(address : gw.webservice.pc.pc1000.contact.AddressData, publicId : String) {
    SOAPUtil.require(address, "address");
    executeApiCallAndAssertAddressNotNull(\ b -> AddressService.Instance.updateAddressAndLinkedAddresses(address, false, publicId, b), publicId)
  }

  /**
   * Updates an address with given public ID and unlinks this address
   * if it is linked.
   *
   * @param address The address data to use in updating the Address with the given public ID
   * @param publicId The public ID (unique identifier) for this address
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("address", "The address data to use in updating the Address with the given public ID")
  @Param("publicId", "The public ID (unique identifier) for this address")
  @WsiPermissions({SystemPermissionType.TC_EDITACCOUNTCONTACTS})
  function updateAddressAndUnlink(address : gw.webservice.pc.pc1000.contact.AddressData, publicId : String) {
    SOAPUtil.require(address, "address");
    executeApiCallAndAssertAddressNotNull(\ b -> AddressService.Instance.updateAddressAndUnlink(address, false, publicId, b), publicId)
  }

  /**
   * Private methods
   */
  private function executeApiCallAndAssertAddressNotNull(executeApiCall(bundle : Bundle) : Address, publicId : String) {
    SOAPUtil.require(publicId, "publicId")
    Transaction.runWithNewBundle(\ bundle -> {
      SOAPUtil.convertToSOAPException(PCLoggerCategory.ADDRESS_API, \ -> {
        assertAddressNotNull(executeApiCall(bundle), publicId)
      })
    })
  }
  
  private function assertAddressNotNull(address : Address, publicId : String) {
    if (address == null) {
      throw new BadIdentifierException(DisplayKey.get("Webservice.Error.CannotFindAddressByPublicID", publicId))
    }
  }
}
