package gw.plugin.rateflow

uses gw.api.locale.DisplayKey
uses gw.api.util.DateUtil
uses gw.job.JobProcessValidator
uses gw.job.JobProcessUWIssueEvaluator
uses gw.job.JobProcess
uses gw.plugin.policyperiod.IPolicyTermPlugin
uses gw.util.Pair
uses java.util.Date
uses java.util.HashMap
uses gw.pl.persistence.core.Bundle
uses java.util.List
uses java.util.concurrent.locks.ReentrantLock
uses gw.pl.persistence.core.Key

@Export
class ImpactTestingPlugin implements IImpactTestingPlugin {

  var _policyTermPlugin = gw.plugin.Plugins.get(IPolicyTermPlugin)
  static var _lockMap = new HashMap<Key, ReentrantLock>().toAutoMap(\ s -> new ReentrantLock())
  static var _localRateBooks = new gw.pl.util.ScopedThreadLocal<List<ImpactTestingRateBook>>()

  construct() {
  }

  override property get AlternateRatebooks() : List<ImpactTestingRateBook> {
    return _localRateBooks.get()
  }

  override property set AlternateRatebooks(books : List<ImpactTestingRateBook>) {
    if (books == null) {
      _localRateBooks.clear()
    } else {
      _localRateBooks.set(books)
    }
  }

  override function createBaselinePeriod(original : PolicyPeriod) : PolicyPeriod {
    return createBaselineViaRenewal(original)
  }

  override function createTestPeriod(original : PolicyPeriod, baseline : PolicyPeriod) : PolicyPeriod {
    return createTest(baseline)
  }

  override function requestBaselineQuote(period : PolicyPeriod) {
    requestQuote(period)
  }

  override function requestTestQuote(period : PolicyPeriod) {
    requestQuote(period)
  }

  override function shouldIncludePeriod(period : PolicyPeriod) : boolean {
    return true;
  }

  /**
   * Create a clone of the original PolicyPeriod
   */
  internal /* package */ function createBaseline(original : PolicyPeriod) : PolicyPeriod {
    var baselinePeriod : PolicyPeriod

    gw.transaction.Transaction.runWithNewBundle(\ bundle ->  {
      // This code probably may not properly eliminate slicing, as a full renewal process does,
      // but we also want to bypass all the validation and possibly the workflow of an actual renewal.
      // In other words, further analysis/work needs to be done in this plugin to more faithfully
      // to simulate a true renewal, but that needs to be spun off into its own story
      original = bundle.add(original)
      var clonedPolicy = original.Policy.clonePolicy()
      baselinePeriod = original.copyBranchIntoNewPolicy(clonedPolicy)

      var dateRange = getAvailableFutureDates(original)
      baselinePeriod.setPeriodWindow(dateRange.First, dateRange.Second)
      var submission = new Submission(bundle)
      submission.addToPeriods(baselinePeriod)
      submission.initializeJob()
      submission.QuoteType = original.Submission != null ? original.Submission.QuoteType : TC_FULL
      baselinePeriod.JobProcessInternal.start()
      baselinePeriod.BranchName = DisplayKey.get("Web.Rating.ImpactTesting.Plugin.BaselinePeriod")
    }, "su")

    return baselinePeriod
  }

  /**
   * Create a new PolicyPeriod that is like a renewal except that the dates remain the same as the original PolicyPeriod.
   * The new PolicyPeriod has only one slice, which is the full term equivalent of the original PolicyPeriod's last slice.
   */
  internal /* package */ function createBaselineViaRenewal(original : PolicyPeriod) : PolicyPeriod {
    var baselinePeriod : PolicyPeriod

    // prevents lock-order deadlock in SQL server, which tends
    // to deadlock while holding locks on rows in these two tables.
    // The batch system recovers from the deadlocks, but it's probably
    // more efficient to avoid them if possible.
    //
    // IMPORTANT: This locking scheme would probably cause performance implications
    // for a customer who has many policies per account, because we lock on account
    // and then on Policy.  This was judged to be a rare scenario, but if it occurs
    // the customer should investigate rewriting the locking to improve throughput.
    // Reference Jira number PC-20627 for more details.
    //
    // Note that this wouldn't completely prevent deadlock if impact
    // testing is being run on a cluster.
    using (_lockMap.get(original.Policy.Account.ID)) {
      using (_lockMap.get(original.Policy.ID)) {
        /**
         * Call methods from RenewalImpl
         * Create Submission and add the new PolicyPeriod
         * This transaction should contain both the new period and Submission together
         */
        gw.transaction.Transaction.runWithNewBundle(\bundle -> {

          var job: Job
          switch (original.Job.Subtype) {
            case typekey.Job.TC_RENEWAL:
              baselinePeriod = createDraftBranchInNewPeriod(original, bundle)
              job = new Renewal(bundle)
              job.addToPeriods(baselinePeriod)
              var renewal = job as Renewal
              renewal.startJob(original.Policy)
              resetBaselinePeriodAttributes(baselinePeriod, original)
              break
            default:
              baselinePeriod = createDraftBranchInNewPeriod(original, bundle)
              job = new Submission(bundle)
              job.addToPeriods(baselinePeriod)
              var submission = job as Submission
              submission.initializeJob()
              submission.QuoteType = QuoteType.TC_FULL
              baselinePeriod.JobProcessInternal.start()
              resetBaselinePeriodAttributes(baselinePeriod, original)
          }
        }, "su")
      }
    }

    return baselinePeriod
  }

