package gw.job

uses gw.api.locale.DisplayKey
uses gw.api.web.job.JobWizardHelper

@Export
class RequestPostRatingQuoteStep extends QuoteStep {

  construct(aHelper: JobWizardHelper, aPolicyPeriod: PolicyPeriod, theNextStep: String) {
    super(aHelper, aPolicyPeriod, theNextStep)
  }

  override function execute() {
    try {
      saveDraftAndIgnoreValidation()
      // "IgnoreValidation" in the above really means "do not throw validation exceptions to the user"
      // but if there are validation errors, the messages will exist in the helper.   Rather than try
      // to quote--which should be guaranteed to fail--we'll just let these messages stay, and expect
      // them to be displayed to the user by the caller.
      if (!helper.hasWebMessageToRender()) {
        policyPeriod.JobProcess.requestPostRatingQuote(helper)
        if (policyPeriod.Job.Complete) {
          helper.Wizard.finish()
        } else {
          saveDraftAndIgnoreValidation()
        }

        // Go to the appropriate place based on whether we have a valid quote, or if the policy is quoted at all.
        if (policyPeriod.Status == TC_QUOTED) {
          if (policyPeriod.JobProcess.canViewQuote()) {
            helper.goDirectlyToStepWithoutWidgetValidation(nextStep)
            helper.goToVisibleStep(policyPeriod)
          } else {
            // If the user cannot view the quote (because quote is hidden and user lacks hidden quote override permission)
            // then remain on the Policy Review page and display a warning.
            helper.addInfoWebMessage(DisplayKey.get("Web.SubmissionWizard.PolicyReview.QuoteNotVisible"))
            helper.goToStep("PolicyReview")
          }
        } else if (policyPeriod.Status == TC_RATED) {
          // Presumably we're back in Rated because the quote was invalid, so display that to the user and move on
          helper.addInfoWebMessage(DisplayKey.get("Web.SubmissionWizard.QuoteReviewMessage.InvalidQuote"))

          helper.goToVisibleStep(policyPeriod)
        } else {
          pcf.PleaseBePatientPopup.push(policyPeriod, helper, nextStep, new gw.job.patience.BranchStatus(helper, TC_QUOTING))
        }
      }
    } catch (e: QuoteHaltedException) {
      // Just a marker exception to stop the quote, so do nothing.  The errors will already have been added to the
      // web message context at this point
    }
  }
}
