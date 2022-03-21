package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "Job.eti;Job.eix;Job.etx")
enhancement GWJobEntityEnhancement : entity.Job {
  function canViewModifiers (policyPeriod :  entity.PolicyPeriod) : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).canViewModifiers(policyPeriod)
  }
  
  function createFailedAsyncQuoteActivity (user :  entity.User, policyPeriod :  entity.PolicyPeriod) : entity.Activity {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).createFailedAsyncQuoteActivity(user, policyPeriod)
  }
  
  function createFailedAsyncRateActivity (user :  entity.User, policyPeriod :  entity.PolicyPeriod) : entity.Activity {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).createFailedAsyncRateActivity(user, policyPeriod)
  }
  
  function createSuccessfulAsyncQuoteActivity (user :  entity.User, policyPeriod :  entity.PolicyPeriod) : entity.Activity {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).createSuccessfulAsyncQuoteActivity(user, policyPeriod)
  }
  
  function createSuccessfulAsyncQuoteActivityWithWarnings (user :  entity.User, policyPeriod :  entity.PolicyPeriod) : entity.Activity {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).createSuccessfulAsyncQuoteActivityWithWarnings(user, policyPeriod)
  }
  
  function createSuccessfulAsyncRateActivity (user :  entity.User, policyPeriod :  entity.PolicyPeriod) : entity.Activity {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).createSuccessfulAsyncRateActivity(user, policyPeriod)
  }
  
  function createSuccessfulAsyncRateActivityWithWarnings (user :  entity.User, policyPeriod :  entity.PolicyPeriod) : entity.Activity {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).createSuccessfulAsyncRateActivityWithWarnings(user, policyPeriod)
  }
  
  function getRatingStyle (policyPeriod :  entity.PolicyPeriod) : typekey.RatingStyle {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).getRatingStyle(policyPeriod)
  }
  
  function getValidationLevel (policyPeriod :  entity.PolicyPeriod) : typekey.ValidationLevel {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).getValidationLevel(policyPeriod)
  }
  
  function isAvailableForSideBySideEdit (policyPeriod :  entity.PolicyPeriod) : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).isAvailableForSideBySideEdit(policyPeriod)
  }
  
  function isOpenForEdit (policyPeriod :  entity.PolicyPeriod) : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).isOpenForEdit(policyPeriod)
  }
  
  property get AccountSyncingEnabled () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).AccountSyncingEnabled
  }
  
  property get AccountSyncingIsDateAware () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).AccountSyncingIsDateAware
  }
  
  property get CanCopyCoverages () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).CanCopyCoverages
  }
  
  property get CanUpdatePeriodDates () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).CanUpdatePeriodDates
  }
  
  property get DisplayType () : java.lang.String {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).DisplayType
  }
  
  property get Icon () : java.lang.String {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).Icon
  }
  
  property get Viewable () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.job.JobMethods") as gw.api.job.JobMethods).Viewable
  }
  
  
}