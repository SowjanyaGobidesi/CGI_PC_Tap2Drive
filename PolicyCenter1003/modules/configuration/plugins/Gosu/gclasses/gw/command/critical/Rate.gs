package gw.command.critical

uses com.guidewire.pc.system.dependency.PCDependencies
uses gw.command.Argument
uses gw.command.BaseCommand
uses gw.command.DefaultMethod
uses gw.transaction.Transaction

@Export
@DefaultMethod("wJob")
class Rate extends BaseCommand {

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
    // Can rate the job?
    var period = job.LatestPeriod
    if (not period.JobProcess.canRequestRate().Okay) {
      displayMessage("Cannot rate job " + job.JobNumber + " with current status of '" + period.Status.Code + "'")
      return
    }
    // Rate the job
    Transaction.runWithNewBundle(\bundle -> {
      period = bundle.add(period)
      period.JobProcess.requestRate()
    })
    pcf.JobForward.go(period.Job, period)
    return
  }
}