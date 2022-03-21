package gw.web.line.common

uses gw.api.web.job.JobWizardHelper

@Export
class RatingOverrideUIHelper {

  private var _issuesBlockingRatingOverride: UWIssue[]

  function beforeCommit(line : PolicyLine, jobWizardHelper : JobWizardHelper) {
    _issuesBlockingRatingOverride = jobWizardHelper.requestRatingOverride(line)
  }

  function afterCommit(period : PolicyPeriod, jobWizardHelper : JobWizardHelper) {
    if (_issuesBlockingRatingOverride == null) {
      throw new IllegalStateException("Cannot call 'afterCommit' before calling 'beforeCommit'")
    } 
    period.Bundle.commit()
    jobWizardHelper.synchronizeWizardStateAfterRealCommit()
    if (_issuesBlockingRatingOverride.HasElements) {
      pcf.UWBlockProgressIssuesPopup.push(period, jobWizardHelper, _issuesBlockingRatingOverride.CurrentBlockingPoint,
          _issuesBlockingRatingOverride)
    }
  }

  static function clearAllOverrides(line : PolicyLine) {
    line.Costs.each(\ cost -> cost.resetOverrides())
  }

  static function hasAnyOverridableCosts(line : PolicyLine) : boolean {
    return line.Costs.hasMatch(\ cost -> cost.Overridable)
  }
}