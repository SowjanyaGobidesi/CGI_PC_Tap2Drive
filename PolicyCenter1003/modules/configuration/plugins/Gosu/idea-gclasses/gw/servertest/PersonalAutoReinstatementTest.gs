package gw.servertest

uses gw.api.builder.ReinstatementBuilder
uses gw.api.test.PCServerTestClassBase
uses gw.api.util.MonetaryAmounts
uses gw.sampledata.SampleData
uses gw.suites.PCExampleServerSuite
uses gw.testharness.v3.Suites

@Export
@Suites(PCExampleServerSuite.NAME)
class PersonalAutoReinstatementTest extends PCServerTestClassBase {

  override function beforeClass() {
    super.beforeClass()
    // Ensuring Small Sample Data is loaded before executing test
    try {
      SampleData.loadSampleDataSet(SampleDataSet.TC_SMALL)
    } catch (e : Exception) {
      e.printStackTrace()
    }
  }

  function testUpdatePolicyTerm() {
    var $110 = MonetaryAmounts.ofDefaultCurrency(110bd)
    var reinstatement = new ReinstatementBuilder()
        .withProduct("PersonalAuto")
        .withReportingPlan()
        .isQuoted()
        .createAndCommit()
    reinstatement.DepositAmount = $110
    reinstatement.ReinstatementProcess.reinstate()
    reinstatement.Bundle.commit()

    assertThat(reinstatement.DepositAmount.Amount)
        .as("Reinstatement deposit amount should have updated.")
        .isEqualByComparingTo($110)
    assertThat(reinstatement.PolicyTerm.DepositAmount.Amount)
        .as("Policy deposit amount should have updated.")
        .isEqualByComparingTo($110)
    assertThat(reinstatement.PolicyTerm.DepositReleased)
        .as("Deposit should not be released.")
        .isFalse()
  }

}
