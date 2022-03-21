package gw.command

uses gw.api.builder.GroupBuilder
uses gw.api.builder.OrganizationBuilder

/**
 * This command allows you to add an Organization with a root group plus 5 levels of sub-groups,  with number of groups per level specified as an argument
 */
@Export
@DefaultMethod("wGroups")
class Org extends BaseCommand {
  var _numGroupsPerLevel: int

  @Argument("GroupsPerLevel", "5")
  function wGroups(): Organization {
    var organization = new OrganizationBuilder().withName("AddGroupsToOrganizationPerfTest").withRootGroupNameAllLanguages("AddGroupsToOrganizationPerfTest").createAndCommitInNewBundle()
    _numGroupsPerLevel = getArgumentAsInt("GroupsPerLevel")
    addGroups(organization)
    return organization
  }

  function addGroups(org: Organization) {
    final var rootGroup = org.getRootGroup()
    addGroups(org, rootGroup, 5)
  }

  function addGroups(org: Organization, group: Group, numLevels: int) {
    if (numLevels == 0) {
      return;
    }
    for (i in 1.._numGroupsPerLevel) {
      var groupName = group.getName() + ".child." + i
      var childGroup = new GroupBuilder().withName(groupName).withOrganization(org).withParent(group).createAndCommitInNewBundle()
      addGroups(org, childGroup, numLevels - 1)
    }
  }
}