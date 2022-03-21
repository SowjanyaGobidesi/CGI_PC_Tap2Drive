package gw.web.riskassessment

enhancement RiskAssessmentResultUIEnhancement: RiskAssessmentResult {

  property get FormattedAssessmentDate() : String {
    return this.AssessmentDate.formatDateTime(gw.i18n.DateTimeFormat.SHORT, gw.i18n.DateTimeFormat.SHORT)
  }

}
