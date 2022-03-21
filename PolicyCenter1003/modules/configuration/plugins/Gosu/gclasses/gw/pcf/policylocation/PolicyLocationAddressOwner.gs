package gw.pcf.policylocation

uses gw.globalization.PolicyLocationAddressAdapter
uses gw.pcf.contacts.AbstractInputSetAddressOwner

uses java.lang.UnsupportedOperationException

/**
 * {@link gw.api.address.AddressOwner} implementation for {@link PolicyLocation}
 */
@Export
class PolicyLocationAddressOwner extends AbstractInputSetAddressOwner {
  construct(policyLocation: PolicyLocation) {
    super(policyLocation.AccountLocation.NonSpecific, policyLocation != null ? policyLocation.canChangeState() : false)
    setInternalDelegate(policyLocation)
  }

  //prevents calling an overridable function from within the constructor
  private function setInternalDelegate(policyLocation: PolicyLocation) {
    setDelegateInternal(new PolicyLocationAddressAdapter(policyLocation))
  }

  override property get Address(): entity.Address {
    return null
  }

  override property set Address(value: entity.Address) {
    throw new UnsupportedOperationException("Setting Address is not supported.")
  }
}
