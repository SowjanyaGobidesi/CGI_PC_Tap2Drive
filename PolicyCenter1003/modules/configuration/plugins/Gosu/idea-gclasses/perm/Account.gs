package perm

uses java.lang.Object
uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class Account {
  static function createForProducerCode (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.CREATEFORPRODUCERCODE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function edit (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function mergeAccounts (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.MERGEACCOUNTS.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function movePolicies (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.MOVEPOLICIES.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function newSubmission (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.NEWSUBMISSION.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function reopen (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.REOPEN.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function rewritePolicies (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.REWRITEPOLICIES.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function view (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.VIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function viewRenewalGroup (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.VIEWRENEWALGROUP.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function viewSubmissionGroup (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.VIEWSUBMISSIONGROUP.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function withdraw (object :  Object) : boolean {
    return com.guidewire._generated.security.AccountPermKeys.WITHDRAW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static property get create () : boolean {
    return com.guidewire._generated.security.AccountPermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get viewBilling () : boolean {
    return com.guidewire._generated.security.AccountPermKeys.VIEWBILLING.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}