package gw.api.job

uses gw.api.domain.policy.period.PolicyPeriodStatusSets

@Export
class RenewalJobMethods extends JobMethodsDefaultImpl {
  
  construct(renewal : Renewal) {
    super(renewal)
  }

  override property get Icon() : String {
    return "renewal"
  }

  override property get AccountSyncingEnabled() : boolean {
    return true
  }

  override property get AccountSyncingIsDateAware() : boolean {
    return true
  }

  override property get Viewable() : boolean {
    return perm.Renewal.view(_job)
  }

  override protected function isOpenForEditImpl(policyPeriod : PolicyPeriod) : boolean {
    return policyPeriod.Status == TC_DRAFT and perm.Renewal.edit(_job)
  }

  override protected function isAvailableForSideBySideEditImpl(policyPeriod : PolicyPeriod) : boolean {
    return PolicyPeriodStatusSets.SIDE_BY_SIDE_EDITABLE_STATUSES.contains(policyPeriod.Status) and perm.Renewal.edit(_job)
  }
  
  override property get CanUpdatePeriodDates() : boolean {
    return true
  }

  override property get CanCopyCoverages()  : boolean {
    return true
  }

  override function canViewModifiers(policyPeriod : PolicyPeriod) : boolean {
    return not (policyPeriod.Status == TC_NOTTAKEN or policyPeriod.Status == TC_NONRENEWED) and perm.System.viewmodifiers
  }

}
