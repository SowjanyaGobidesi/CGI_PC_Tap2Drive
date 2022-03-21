package gw.api.job

uses gw.api.domain.policy.period.PolicyPeriodStatusSets

@Export
class PolicyChangeJobMethods extends JobMethodsDefaultImpl {
  
  construct(policyChange : PolicyChange) {
    super(policyChange)
  }

  override property get Icon() : String {
    return "policy_change"
  }

  override property get AccountSyncingEnabled() : boolean {
    return true
  }

  override property get AccountSyncingIsDateAware() : boolean {
    return true
  }

  override property get Viewable() : boolean {
    return perm.PolicyChange.view(_job)
  }

  override protected function isOpenForEditImpl(policyPeriod : PolicyPeriod) : boolean {
    return policyPeriod.Status == TC_DRAFT and perm.PolicyChange.edit(_job)
  }

  override protected function isAvailableForSideBySideEditImpl(policyPeriod : PolicyPeriod) : boolean {
    return PolicyPeriodStatusSets.SIDE_BY_SIDE_EDITABLE_STATUSES.contains(policyPeriod.Status) and perm.PolicyChange.edit(_job)
  }
  
  override property get CanUpdatePeriodDates() : boolean {
    return true
  }

  override property get CanCopyCoverages()  : boolean {
    return true
  }

  override function canViewModifiers(policyPeriod : PolicyPeriod) : boolean {
    return perm.System.viewmodifiers
  }

}
