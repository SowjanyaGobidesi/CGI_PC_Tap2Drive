package perm

uses java.lang.Object
uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class Rule {
  static function approve (object :  Object) : boolean {
    return com.guidewire._generated.security.RulePermKeys.APPROVE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function create (object :  Object) : boolean {
    return com.guidewire._generated.security.RulePermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function delete (object :  Object) : boolean {
    return com.guidewire._generated.security.RulePermKeys.DELETE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function deploy (object :  Object) : boolean {
    return com.guidewire._generated.security.RulePermKeys.DEPLOY.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function edit (object :  Object) : boolean {
    return com.guidewire._generated.security.RulePermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function import (object :  Object) : boolean {
    return com.guidewire._generated.security.RulePermKeys.IMPORT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function view (object :  Object) : boolean {
    return com.guidewire._generated.security.RulePermKeys.VIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static property get approve () : boolean {
    return com.guidewire._generated.security.RulePermKeys.APPROVE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get create () : boolean {
    return com.guidewire._generated.security.RulePermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get delete () : boolean {
    return com.guidewire._generated.security.RulePermKeys.DELETE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get deploy () : boolean {
    return com.guidewire._generated.security.RulePermKeys.DEPLOY.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get edit () : boolean {
    return com.guidewire._generated.security.RulePermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get import () : boolean {
    return com.guidewire._generated.security.RulePermKeys.IMPORT.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get view () : boolean {
    return com.guidewire._generated.security.RulePermKeys.VIEW.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}