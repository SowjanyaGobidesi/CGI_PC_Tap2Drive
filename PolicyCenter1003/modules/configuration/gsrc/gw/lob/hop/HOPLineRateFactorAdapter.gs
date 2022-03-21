package gw.lob.hop

uses gw.api.domain.RateFactorAdapter

@Export
class HOPLineRateFactorAdapter implements RateFactorAdapter {
  var _owner: HOPLineRF

  construct(rateFactor: HOPLineRF) {
    _owner = rateFactor
  }

  override property get Modifier(): Modifier {
    return _owner.HOPLineModifier
  }
}
