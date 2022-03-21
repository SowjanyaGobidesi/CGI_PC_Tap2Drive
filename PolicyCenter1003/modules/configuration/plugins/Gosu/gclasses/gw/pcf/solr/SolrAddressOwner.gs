package gw.pcf.solr

uses gw.pcf.contacts.AddressCountryCityStatePostalCodeOwner
uses gw.api.address.AddressOwnerFieldId
uses java.util.Set
uses gw.api.address.AddressFillableExtension

@Export
class SolrAddressOwner extends AddressCountryCityStatePostalCodeOwner {

  construct(addrDelegate : AddressFillableExtension) {
    super(addrDelegate)
  }

  override property get HiddenFields() : Set <AddressOwnerFieldId> {
    var hFields = super.HiddenFields
    hFields.removeAll(AddressOwnerFieldId.ADDRESSLINE1_FIELDS)
    return hFields
  }
}
