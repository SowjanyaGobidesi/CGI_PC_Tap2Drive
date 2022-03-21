package gw.job.permissions

@Export
class PolicyChangePermissions  extends DefaultJobPermissions {
  construct(job : Job) {
    super(job)
  }

  override property get Create() : boolean {
    return perm.PolicyChange.create
  }

  override property get Bind() : boolean {
    return perm.PolicyChange.bind(_job)
  }

  override property get Issue() : boolean {
    return perm.PolicyChange.issue(_job)
  }

  override property get Edit() : boolean {
    return perm.PolicyChange.edit(_job)
  }

  override property get Quote() : boolean {
    return perm.PolicyChange.quote(_job)
  }

  override property get View() : boolean {
    return perm.PolicyChange.view(_job)
  }

  override property get Withdraw() : boolean {
    return perm.PolicyChange.withdraw(_job)
  }

  override property get Advance() : boolean {
    return perm.PolicyChange.advance(_job)
  }
}
