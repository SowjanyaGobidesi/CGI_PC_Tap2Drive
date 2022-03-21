package gw.job.permissions

@Export
class RewritePermissions  extends DefaultJobPermissions {
  construct(job : Job) {
    super(job)
  }

  override property get Create() : boolean {
    return perm.Rewrite.create
  }

  override property get Bind() : boolean {
    return perm.Rewrite.bind(_job)
  }

  override property get Issue() : boolean {
    return perm.Rewrite.issue(_job)
  }

  override property get Edit() : boolean {
    return perm.Rewrite.edit(_job)
  }

  override property get Quote() : boolean {
    return perm.Rewrite.quote(_job)
  }

  override property get View() : boolean {
    return perm.Rewrite.view(_job)
  }

  override property get Withdraw() : boolean {
    return perm.Rewrite.withdraw(_job)
  }

  override property get Advance() : boolean {
    return perm.Rewrite.advance(_job)
  }


}
