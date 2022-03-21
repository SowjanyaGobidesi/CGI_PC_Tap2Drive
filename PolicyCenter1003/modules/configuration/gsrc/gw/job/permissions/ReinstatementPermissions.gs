package gw.job.permissions

@Export
class ReinstatementPermissions  extends DefaultJobPermissions {
  construct(job : Job) {
    super(job)
  }

  override property get Create() : boolean {
    return perm.Reinstatement.create
  }

  override property get Bind() : boolean {
    return perm.Reinstatement.bind(_job)
  }

  override property get Issue() : boolean {
    return perm.Reinstatement.issue(_job)
  }

  override property get Edit() : boolean {
    return perm.Reinstatement.edit(_job)
  }

  override property get Quote() : boolean {
    return perm.Reinstatement.quote(_job)
  }

  override property get View() : boolean {
    return perm.Reinstatement.view(_job)
  }

  override property get Withdraw() : boolean {
    return perm.Reinstatement.withdraw(_job)
  }

  override property get Advance() : boolean {
    return perm.Reinstatement.advance(_job)
  }
}
