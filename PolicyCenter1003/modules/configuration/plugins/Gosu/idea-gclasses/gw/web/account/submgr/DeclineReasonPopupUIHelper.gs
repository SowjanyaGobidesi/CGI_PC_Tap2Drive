package gw.web.account.submgr

uses gw.api.job.JobStateException
uses gw.api.locale.DisplayKey
uses pcf.JobComplete

@Export
class DeclineReasonPopupUIHelper {
  // Loads the Submission from the DB into a separate bundle before
  // declining it, to avoid interference from any validation issues on
  // the current page.
  public static function declineSubmission(submission : entity.Submission, policyPeriod : entity.PolicyPeriod, wizard : pcf.api.Wizard ) {

    if (submission.RejectReason == null) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.DeclinedReasonPopup.EmptyReasonError"))
    }

    var sub : Submission
    var branch : PolicyPeriod

    // Execute the decline in a separate bundle with the submission reloaded from the DB
    gw.transaction.Transaction.runWithNewBundle( \b -> {
      sub = b.loadBean( submission.ID ) as Submission
      branch = b.loadBean( policyPeriod.ID ) as PolicyPeriod

      // But, make sure to update the decline reason
      sub.RejectReason = submission.RejectReason
      sub.RejectReasonText = submission.RejectReasonText

      // Decline and commit
      try {
        branch.SubmissionProcess.declineJob()
      } catch(e : JobStateException){
        // If Job failed - reload page as some change might happen to it
        policyPeriod.refresh()
        throw e
      }
    })

    // Go to JobComplete page if we're declining from a wizard
    if (wizard != null) {
      wizard.cancel()
      JobComplete.go(sub, policyPeriod)
    }
  }

}