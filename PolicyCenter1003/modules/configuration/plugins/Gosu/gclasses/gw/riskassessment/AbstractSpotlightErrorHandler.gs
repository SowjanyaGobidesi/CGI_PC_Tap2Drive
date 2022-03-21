package gw.riskassessment

uses gw.plugin.policylocation.RiskAssessmentErrorCollector
uses gw.plugin.policylocation.RiskAssessmentErrorHandler

@Export
abstract class AbstractSpotlightErrorHandler implements RiskAssessmentErrorHandler {

  var _collector : RiskAssessmentErrorCollector as readonly ErrorCollector

  construct(collector : RiskAssessmentErrorCollector) {
    _collector = collector
  }

  abstract function handleErrors()

}