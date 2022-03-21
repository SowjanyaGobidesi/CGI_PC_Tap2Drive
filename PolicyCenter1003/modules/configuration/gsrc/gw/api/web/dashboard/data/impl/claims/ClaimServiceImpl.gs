package gw.api.web.dashboard.data.impl.claims

uses gw.api.web.claim.ClaimUtil
uses gw.api.web.dashboard.data.claims.ClaimDTO
uses gw.api.web.dashboard.data.claims.ClaimService
uses gw.api.web.dashboard.data.ContactDTO
uses gw.losshistory.ClaimSearchCriteria
uses gw.plugin.claimsearch.IClaimSearchCriteria
uses gw.plugin.claimsearch.NoResultsClaimSearchException

@Export
class ClaimServiceImpl implements ClaimService {
  static final var _allowedStatusesOrder = {"Open"->1, "Closed"->2}

  static final var _comparator = (\-> {
    var byStatus = Comparator.comparingInt<Claim>(\claim -> _allowedStatusesOrder[claim.Status])
    var byLossDate = Comparator.comparing<Claim, Date>(\claim -> claim.LossDate).reversed()
    return byStatus.thenComparing(byLossDate)
  })()

  override function getAccountClaims(accounts: Account[]): ClaimDTO[] {
    if (accounts == null or accounts.IsEmpty) {
      return {}
    }
    var criteria = new ClaimSearchCriteria()
    if (criteria.policyNumbersRelatedToAccounts(accounts, criteria.DateCriteria.DateRangeToSearch).IsEmpty) {
      return {}
    }
    criteria.Accounts.addAll(accounts.toList())
    return searchForClaims(criteria).map(\claim -> toDTO(claim))
  }

  override function getPolicyClaims(policy: Policy): ClaimDTO[] {
    var criteria = new ClaimSearchCriteria()
    if (policy.findUniquePolicyNumbers(criteria.DateCriteria.DateRangeToSearch).Empty) {
      return {}
    }
    criteria.Policy = policy
    return searchForClaims(criteria).map(\claim -> toDTO(claim))
  }

  private function searchForClaims(criteria: IClaimSearchCriteria): Claim[] {
    try {
      return criteria.performSearch().Claims
          .where(\claim -> _allowedStatusesOrder.containsKey(claim.Status))
          .sort(_comparator)
    } catch (ignored: NoResultsClaimSearchException) {
      return {}
    }
  }

  private function toDTO(claim: Claim): ClaimDTO {
    var claimDetail = ClaimUtil.getClaimDetail(claim)
    var claimDTO = new ClaimDTO() {
      :ClaimNumber = claim.ClaimNumber,
      :ClaimPublicID = claim.ClaimPublicID,
      :Status = claim.Status,
      :LossDate = claim.LossDate,
      :LossType = claim.LossType,
      :LossCause = claimDetail.LossCause,
      :TotalIncurred = claim.TotalIncurred,
      :Adjuster = new ContactDTO(claim.AdjusterDisplayName, claim.AdjusterPhoneNumber),
      :SecurityType = claim.ClaimSecurityType,
      :Description = claimDetail.Description
    }

    var period = claim.PolicyPeriod
    if (period != null) {
      period = period.getSlice(period.EditEffectiveDate)
      claimDTO.Product = period.Policy.Product.DisplayName
      claimDTO.InsuredName = period.PrimaryInsuredName
      claimDTO.PolicyNumber = period.PolicyNumberDisplayString
    }

    return claimDTO
  }
}
