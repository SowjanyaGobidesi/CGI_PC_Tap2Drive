package gw.plugin.multicluster.federateddata.v1

uses com.fasterxml.jackson.core.type.TypeReference
uses com.fasterxml.jackson.databind.ObjectMapper
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.userroleassignment.UserRoleAssignmentDTO
uses gw.plugin.multicluster.federateddata.FederatedDataCustomParams
uses gw.plugin.multicluster.federateddata.IFederatedDataUserRoleAssignmentSupport
uses gw.plugin.multicluster.federateddata.UserRoleAssignmentType
uses typekey.UserRole

uses FederatedDataClient#OWNER_PUBLIC_ID
uses FederatedDataClient#USER_ROLE_ASSIGNMENT_CONTROLLER
uses FederatedDataClient#*
uses String#format(String, Object[])

@Export
class FederatedDataUserRoleAssignmentSupport extends FederatedDataSupportBase implements IFederatedDataUserRoleAssignmentSupport {
  static final var _mapper = new ObjectMapper()

  construct(serviceClient : FederatedDataClient) {
    super(serviceClient)
  }

  override function createUserRoleAssignment(data : String, userRoleAssignmentType : UserRoleAssignmentType) {
    if (userRoleAssignmentType != null) {
      ServiceClient.createEntity("${userRoleAssignmentType.name()}/${USER_ROLE_ASSIGNMENT_CONTROLLER}", data)
    }
  }

  override function updateUserRoleAssignment(userRoleAssignmentId : String, data : String, userRoleAssignmentType : UserRoleAssignmentType) {
    if (userRoleAssignmentType != null) {
      ServiceClient.updateEntity(
          "${userRoleAssignmentType.name()}/${USER_ROLE_ASSIGNMENT_CONTROLLER}", userRoleAssignmentId, data)
    }
  }

  override function deleteUserRoleAssignment(userRoleAssignmentId : String, userRoleAssignmentType : UserRoleAssignmentType) {
    if (userRoleAssignmentType != null) {
      ServiceClient.deleteEntity(
          "${userRoleAssignmentType.name()}/${USER_ROLE_ASSIGNMENT_CONTROLLER}", userRoleAssignmentId)
    }
  }

  override function findUserRoleAssignments(ownerPublicId : String, userRoleAssignmentType : UserRoleAssignmentType) : List<DesktopDataDTO> {
    if (userRoleAssignmentType != null) {
      var queryParams = FederatedDataCustomParams.builder().withParam(OWNER_PUBLIC_ID, ownerPublicId).build()
      var controller = "${userRoleAssignmentType.name()}/${USER_ROLE_ASSIGNMENT_CONTROLLER}"

      var response = ServiceClient.getEntities(controller, queryParams)

      return UserRoleAssignmentDTO.fromCollection(response.Entity)
    }
    return Collections.emptyList()
  }

  override function findUsersForJobRoles(jobPublicIds : List<String>, role : UserRole) : Map<String, String> {
    if(!jobPublicIds.Empty) {
      var result = ServiceClient.getEntities(format(JOB_ROLE_CONTROLLER, {role.Code}), FederatedDataCustomParams.builder()
          .withParams("jobIds", jobPublicIds)
          .build())

      return _mapper.readValue(result.Entity, new TypeReference<Map<String, String>>() { })
    }
    return Collections.emptyMap()
  }
}