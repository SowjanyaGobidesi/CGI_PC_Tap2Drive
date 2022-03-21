package gw.riskassessment

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.pl.persistence.core.Bundle

@Export
class SpotlightInteractiveErrorHandler extends AbstractSpotlightErrorHandler {

  construct() {
    super(new SpotlightErrorCollector())
  }

  override function handleErrors() {
    var bundle = bundleToCommit()

    //we have errors but no bundle so we won't be able to commit
    if (bundle == null and (not (ErrorCollector.LocationLevelErrors.Empty or ErrorCollector.RequestLevelErrors.Empty))) {
      PCLoggerCategory.RISK_ASSESSMENT.error("There was no bundle even though we have errors we want to commit")
      return
    }

    ErrorCollector.LocationLevelErrors.eachKeyAndValue(\locationTempStore, errors -> {
      errors.each(\error -> {
        var errorData = new InboundLocationRiskAssessmentErrorTempStore(bundle)
        errorData.OutboundLocationRiskAssessmentTempStore = locationTempStore
        errorData.RiskAssessmentError = error
      })
    })

    ErrorCollector.RequestLevelErrors.eachKeyAndValue(\periodTempStore, errors -> {
      errors.each(\error -> {
        var errorData = new InboundPeriodRiskAssessmentErrorTempStore(bundle)
        errorData.OutboundPeriodRiskAssessmentTempStore = periodTempStore
        errorData.RiskAssessmentError = error
      })
    })

    bundle?.commit()
  }

  private function bundleToCommit() : Bundle {
    var bundle = ErrorCollector.RequestLevelErrors.Keys.first()?.Bundle
    if (bundle == null) {
      bundle = ErrorCollector.LocationLevelErrors.Keys.first()?.Bundle
    }

    return bundle
  }

}