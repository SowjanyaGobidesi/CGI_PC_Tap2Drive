package gw.api.web.desktop.data.common

uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class ContactDTOImpl extends AuditableDTO implements JacksonEnabledSerializable, ContactDTO {

  var _contactPublicId : String as ContactPublicId
  var _contactName : String as ContactName
  var _contactAddress : String as ContactAddress
  var _contactState : String as ContactState

  static function from(contact : Contact) : ContactDTOImpl {
    return new ContactDTOImpl() {
      :_contactPublicId = contact.PublicID,
      :_contactName = contact.DisplayName,
      :_contactAddress = contact.PrimaryAddress.DisplayName,
      :_contactState = contact.PrimaryAddress.State.Code
    }
  }

  function writeAsJSONString() : String {
    return DesktopDTOSerializationHelper.Mapper.writeValueAsString(this)
  }

}