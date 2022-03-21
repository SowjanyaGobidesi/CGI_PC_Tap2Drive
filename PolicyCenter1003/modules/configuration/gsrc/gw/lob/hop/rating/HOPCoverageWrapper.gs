package gw.lob.hop.rating

uses gw.rating.flow.CoverageWrapper

uses java.math.BigDecimal

@Export
class HOPCoverageWrapper implements CoverageWrapper {

  var _coverage: Coverage

  construct(coverage: Coverage) {
    switch (typeof coverage) {
      case HOPCovC:
      case HOPCovD:
      case HOPCovE:
      case HOPCovF:
      case HOPOrdinanceOrLaw:
      case HOPScheduledPersonalPropertyItem:
        _coverage = coverage
        break
      default:
        throw new IllegalArgumentException("Coverage of type " + typeof coverage + " not supported by this wrapper")
    }
  }

  override property get PatternCode(): String {
    return _coverage.PatternCode
  }

  property get Limit(): BigDecimal {
    switch (typeof _coverage) {
      case HOPCovC:
        return _coverage.HOPCovCLimitTerm.Value
      case HOPCovD:
        return _coverage.HOPCovDLimitTerm.Value
      case HOPCovE:
        return _coverage.HOPCovELimitTerm.Value
      case HOPCovF:
        return _coverage.HOPCovFLimitTerm.Value
      case HOPOrdinanceOrLaw:
        return _coverage.HOPOrdinanceOrLawLimitTerm.Value
      case HOPScheduledPersonalPropertyItem:
        return _coverage.HOPScheduledPersonalPropertyItemLimitTerm.Value
      default:
        throw new IllegalStateException("No limit available")
    }
  }

  property get LimitPercentage() : BigDecimal {
    return Limit.divide(100)
  }

  property get TypeCode(): String {
    switch (typeof _coverage) {
      case HOPScheduledPersonalPropertyItem:
        return _coverage.HOPScheduledPersonalPropertyItemTypeTerm.OptionValue.OptionCode
      default:
        throw new IllegalStateException("No type code available")
    }
  }
}