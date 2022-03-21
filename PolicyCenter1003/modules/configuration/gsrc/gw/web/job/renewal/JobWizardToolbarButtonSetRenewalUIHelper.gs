package gw.web.job.renewal

uses pcf.api.Wizard
uses gw.api.web.job.JobWizardHelper
uses pcf.JobForward
uses gw.job.RenewalProcess

@Export
class JobWizardToolbarButtonSetRenewalUIHelper {
  static function attemptNewVersion(wizard : Wizard, jobWizardHelper : JobWizardHelper, policyPeriod : PolicyPeriod,
      job : Job) {
    wizard.saveDraft()
    if (job.SideBySide) {
      gw.lob.common.SideBySideUtil.addNewSideBySidePeriod(policyPeriod)
      wizard.saveDraft()
      jobWizardHelper.goToStep("SideBySide")
    } else {
      jobWizardHelper.newPeriod()
      wizard.saveDraft()
      if ( !jobWizardHelper.isStepVisitable( jobWizardHelper.CurrentStep ) ) {
        jobWizardHelper.goToStep( "PolicyInfo" )
      }
    }
  }

  static function editRenewalFromWorkflow(wizard : Wizard, policyPeriod : PolicyPeriod, renewalProcess : RenewalProcess,
      job : Job){
    if(policyPeriod.Status == TC_NEW){
      gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
        var p = bundle.loadBean(policyPeriod.ID) as PolicyPeriod
        p.RenewalProcess.ActiveRenewalWorkflow.invokeTrigger(TC_EDITPOLICY)
      })
      JobForward.go(job)
    }else{
      renewalProcess.ActiveRenewalWorkflow.invokeTrigger(TC_EDITPOLICY)
      wizard.saveDraft()
    }
  }
}