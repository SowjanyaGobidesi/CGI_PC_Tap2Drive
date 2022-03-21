package gw.job

uses gw.api.web.job.JobWizardHelper
uses gw.validation.PCValidationContext

@Export
abstract class QuoteStep {
  protected var policyPeriod: PolicyPeriod
  protected var helper: JobWizardHelper
  protected var nextStep: String

  construct(aHelper: JobWizardHelper, aPolicyPeriod: PolicyPeriod, theNextStep: String) {
    this.helper = aHelper
    this.policyPeriod = aPolicyPeriod
    this.nextStep = theNextStep
  }

  abstract function execute()

  protected function saveDraftAndIgnoreValidation() {
    PCValidationContext.doWhileIgnoringPageLevelValidation(\-> helper.Wizard.saveDraft())
  }
}