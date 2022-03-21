package gw.api.web.desktop.data

uses com.google.common.collect.ImmutableSet
uses gw.api.system.PCDependenciesGateway
uses gw.api.system.PLDependenciesGateway

/**
 * Class replicates the logic of AbstractProducerCodePermissionHandler for jobs
 * in federated views where DTOs are used instead of entities.
 */
@Export
class FederatedJobPermissionHandler {
  static final var PRODUCER_STATUS = ImmutableSet.of(ProducerStatus.TC_ACTIVE)

  static function canViewJob(user : User, jobDTO : JobDTO, permissionType : SystemPermissionType) : boolean {
    return hasUserBasedPermissions(user) ||
           hasProducerCodesBasedPermissions(user, jobDTO.ProducerCodeOfService, permissionType);
  }

  private static function hasProducerCodesBasedPermissions(user : User, producerCodeOfService : String,
                                                           permissionType : SystemPermissionType) : boolean {
    if (hasUserPermissionType(user, permissionType)) {

      var producerCodes = getProducerCodesForUser(user, permissionType)

      if (producerCodes.isEmpty()) {
        return false
      }

      return hasUserPermissionForAnyOfProducerCodes(user, producerCodeOfService, producerCodes, permissionType)
    }
    return false
  }

  private static function hasUserBasedPermissions(user : User) : boolean {
    return user.isUnrestrictedUser() || !user.isUseProducerCodeSecurity()
  }

  private static function hasUserPermissionType(user : User, permissionType : SystemPermissionType) : boolean {
    return PLDependenciesGateway.getPermissionCache().hasPermission(user.getID(), permissionType);
  }

  private static function getProducerCodesForUser(user : User, permissionType : SystemPermissionType) : Set<ProducerCode> {
    return PCDependenciesGateway.getUserProducerCodePermissionCache().
    getProducerCodesForUserPermissions(user.getID(), PRODUCER_STATUS,
    ImmutableSet.of(permissionType));
  }

  private static function hasUserPermissionForAnyOfProducerCodes(user : User, producerCodeOfService : String,
  producerCodes : Set<ProducerCode>,
  permissionType : SystemPermissionType) : boolean {
    return producerCodes.stream()
    .anyMatch(\elt -> elt.Code == producerCodeOfService &&
    hasUserPermissionForProducerCode(user, elt, permissionType))
  }

  private static function hasUserPermissionForProducerCode(user : User, producerCode : ProducerCode,
                                                           permissionType : SystemPermissionType) : boolean {
    return PCDependenciesGateway.getUserProducerCodePermissionCache()
        .getUserProducerCodePermissions(user.getID(), producerCode.getID()).contains(permissionType);
  }
}
