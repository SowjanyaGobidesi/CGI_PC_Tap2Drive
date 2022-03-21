package gw.pcf.contacts

/**
 * {@link gw.api.address.AddressOwner} implementation on {@link Address}
 */
@Export
class AddressInputSetAddressOwner extends AbstractInputSetAddressOwner {
  var _address : Address

  construct(theAddress : Address, isNonSpecific : boolean, isMovable : boolean) {
    super(isNonSpecific, isMovable)
    _address = theAddress
  }

  override property get Address(): entity.Address {
    return _address
  }

  override property set Address(value: entity.Address) {
    _address = value
  }
}
