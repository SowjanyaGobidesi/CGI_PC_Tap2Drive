package gw.servertest

uses gw.api.databuilder.pa.PASubmissionBuilder
uses gw.api.test.PCServerTestClassBase
uses gw.sampledata.SampleData
uses gw.suites.PCExampleServerSuite
uses gw.testharness.ChangesCurrentTimeUtil
uses gw.testharness.v3.Suites
uses gw.workqueue.WorkQueueTestUtil

@Export
@Suites(PCExampleServerSuite.NAME)
class PersonalAutoRenewalTest extends PCServerTestClassBase {

  override function beforeClass() {
    super.beforeClass()
    setUpMutableSystemClock()
    try {
      SampleData.loadSampleDataSet(SampleDataSet.TC_SMALL)
    } catch (e : Exception) {
      e.printStackTrace()
    }
  }

  public function testAutomatedRenewal() {
    // Issue a new Personal Auto policy
    var issuedPeriod = new PASubmissionBuilder()
        .isQuoted()
        .isBound()
        .issuePolicy()
        .createAndCommit()

    // Advance the system clock 7 months so the policy is due for automated renewal
    ChangesCurrentTimeUtil.setCurrentTime(this, Date.CurrentDate.addMonths(7).Time)

    // Run the automated renewal process
    WorkQueueTestUtil.startWriterViaBatchProcessManagerThenWorkersAndWaitUntilWorkFinishedThenStop(BatchProcessType.TC_POLICYRENEWALSTART, {})

    // Check a renewal was created
    assertThat(issuedPeriod.Policy.Periods*.Job).hasAtLeastOneElementOfType(Renewal)
        .as("A single renewal policy period should have been created by the automated renewal process.")
  }

}
