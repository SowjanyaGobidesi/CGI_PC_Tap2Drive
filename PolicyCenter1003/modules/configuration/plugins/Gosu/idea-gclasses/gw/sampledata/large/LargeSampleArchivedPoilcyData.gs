package gw.sampledata.large

uses gw.api.archive.PCArchivingTestUtil
uses gw.api.builder.CancellationBuilder
uses gw.api.builder.RenewalBuilder
uses gw.sampledata.AbstractSampleDataCollection
uses gw.sampledata.SampleData
uses gw.sampledata.SampleDataConstants
uses gw.api.upgrade.PCCoercions
uses gw.api.productmodel.Product

@Export
class LargeSampleArchivedPoilcyData extends AbstractSampleDataCollection {

  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Large Archived Policies"
  }

  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return accountLoaded("D000123446")
  }

  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    loadCompanyAccount("D000123446", null, "Old Time Shop", "2022", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)

    var archivePeriod : PolicyPeriod
    runBlockAsUser("bbaker", "LargeSamplePolicyData -- bbaker", \->{
      archivePeriod = loadSubmission("123443433", "D000123446", PCCoercions.makeProductModel<Product>("BusinessOwners"), SampleDataConstants.getBaseDateMinus(2, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)
      SampleData.flushMessageQueues()
      runTransactionAsUser(null, "Renewal 123467822", \bundle -> {
        new RenewalBuilder().withJobNumber("123467822").withBasedOnPeriod(findPeriodByJobNumber("123443433", bundle)).create(bundle)
      })
      runTransactionAsUser(null, "Cancellation 123467917", \bundle -> {
        var basedOnPeriod = findPeriodByJobNumber("123467822", bundle)
        new CancellationBuilder().withJobNumber("123467917").withBasedOnPeriod(basedOnPeriod).withEffectiveDate(basedOnPeriod.PeriodStart.addMonths(1)).canceledByCarrier().canceledForNonpayment().withProrataRefund().create(bundle)
      })
    })
    PCArchivingTestUtil.archive(false, archivePeriod, {})

  }
}