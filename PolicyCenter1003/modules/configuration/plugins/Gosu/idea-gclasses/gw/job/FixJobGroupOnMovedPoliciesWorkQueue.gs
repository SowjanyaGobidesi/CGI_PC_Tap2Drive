package gw.job

uses com.guidewire.pc.domain.PCBulkInsertWorkQueueBase
uses gw.api.database.IQuery
uses gw.api.database.IQueryBuilder
uses gw.api.system.PCLoggerCategory

uses java.util.Iterator

/**
 * Work queue to assign correct JobGroup to Jobs associated with Policies that were moved between Accounts
 *
 */
@Export
class FixJobGroupOnMovedPoliciesWorkQueue extends PCBulkInsertWorkQueueBase<Job> {

  construct () {
    super(BatchProcessType.TC_FIXJOBGROUPONMOVEDPOLICIES, StandardWorkItem, Job)
  }

  /**
   * SELECT * FROM pc_job job
   * INNER JOIN (pc_policy policy) ON policy.ID=job.PolicyID
   * INNER JOIN (pc_jobgroup jobgroup) ON jobgroup.ID=job.JobGroup
   * AND job.Subtype IN (?,?)
   * AND policy.MovedPolicySourceAccountID IS NOT NULL
   * AND policy.AccountID <> jobgroup.Account
   */
  override function findTargets(job : IQueryBuilder) : Iterator {
    job.compareIn(Job#Subtype, JobsWithJobGroups)
    var policy = job.join(Job#Policy)
    policy.compare(Policy#MovedPolicySourceAccount, NotEquals, null) //moved policy
    var jobGroup = job.join(Job#JobGroup)
    job.and(\ restriction -> {
      restriction.compare(policy.getColumnRef(Policy#Account.PropertyInfo.Name),
          NotEquals, jobGroup.getColumnRef(JobGroup#Account.PropertyInfo.Name))
    })
    return (job as IQuery).withLogSQL(true).select().iterator()
  }

  override function processWorkItem(workItem : StandardWorkItem) {
    var job = extractTarget(workItem)
    if (job typeis Submission) {
      job.addToGroup()
    } else if (job typeis Renewal) {
      job.addToGroup()
    }
    PCLoggerCategory.SERVER_BATCHPROCESS.info("Assigned JobGroup on Job:" + job.DisplayName);
    job.Bundle.commit()
  }

  private property get JobsWithJobGroups() : typekey.Job[] {
    return {typekey.Job.TC_SUBMISSION, typekey.Job.TC_RENEWAL}
  }
}