package gw.lob.hop

uses gw.api.domain.RateFactorAdapter

@Export
class HOPDwellingRateFactorAdapter implements RateFactorAdapter {
  var _owner: HOPDwellingRF

  construct(rateFactor: HOPDwellingRF) {
    _owner = rateFactor
  }

  override property get Modifier(): Modifier {
    return _owner.HOPDwellingModifier
  }
}
