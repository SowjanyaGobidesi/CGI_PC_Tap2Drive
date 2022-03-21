package gw.job.permissions

@Export
class RewriteNewAccountPermissions extends DefaultJobPermissions {
  construct(job : Job) {
    super(job)
  }

  override property get Create() : boolean {
    return perm.RewriteNewAccount.create
  }

  override property get Bind() : boolean {
    return perm.RewriteNewAccount.bind(_job)
  }

  override property get Issue() : boolean {
    return perm.RewriteNewAccount.issue(_job)
  }

  override property get Edit() : boolean {
    return perm.RewriteNewAccount.edit(_job)
  }

  override property get Quote() : boolean {
    return perm.RewriteNewAccount.quote(_job)
  }

  override property get View() : boolean {
    return perm.RewriteNewAccount.view(_job)
  }

  override property get Withdraw() : boolean {
    return perm.RewriteNewAccount.withdraw(_job)
  }

  override property get Advance() : boolean {
    return perm.RewriteNewAccount.advance(_job)
  }
}
