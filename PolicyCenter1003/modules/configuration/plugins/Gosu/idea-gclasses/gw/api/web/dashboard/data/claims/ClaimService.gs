package gw.api.web.dashboard.data.claims

/**
 * An abstraction for obtaining Claim data for the purpose of Claim Dashboard Tile
 */
@Export
interface ClaimService {
  /**
   * @return Claim data for Policies belonging to either of {@code accounts}
   */
  function getAccountClaims(accounts: Account[]): ClaimDTO[]

  /**
   * @return Claim data for the given {@code policy}
   */
  function getPolicyClaims(policy: Policy): ClaimDTO[]
}