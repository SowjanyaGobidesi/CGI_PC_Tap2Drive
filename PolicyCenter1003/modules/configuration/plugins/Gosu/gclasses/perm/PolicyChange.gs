package perm

uses java.lang.Object
uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class PolicyChange {
  static function advance (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.ADVANCE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function bind (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.BIND.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function decline (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.DECLINE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function edit (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function issue (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.ISSUE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function quote (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.QUOTE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function review (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.REVIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function view (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.VIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function withdraw (object :  Object) : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.WITHDRAW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static property get create () : boolean {
    return com.guidewire._generated.security.PolicyChangePermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}