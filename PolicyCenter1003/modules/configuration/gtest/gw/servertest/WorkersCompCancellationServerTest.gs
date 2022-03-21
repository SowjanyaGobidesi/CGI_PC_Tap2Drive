package gw.servertest

uses gw.api.builder.CancellationBuilder
uses gw.api.databuilder.wc.WCSubmissionBuilder
uses gw.api.test.PCServerTestClassBase
uses gw.suites.PCExampleServerSuite
uses gw.testharness.v3.Suites

@Export
@Suites(PCExampleServerSuite.NAME)
class WorkersCompCancellationServerTest extends PCServerTestClassBase {

  function testFlatCancellationSetDepositAmountToZero() {
    var submission = new WCSubmissionBuilder()
        .withReportingPlan()
        .issuePolicy()
        .createAndCommit()

    assertThat(submission.DepositAmount.Amount)
        .as("Precondition: Submission deposit amount should not be zero.")
        .isNotZero()
    assertThat(submission.PolicyTerm.DepositAmount.Amount)
        .as("Precondition: Policy term deposit should not be zero.")
        .isNotZero()
    assertThat(submission.PolicyTerm.DepositReleased)
        .as("Precondition: Policy term deposit should not be released.")
        .isFalse()

    var cancellation = new CancellationBuilder()
        .withBasedOnPeriod(submission)
        .withRefundCalculationMethod(CalculationMethod.TC_FLAT)
        .isBound()
        .createAndCommit()

    assertThat(cancellation.DepositAmount.Amount)
        .as("Cancellation deposit amount should be zero.")
        .isZero()
    assertThat(cancellation.PolicyTerm.DepositAmount.Amount)
        .as("Policy term deposit should be zero.")
        .isZero()
    assertThat(cancellation.PolicyTerm.DepositReleased)
        .as("Policy term deposit should be released.")
        .isTrue()
  }

}
