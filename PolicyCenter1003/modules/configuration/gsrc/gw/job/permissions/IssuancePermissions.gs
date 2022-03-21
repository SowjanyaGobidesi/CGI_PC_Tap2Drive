package gw.job.permissions

@Export
class IssuancePermissions  extends DefaultJobPermissions {
  construct(job : Job) {
    super(job)
  }

  override property get Bind() : boolean {
    return perm.Issuance.bind(_job)
  }

  override property get Issue() : boolean {
    return perm.Issuance.issue(_job)
  }

  override property get Edit() : boolean {
    return perm.Issuance.edit(_job)
  }

  override property get Quote() : boolean {
    return perm.Issuance.quote(_job)
  }

  override property get View() : boolean {
    return perm.Issuance.view(_job)
  }

  override property get Withdraw() : boolean {
    return perm.Issuance.withdraw(_job)
  }

  override property get Advance() : boolean {
    return perm.Issuance.advance(_job)
  }
}
