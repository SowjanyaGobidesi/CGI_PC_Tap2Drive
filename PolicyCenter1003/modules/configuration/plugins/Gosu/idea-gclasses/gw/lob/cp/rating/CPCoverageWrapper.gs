package gw.lob.cp.rating

uses java.math.BigDecimal
uses java.lang.IllegalStateException
uses java.lang.IllegalArgumentException

@Export
class CPCoverageWrapper implements gw.rating.flow.CoverageWrapper {

  var _coverage : Coverage

  construct (coverage : Coverage) {
    switch (typeof coverage) {
      case CPBPPCov:
      case CPBldgCov:
          _coverage = coverage
          break
      default:
        throw new IllegalArgumentException("Coverage of type " + typeof coverage + " not supported by this wrapper")
    }
  }

  override property get PatternCode() : String {
    return _coverage.PatternCode
  }

  property get Limit() : BigDecimal {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.CPBPPCovLimitTerm.Value
      case CPBldgCov:
          return _coverage.CPBldgCovLimitTerm.Value
        default:
        throw new IllegalStateException("No limit available")
    }
  }

  property get Deductible() : String {
    switch (typeof _coverage) {
      case CPBPPCov:
        return _coverage.CPBPPCovDeductibleTerm.ValueAsString
      case CPBldgCov:
        return _coverage.CPBldgCovDeductibleTerm.ValueAsString
      default:
        throw new IllegalStateException("No deductible available")
    }
  }

  property get HasDeductible() : boolean {
    switch (typeof _coverage) {
      case CPBPPCov:
        return _coverage.HasCPBPPCovDeductibleTerm
      case CPBldgCov:
        return _coverage.HasCPBldgCovDeductibleTerm
      default:
        return false
    }
  }

  property get CauseOfLoss(): CPCauseOfLoss {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.CPBPPCovCauseOfLossTerm.Value
      case CPBldgCov:
          return _coverage.CPBldgCovCauseOfLossTerm.Value
        default:
        throw new IllegalStateException("No cause of loss available")
    }
  }

  property get AutoIncreasePct(): BigDecimal {
    switch (typeof _coverage) {
      case CPBldgCov:
          return _coverage.CPBldgCovAutoIncreaseTerm.Value
      default:
        throw new IllegalStateException("No auto increase percentage available")
    }
  }

  property get HasAutoIncreasePct(): boolean {
    switch (typeof _coverage) {
      case CPBldgCov:
          return _coverage.HasCPBldgCovAutoIncreaseTerm
      default:
          return false
    }
  }

  property get Coinsurance(): BigDecimal {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.CPBPPCovCoinsuranceTerm.Value
      case CPBldgCov:
          return _coverage.CPBldgCovCoinsuranceTerm.Value
      default:
          throw new IllegalStateException("No coinsurance available")
    }
  }

  property get ExcludeSprinkler(): boolean {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.CPBPPCovExcludeSprinklerTerm.Value
      case CPBldgCov:
          return _coverage.CPBldgCovExcludeSprinklerTerm.Value
      default:
          throw new IllegalStateException("Exclude sprinkler not specified")
    }
  }

  property get HasExcludeSprinkler(): boolean {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.HasCPBPPCovExcludeSprinklerTerm
      case CPBldgCov:
          return _coverage.HasCPBldgCovExcludeSprinklerTerm
      default:
          return false
    }
  }

  property get ExcludeTheft(): boolean {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.CPBPPCovExcludeTheftTerm.Value
      case CPBldgCov:
          return _coverage.CPBldgCovExcludeTheftTerm.Value
      default:
          throw new IllegalStateException("Exclude theft not specified")
    }
  }

  property get HasExcludeTheft(): boolean {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.HasCPBPPCovExcludeTheftTerm
      case CPBldgCov:
          return _coverage.HasCPBldgCovExcludeTheftTerm
      default:
          return false
    }
  }

  property get ExcludeVandalism(): boolean {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.CPBPPCovExcludeVandalismTerm.Value
      case CPBldgCov:
          return _coverage.CPBldgCovExcludeVandalismTerm.Value
        default:
        throw new IllegalStateException("Exclude vandalism not specified")
    }
  }

  property get HasExcludeVandalism(): boolean {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.HasCPBPPCovExcludeVandalismTerm
      case CPBldgCov:
          return _coverage.HasCPBldgCovExcludeVandalismTerm
      default:
          return false
    }
  }

  property get ValuationMethod(): CPValuationMethod {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.CPBPPValuationMethodTerm.Value
      case CPBldgCov:
          return _coverage.CPBldgCovValuationMethodTerm.Value
      default:
          throw new IllegalStateException("No valuation method found")
    }
  }

  property get ReportingForm(): CPReportingForm {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.CPBPPCovReportingFormTerm.Value
      default:
          throw new IllegalStateException("No reporting form found")
    }
  }

  property get HasReportingForm(): boolean {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.HasCPBPPCovReportingFormTerm
      default:
          return false
    }
  }

  property get WindDeductiblePct(): BigDecimal {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.CPBPPCovWindDeductibleTerm.Value
      case CPBldgCov:
          return _coverage.CPBldgCovWindDeductibleTerm.Value
      default:
          throw new IllegalStateException("No wind deductible percent found")
    }
  }

  property get HasWindDeductiblePct(): boolean {
    switch (typeof _coverage) {
      case CPBPPCov:
          return _coverage.HasCPBPPCovWindDeductibleTerm
      case CPBldgCov:
          return _coverage.HasCPBldgCovWindDeductibleTerm
      default:
          return false
    }
  }
}