package gw.api.web.dashboard.ui.account

uses com.google.common.base.Preconditions
uses gw.api.address.AddressFormatter
uses gw.api.locale.DisplayKey
uses gw.pcf.contacts.AddressInputSetAddressOwner
uses pcf.EditAccountPopup

@Export
class AccountDetailHelper {
  final var _account: Account as readonly Account

  construct(account: Account) {
    _account = Preconditions.checkNotNull(account)
  }

  property get AddressLabel(): String {
    var address = _account.AccountHolderContact.PrimaryAddress
    return DisplayKey.get("Web.Dashboard.Tile.AddressType", address.AddressType.DisplayName)
  }

  property get Address(): String {
    var address = _account.AccountHolderContact.PrimaryAddress
    var addressOwner = new AddressInputSetAddressOwner(address, false, true)
    return new AddressFormatter().format(addressOwner.AddressDelegate, "\n")
  }

  property get AddressDescription(): String {
    return _account.AccountHolderContact.PrimaryAddress.Description
  }

  function editAccount() {
    EditAccountPopup.push(_account)
  }
}
