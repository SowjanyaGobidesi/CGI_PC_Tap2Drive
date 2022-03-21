package gw.riskassessment

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory

@Export
class SpotlightNonInteractiveErrorHandler extends AbstractSpotlightErrorHandler {

  construct() {
    super(new SpotlightErrorCollector())
  }

  override function handleErrors() {
    ErrorCollector.LocationLevelErrors.eachKeyAndValue(\outboundTempStore, errors -> {
      var subject = getErrorForLocation(outboundTempStore)
      var errorDescription = String.join(DisplayKey.get("Web.RiskAssessment.Integration.LocationErrorDescriptionDelimiter"), errors*.ErrorDescription)
      PCLoggerCategory.RISK_ASSESSMENT_PLUGIN.error("${subject}: ${errorDescription}")
      SpotlightNotificationActivityCreator.createActivity(outboundTempStore.getOutboundPeriodRiskAssessmentTempStore().PolicyPeriod.Job, subject, errorDescription)
    })

    ErrorCollector.RequestLevelErrors.eachKeyAndValue(\periodTempStore, errors -> {
      var job = periodTempStore.PolicyPeriod.Job
      var subject = getErrorForJob(job)
      errors.each(\error -> {
        PCLoggerCategory.RISK_ASSESSMENT_PLUGIN.error("${subject}: ${error.ErrorDescription}")
        SpotlightNotificationActivityCreator.createActivity(job, subject, error.ErrorDescription)
      })
    })
  }

  private function getErrorForJob(associatedJob : Job) : String {
    return DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentFailure", associatedJob.getDisplayName())
  }

  private function getErrorForLocation(location : OutboundLocationRiskAssessmentTempStore) : String {
    return DisplayKey.get("Web.RiskAssessment.Integration.RiskAssessmentLocationFailure", location.PolicyLocation.DisplayName, location.OutboundPeriodRiskAssessmentTempStore.PolicyPeriod.Job.getDisplayName())
  }
}