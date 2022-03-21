package gw.api.web.activity

uses com.google.common.collect.ImmutableSet
uses gw.api.system.PCDependenciesGateway
uses gw.api.system.PLDependenciesGateway
uses gw.api.web.desktop.data.activity.ActivityDTO

/**
 * Class replicates the logic of ViewPCActivityPermissionHandler and AbstractProducerCodePermissionHandler
 * for federated views where DTOs are used instead of entities.
 */
@Export
public class FederatedActivityViewPermissionHandler {
  private static final var PRODUCER_STATUS = ImmutableSet.of(ProducerStatus.TC_ACTIVE)
  private static final var SYSTEM_PERMISSION_TYPE = ImmutableSet.of(SystemPermissionType.TC_ABVIEW)

  static function canViewActivity(user : User, activity : ActivityDTO) : boolean {
    return hasUserBasedPermissions(user) || hasProducerCodesBasedPermissions(user, activity);
  }

  private static function hasUserBasedPermissions(user : User) : boolean {
    return user.isUnrestrictedUser() || !user.isUseProducerCodeSecurity()
  }

  private static function hasProducerCodesBasedPermissions(user : User, activity : ActivityDTO) : boolean {
    if (hasUserPermissionToViewActivities(user)) {
      var producerCodesFromDTO = extractProducerCodesFromDTO(activity)

      if (producerCodesFromDTO.isEmpty()) {
        return true
      }

      var producerCodes = getProducerCodesForUser(user)

      if (producerCodes.isEmpty()) {
        return false
      }

      return hasUserPermissionForAnyOfProducerCodes(user, producerCodesFromDTO, producerCodes)
    }

    return false
  }

  private static function hasUserPermissionToViewActivities(user : User) : boolean {
    return PLDependenciesGateway.getPermissionCache().hasPermission(user.getID(), SystemPermissionType.TC_ABVIEW);
  }

  private static function extractProducerCodesFromDTO(activity : ActivityDTO) : Set<String> {
    if (activity.ProducerCodeOfService != null) {
      return ImmutableSet.of(activity.ProducerCodeOfService)
    }

    if (activity.ProducerCodes != null) {
      return ImmutableSet.copyOf(activity.ProducerCodes)
    }

    return ImmutableSet.of()
  }

  private static function hasUserPermissionForProducerCode(user : User, producerCode : ProducerCode) : boolean {
    return PCDependenciesGateway.getUserProducerCodePermissionCache()
        .getUserProducerCodePermissions(user.getID(), producerCode.getID()).contains(SystemPermissionType.TC_ABVIEW);
  }

  private static function getProducerCodesForUser(user : User) : Set<ProducerCode> {
    return PCDependenciesGateway.getUserProducerCodePermissionCache().
        getProducerCodesForUserPermissions(user.getID(), PRODUCER_STATUS,
            SYSTEM_PERMISSION_TYPE);
  }

  private static function hasUserPermissionForAnyOfProducerCodes(user : User, producerCodesFromDTO : Set<String>,
                                                                 producerCodes : Set<ProducerCode>) : boolean {
    return producerCodes.stream()
        .filter(\producerCode -> producerCodesFromDTO.contains(producerCode.getCode()))
        .anyMatch(\producerCode -> hasUserPermissionForProducerCode(user, producerCode))
  }

}