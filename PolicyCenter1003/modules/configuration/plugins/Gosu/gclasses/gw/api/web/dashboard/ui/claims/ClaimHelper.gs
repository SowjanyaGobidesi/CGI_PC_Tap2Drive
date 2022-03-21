package gw.api.web.dashboard.ui.claims

uses entity.Contact
uses gw.api.locale.DisplayKey
uses gw.api.system.PCConfigParameters
uses gw.api.web.ExternalSystemPages
uses gw.api.web.claim.ClaimUtil
uses gw.api.web.dashboard.data.ContactDTO
uses gw.api.web.dashboard.data.claims.ClaimDTO
uses gw.api.web.dashboard.data.impl.DashboardServices
uses gw.api.web.dashboard.ui.DashboardParameters
uses gw.api.web.dashboard.ui.DataFetchResult
uses gw.losshistory.ClaimSecurity
uses pcf.AccountFile_Claims
uses pcf.ContactFile_Claims
uses pcf.PolicyClaimsPopup
uses pcf.ViewClaim
uses typekey.*

@Export
class ClaimHelper {
  static function forAccount(account: Account): ClaimHelper {
    return new ClaimHelper(account)
  }

  static function forContact(contact: Contact): ClaimHelper {
    return new ClaimHelper(contact)
  }

  static function forPolicy(policy: Policy): ClaimHelper {
    return new ClaimHelper(policy)
  }

  final var _claims: ClaimDTO[] as readonly Claims
  final var _viewMore()

  construct(contact: Contact) {
    this(contact.getAccountsByRoleType(TC_ACCOUNTHOLDER), \-> ContactFile_Claims.push(contact, true))
  }

  construct(account: Account) {
    this({account}, \-> AccountFile_Claims.push(account, true))
  }

  construct(policy: Policy) {
    var claims = DataFetchResult.of(
        \-> DashboardServices.Instance.ClaimService.getPolicyClaims(policy),
        \err -> new ClaimDTO[0]).Data
    _claims = claims
    _viewMore = \-> PolicyClaimsPopup.push(new ClaimHelper(claims))
  }

  private construct(accounts: Account[], viewMore()) {
    var claims = DataFetchResult.of(
        \-> DashboardServices.Instance.ClaimService.getAccountClaims(accounts),
        \err -> new ClaimDTO[0]).Data
    _claims = claims
    _viewMore = viewMore
  }

  private construct(claims: ClaimDTO[]) {
    _claims = claims
    _viewMore = \-> {
    }
  }

  property get ViewMoreVisible(): boolean {
    return _claims.length > DashboardParameters.ListViewLimit
  }

  function viewMore() {
    _viewMore()
  }

  function isViewInClaimSystemLinkAvailable(claim: ClaimDTO): boolean {
    return ExternalSystemPages.ClaimPageAvailable
        and perm.System.viewclaimsystem
        and ((not ClaimSecurity.isRestricted(claim.SecurityType)) or perm.System.viewrestrictedclaim)
  }

  function viewInClaimSystem(claim: ClaimDTO): pcf.api.Location {
    ClaimUtil.giveClaimPermissions(claim.ClaimPublicID)
    return ViewClaim.push(PCConfigParameters.ClaimSystemURL.Value, claim.ClaimNumber)
  }

  function formatAdjuster(adjuster: ContactDTO): String {
    if (adjuster.Empty) {
      return ""
    }
    if (adjuster.PhoneNumber == null) {
      return adjuster.DisplayName
    }
    return DisplayKey.get('Web.Dashboard.Tile.Claims.AdjusterValue', adjuster.DisplayName, adjuster.PhoneNumber)
  }

  property get OpenClaims(): ClaimDTO[] {
    return _claims?.where(\claim -> claim.Status == "Open")
  }
}