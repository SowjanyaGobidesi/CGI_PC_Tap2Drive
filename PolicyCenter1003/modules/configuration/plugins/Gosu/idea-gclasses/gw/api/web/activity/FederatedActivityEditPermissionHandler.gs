package gw.api.web.activity

uses gw.api.system.PLDependenciesGateway
uses gw.api.web.desktop.data.activity.ActivityDTO

uses SystemPermissionType#TC_ACTEDITUNOWNED

/**
 * Class replicates the logic of EditPCActivityPermissionHandler and EditActivityPermissionHandler
 * for federated views where DTOs are used instead of entities.
 */
@Export
public class FederatedActivityEditPermissionHandler {

  static function canEditActivity(user : User, activity : ActivityDTO) : boolean {
    return isSuperUser(user) ||
        isAssignedByUser(user, activity) ||
        isAssignedToUser(user, activity) ||
        isAssignedToBackupUser(user, activity)
  }

  private static function isSuperUser(user : User) : boolean {
    return user.isUnrestrictedUser() || PLDependenciesGateway.getPermissionCache()
        .hasPermission(user.getID(), TC_ACTEDITUNOWNED)
  }

  private static function isAssignedByUser(user : User, activity : ActivityDTO) : boolean {
    return activity.AssignedByUserPublicId == user.PublicID
  }

  private static function isAssignedToUser(user : User, activity : ActivityDTO) : boolean {
    return activity.AssignedUserPublicId == user.PublicID
  }

  private static function isAssignedToBackupUser(user : User, activity : ActivityDTO) : boolean {
    return PLDependenciesGateway.getUserFinder().findVacationingUsers(user.getID())
        .hasMatch(\elt -> isAssignedToUser(elt, activity))
  }

}