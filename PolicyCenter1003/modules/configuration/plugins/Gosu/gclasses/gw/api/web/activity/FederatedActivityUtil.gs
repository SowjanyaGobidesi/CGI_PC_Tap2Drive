package gw.api.web.activity

uses gw.api.assignment.multicluster.ActivityActionContext
uses gw.api.assignment.multicluster.ActivityActionContext.ActionType
uses gw.api.assignment.multicluster.FederatedBatchAPIResponse
uses gw.api.assignment.multicluster.ClusterUrlActivityAPIClient
uses gw.api.web.desktop.data.activity.ActivityDTO

uses ActionType#COMPLETE
uses ActionType#SKIP

@Export
class FederatedActivityUtil {

  static final var SKIP_HANDLER : ActivityActionHandler = new SkipActionHandler()
  static final var COMPLETE_HANDLER : ActivityActionHandler = new CompleteActionHandler()
  static final var ACTIVITY_COMMON_API_CLIENT = ClusterUrlActivityAPIClient.Instance

  private construct() {
  }

  static function skipActivities(activities : ActivityDTO[]) {
    SKIP_HANDLER.handleActivities(activities)
  }

  static function completeActivities(activities : ActivityDTO[]) {
    COMPLETE_HANDLER.handleActivities(activities)
  }

  static function canSkipOwnedActivity(activityDTO : ActivityDTO) : boolean {
    return ActivityUtil.canSkipOwnedActivity(ActivityType.get(activityDTO.Type), ActivityStatus.get(activityDTO.StatusCode), AssignmentStatus.get(activityDTO.AssignmentStatus), activityDTO.QueueId, activityDTO.IsMandatory)
  }

  static function canCompleteOwnedActivity(activityDTO : ActivityDTO) : boolean {
    return ActivityUtil.canCompleteOwnedActivity(ActivityType.get(activityDTO.Type), ActivityStatus.get(activityDTO.StatusCode), AssignmentStatus.get(activityDTO.AssignmentStatus), activityDTO.QueueId)
  }

  static function canCompleteActivity(user : User, activityDTO : ActivityDTO) : boolean {
    return canCompleteOwnedActivity(activityDTO) && FederatedActivityEditPermissionHandler.canEditActivity(user, activityDTO)
  }

  static function canAssignOwnedActivity() : boolean {
    return ActivityUtil.canAssignOwnedActivity()
  }

  static class SkipActionHandler extends ActivityActionHandler {

    override property get ActionType(): ActivityActionContext.ActionType {
      return SKIP
    }

    override function handle(clusterId : String, contexts : List<ActivityActionContext>): FederatedBatchAPIResponse {
      return ACTIVITY_COMMON_API_CLIENT.skipActivities(clusterId, contexts)
    }
  }

  static class CompleteActionHandler extends ActivityActionHandler {

    override property get ActionType(): ActivityActionContext.ActionType {
      return COMPLETE
    }

    override function handle(clusterId : String, contexts : List<ActivityActionContext>): FederatedBatchAPIResponse {
      return ACTIVITY_COMMON_API_CLIENT.completeActivities(clusterId, contexts)
    }
  }
}