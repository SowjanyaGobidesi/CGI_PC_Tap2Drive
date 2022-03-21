package gw.job

uses gw.plugin.Plugins
uses gw.plugin.billing.IBillingSystemPlugin

@Export
abstract class NewTermProcess extends JobProcess {
  private property get BillingSystemPlugin(): IBillingSystemPlugin {
    // don't make this an static variable or else it won't be automatically reloaded
    // when we switch Plugin definition using Run Command
    return Plugins.get(IBillingSystemPlugin)
  }

  construct(period: PolicyPeriod, jobSpecificTypePermissions: JobTypePermissions) {
    super(period, jobSpecificTypePermissions)
  }

  override function cleanUpAfterEdit() {
    super.cleanUpAfterEdit()
    _branch.removeSelectedPaymentPlan()
  }

  override protected function runPreQuote() {
    setRateAsOfDate()
  }

  private function setRateAsOfDate() {
    _branch.RateAsOfDate = java.util.Date.CurrentDate
  }
}
