package gw.plugin.policyperiod.impl

uses entity.PolicyLine
uses gw.api.domain.financials.PCFinancialsLogger
uses gw.api.locale.DisplayKey
uses gw.api.profiler.PCProfilerTag
uses gw.api.rating.RatingException
uses gw.plugin.policyperiod.IRatingPlugin
uses gw.rating.AbstractRatingEngine

@Export
class SysTableRatingPlugin implements IRatingPlugin {

  override function ratePeriod(period: PolicyPeriod) {
    ratePeriod(period, null)
  }

  override function ratePeriod(period: PolicyPeriod, rStyle: RatingStyle) {
    // Synchronously call the demo rating code and handle the result
    var logMsg = DisplayKey.get("PolicyPeriod.Quote.Requesting.Synchronously", period)
    PCFinancialsLogger.logInfo(logMsg)
    ratePeriodImpl(period, rStyle)
    PCFinancialsLogger.logInfo(DisplayKey.get("PolicyPeriod.Quote.Requesting.Done", logMsg))
  }

  /**
   * Rate a policy period.
   * <p>
   * Note that prior to release 10.0.0 for demonstration purposes only this function would mark the policy as
   * either valid or invalid. For demonstration purposes a quote was marked as invalid if the account's primary
   * address description contained the text "fail quoting". As of release 10.0.0 the functionality for marking a
   * quote as valid or invalid has been moved to {@link gw.job.QuoteProcess}. For demonstration purposes rating
   * will now fail (by throwing an exception) if the account's primary address description contains the
   * text "fail quoting".
   *
   * @param period the policy period to rate
   * @param rStyle additional metadata for the rating engine to work with
   * @throws RatingException if an issue occurs during rating
   */
  function ratePeriodImpl(period: PolicyPeriod, rStyle: RatingStyle) {
    PCProfilerTag.RATE_PERIOD.execute(\-> {
      // rStyle is currently a no-op -> consider having rStyle actually influence rates somehow
      var logMsg = "Rating ${period.Job.DisplayType} #${period.Job.JobNumber}"
          + " for Policy # ${period.PolicyNumber},"
          + " Branch Name = [${period.BranchName}]"
          + " with Edit Effective Date of ${period.EditEffectiveDate} ..."

      PCFinancialsLogger.logInfo(logMsg)
      for (line in period.RepresentativePolicyLines) {
        PCProfilerTag.RATE_LINE.execute(\-> {
          var ratingEngine = createRatingEngine(line)
          ratingEngine.rate()
        })
      }

      // For demo purposes, mark the rate as valid or invalid based on the address description
      if (shouldRatingFail(period)) {
        period.markInvalidRate()
      } else {
        period.markValidRate()
      }

      PCFinancialsLogger.logInfo(DisplayKey.get("PolicyPeriod.Quote.Requesting.Done", logMsg))
    })
  }

  protected function createRatingEngine(line: PolicyLine): AbstractRatingEngine {
    return line.createRatingEngine(RateMethod.TC_SYSTABLE, null)
  }

  protected function shouldRatingFail(period: PolicyPeriod): boolean {
    var addressDesc = period.Policy.Account.AccountHolderContact.PrimaryAddress.Description
    if (addressDesc != null and addressDesc.toLowerCase().contains("fail quoting")) {
      return true
    }
    return false
  }
}