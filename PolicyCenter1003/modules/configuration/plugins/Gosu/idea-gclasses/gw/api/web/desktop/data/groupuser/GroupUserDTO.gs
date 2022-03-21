package gw.api.web.desktop.data.groupuser

uses com.fasterxml.jackson.core.type.TypeReference
uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.common.AuditableDTO
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class GroupUserDTO extends AuditableDTO implements DesktopDataDTO, JacksonEnabledSerializable {

  var _publicId : String as PublicId
  var _userId : String as UserId
  var _groupId : String as GroupId
  var _isAssignedUserInGroup : Boolean as AssignedUserInGroup

  static function from(groupUser : GroupUser, isAssignedUserInGroup: Boolean) : GroupUserDTO {
    return new GroupUserDTO() {
      :_publicId = groupUser.PublicID,
      :_groupId = groupUser.Group.PublicID,
      :_userId = groupUser.User.PublicID,
      :_isAssignedUserInGroup = isAssignedUserInGroup
    }
  }

  static function from(json : String) : GroupUserDTO {
    return DesktopDTOSerializationHelper.Mapper.readValue(json, GroupUserDTO)
  }

  static function fromCollection(jsonCollection : String) : List<GroupUserDTO> {
    return DesktopDTOSerializationHelper.Mapper.readValue(jsonCollection, new TypeReference<List<GroupUserDTO>>() {
    })
  }

  function writeAsJSONString() : String {
    return DesktopDTOSerializationHelper.Mapper.writeValueAsString(this)
  }
}