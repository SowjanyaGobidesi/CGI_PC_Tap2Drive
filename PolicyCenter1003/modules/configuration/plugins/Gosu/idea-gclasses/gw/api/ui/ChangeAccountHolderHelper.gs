package gw.api.ui

/**
 * Helper class for managing Account Holders for accounts.
 */
@Export
class ChangeAccountHolderHelper {
  final var _account: Account

  /**
   * Constructor of the class.
   *
   * @param account Account for managing Account Holders.
   */
  construct(account: Account) {
    _account = account
  }

  /**
   * This method is here because the AB Search page is read only, and simply selects a Contact to return - it does not
   * perform the domain logic to do the add like the NewAccountContactPopup does additionally, this page is read-only
   * itself, so we need to get a writeable bundle, load the Account in it, call the domain logic and then commit the
   * bundle.
   *
   * @param contact New account holder contact.
   */
  function changeAccountHolderToContact(contact: Contact) {
    // if the contact is new, we can use its' bundle - otherwise, need to make our own as this page is read-only
    if (contact.New) {
      var localAccount = contact.Bundle.add(_account)
      localAccount.changeAccountHolderTo(contact)
      contact.Bundle.commit()
    } else {
      gw.transaction.Transaction.runWithNewBundle(\bundle -> {
        var localAccount = bundle.add(_account)
        localAccount.changeAccountHolderTo(contact)
      })
    }
  }
}
