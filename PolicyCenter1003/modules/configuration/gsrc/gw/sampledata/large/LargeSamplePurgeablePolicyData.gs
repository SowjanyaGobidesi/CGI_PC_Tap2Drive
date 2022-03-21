package gw.sampledata.large

uses com.guidewire.pc.domain.policy.impl.ForceFailureEntityBundle
uses gw.api.builder.PolicyChangeBuilder
uses gw.api.builder.SubmissionBuilder
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.databuilder.cp.CPSubmissionBuilder
uses gw.api.productmodel.Product
uses gw.api.upgrade.PCCoercions
uses gw.plugin.Plugins
uses gw.plugin.clone.PolicyPeriodQuoteClonePlugin
uses gw.sampledata.AbstractSampleDataCollection
uses gw.sampledata.SampleData
uses gw.sampledata.SampleDataConstants

@Export
class LargeSamplePurgeablePolicyData extends AbstractSampleDataCollection {

  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Purgeable and Pruneable Policies/Accounts"
  }

  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return accountLoaded("PurgeableDataLoaded")
  }

  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    loadPurgeableOrphanedPeriod("Purgeable")
    loadPurgeableTemporaryPeriod("Purgeable")
    loadPurgeableClonePeriod("Purgeable")
    loadPruneableAndPurgeableJobs("PruneableAndPurgeable")
    loadPurgeableContactAndRelatedAccounts("Purgeable")

    loadCompanyAccount("PurgeableDataLoaded", null, "PurgeablePlaceholder", "2051", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
  }

  protected function loadPurgeableContactAndRelatedAccounts(prefix : String) : Contact {
    var account = loadCompanyAccount(prefix + "GDPRAct", null, prefix + "Mr GDPR", "2051", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    var contact = account.AccountHolderContact
    SampleData.flushMessageQueues()

    if (contact == null)
      throw new IllegalStateException("Could not create Contact and Account for " + this.Class.SimpleName)

    return contact
  }

  protected function loadPurgeableTemporaryPeriod(prefix : String) : PolicyPeriod {

    var account = loadCompanyAccount(prefix + "TempAct", null, prefix + " Shadow Corp", "2051", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)

    var bundle = new ForceFailureEntityBundle()
    var period = new CPSubmissionBuilder().withAccount(account).isBound().create(bundle)
    try {
      bundle.setFailOnAdd(true)
      period.createDraftBranchInSamePeriod(period.EditEffectiveDate)
    } catch (e : Exception) {
      // Ignore exception since it is expected
    } finally {
      bundle.setFailOnAdd(false)
    }

    var tempPeriod = findTemporaryBranch(period)
    if (tempPeriod == null)
      throw new IllegalStateException("Could not create temporary period for " + this.Class.SimpleName)

    return tempPeriod
  }

  protected function loadPurgeableClonePeriod(prefix : String) : PolicyPeriod {
    loadCompanyAccount(prefix + "CloneAct", null, prefix + "Multiplicity", "2051", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)

    var clone : PolicyPeriod = null
    runBlockAsUser("bbaker", "LargeSamplePurgedPolicyData -- bbaker", \-> {
      var submission = loadDraftSubmission(prefix + "CloneSub", prefix + "CloneAct", PCCoercions.makeProductModel<Product>("PersonalAuto"), SampleDataConstants.getBaseDateMinus(3, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES)
      SampleData.flushMessageQueues()

      runTransactionAsUser(null, "Submission with quote clone of " + prefix + "CloneAct", \bundle -> {
        submission.SubmissionProcess.requestQuote(true, true)
        submission.SubmissionProcess.bind(true, true)
      })

      var plugin = Plugins.get(PolicyPeriodQuoteClonePlugin)
      if (Plugins.isEnabled(PolicyPeriodQuoteClonePlugin) && plugin.shouldCloneQuote(submission)) {
        clone = ClonedBranches(submission).single()
      }
    })
    
    return clone
  }

  protected function loadPurgeableOrphanedPeriod(prefix : String) : PolicyPeriod {
    loadCompanyAccount(prefix + "OrphanAct", null, prefix + "Annie", "2051", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    var orphan : PolicyPeriod
    runBlockAsUser("bbaker", "LargeSamplePurgedPolicyData -- bbaker", \-> {
      loadSubmission(prefix + "OrphanSub", prefix + "OrphanAct", PCCoercions.makeProductModel<Product>("PersonalAuto"), SampleDataConstants.getBaseDateMinus(3, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)
      SampleData.flushMessageQueues()

      runTransactionAsUser(null, "Preempted Change of " + prefix + "OrphanAct", \bundle -> {
        orphan = new PolicyChangeBuilder().withJobNumber(prefix + "OrphanChange1").withEffectiveDate(Date.Today.addMonths(1)).withBasedOnPeriod(findPeriodByJobNumber(prefix + "OrphanSub", bundle)).isDraft().create(bundle)
      })
      runTransactionAsUser(null, "Preempting Change of " + prefix + "OrphanAct", \bundle -> {
        var preempting = new PolicyChangeBuilder().withJobNumber(prefix + "OrphanChange2").withEffectiveDate(Date.Today.addMonths(2)).withBasedOnPeriod(findPeriodByJobNumber(prefix + "OrphanSub", bundle)).isDraft().create(bundle)
        preempting.PolicyChangeProcess.requestQuote(true, true)
        preempting.PolicyChangeProcess.bind(true, true)
      })
    })
    runBlockAsUser("bbaker", "LargeSamplePurgedPolicyData -- bbaker", \-> {
      runTransactionAsUser(null, "Preempted Change of " + prefix + "OrphanSub", \bundle -> {
        var preempted = findPeriodByJobNumber(prefix + "OrphanChange1", bundle)
        preempted = bundle.add(preempted)
        preempted.JobProcess.handlePreemptions()
      })
    })

    return orphan
  }

  protected function loadPruneableAndPurgeableJobs(prefix : String) : Job {
    loadCompanyAccount(prefix + "Act", null, prefix + "Bush Pruning Inc", "2051", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    var period = loadDraftSubmission(prefix + "Sub", prefix + "Act", PCCoercions.makeProductModel<Product>("PersonalAuto"), SampleDataConstants.getBaseDateMinus(3, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES)

    var altPeriod = period.createDraftMultiVersionJobBranch()
    period.Job.addToPeriods(altPeriod)
    altPeriod.JobProcessInternal.start()
    altPeriod.Bundle.commit()

    var job = period.Job
    job.CloseDate = Date.CurrentDate
    job.Bundle.commit()

    return job
  }

  private function ClonedBranches(period : PolicyPeriod) : List<PolicyPeriod> {
    return Query.make(PolicyPeriod).withFindTemporaryBranches(true)
        .compare(PolicyPeriod#TemporaryBranch, Equals, true)
        .compare(PolicyPeriod#TemporaryCloneStatus, NotEquals, null)
        .compare(PolicyPeriod#PolicyTerm, Equals, period.PolicyTerm)
        .compare(PolicyPeriod#EditEffectiveDate, Equals, period.EditEffectiveDate)
        .select()
        .toList()
  }

  private function findTemporaryBranch(period : PolicyPeriod) : PolicyPeriod {
    var query = Query.make(PolicyPeriod)
        .compare(PolicyPeriod.TEMPORARYBRANCH_PROP.get(), Relop.Equals, true)
        .compare(PolicyPeriod.POLICYNUMBER_PROP.get(), Relop.Equals, period.getPolicyNumber())
        .compare(PolicyPeriod.BASEDONID_DYNPROP.get(PolicyPeriod.TYPE.get()), Relop.Equals, period.getID())
        .withFindTemporaryBranches(true)
    return query.select().getFirstResult()
  }



}