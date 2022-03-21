package gw.command.jobs

uses gw.api.builder.PolicyChangeBuilder
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.databuilder.pa.PASubmissionBuilder
uses gw.api.util.Range
uses gw.command.Argument
uses gw.command.Arguments
uses gw.command.BaseCommand
uses gw.command.DefaultMethod
uses gw.command.critical.Constants
uses gw.pl.currency.MonetaryAmount

uses java.lang.Integer

/**
 * This command is supported by DEV and is required to work. Any change to this Test must pass
 * PolicyCommandTest
 */
@Export
@DefaultMethod("wFutureVehicle")
class MultiSliceJob extends BaseCommand {

  @Argument("JobType", Constants.JOB_TYPES)
  function wFutureVehicle() : PolicyPeriod {
    var jobType = getArgumentAsString("JobType")
    var period = makePeriod(jobType, {Range.from(2 * 30)})
    pcf.JobForward.go(period.Job, period)
    return period
  }

  @Arguments("wFutureVehicle")
  function wTempVehicle() : PolicyPeriod {
    var jobType = getArgumentAsString("JobType")
    var period = makePeriod(jobType, {Range.closedOpen(2 * 30, 3 * 30)})
    pcf.JobForward.go(period.Job, period)
    return period
  }

  @Arguments("wFutureVehicle")
  function wTwoVehicles() : PolicyPeriod {
    var jobType = getArgumentAsString("JobType")
    var period = makePeriod(jobType, {Range.closedOpen(2 * 30, 3 * 30), Range.from(2 * 30 + 10)})
    pcf.JobForward.go(period.Job, period)
    return period
  }

  function makePeriod(jobType : String, ranges : List<Range<Integer>>) : PolicyPeriod {
    jobType = jobType ?: "submission"
    var period : PolicyPeriod
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      var builder = new PASubmissionBuilder()
      if (jobType == "submission") {
        period = builder.isDraft().create(bundle)
        for (range in ranges) {
          period = period.getSlice(period.PeriodStart.addDays(range.Start))
          createVehicleSliceInRange(period, range, 3000)
        }
      } else {
        period = builder.isBound().create(bundle)
        period = new PolicyChangeBuilder(period).isDraft().create(bundle)
        for (range in ranges) {
          period = period.getSlice(period.PeriodStart.addDays(range.Start))
          createVehicleSliceInRange(period, range, 5000)
        }
      }
      period.PersonalAutoLine.AllCoverables.each(\elt -> {elt.createOrSyncCoverages()})
    })
    return period
  }

  private function createVehicleSliceInRange(period : PolicyPeriod, range : Range<Integer>, newVehicleCost : int) {
    var vin = "ABC" + UniqueKeyGenerator.get().nextKey()
    var start = range.Start
    var end = range.End
    var location = period.PolicyLocations[0]
    period = period.getSlice(period.PeriodStart.addDays(start))
    var vehicle = period.PersonalAutoLine.createAndAddVehicle()
    vehicle.Vin = vin
    vehicle.LicenseState = location.State
    vehicle.GarageLocation = location
    vehicle.CostNew = new MonetaryAmount(newVehicleCost, period.PreferredCoverageCurrency)
    vehicle.Make = "Tesla"
    vehicle.Model = "S"
    vehicle.Year = 2018
    var policyDriver = period.PersonalAutoLine.PolicyDrivers[0]
    policyDriver.DoNotOrderMVR = true
    var vehicleDriver = vehicle.addPolicyDriver(policyDriver)
    vehicleDriver.PercentageDriven = 100
    if (end != null and end != start) {
      vehicle = vehicle.getSlice(period.PeriodStart.addDays(end))
      vehicle.remove()
    }
    period.Bundle.commit()
  }

}
