package gw.web.admin

uses gw.api.locale.DisplayKey
uses gw.api.system.ExternalUserAccessParameterKey
uses gw.api.util.DisplayableException

uses java.util.List

@Export
class UserUIHelper {
  public static function verifyAttributeNameIsUnique(currentAttr: AttributeUser, attributes: List) : String {
    for (value in attributes) {
      var attribute = (value as AttributeUser)
      if (attribute != currentAttr
          and attribute.Attribute.Name == currentAttr.Attribute.Name
          and attribute.Attribute.Type == currentAttr.Attribute.Type) {
        return DisplayKey.get("Web.Admin.UserAttributes.DuplicateName", currentAttr.Attribute.Name)
      }
    }
    return null
  }

  public static function initialGroups(pc : ProducerCode, u : User) : Group[] {
    var groupsSet = pc.getAllGroups()
    groupsSet.retainAll( u.getAllGroups())
    var groupsList = groupsSet.whereTypeIs( Group ).toList().sort()
    return groupsList.toTypedArray()
  }

  public static function validateAndAddGroup(group : Group, user : User) : GroupUser {
    if (user.AllGroups.contains(group)) {
      throw new DisplayableException(DisplayKey.get("Web.Admin.GroupUsers.AddRedundantGroup", group.Name, user.DisplayName))
    }
    if (group.canAllowExternalAccess(user)) {
      var groupUser = new GroupUser()
      groupUser.User = user
      group.addToUsers(groupUser)
      user.addToGroup(groupUser)
      return groupUser
    } else {
      throw new DisplayableException(DisplayKey.get("Web.Admin.GroupUsers.AddInvalidGroup", group.Name, user.DisplayName ))
    }
  }

  public static function createSearchCriteria(organization : Organization, userType : UserType) : UserSearchCriteria {
    var c = new UserSearchCriteria()
    var CurrentUser = User.util.CurrentUser
    if (ExternalUserAccessParameterKey.ExternalUserAccessIsFullyRestricted() and CurrentUser.ExternalUser) {
      c.Organization = CurrentUser.Organization
    }
    else {
      c.Organization = organization
    }
    c.UserType = userType
    return c
  }

}