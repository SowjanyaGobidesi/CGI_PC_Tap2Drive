package gw.job.permissions
uses gw.job.JobTypePermissions

/**
 * Combines permsissions based on the type of the Job together with other
 * permissions data to implement final permissions policy. Most of these
 * calls just delegate directly to the type specific permissions. The
 * remaining calls implement policies that always apply regardless of
 * the type of Job
 */
@Export
class CombinedPermissionPolicies extends DelegatingPermissions {
  var _period : PolicyPeriod

  construct( basePermissions : JobTypePermissions, period : PolicyPeriod) {
    super(basePermissions)
    _period = period
  }
  
  override property get Advance() : boolean {
    return !_period.UWLockedAndNoOverride and _delegate.Advance
  }

  /**
   * Indicates whether the user has permission to edit.
   */
  override property get Edit() : boolean {
   return _period.checkBaseEditability() and _delegate.Edit
  }

  /**
   * Indicates whether the user has permission to generate a quote.
   */
  override property get Quote() : boolean {
    return _delegate.Edit and _delegate.Quote
  }

  /**
   * Indicates whether the user has permission to withdraw the Job.
   */
  override property get Withdraw() : boolean {
    return _delegate.Edit and _delegate.Withdraw
  }

}
