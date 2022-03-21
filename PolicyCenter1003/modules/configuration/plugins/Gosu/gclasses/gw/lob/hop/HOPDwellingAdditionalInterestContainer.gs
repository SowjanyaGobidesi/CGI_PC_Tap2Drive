package gw.lob.hop

uses gw.api.locale.DisplayKey
uses gw.lob.common.contact.AbstractAdditionalInterestContainer

@Export
class HOPDwellingAdditionalInterestContainer extends AbstractAdditionalInterestContainer<HOPDwelling> {
  construct(dwelling : HOPDwelling) {
    super(dwelling)
  }

  override function createNewAdditionalInterestDetail() : AddlInterestDetail {
    return new HOPDwellAddlInterest(this.PolicyPeriod)
  }

  override property get ContainerIsValid( ) : boolean {
    return _owner != null
  }

  override property get PolicyLine() : PolicyLine {
    return _owner.HOPCoveragePart.HOPLine
  }

  override property get PolicyPeriod() : PolicyPeriod {
    return _owner.Branch
  }

  override property get AdditionalInterestDetails() : AddlInterestDetail[] {
    return _owner.AdditionalInterests
  }

  override property get TypeLabel( ): String {
    return DisplayKey.get("Homeowners.Dwelling.AdditionalInterest.LVLabel")
  }

  override function addToAdditionalInterestDetails(interestDetail : AddlInterestDetail) {
    if (not (interestDetail typeis HOPDwellAddlInterest)) {
      throw DisplayKey.get("Homeowners.Dwelling.AdditionalInterest.Error.AdditionalInterestIsWrongType", interestDetail.Subtype)
    }
    _owner.addToAdditionalInterests(interestDetail as HOPDwellAddlInterest)
  }

  override function removeFromAdditionalInterestDetails(interestDetail : AddlInterestDetail) {
    if (not (interestDetail typeis HOPDwellAddlInterest)) {
      throw DisplayKey.get("Homeowners.Dwelling.AdditionalInterest.Error.AdditionalInterestIsWrongType", interestDetail.Subtype)
    }
    interestDetail.PolicyAddlInterest.removeFromAdditionalInterestDetails(interestDetail)
  }
}