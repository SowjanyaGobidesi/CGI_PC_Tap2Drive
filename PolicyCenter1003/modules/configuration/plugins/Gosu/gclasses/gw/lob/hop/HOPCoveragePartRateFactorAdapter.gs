package gw.lob.hop

uses gw.api.domain.RateFactorAdapter

@Export
class HOPCoveragePartRateFactorAdapter implements RateFactorAdapter {
  var _owner: HOPCoveragePartRF

  construct(rateFactor: HOPCoveragePartRF) {
    _owner = rateFactor
  }

  override property get Modifier(): Modifier {
    return _owner.HOPCoveragePartModifier
  }
}
