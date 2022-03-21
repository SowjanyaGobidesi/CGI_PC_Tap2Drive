package gw.sharding

uses gw.api.sharding.AccountTransferRepresentation
uses gw.api.domain.account.PCAccountTransfer

/**
 * This interface defines the API for transferring an Account and its related Accounts out of one system and into another.
 *
 * @see PCAccountTransfer#findRelatedAccounts(Account)
 */
@Export
interface AccountTransferManager {

  /**
   * Create a representation of a frozen account for transfer.
   * @param account the account to be transferred, which should already be frozen together with any related accounts
   * @return The representation of the frozen account and its related accounts
   * @throws AccountNotFrozenException if the account is not frozen
   */
  function createAccountTransferRepresentation(account: Account) : AccountTransferRepresentation

  /**
   * Import a representation of the account and its related accounts into this system.
   * @param accountTransferRepresentation the representation of the account and its related accounts to import.
   * @return The accounts that were created from the passed in representation.
   */
  function importAccounts(accountTransferRepresentation : AccountTransferRepresentation) : Set<Account>
}