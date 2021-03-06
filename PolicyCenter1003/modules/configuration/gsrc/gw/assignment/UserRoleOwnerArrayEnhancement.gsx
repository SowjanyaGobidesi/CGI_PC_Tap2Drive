package gw.assignment
uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException

enhancement UserRoleOwnerArrayEnhancement : gw.api.assignment.UserRoleOwner[] {
  function reassign(role : typekey.UserRole, groupUser : GroupUser ) {
    if (not perm.System.userroleassignmentbulkassign) {
      throw new DisplayableException(DisplayKey.get("Assignment.NoPermissionToReassignMultiple"))
    }
    this.each(\ target -> {
      //print("Assign role: " + role + " to user: " + user + " on job: " + job)
      target.assignUserRole(groupUser.User, groupUser.Group, role)  
    })
  }

}
