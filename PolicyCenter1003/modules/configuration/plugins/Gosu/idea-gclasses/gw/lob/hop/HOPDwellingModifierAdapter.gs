package gw.lob.hop

uses gw.api.domain.ModifierAdapter

@Export
class HOPDwellingModifierAdapter implements ModifierAdapter {
  var _owner: HOPDwellingMod

  construct(owner: HOPDwellingMod) {
    _owner = owner
  }

  override property get OwningModifiable(): Modifiable {
    return _owner.HOPDwelling
  }

  override property get RateFactors(): RateFactor[] {
    return _owner.HOPDwellingRateFactors
  }

  override function addToRateFactors(p0: RateFactor) {
    _owner.addToHOPDwellingRateFactors(p0 as HOPDwellingRF)
  }

  override function createRawRateFactor(): RateFactor {
    return new HOPDwellingRF(_owner.Branch)
  }

  override function removeFromRateFactors(p0: RateFactor) {
    _owner.removeFromHOPDwellingRateFactors(p0 as HOPDwellingRF)
  }

}
