package gw.job.permissions

@Export
class CancellationPermissions  extends DefaultJobPermissions  {
  construct(job : Job) {
    super(job)
  }

  override property get Create() : boolean {
    return perm.Cancellation.create
  }

  override property get Bind() : boolean {
    return perm.Cancellation.bind(_job)
  }

  override property get Issue() : boolean {
    return perm.Cancellation.issue(_job)
  }

  override property get Renew() : boolean {
    return false
  }

  override property get Edit() : boolean {
    return perm.Cancellation.edit(_job)
  }

  override property get Quote() : boolean {
    return perm.Cancellation.quote(_job)
  }

  override property get View() : boolean {
    return perm.Cancellation.view(_job)
  }

  override property get Withdraw() : boolean {
    return perm.Cancellation.withdraw(_job)
  }

  override property get RescindCancellation() : boolean {
    return perm.Cancellation.rescind(_job)
  }
 
  override property get RescheduleCancellation() : boolean {
     return perm.Cancellation.reschedule(_job)
   }

  override property get Advance() : boolean {
    return perm.Cancellation.advance(_job)
  }

}