  private function createDraftBranchInNewPeriod(original: PolicyPeriod, bundle: Bundle) : PolicyPeriod {
    // code take from RenewalImpl
    var originalPrimed = bundle.add(original).getSlice(original.PeriodEnd.addSeconds(-1))
    var availableDates /* Pair<Date, Date> */ = getAvailableFutureDates(originalPrimed)
    var baselinePeriod = originalPrimed.createDraftBranchInNewPeriod(availableDates.First, availableDates.Second)
    baselinePeriod.updateTermNumber()
    return baselinePeriod
  }

  private function resetBaselinePeriodAttributes(baselinePeriod: PolicyPeriod, original: PolicyPeriod) {
    /**
     * Reset effective and expiration dates to original
     * set RateAsOfDate
     * set EditEffectiveDate to the beginning of the term, OK with Rich
     * relink policyterm to orignial's policyterm (which leaves a term not being used, which is not a terrible thing as long as this is not for production)
     * set BranchName to 'Baseline'
     */
      baselinePeriod.PeriodStart = original.PeriodStart
      baselinePeriod.PeriodEnd = original.PeriodEnd

      baselinePeriod.setFieldValue("PolicyTerm", original.PolicyTerm)
      baselinePeriod.setFieldValue("PolicyNumber", original.PolicyNumber) // may want to tag this with specific mods on the policy number
      baselinePeriod.setFieldValue("TermNumber", original.TermNumber)
      baselinePeriod.setFieldValue("Period", original.PeriodId) // Required to avoid date-overlap errors.

      baselinePeriod.EditEffectiveDate = original.PeriodStart
      baselinePeriod.RateAsOfDate = Date.CurrentDate // RateAsOfDate is used for the selectRateBook method
      baselinePeriod.BranchName = DisplayKey.get("Web.Rating.ImpactTesting.Plugin.BaselinePeriod") // 'Baseline'
  }

  private function createTest(baseline : PolicyPeriod) : PolicyPeriod{
    var testPeriod = baseline.createDraftMultiVersionJobBranch()
    baseline.getJob().addToPeriods(testPeriod)
    testPeriod.getJobProcessInternal().start()
    testPeriod.BranchName = DisplayKey.get("Web.Rating.ImpactTesting.Plugin.TestPeriod")
    testPeriod.Bundle.commit()
    return testPeriod
  }

  private function requestQuote(period : PolicyPeriod){
    gw.transaction.Transaction.runWithNewBundle(\ bundle ->  {
      period = bundle.add(period)
      var jobProcess = period.JobProcess
      if (period.Status == TC_NEW) {
        jobProcess.beginEditing()
      } else {
        period.editIfRatedOrQuoted()
      }
      requestQuoteSkippingValidation(jobProcess)
    }, "su")
  }

  private function requestQuoteSkippingValidation(sub : JobProcess) {
    var prevValidator = sub.JobProcessValidator
    var prevEvaluator = sub.JobProcessEvaluator
    try {
      sub.JobProcessValidator = JobProcessValidator.NO_OP_VALIDATOR
      sub.JobProcessEvaluator = JobProcessUWIssueEvaluator.NO_OP_EVALUATOR
      sub.requestQuote()
    } finally {
      sub.JobProcessValidator = prevValidator
      sub.JobProcessEvaluator = prevEvaluator
    }
  }

  // Get Start and End dates which do not overlap an existing PolicyPeriod on the Policy
  function getAvailableFutureDates(policyPeriod : PolicyPeriod) : Pair<Date, Date> {
    var latestPeriod = policyPeriod.Policy.LatestBoundPeriod
    var start = latestPeriod.PeriodEnd.addDays(1)
    var end = DateUtil.mergeDateAndTime(_policyTermPlugin.calculatePeriodEnd(start, latestPeriod.TermType, latestPeriod),
                                                        latestPeriod.PeriodStart)
    return Pair.make(start, end)
  }

}
