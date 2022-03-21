package gw.web.line.hop.policy

uses entity.*
uses entity.HOPLine
uses gw.api.util.JurisdictionMappingUtil
uses gw.api.web.job.JobWizardHelper
uses gw.web.productmodel.ProductModelSyncIssuesHandler

@Export
class LineWizardStepSet_HOPHomeownersHelper {

  static function onDwellingLocationChanged(dwelling: HOPDwelling, helper: JobWizardHelper) {
    onDwellingLocationSelected(dwelling, dwelling.Location, helper)
  }

  static function onDwellingLocationSelected(dwelling: HOPDwelling, newLocation: PolicyLocation, helper: JobWizardHelper) {
    dwelling.Location = newLocation

    // update branch's PrimaryLocation and BaseState
    dwelling.Branch.PrimaryLocation = newLocation
    dwelling.Branch.BaseState = JurisdictionMappingUtil.getJurisdiction(newLocation)

    // sync product model
    ProductModelSyncIssuesHandler.sync({dwelling, dwelling.PolicyLine as entity.HOPLine}, {dwelling.PolicyLine as HOPLine}, null, dwelling.Branch, helper)
  }

  static function onEnter(policyPeriod: PolicyPeriod, jobWizardHelper: JobWizardHelper) {
    if (policyPeriod.OpenForEdit) {
      gw.web.productmodel.ProductModelSyncIssuesHandler.syncCoverages(policyPeriod.HOPLine.AllCoverables, jobWizardHelper)
      gw.web.productmodel.ProductModelSyncIssuesHandler.syncConditions(policyPeriod.HOPLine.AllCoverables, jobWizardHelper)
      gw.web.productmodel.ProductModelSyncIssuesHandler.syncExclusions(policyPeriod.HOPLine.AllCoverables, jobWizardHelper)
      HOPCoverageFormStateTransitions.create(policyPeriod.HOPLine).switchTo(policyPeriod.HOPLine.HOPDwellings.first().CoverageForm)
    }
  }
}