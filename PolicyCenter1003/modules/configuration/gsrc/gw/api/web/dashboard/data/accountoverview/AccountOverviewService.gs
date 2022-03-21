package gw.api.web.dashboard.data.accountoverview

/**
 * An abstraction for obtaining Customer data for the purposes of Customer, Account Overview Dashboard Tiles
 */
@Export
interface AccountOverviewService {
  /**
   * @return Customer data for use in Account Overview Tile, based on {@code contact}
   */
  function getAccountOverviewForContact(contact: Contact): AccountOverviewDTO

  /**
   * @return Customer data for use in Account Overview Tile, based on {@code account}'s {@link Account#getAccountHolderContact()}
   */
  function getAccountOverviewForAccount(account: Account): AccountOverviewDTO
}