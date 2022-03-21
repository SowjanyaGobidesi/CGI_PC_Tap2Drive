package gw.api.job

@Export
class IssuanceJobMethods extends JobMethodsDefaultImpl {
  
  construct(issuance : Issuance) {
    super(issuance)
  }

  override property get Icon() : String {
    return "issuance"
  }

  override property get AccountSyncingEnabled() : boolean {
    return true
  }

  override property get AccountSyncingIsDateAware() : boolean {
    return false
  }

  override property get Viewable() : boolean {
    return perm.Issuance.view(_job)
  }

  override protected function isOpenForEditImpl(policyPeriod : PolicyPeriod) : boolean {
    return (policyPeriod.Status == TC_NEW or policyPeriod.Status == TC_DRAFT) and perm.Issuance.edit(_job)
  }

  override protected function isAvailableForSideBySideEditImpl(policyPeriod : PolicyPeriod) : boolean {
    return false
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
