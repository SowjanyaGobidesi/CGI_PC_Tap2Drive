package perm

uses java.lang.Object
uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class Organization {
  static function delete (object :  Object) : boolean {
    return com.guidewire._generated.security.OrganizationPermKeys.DELETE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function edit (object :  Object) : boolean {
    return com.guidewire._generated.security.OrganizationPermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function editagency (object :  Object) : boolean {
    return com.guidewire._generated.security.OrganizationPermKeys.EDITAGENCY.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function editbasic (object :  Object) : boolean {
    return com.guidewire._generated.security.OrganizationPermKeys.EDITBASIC.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static property get create () : boolean {
    return com.guidewire._generated.security.OrganizationPermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get search () : boolean {
    return com.guidewire._generated.security.OrganizationPermKeys.SEARCH.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}