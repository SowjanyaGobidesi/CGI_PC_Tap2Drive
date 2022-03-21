package perm

uses java.lang.Object
uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class Reinstatement {
  static function advance (object :  Object) : boolean {
    return com.guidewire._generated.security.ReinstatementPermKeys.ADVANCE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function bind (object :  Object) : boolean {
    return com.guidewire._generated.security.ReinstatementPermKeys.BIND.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function edit (object :  Object) : boolean {
    return com.guidewire._generated.security.ReinstatementPermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function issue (object :  Object) : boolean {
    return com.guidewire._generated.security.ReinstatementPermKeys.ISSUE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function quote (object :  Object) : boolean {
    return com.guidewire._generated.security.ReinstatementPermKeys.QUOTE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function review (object :  Object) : boolean {
    return com.guidewire._generated.security.ReinstatementPermKeys.REVIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function view (object :  Object) : boolean {
    return com.guidewire._generated.security.ReinstatementPermKeys.VIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function withdraw (object :  Object) : boolean {
    return com.guidewire._generated.security.ReinstatementPermKeys.WITHDRAW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static property get create () : boolean {
    return com.guidewire._generated.security.ReinstatementPermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}