package gw.command.critical

uses com.guidewire.pc.system.dependency.PCDependencies
uses gw.command.Argument
uses gw.command.BaseCommand
uses gw.command.DefaultMethod
uses gw.transaction.Transaction

@Export
@DefaultMethod("wJob")
class PostRatingQuote extends BaseCommand {

  @Argument("JobNumber")
  function wJob() {
    var jobNumber = getArgumentAsString("JobNumber")
    var job = PCDependencies.getJobFinder().findJobByJobNumber(jobNumber)

    // Job exists? If not, nothing to do
    if (job == null) {
      displayMessage("Invalid job number: " + jobNumber)
      return
    }
    // Check user's permission
    var currentUser = User.util.CurrentUser
    if (not currentUser.canView(job)) {
      displayMessage("Insufficient permission")
      return
    }
    var period = job.LatestPeriod
    if (not period.JobProcess.canRequestPostRatingQuote().Okay) {
      displayMessage("Cannot post-rating quote job " + job.JobNumber + " with current status of '" + period.Status.Code + "'")
      return
    }
    // post-rating quote the job
    Transaction.runWithNewBundle(\bundle -> {
      period = bundle.add(period)
      period.JobProcess.requestPostRatingQuote()
    })

    pcf.JobForward.go(period.Job, period)
  }
}