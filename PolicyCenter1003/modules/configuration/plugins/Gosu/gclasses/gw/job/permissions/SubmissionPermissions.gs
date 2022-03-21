package gw.job.permissions

@Export
class SubmissionPermissions  extends DefaultJobPermissions  {
  construct(job : Job) {
    super(job)
  }

  override property get Create() : boolean {
    return perm.Submission.create
  }

  override property get Issue() : boolean {
    return perm.Submission.issue(_job)
  }

  override property get Bind() : boolean {
    return perm.Submission.bind(_job)
  }

  override property get Edit() : boolean {
    return perm.Submission.edit(_job)
  }

  override property get Quote() : boolean {
    return perm.Submission.quote(_job)
  }

  override property get View() : boolean {
    return perm.Submission.view(_job)
  }

  override property get NotTaken() : boolean {
    return perm.Submission.nottaken(_job)
  }

  override property get Decline() : boolean {
    return perm.Submission.decline(_job)
  }

  override property get Withdraw() : boolean {
    return perm.Submission.withdraw(_job)
  }

  override property get Advance() : boolean {
    return perm.Submission.advance(_job)
  }

}
