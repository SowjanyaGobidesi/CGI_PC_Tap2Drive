package perm

uses java.lang.Object
uses javax.annotation.Generated

@Generated("security-config-app.xml;security-config-pl.xml;security-config.xml", "", "com.guidewire.pl.permissions.codegen.EntityPermissionsGenerator")
class Submission {
  static function advance (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.ADVANCE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function bind (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.BIND.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function decline (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.DECLINE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function edit (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.EDIT.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function issue (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.ISSUE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function nottaken (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.NOTTAKEN.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function quote (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.QUOTE.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function review (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.REVIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function view (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.VIEW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static function withdraw (object :  Object) : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.WITHDRAW.hasPermission(entity.User.util.CurrentUser, object)
  }
  
  static property get create () : boolean {
    return com.guidewire._generated.security.SubmissionPermKeys.CREATE.hasPermission(entity.User.util.CurrentUser, null)
  }
  
  
}