package gw.riskassessment

uses gw.plugin.policylocation.RiskAssessmentErrorCollector
uses gw.util.AutoMap

uses java.util.Set

@Export
class SpotlightErrorCollector implements RiskAssessmentErrorCollector {

  var _locationErrors : Map<OutboundLocationRiskAssessmentTempStore, Set<RiskAssessmentError>> = new AutoMap<OutboundLocationRiskAssessmentTempStore, Set<RiskAssessmentError>>({}, \ tempStore -> new HashSet<RiskAssessmentError>())
  var _requestErrors : Map<OutboundPeriodRiskAssessmentTempStore, Set<RiskAssessmentError>> = new AutoMap<OutboundPeriodRiskAssessmentTempStore, Set<RiskAssessmentError>>({}, \ tempStore -> new HashSet<RiskAssessmentError>())

  override function addLocationError(location: OutboundLocationRiskAssessmentTempStore, error: RiskAssessmentError) {
    _locationErrors.get(location).add(error)
  }

  override function addRequestError(periodTempStore : OutboundPeriodRiskAssessmentTempStore, error: RiskAssessmentError) {
    _requestErrors.get(periodTempStore).add(error)
  }

  override property get LocationLevelErrors(): Map<OutboundLocationRiskAssessmentTempStore, Set<RiskAssessmentError>> {
    return _locationErrors
  }

  override property get RequestLevelErrors(): Map<OutboundPeriodRiskAssessmentTempStore, Set<RiskAssessmentError>> {
    return _requestErrors
  }

  override function hasErrors() : boolean {
    return not _locationErrors.Empty or not _requestErrors.Empty
  }

}