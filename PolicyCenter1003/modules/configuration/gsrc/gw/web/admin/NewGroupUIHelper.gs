package gw.web.admin

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException

@Export
class NewGroupUIHelper {
  public static function createNewGroup(parent : entity.Group): Group {
    var newGroup = gw.api.admin.GroupUtil.createGroup(null, parent)
    if (User.util.CurrentUser.ExternalUser and newGroup.SecurityZone == null) {
      newGroup.SecurityZone = newGroup.RootGroup.SecurityZone
    }
    return newGroup
  }

  public static function validateUser(user : User, group : Group) : GroupUser {
    if (user.AllGroups.contains(group)) {
      throw new DisplayableException(DisplayKey.get("Web.Admin.GroupUsers.AddRedundantUser", user.DisplayName, group.Name))
    }
    if (group.canAllowExternalAccess(user)) {
      var groupUser = new GroupUser()
      groupUser.User = user
      groupUser.Group = group
      return groupUser
    } else {
      throw new DisplayableException(DisplayKey.get("Web.Admin.GroupUsers.AddInvalidUser", user.DisplayName, group.Name))
    }
  }

  public static function getRequiredUserType(group : Group) : UserType {
    switch (group.GroupType) {
      case GroupType.TC_BRANCHAUDIT :
      case GroupType.TC_REGIONAUDIT : return UserType.TC_AUDITOR
      case GroupType.TC_BRANCHUW :
      case GroupType.TC_REGIONUW :
      case GroupType.TC_HOMEOFFICEUW : return UserType.TC_UNDERWRITER
      case GroupType.TC_PRODUCER : return UserType.TC_PRODUCER
    }
    return null
  }

  public static function prepopulatedOrganization(group : Group) : Organization {
    return gw.api.system.ExternalUserAccessParameterKey.ExternalUserAccessIsFullyRestricted() ? group.Organization : null
  }

  public static function initializeSearchCriteria(org : Organization) : GroupSearchCriteria {
    var rtn = new GroupSearchCriteria()
    if (User.util.CurrentUser.ExternalUser) {
      rtn.Organization = User.util.CurrentUser.Organization
    } else if (org != null) {
      rtn.Organization = org
    }
    return rtn
  }

}