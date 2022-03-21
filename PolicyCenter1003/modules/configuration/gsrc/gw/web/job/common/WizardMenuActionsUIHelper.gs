package gw.web.job.common

uses pcf.JobForward
uses gw.api.locale.DisplayKey
uses gw.api.web.job.JobWizardHelper
uses pcf.CopyPolicyDataSearchPopup

@Export
class WizardMenuActionsUIHelper {
  // Copy current PolicyPeriod into new Submission and new Policy
  static function copySubmission(job : Job, policyPeriod : PolicyPeriod) {
    var submission = (job as Submission)
    var copy = submission.copyPolicyPeriod( policyPeriod )
    JobForward.go(copy)
  }

  static function getConfirmMessgeForChangeEffectiveDate(job : Job, policyPeriod : PolicyPeriod) : String {
    if (((job as PolicyChange).ActivePeriods.Count == 1) ) {
      return policyPeriod.RatedOrQuoted ? DisplayKey.get('Job.Operation.Edit.Confirm') : null
    } else {
      return (getActiveRatedOrQuotedPeriods(job).Count > 0) ? DisplayKey.get('Job.Operation.MultiQuote.Edit.Confirm') : null
    }
  }

  static function getActiveRatedOrQuotedPeriods(job: Job) : PolicyPeriod[] {
    return (job as PolicyChange).ActivePeriods.where(\ p -> p.RatedOrQuoted )
  }

  static function validateThenGoToCopyData(jobWizardHelper : JobWizardHelper, policyPeriod : PolicyPeriod){
    var jobWizard = jobWizardHelper.Wizard
    var valid = jobWizard.reValidateModel()
    if (valid){
      jobWizard.saveDraft()
      CopyPolicyDataSearchPopup.push(policyPeriod)
    }
  }

  static function canCopyData(jobWizardHelper : JobWizardHelper, policyPeriod : PolicyPeriod) : boolean {
    var isVisible = not (jobWizardHelper.Wizard.CurrentStepId == "SideBySide")
    isVisible = isVisible and gw.job.CopyDataVisibilityByProduct.isCopyDataVisibleForProduct(policyPeriod.Policy.ProductCode)
    isVisible = isVisible and policyPeriod.JobProcess.canStartCopyPolicyData().Okay
    return isVisible
  }
}