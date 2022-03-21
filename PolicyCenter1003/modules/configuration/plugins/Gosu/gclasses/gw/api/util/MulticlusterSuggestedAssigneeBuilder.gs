package gw.api.util

uses gw.api.assignment.RoleAssignee
uses gw.api.assignment.UserAssignee
uses gw.api.assignment.multicluster.MulticlusterAssignee
uses gw.api.assignment.multicluster.MulticlusterSuggestedAssigneeBuilderBase
uses gw.api.web.desktop.data.activity.ActivityDTO
uses gw.api.web.desktop.data.userroleassignment.UserRoleAssignmentDTO
uses gw.plugin.Plugins
uses gw.plugin.multicluster.federateddata.IFederatedDataPlugin
uses gw.plugin.multicluster.federateddata.UserRoleAssignmentType

@Export
class MulticlusterSuggestedAssigneeBuilder extends MulticlusterSuggestedAssigneeBuilderBase {

  var _assignees : Set<MulticlusterAssignee> = new LinkedHashSet()
  var _toBeAssigned : ActivityDTO[]
  var _userRoleAssignments : List<UserRoleAssignmentDTO>
  var _defaultUser : User

  public construct(toBeAssigned : ActivityDTO[], defaultUser : User) {
    _toBeAssigned = toBeAssigned
    _defaultUser = defaultUser
  }

  private function addSuggestedAssignees() {
    loadUserRoleAssignments()
    addLoggedInUser()
    addGroupSupervisor()
    addUserRoleOwnerUsers()
    addQueues()
    addGroupMembers()
    addAssignmentRoles()
  }

  override property get SuggestedAssignees() : MulticlusterAssignee[] {
    _assignees.clear()
    if (_toBeAssigned != null && _toBeAssigned.length > 0) {
      addSuggestedAssignees()
    }
    return _assignees.toTypedArray()
  }

  private property get AssignablesGroup() : Group {
    var groupId = _toBeAssigned.first().GroupId
    if (groupId != null and _toBeAssigned.allMatch(\activity -> groupId == activity.GroupId)) {
      return Group.finder.findByPublicId(groupId)
    }
    return null
  }

  private function addLoggedInUser() {
    var currentUser = User.util.CurrentUser
    var memberGroups = currentUser.GroupUsers.map(\gu -> gu.Group)
    var groupIdToGroup = memberGroups.mapToKeyAndValue(\ g -> g.PublicID, \ g -> g)

    for (activity in _toBeAssigned) {
      if (groupIdToGroup.containsKey(activity.GroupId)) {
        addUser(currentUser, groupIdToGroup.remove(activity.GroupId))
      }
    }

    if (groupIdToGroup.size() == memberGroups.length) {
      memberGroups.each(\ memberGroup -> addUser(currentUser, memberGroup))
    }
  }

  private function addGroupSupervisor() {
    var group = AssignablesGroup
    if (group?.getSupervisor() != null) {
      addUser(group.getSupervisor(), group)
    }
  }

  private function addUserRoleOwnerUsers() {
    var firstActivity = _toBeAssigned.first()
    if (hasUserRoleOwner(firstActivity) and allHaveTheSameUserRoleOwner(firstActivity)) {
      _userRoleAssignments.forEach(\ ura -> addUser(ura.UserId, ura.GroupId))
    }
  }

  private function addGroupMembers() {
    var group = AssignablesGroup
    if (group != null) {
      group.Members.each(\ m -> addUser(m.User, group))
    }
  }

  private function addAssignmentRoles() {
    for (ura in _userRoleAssignments) {
      var role = typekey.UserRole.get(ura.Role)
      if (role != null) {
        addAssignee(role)
      }
    }
  }

  private function hasUserRoleOwner(activity : ActivityDTO) : boolean {
    return activity.UserRoleOwnerType != null and activity.UserRoleOwnerPublicId != null
  }

  private function allHaveTheSameUserRoleOwner(model : ActivityDTO) : boolean {
    return _toBeAssigned.allMatch(\activity -> model.UserRoleOwnerType == activity.UserRoleOwnerType
        and model.UserRoleOwnerPublicId == activity.UserRoleOwnerPublicId)
  }

  private function loadUserRoleAssignments() {
    var firstActivity = _toBeAssigned.first()
    _userRoleAssignments = Plugins.get(IFederatedDataPlugin).findUserRoleAssignments(
        firstActivity.UserRoleOwnerPublicId,
        UserRoleAssignmentType.valueOf(firstActivity.UserRoleOwnerType)) as List<UserRoleAssignmentDTO>
  }

  override function addAssignee(assignee : AssignableQueue) {
    var multiclusterAssignee = new MulticlusterAssignee.Builder(assignee)
        .withQueueId(assignee.PublicID)
        .build()
    _assignees.add(multiclusterAssignee)
  }

  override function addAssignee(user : User, group : Group) {
    var destination = new UserAssignee(group, user)
    var multiclusterAssignee = new MulticlusterAssignee.Builder(destination)
        .withUserId(user.PublicID)
        .withGroupId(group.PublicID)
        .build()
    _assignees.add(multiclusterAssignee)
  }

  override function addAssignee(assignee : typekey.UserRole) {
    var roleAssignee = new RoleAssignee(assignee, _defaultUser);
    var multiclusterAssignee = new MulticlusterAssignee.Builder(roleAssignee)
        .withRole(assignee)
        .build()
    _assignees.add(multiclusterAssignee)
  }

  override property get IncludeQueues() : boolean {
    return true
  }

}