package gw.api.web.desktop.data.userroleassignment

uses com.fasterxml.jackson.core.type.TypeReference
uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.common.AuditableDTO
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class UserRoleAssignmentDTO extends AuditableDTO implements DesktopDataDTO, JacksonEnabledSerializable {
  var _publicId : String as PublicId
  var _userId : String as UserId
  var _groupId : String as GroupId
  var _role : String as Role
  var _ownerPublicId : String as OwnerPublicId
  var _assignedToSystemUser : boolean as AssignedToSystemUser
  var _assignedUserInGroup : boolean as AssignedUserInGroup

  static function from(assignment : JobUserRoleAssignment) : UserRoleAssignmentDTO {
    return new UserRoleAssignmentDTO() {
      :_publicId = assignment.PublicID,
      :_userId = assignment.AssignedUser.PublicID,
      :_groupId = assignment.AssignedGroup.PublicID,
      :_role = assignment.Role.Code,
      :_ownerPublicId = assignment.Job.PublicID,
      :_assignedToSystemUser = assignment.AssignedUser.isSystemUser(),
      :_assignedUserInGroup = assignment.AssignedUser.GroupUsers?.hasMatch(\groupUser -> groupUser.Group == assignment.AssignedGroup)
    }
  }

  static function from(assignment : AccountUserRoleAssignment) : UserRoleAssignmentDTO {
    return new UserRoleAssignmentDTO() {
      :_publicId = assignment.PublicID,
      :_userId = assignment.AssignedUser.PublicID,
      :_groupId = assignment.AssignedGroup.PublicID,
      :_role = assignment.Role.Code,
      :_ownerPublicId = assignment.Account.PublicID
    }
  }

  static function from(json : String) : UserRoleAssignmentDTO {
    return DesktopDTOSerializationHelper.Mapper.readValue(json, UserRoleAssignmentDTO)
  }

  static function fromCollection(jsonCollection : String) : List<UserRoleAssignmentDTO> {
    return DesktopDTOSerializationHelper.Mapper.readValue(jsonCollection, new TypeReference<List<UserRoleAssignmentDTO>>() {
    })
  }

  function writeAsJSONString() : String {
    return DesktopDTOSerializationHelper.Mapper.writeValueAsString(this)
  }
}