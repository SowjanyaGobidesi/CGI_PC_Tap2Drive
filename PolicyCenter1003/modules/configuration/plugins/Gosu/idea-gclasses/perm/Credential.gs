package perm

uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class Credential {
  static property get create () : boolean {
    return com.guidewire._generated.security.CredentialPermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get delete () : boolean {
    return com.guidewire._generated.security.CredentialPermKeys.DELETE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get edit () : boolean {
    return com.guidewire._generated.security.CredentialPermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}