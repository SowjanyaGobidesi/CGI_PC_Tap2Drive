package gw.lob.hop

uses gw.api.domain.ModifierAdapter

@Export
class HOPCoveragePartModifierAdapter implements ModifierAdapter {
  var _owner: HOPCoveragePartMod

  construct(owner: HOPCoveragePartMod) {
    _owner = owner
  }

  override property get OwningModifiable(): Modifiable {
    return _owner.HOPCoveragePart
  }

  override property get RateFactors(): RateFactor[] {
    return _owner.HOPCoveragePartRateFactors
  }

  override function addToRateFactors(p0: RateFactor) {
    _owner.addToHOPCoveragePartRateFactors(p0 as HOPCoveragePartRF)
  }

  override function createRawRateFactor(): RateFactor {
    return new HOPCoveragePartRF(_owner.Branch)
  }

  override function removeFromRateFactors(p0: RateFactor) {
    _owner.removeFromHOPCoveragePartRateFactors(p0 as HOPCoveragePartRF)
  }

}
