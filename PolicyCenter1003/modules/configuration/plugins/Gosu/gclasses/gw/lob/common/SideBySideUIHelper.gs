package gw.lob.common

uses gw.api.domain.policy.period.PolicyPeriodStatusSets
uses gw.api.locale.DisplayKey
uses gw.api.profiler.PCProfilerTag
uses gw.api.system.PCConfigParameters
uses gw.api.web.job.JobWizardHelper
uses pcf.api.Wizard

@Export
class SideBySideUIHelper {

  var _policyPeriod : PolicyPeriod
  var _wizard : Wizard
  var _jobWizardHelper : JobWizardHelper

  construct(period : PolicyPeriod, wiz : Wizard, jobWizHelper : JobWizardHelper) {
    _policyPeriod = period
    _wizard = wiz
    _jobWizardHelper = jobWizHelper
  }

  static function quoteAll(wizard: pcf.api.Wizard, jobWizardHelper: gw.api.web.job.JobWizardHelper,
                           periodInfos: gw.job.sxs.SideBySidePolicyPeriodInfo[], periods: PolicyPeriod[]) {
    gw.lob.common.SideBySideUtil.setLastResultFromValidationContextAndGetQuotes(periods, periodInfos)
    jobWizardHelper.refreshBundle()
    wizard.saveDraft()
    periodInfos.each(\ i -> i.validateWithoutQuote())
    jobWizardHelper.Wizard.refreshCurrentStep()
  }

  static function getQuoteAllLabel(): String {
    if (PCConfigParameters.SideBySideTwoStepQuotingEnabled.Value) {
      return DisplayKey.get("Web.Job.SideBySide.RateAll")
    } else {
      return DisplayKey.get("Web.Job.SideBySide.QuoteAll")
    }
  }

  /**
   * Full App conversion button visible if:
   * 1. We're in submission job
   * 2. We're in Quick Quote
   * 3. canConvertToFullApp().Okay
   *
   * @param jobProcess the JobProcess
   * @return true if 'Full App' button should be visible
   */

  static function fullAppVisible(jobProcess : gw.job.JobProcess) : boolean {
    if (jobProcess typeis gw.job.SubmissionProcess and jobProcess.Job.QuoteType == TC_QUICK) {
        return jobProcess.canConvertToFullApp().Okay
    }
    return false
  }

  function attemptSideBySide(numPeriods : int) {
    PCProfilerTag.SIDE_BY_SIDE.execute(\ f -> {
      _jobWizardHelper.Wizard.refreshCurrentStep()

      var job = _policyPeriod.Job
      if (job.ActivePeriods.hasMatch(\p -> p.hasAnyUnhandledPreemptions())) {
        throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Job.SideBySide.Errors.ResolveUnhandledPreemption"))
      } else if (job.OOSJob and job.ActivePeriods.hasMatch(\ p -> p.OOSConflicts.HasElements)) {
        throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Job.SideBySide.Errors.ResolveUnhandledOOSConflicts"))
      } else {
        _wizard.saveDraft()
        if (_jobWizardHelper.revalidateModel()) {
          var initValidationCtxt =
            gw.lob.common.SideBySideUtil.validatePeriodForSideBySide(_policyPeriod, _policyPeriod.ValidationLevel)
          _policyPeriod.JobProcess.JobProcessValidator.LastResult = initValidationCtxt.Result
          if (initValidationCtxt.Result.hasErrors()) {
            gw.api.util.PCWebMessageUtil.addIssuesToTopLocation(initValidationCtxt.Result.Errors as List<gw.api.validation.ValidationIssue>)
            return
          }

          // No errors, clear last result and messages
          gw.api.web.workspace.WorkspaceUtil.closeActiveWorksheet()
          _policyPeriod.JobProcess.JobProcessValidator.LastResult = null
          _wizard.saveDraft()

          _jobWizardHelper.invalidateIterators()
          gw.lob.common.SideBySideUtil.maybeCreateSideBySidePeriods(_policyPeriod, numPeriods, true)

          //Make sure bundle is in sync before commit.
          _jobWizardHelper.refreshBundle()
          _wizard.saveDraft()
          _jobWizardHelper.goToStep("SideBySide")
        }
      }
    })
  }

  function canAttemptSideBySide() : boolean {
    var job = _policyPeriod.Job
    if (null==job) {
      return false
    }

    if (not _policyPeriod.AvailableForSideBySideEdit) {
      return false
    }

    // Use out of the box PersonalAutoSideBySideBaseDataConfig to make sure current policy is supported before showing Side-by-Side button
    var PASxSConfig = new gw.job.sxs.PersonalAutoSideBySideBaseDataConfig()
    if (not PASxSConfig.supportsPolicies({_policyPeriod})) {
      return false
    }

    return !job.SideBySide and !job.hasMultiplePeriods() and PolicyPeriodStatusSets.SIDE_BY_SIDE_EDITABLE_STATUSES.contains(_policyPeriod.Status)
  }

  function getVersionLabel() : String {
    var job = _policyPeriod.Job
    if (job.hasMultiplePeriods()){
     if (job.SideBySide) {
       return DisplayKey.get("Web.Job.SideBySide.AddSideBySide")
     } else {
       return  DisplayKey.get("Web.MultiQuoteWizardToolbar.AddNewVersion")
     }
    } else {
      return DisplayKey.get("Web.MultiQuoteWizardToolbar.NewVersion")
    }
  }
}
