package gw.pcf.contacts

uses gw.api.locale.DisplayKey

@Export
class ContactFowardValidator {

  public static function checkForError(contact : Contact) : String {
    if (contact == null)
      return DisplayKey.get("Web.Errors.ContactMissingFromSystem")
    return null
  }
}