package gw.api.web.dashboard.data.claims;

uses gw.api.web.dashboard.data.ContactDTO
uses gw.pl.currency.MonetaryAmount

/**
 * Claim data for use in Claim Dashboard Tile
 */
@Export
class ClaimDTO {
  var _claimNumber: String as ClaimNumber
  var _claimPublicID: String as ClaimPublicID
  var _status: String as Status
  var _lossDate: Date as LossDate
  var _lossType: String as LossType
  var _lossCause: String as LossCause
  var _product: String as Product
  var _insuredName: String as InsuredName
  var _policyNumber: String as PolicyNumber
  var _totalIncurred: MonetaryAmount as TotalIncurred
  var _adjuster: ContactDTO as Adjuster
  var _securityType: String as SecurityType
  var _description: String as Description

  override function equals(that: Object): boolean {
    if (this === that) {
      return true;
    }
    if (not (that typeis ClaimDTO)) {
      return false;
    }
    var thatClaim = that as ClaimDTO;
    return ClaimNumber == thatClaim.ClaimNumber and
           ClaimPublicID == thatClaim.ClaimPublicID and
           Status == thatClaim.Status and
           LossDate == thatClaim.LossDate and
           LossType == thatClaim.LossType and
           LossCause == thatClaim.LossCause and
           Product == thatClaim.Product and
           InsuredName == thatClaim.InsuredName and
           PolicyNumber == thatClaim.PolicyNumber and
           TotalIncurred == thatClaim.TotalIncurred and
           Adjuster == thatClaim.Adjuster and
           SecurityType == thatClaim.SecurityType and
           Description == thatClaim.Description
  }

  override function hashCode(): int {
    return Objects.hash({
        ClaimNumber,
        ClaimPublicID,
        Status,
        LossDate,
        LossType,
        LossCause,
        Product,
        InsuredName,
        PolicyNumber,
        TotalIncurred,
        Adjuster,
        SecurityType,
        Description
    })
  }
}
