package gw.api.web.activity

uses gw.api.assignment.multicluster.ActivityActionContext
uses gw.api.assignment.multicluster.FederatedBatchAPIResponse
uses gw.api.assignment.multicluster.FederatedBatchAPIResponse.Response
uses gw.api.util.DisplayableException
uses gw.api.web.desktop.data.FederatedActivityAssignmentHelper
uses gw.api.web.desktop.data.activity.ActivityDTO
uses gw.util.Pair

uses FederatedActivityAssignmentHelper#getBatchRemoteActionErrorMessages(List<Pair<ActivityActionContext, Response>>, String)

@Export
abstract class ActivityActionHandler {

  var _activityAssignmentHelper = new FederatedActivityAssignmentHelper()

  /**
   * @return localized action type name used for display messages
   */
  abstract property get ActionType() : ActivityActionContext.ActionType

  /**
   * Carries out appropriate action on the activity from the remote cluster
   *
   * @param context containing information about activity to be handled
   * @return result of the operation received from the cluster containing given activity
   */
  abstract function handle(clusterId : String, contexts : List<ActivityActionContext>) : FederatedBatchAPIResponse

  private function toContexts(activities : List<ActivityDTO>) : List<ActivityActionContext> {
    return activities.map(\activity -> toContext(activity) )
  }

  private function toContext(activity : ActivityDTO) : ActivityActionContext {
    return ActivityActionContext.builder()
        .withActionType(ActionType)
        .withActivityId(activity.PublicId)
        .build()
  }

  function handleActivities(activityDTOs : ActivityDTO[]) {
    var clusterToActivitiesMapping = _activityAssignmentHelper.activitiesByCluster(activityDTOs)
    var errorMessages : List<String> = {}
    clusterToActivitiesMapping.forEach(\clusterId, activities -> {
      var actionContexts = toContexts(activities)
      var apiResponse = handle(clusterId, actionContexts)
      errorMessages.addAll(getBatchRemoteActionErrorMessages(actionContexts.zip(apiResponse.Responses), ActionType.toString()))
    })

    if (!errorMessages.isEmpty()) {
      throw new DisplayableException(errorMessages.toTypedArray())
    }
  }
}
