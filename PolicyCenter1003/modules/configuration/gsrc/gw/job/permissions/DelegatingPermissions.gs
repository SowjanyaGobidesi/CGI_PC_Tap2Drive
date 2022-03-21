package gw.job.permissions
uses gw.job.JobTypePermissions

@Export
class DelegatingPermissions implements JobTypePermissions {
  protected var _delegate : JobTypePermissions

  construct( theDelegate : JobTypePermissions) {
    _delegate = theDelegate
  }

  override property get Advance() : boolean {
    return _delegate.Advance
  }

  override property get Edit() : boolean {
    return _delegate.Edit
  }

  override property get Quote() : boolean {
    return _delegate.Edit
  }

  override property get Withdraw() : boolean {
    return _delegate.Edit
  }

  override property get Create() : boolean {
    return _delegate.Create
  }

  override property get Bind() : boolean {
    return _delegate.Bind
  }

  override property get Issue() : boolean {
    return _delegate.Issue
  }

  override property get Complete() : boolean {
    return _delegate.Complete
  }

  override property get Renew() : boolean {
    return _delegate.Renew
  }

  override property get View() : boolean {
    return _delegate.View
  }

  override property get RescindCancellation() : boolean {
    return _delegate.RescindCancellation
  }

  override property get Waive() : boolean {
    return _delegate.Waive
  }

  override property get NotTaken() : boolean {
    return _delegate.NotTaken
  }

  override property get Decline() : boolean {
    return _delegate.Decline
  }

  override property get NonRenew() : boolean {
    return _delegate.NonRenew
  }

  override property get RescheduleCancellation() : boolean {
    return _delegate.RescheduleCancellation
  }

  override property get CopyPolicyData() : boolean  {
    return _delegate.CopyPolicyData
  }
  
}
