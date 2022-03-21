package gw.webservice.pc.pc1000.community.datamodel

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.webservice.exception.BadIdentifierException
uses gw.pl.persistence.core.Bundle
uses gw.xml.ws.annotation.WsiExportable

@Export
@WsiExportable("http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/community/datamodel/GroupDTO")
final class GroupDTO {

  var _branchCode : String as BranchCode
  var _groupType : GroupType as GroupType
  var _loadFactor : int as LoadFactor
  var _name : String as Name
  var _description : String as Description
  var _parentPublicID : String as ParentPublicID
  var _publicID : String as PublicID
  var _securityZonePublicID : String as SecurityZonePublicID
  var _supervisorPublicID : String as SupervisorPublicID
  var _worldVisible : boolean as WorldVisible

  function populateFromGroup(group : Group) {
    this.BranchCode = group.BranchCode
    this.GroupType = group.GroupType
    this.LoadFactor = group.LoadFactor
    this.Name = group.Name
    this.Description = group.Description
    this.ParentPublicID = group.Parent.PublicID
    this.PublicID = group.PublicID
    this.SecurityZonePublicID = group.SecurityZone.PublicID
    this.SupervisorPublicID = group.Supervisor.PublicID
    this.WorldVisible = group.WorldVisible
  }

  function createGroup(bundle : Bundle) : Group {
    var group = new Group(bundle)
    return populateGroup(group)
  }

  function updateGroup(group : Group) {
    populateGroup(group)
  }

  private function populateGroup(group : Group) : Group {
    group.BranchCode = this.BranchCode
    group.GroupType = this.GroupType
    group.LoadFactor = this.LoadFactor
    group.Name = this.Name
    group.Description = this.Description
    group.PublicID = this.PublicID
    group.WorldVisible = this.WorldVisible

    if (this.ParentPublicID != null) {
      var foundParent = findBeanByPublicIDOrThrow<Group>(this.ParentPublicID)
      if (group.Parent != null and group.Parent.Organization != foundParent.Organization) {
        throw new IllegalArgumentException(DisplayKey.get("GroupModel.PopulateGroup.Error.CannotMoveGroupFromOneOrganizationToAnother", group, foundParent.Organization, group.Parent.Organization))
      }
      group.Parent = foundParent
    } else if (this.GroupType != GroupType.TC_ROOT) {
      throw new BadIdentifierException(DisplayKey.get("GroupModel.PopulateGroup.Error.ParentCannotBeNullForNonRootGroup"))
    }

    if (this.SecurityZonePublicID != null) {
      var foundSecurityZone = findBeanByPublicIDOrThrow<SecurityZone>(this.SecurityZonePublicID)
      group.SecurityZone = foundSecurityZone
    } else {
      throw new BadIdentifierException(DisplayKey.get("GroupModel.PopulateGroup.Error.ForeignKeyCannotBeNull", "SecurityZone", "Group"))
    }

    if (this.SupervisorPublicID != null) {
      var foundUser = findBeanByPublicIDOrThrow<User>(this.SupervisorPublicID)
      group.Supervisor = foundUser
    } else {
      group.Supervisor = null
    }

    return group
  }

  private reified function findBeanByPublicIDOrThrow<T extends KeyableBean>(groupPublicID : String) : T {
    var bean = Query.make(T).compare(T#PublicID, Equals, groupPublicID).select().AtMostOneRow
    if (bean == null) {
      throw new BadIdentifierException(DisplayKey.get("GroupModel.PopulateGroup.Error.CannotFindForeignKeyBeanWithPublicID", T, groupPublicID))
    }
    return bean
  }

}