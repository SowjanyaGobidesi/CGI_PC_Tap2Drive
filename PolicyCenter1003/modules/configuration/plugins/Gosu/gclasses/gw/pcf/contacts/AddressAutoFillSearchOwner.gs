package gw.pcf.contacts

uses java.util.Set

uses gw.api.address.AddressOwnerBase
uses gw.api.address.AddressOwnerFieldId
uses java.util.HashSet

@Export
class AddressAutoFillSearchOwner extends AddressOwnerBase {

  var _address : Address
  var _addrLinesEditable : boolean

  construct(theAddress : Address, addrLinesEditable : boolean) {
    _address = theAddress
    _addrLinesEditable = addrLinesEditable
  }

  override property get Address(): entity.Address {
    return _address
  }

  override property set Address(addr : Address) {
    _address = addr
  }

  override property get RequiredFields(): Set<AddressOwnerFieldId> {
    return new HashSet<AddressOwnerFieldId>(){}.freeze()
  }

  override function isEditable(fieldId : AddressOwnerFieldId) : boolean {
    if (!_addrLinesEditable and
        {AddressOwnerFieldId.ADDRESSLINE1, AddressOwnerFieldId.ADDRESSLINE2}.contains(fieldId)) {
      return false
    } else {
      return true
    }
  }

  override property get HiddenFields(): Set<AddressOwnerFieldId> {
    return new HashSet<AddressOwnerFieldId>(){AddressOwnerFieldId.ADDRESSLINE3}.freeze()
  }

  override property get AutofillEnabled(): boolean {
    return true
  }
}
