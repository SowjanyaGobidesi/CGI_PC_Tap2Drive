package gw.api.web.dashboard.data;

@Export
public class ContactDTO {
  final var _displayName: String as readonly DisplayName
  final var _phoneNumber: String as readonly PhoneNumber

  construct(displayName: String, phoneNumber: String) {
    _displayName = displayName
    _phoneNumber = phoneNumber
  }

  override function equals(that: Object): boolean {
    if (this === that) {
      return true
    }
    if (not (that typeis ContactDTO)) {
      return false
    }
    var thatContact = that as ContactDTO;
    return DisplayName == thatContact.DisplayName and
        PhoneNumber == thatContact.PhoneNumber
  }

  property get Empty(): boolean {
    return _displayName == null and _phoneNumber == null
  }

  override function hashCode(): int {
    return Objects.hash({DisplayName, PhoneNumber})
  }
}
