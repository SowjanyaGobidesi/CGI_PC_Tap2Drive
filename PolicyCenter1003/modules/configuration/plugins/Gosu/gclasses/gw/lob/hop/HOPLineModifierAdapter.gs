package gw.lob.hop

uses gw.api.domain.ModifierAdapter

@Export
class HOPLineModifierAdapter implements ModifierAdapter {
  var _owner: HOPLineMod

  construct(owner: HOPLineMod) {
    _owner = owner
  }

  override property get OwningModifiable(): Modifiable {
    return _owner.HOPLine
  }

  override property get RateFactors(): RateFactor[] {
    return _owner.HOPLineRateFactors
  }

  override function addToRateFactors(p0: RateFactor) {
    _owner.addToHOPLineRateFactors(p0 as HOPLineRF)
  }

  override function createRawRateFactor(): RateFactor {
    return new HOPLineRF(_owner.Branch)
  }

  override function removeFromRateFactors(p0: RateFactor) {
    _owner.removeFromHOPLineRateFactors(p0 as HOPLineRF)
  }

}
