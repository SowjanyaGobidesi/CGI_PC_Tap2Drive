package gw.pcf.accountlocation

uses gw.pcf.contacts.AddressInputSetAddressOwner

/**
 * {@link gw.api.address.AddressOwner} implementation for {@link AccountLocation}
 */
@Export
class AccountLocationAddressOwner extends AddressInputSetAddressOwner {
  construct(accountLocation: AccountLocation) {
    super(accountLocation, accountLocation.NonSpecific, accountLocation.New)
  }
}
