package perm

uses java.lang.Object
uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class Renewal {
  static function advance (object :  Object) : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.ADVANCE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function edit (object :  Object) : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function nonrenew (object :  Object) : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.NONRENEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function nottaken (object :  Object) : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.NOTTAKEN.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function quote (object :  Object) : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.QUOTE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function renew (object :  Object) : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.RENEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function review (object :  Object) : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.REVIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function view (object :  Object) : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.VIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function withdraw (object :  Object) : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.WITHDRAW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static property get create () : boolean {
    return com.guidewire._generated.security.RenewalPermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}