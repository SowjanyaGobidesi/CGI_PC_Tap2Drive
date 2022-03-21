package gw.web.account

uses pcf.AccountFile
uses pcf.PolicyFileForward

/**
 * Created by rvernick on 7/2/2015.
 */
@Export
class AccountFileUIHelper {

  static function movePolicies(periodsToMove : entity.PolicyPeriod[], srcAccount : Account, targetAccount : Account){
    gw.transaction.Transaction.runWithNewBundle(\ b ->{
      var targetAcct = b.add(targetAccount)
      var srcAcct = b.add(srcAccount)
      targetAcct.movePoliciesFrom(srcAcct, periodsToMove)
    })
    AccountFile.go(targetAccount)
  }

  static function removeRelationships(relationships : AccountAccount[]) {
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      for (relationship in relationships) {
        bundle.add(relationship).remove()
      }
    })
  }

  static function retrievePolicy(aPeriod : PolicyPeriod){
    if (aPeriod.Job.NewTerm and !aPeriod.PolicyNumberAssigned) {
      pcf.JobForward.go(aPeriod.Job)
    } else {
      pcf.PolicyFileForward.go(aPeriod, aPeriod.EditEffectiveDate)
    }
  }

  static function retrievePolicy(policyPeriodSummary : PolicyPeriodSummary){
    var period = policyPeriodSummary.fetchPolicyPeriod()
    PolicyFileForward.go(period, policyPeriodSummary.EditEffectiveDate)
  }
}