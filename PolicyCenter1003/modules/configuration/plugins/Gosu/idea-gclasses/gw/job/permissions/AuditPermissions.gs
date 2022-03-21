package gw.job.permissions

@Export
class AuditPermissions extends DefaultJobPermissions {
  construct(job : Job) {
    super(job)
  }

  override property get Create() : boolean {
    return perm.Audit.create
  }

  // Unlike other Jobs it makes no sense to bind or issue an Audit
  override property get Bind() : boolean {
    return false
  }

  override property get Issue() : boolean {
    return false
  }

  override property get Complete() : boolean {
    return perm.Audit.complete
  }

  override property get Edit() : boolean {
    return perm.Audit.edit
  }

  override property get Quote() : boolean {
    return perm.Audit.quote
  }

  override property get View() : boolean {
    return perm.Audit.view
  }

  override property get Withdraw() : boolean {
    return perm.Audit.withdraw
  }

  override property get Waive() : boolean {
    return perm.Audit.waive
  }

  override property get Advance() : boolean {
    return perm.Audit.advance
  }


}
