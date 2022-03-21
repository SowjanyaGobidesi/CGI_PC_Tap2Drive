package gw.job.permissions
uses gw.job.JobTypePermissions

@Export
abstract class DefaultJobPermissions implements JobTypePermissions {
  protected var _job : Job

  public construct(job : Job) {
    _job = job
  }
  
  override property get Advance() : boolean {
    return false
  }

  override property get Create() : boolean {
    return false
  }

  override property get Issue() : boolean {
    return false
  }

  override property get Complete() : boolean {
    return false
  }

  override property get Renew() : boolean {
    return false
  }

  override property get RescindCancellation() : boolean {
    return false
  }
 
  override property get RescheduleCancellation() : boolean {
     return false
  }

  override property get Waive() : boolean {
    return false
  }

  override property get NotTaken() : boolean {
    return false
  }

  override property get Decline() : boolean {
    return false
  }

  override property get NonRenew() : boolean {
    return false
  }

  override property get CopyPolicyData() : boolean {
    return perm.Job.importPolicyData(_job)
  }

}
