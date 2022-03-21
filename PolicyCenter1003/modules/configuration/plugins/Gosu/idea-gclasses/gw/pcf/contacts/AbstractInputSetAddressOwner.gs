package gw.pcf.contacts

uses java.util.*
uses gw.api.address.AddressOwnerFieldId
uses gw.api.address.AddressCountrySettings

/**
 * Common behavior for {@link gw.api.address.AddressOwner} implementations (used in AddressInputSet.pcf)
 */
@Export
abstract class AbstractInputSetAddressOwner extends OptionalSelectedCountryAddressOwner {
  private static final var ALWAYS_REQUIRED_FIELDS: Set <AddressOwnerFieldId> = new HashSet <AddressOwnerFieldId>(){ AddressOwnerFieldId.STATE }.freeze()
  private static final var SPECIFIC_REQUIRED_FIELDS: Set <AddressOwnerFieldId> = {
      AddressOwnerFieldId.ADDRESSLINE1,
      AddressOwnerFieldId.CITY,
      AddressOwnerFieldId.POSTALCODE
  }.union(ALWAYS_REQUIRED_FIELDS).freeze()
  private static final var NONEDITABLE_FIELDS: Set <AddressOwnerFieldId> = new HashSet <AddressOwnerFieldId>(){
      AddressOwnerFieldId.STATE,
      AddressOwnerFieldId.COUNTRY
  }.freeze()
  private static final var NOFIELDS: Set <AddressOwnerFieldId> = new HashSet <AddressOwnerFieldId>(){}.freeze()

  var _isNonSpecific : boolean
  var _isMovable : boolean

  construct(isNonSpecific : boolean, isMovable : boolean) {
    _isNonSpecific = isNonSpecific
    _isMovable = isMovable
  }

  override property get RequiredFields(): Set <AddressOwnerFieldId> {
    return _isNonSpecific ? ALWAYS_REQUIRED_FIELDS : SPECIFIC_REQUIRED_FIELDS
  }

  override function isEditable(fieldId : AddressOwnerFieldId) : boolean {
    return !nonEditableFields().contains(fieldId)
  }

  private function nonEditableFields() : Set<AddressOwnerFieldId> {
    return _isMovable ? NOFIELDS : NONEDITABLE_FIELDS
  }

  override property get HiddenFields(): Set <AddressOwnerFieldId> {
    return NOFIELDS
  }

  override property get AutofillEnabled(): boolean {
    return true
  }
}
