package gw.pcf.job

uses java.util.Date
uses gw.api.util.DateUtil

@Export
class PolicyInfoHelper {

  static function setPeriodDates(policyPeriod : PolicyPeriod, effectiveDate : Date, termType : TermType) {
    if (policyPeriod.Submission != null and !policyPeriod.HasWorkersComp) {
      policyPeriod.SubmissionProcess.beforePeriodStartChanged(effectiveDate)
    }
    if (termType == TC_OTHER) {
      policyPeriod.PeriodStart = effectiveDate
    } else {
      var policyPeriodPlugin = gw.plugin.Plugins.get( gw.plugin.policyperiod.IPolicyTermPlugin )
      var expirationDate = DateUtil
          .mergeDateAndTime(policyPeriodPlugin.calculatePeriodEnd(effectiveDate, termType, policyPeriod), policyPeriod.PeriodEnd)
      policyPeriod.setPeriodWindow( effectiveDate, expirationDate )
    }
  }

  static function getTermTypes(policyPeriod : PolicyPeriod) : java.util.List<typekey.TermType> {
    if (policyPeriod.HasWorkersComp){
      return policyPeriod.Policy.Product.AllowedPolicyTerms
    } else {
      return policyPeriod.getAvailablePolicyTermsForCurrentOffering()
    }
  }

  static function isExpirationDateEditable(policyPeriod : PolicyPeriod, termType : TermType) : boolean {
    if (policyPeriod.HasWorkersComp){
      return (termType == TermType.TC_ANNUAL or termType == TermType.TC_OTHER)
             and policyPeriod.CanUpdatePeriodDates
    } else {
      return termType == TermType.TC_OTHER and policyPeriod.CanUpdatePeriodDates
    }
  }

}