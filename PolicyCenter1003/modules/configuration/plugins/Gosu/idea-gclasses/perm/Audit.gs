package perm

uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class Audit {
  static property get advance () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.ADVANCE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get complete () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.COMPLETE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get create () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get edit () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get quote () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.QUOTE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get reschedule () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.RESCHEDULE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get reverse () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.REVERSE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get revise () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.REVISE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get start () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.START.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get view () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.VIEW.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get waive () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.WAIVE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  static property get withdraw () : boolean {
    return com.guidewire._generated.security.AuditPermKeys.WITHDRAW.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}