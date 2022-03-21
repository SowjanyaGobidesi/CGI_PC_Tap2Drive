package gw.lob.pa

uses gw.api.locale.DisplayKey
uses gw.lang.reflect.IType
uses gw.lob.common.AbstractUnderwriterEvaluator
uses gw.policy.PolicyEvalContext

uses java.util.Set

@Export
class PA_UnderwriterEvaluator extends AbstractUnderwriterEvaluator {

  construct(policyEvalContext : PolicyEvalContext) {
    super(policyEvalContext)
  }

  override function canEvaluate() : boolean {
    var allowedJobs : Set<IType> = {Submission, PolicyChange, Reinstatement, Renewal, Rewrite, Issuance, RewriteNewAccount}
    return allowedJobs.contains(typeof(_policyEvalContext.Period.Job))
  }

  override function onPrequote() {
    producerChanged()
  }

  override function onMVR() {
    mVRAccidentsAndViolations()
  }

  private function mVRAccidentsAndViolations() {
    var policyDrivers = _policyEvalContext.Period.PersonalAutoLine.PolicyDrivers.where(\p -> p.DoNotOrderMVR == false)
    for (policyDriver in policyDrivers) {
      var pdMVR = policyDriver.PolicyDriverMVR
      if (pdMVR == null and !_policyEvalContext.Period.EditLocked) continue
        /*            Accidents           */
      //check if the number of accidents are different
      //the policyDriver.NumberOfAccidents typekey goes up to "5 or more"
      var pdNumOfAcc = policyDriver.NumberOfAccidents == null ? 0 : java.lang.Integer.parseInt(policyDriver.NumberOfAccidents.Code)
      var pdMVRNumOfAcc = pdMVR == null ? 0 : pdMVR.getAccidentsToCompareToTypeKey()
      var accidentsDifference = pdMVRNumOfAcc - pdNumOfAcc
        /*            Violations           */
      //check if the number of violations are different
      //the policyDriver.NumberOfAccidents typekey goes up to "5 or more"
      var pdNumOfVio = policyDriver.NumberOfViolations == null ? 0 : java.lang.Integer.parseInt(policyDriver.NumberOfViolations.Code)
      //since the policyDriver.NumberOfAccidents is restricted to 5 as a maximum, need to restrict the policyDriverMVR.NumberOfViolations as well
      var pdMVRNumOfVio = pdMVR == null ? 0 : pdMVR.getViolationsToCompareToTypeKey()
      var violationsDifference = pdMVRNumOfVio - pdNumOfVio

        /*
         * if either accidents or violations differ between what is on the policy driver and the policy driver mvr entities then an
         * then an UW issue should be raised
         */
      if (accidentsDifference != 0 or violationsDifference != 0) {
        var shortDescription = DisplayKey.get("UWIssue.PersonalAuto.PAMVRAccidentsViolations.shortDesc")
        accidentsDifference = java.lang.Math.abs(accidentsDifference)
        violationsDifference = java.lang.Math.abs(violationsDifference)
        var longDescription = DisplayKey.get("UWIssue.PersonalAuto.PAMVRAccidentsViolations.longDesc", policyDriver.DisplayName, accidentsDifference, violationsDifference)
        _policyEvalContext.addIssue("PAMVRAccidentsViolations", "Driver:${policyDriver.FixedId.toString()}", \-> shortDescription, \-> longDescription)
      }
    }
  }
}
