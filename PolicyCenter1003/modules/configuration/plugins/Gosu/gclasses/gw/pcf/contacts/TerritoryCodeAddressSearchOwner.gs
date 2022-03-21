package gw.pcf.contacts

uses gw.api.address.AddressFillableExtension
uses java.lang.UnsupportedOperationException
uses java.util.*
uses gw.api.address.AddressOwnerBase
uses gw.api.address.AddressOwnerFieldId
uses gw.api.address.AddressCountrySettings
uses gw.api.admin.BaseAdminUtil

@Export
class TerritoryCodeAddressSearchOwner extends AddressOwnerBase {

  construct(addrDelegate : AddressFillableExtension) {
    assignDelegateInternal(addrDelegate)
  }

  //prevents overridable function being called inside constructor
  private function assignDelegateInternal(addrDelegate : AddressFillableExtension) {
    this.setDelegateInternal(addrDelegate)
  }


  override property get ShowAddressSummary() : boolean {
    return false
  }

  override property get Address(): entity.Address {
    return null
  }

  override property set Address(value: entity.Address) {
    throw new UnsupportedOperationException("Address is not supported, please use AddressFillableExtension")
  }

  override function isHideIfReadOnly(fieldId : AddressOwnerFieldId) : boolean {
    return false
  }

  override property get RequiredFields() : Set <AddressOwnerFieldId> {
    return new HashSet<AddressOwnerFieldId>() {}.freeze()
  }

  override function isEditable(fieldId : AddressOwnerFieldId) : boolean {
    if (fieldId == AddressOwnerFieldId.STATE) {
      return false
    } else {
      return true
    }
  }

  override property get HiddenFields() : Set <AddressOwnerFieldId> {
    var hFields : Set <AddressOwnerFieldId> = {}
    hFields.addAll(AddressOwnerFieldId.ALL_PCF_FIELDS)
    hFields.removeAll(AddressOwnerFieldId.CITY_FIELDS)
    hFields.remove(AddressOwnerFieldId.COUNTY)
    hFields.removeAll(AddressOwnerFieldId.POSTALCODE_FIELDS)
    hFields.remove(AddressOwnerFieldId.STATE)
    return hFields
  }

  override property get AutofillEnabled(): boolean {
    return true
  }

  override property get SelectedCountry() : Country {
    return null
  }

  override property set SelectedCountry(value : Country) {
    // No-op to prevent AddressOwner base class from wiping out State
  }

  override property get CountrySettings() : AddressCountrySettings {
    return AddressCountrySettings.getSettings(BaseAdminUtil.getDefaultCountry())
  }

}
