package perm

uses java.lang.Object
uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class PolicyPeriod {
  static function audit (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.AUDIT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function bind (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.BIND.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function cancel (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.CANCEL.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function change (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.CHANGE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function issue (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.ISSUE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function producerOfServiceOnlyView (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.PRODUCEROFSERVICEONLYVIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function reinstate (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.REINSTATE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function renew (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.RENEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function rewrite (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.REWRITE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function rewritenewaccount (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.REWRITENEWACCOUNT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function splitpolicy (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.SPLITPOLICY.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function view (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.VIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static property get overridebilling () : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.OVERRIDEBILLING.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get resetquotinglock () : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.RESETQUOTINGLOCK.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get restorefromarchive () : boolean {
    return com.guidewire._generated.security.PolicyPeriodPermKeys.RESTOREFROMARCHIVE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}