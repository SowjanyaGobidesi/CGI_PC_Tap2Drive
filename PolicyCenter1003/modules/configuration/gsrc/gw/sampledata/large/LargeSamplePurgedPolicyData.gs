package gw.sampledata.large

uses gw.api.builder.*
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCDependenciesGateway
uses gw.api.system.PLConfigParameters
uses gw.sampledata.SampleDataConstants

@Export
class LargeSamplePurgedPolicyData extends LargeSamplePurgeablePolicyData {

  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Purged and Pruned Policies/Accounts"
  }

  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return accountLoaded("PurgeadDataLoaded")
  }

  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    loadPurgedOrphanedPeriod()
    loadPurgedTemporaryPeriod()
    loadPurgedClonePeriod()
    loadPrunedAndPurgedJobs()
    loadPurgedContactAndRelatedAccounts()

    loadCompanyAccount("PurgeadDataLoaded", null, "PurgedPlaceholder", "2051", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
  }

  protected function loadPurgedContactAndRelatedAccounts() {
    if (!PLConfigParameters.PersonalDataDestructionEnabled.Value) {
      return
    }

    var contact = loadPurgeableContactAndRelatedAccounts("Purged")
    var result = PCDependenciesGateway.getPersonalDataPurger().purgeContactForPersonalData(contact)

    if (result.Status != CompletePurgeExecuted) {
      throw new IllegalStateException("Could not purge contact and account for LargeSamplePurgedPolicyData")
    }
  }

  protected function loadPurgedTemporaryPeriod() {
    if (!PCConfigParameters.PurgeTemporaryPolicyPeriodsEnabled.Value) {
      return
    }

    var tempPeriod = loadPurgeableTemporaryPeriod("Purged")
    var purgeResult = PCDependenciesGateway.getPurger().sendPolicyPeriodToBePurged(tempPeriod)

    if (!purgeResult) {
      throw new IllegalStateException("Could not purge temporary period for LargeSamplePurgedPolicyData")
    }
  }

  protected function loadPurgedClonePeriod() {
    if (!PCConfigParameters.PurgeTemporaryPolicyPeriodsEnabled.Value) {
      return
    }

    var clone = loadPurgeableClonePeriod("Purged")
    if (clone != null) {
      var purgeResult = PCDependenciesGateway.getPurger().sendClonedPolicyPeriodToBePurged(clone)
      if (!purgeResult) {
        throw new IllegalStateException("Could not purge cloned period for LargeSamplePurgedPolicyData")
      }
    }
  }

  protected function loadPurgedOrphanedPeriod() {
    if (!PCConfigParameters.PurgeOrphanedPolicyPeriodsEnabled.Value) {
      return
    }

    var orphan = loadPurgeableOrphanedPeriod("Purged")

    runBlockAsUser("bbaker", "LargeSamplePurgedPolicyData -- bbaker", \-> {
      runTransactionAsUser(null, "Preempted Change of PurgeOrphanSub", \bundle -> {
        var purgeResult = PCDependenciesGateway.getPurger().sendPolicyPeriodToBePurged(orphan)
        if (!purgeResult) {
          throw new IllegalStateException("Could not purge orphaned period for LargeSamplePurgedPolicyData")
        }
      })
    })
  }

  protected function loadPrunedAndPurgedJobs() {
    if (!PCConfigParameters.PruneAndPurgeJobsEnabled.Value) {
      return
    }

    var job = loadPruneableAndPurgeableJobs("PrunedAndPurged")
    var purgeResult = PCDependenciesGateway.getPurger().sendJobToBePurged(job)
    if (!purgeResult) {
      throw new IllegalStateException("Could not purge and prune job for LargeSamplePurgedPolicyData")
    }
  }

}