package gw.job.permissions

@Export
class RenewalPermissions  extends DefaultJobPermissions {
  construct(job : Job) {
    super(job)
  }

  override property get Create() : boolean {
    return perm.Renewal.create
  }

  override property get Bind() : boolean {
    return false
  }
  override property get Renew() : boolean {
    return perm.Renewal.renew(_job)
  }

  override property get Edit() : boolean {
    return perm.Renewal.edit(_job)
  }

  override property get Quote() : boolean {
    return perm.Renewal.quote(_job)
  }

  override property get View() : boolean {
    return perm.Renewal.view(_job)
  }

  override property get Withdraw() : boolean {
    return perm.Renewal.withdraw(_job)
  }

  override property get NotTaken() : boolean {
    return perm.Renewal.nottaken(_job)
  }

  override property get NonRenew() : boolean {
    return perm.Renewal.nonrenew(_job)
  }

  override property get Advance() : boolean {
    return perm.Renewal.advance(_job)
  }
}
