package gw.address

uses java.util.ArrayList
uses gw.api.address.AddressOwner
uses gw.util.GosuStringUtil

@Export
class AddressValidator {

  /**
   *  Validates whether the given address has all of its visible and required fields populated based on its Country.
   *
   *  @return empty array list if address is valid for its country, otherwise return the field(s) that are invalid
   */
  static function validateAddress(addressOwner: AddressOwner) : ArrayList<String> {
    var invalidFields : ArrayList<String> = {}

    var visibleFields = addressOwner.CountrySettings.VisibleFields
    for (field in visibleFields) {
      if (addressOwner.isRequired(field)) {
        var fieldValue = addressOwner.Address[field.Name] as String
        if (GosuStringUtil.isBlank(fieldValue)) {
          invalidFields.add(field.Name)
        }
      }
    }

    return invalidFields
  }

}