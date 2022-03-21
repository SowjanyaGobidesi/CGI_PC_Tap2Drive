package gw.integration.document.production.web

uses gw.plugin.document.IDocumentTemplateDescriptor

/**
 * Base for UI representation of future document.
 */
@Export
abstract class DocumentProductionInfoBase {
  var _account: Account as Account
  var _policyPeriod: PolicyPeriod as PolicyPeriod
  var _policy: Policy as Policy
  var _job: Job as Job
  var _contingency: Contingency as Contingency
  var _activity: Activity as Activity

  property set PolicyPeriod(value: PolicyPeriod) {
    _policyPeriod = value
    if (_policyPeriod.Policy != null)
      this.Policy = _policyPeriod.Policy
  }

  property set Job(value: Job) {
    _job = value
    if (_job.Policy != null)
      this.Policy = _job.Policy
  }

  property set Policy(value: Policy) {
    _policy = value
    if (_policy.Account != null)
      this.Account = _policy.Account
  }

  property set Contingency(value: Contingency) {
    _contingency = value
    if (_contingency.PolicyPeriod != null)
      this.PolicyPeriod = _contingency.PolicyPeriod
  }

  property set Activity(value: Activity) {
    _activity = value
    if (_activity.Policy != null)
      this.Policy = _activity.Policy
    if (_activity.Account != null)
      this.Account = _activity.Account
    if (_activity.PolicyPeriod != null)
      this.PolicyPeriod = _activity.PolicyPeriod
    if (_activity.Contingency != null)
      this.Contingency = _activity.Contingency
    if (_activity.Job != null)
      this.Job = _activity.Job
  }
}