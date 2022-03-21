package perm

uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class ProducerCode {
  static property get create () : boolean {
    return com.guidewire._generated.security.ProducerCodePermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}