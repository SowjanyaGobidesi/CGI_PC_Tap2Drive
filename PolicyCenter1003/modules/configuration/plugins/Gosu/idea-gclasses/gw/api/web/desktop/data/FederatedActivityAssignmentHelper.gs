package gw.api.web.desktop.data

uses gw.api.assignment.multicluster.ActivityActionContext
uses gw.api.assignment.multicluster.FederatedBatchAPIResponse
uses gw.api.assignment.multicluster.ActivityCommonAPIClient
uses gw.api.assignment.multicluster.ClusterUrlActivityAPIClient
uses gw.api.assignment.multicluster.MulticlusterAssignee
uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.api.web.desktop.data.activity.ActivityDTO
uses gw.plugin.Plugins
uses gw.plugin.multicluster.resolver.ClusterInfoDTO
uses gw.plugin.multicluster.resolver.IResolverServicePlugin
uses gw.util.Pair

uses java.util.function.Function

@Export
class FederatedActivityAssignmentHelper {

  var _activityCommonAPIClient : ActivityCommonAPIClient


  construct() {
    _activityCommonAPIClient = ClusterUrlActivityAPIClient.Instance
  }

  construct(activityCommonAPIClient : ActivityCommonAPIClient) {
    _activityCommonAPIClient = activityCommonAPIClient
  }

  function activitiesByCluster(activities : ActivityDTO[]) : Map<String, List<ActivityDTO>> {
    final var mappings = getAccountToClusterMappings(activities)
    var remoteActivities : Map<String, List<ActivityDTO>> = new HashMap<String, List<ActivityDTO>>()
    for (activity in activities) {
      var cluster = mappings.get(activity.AccountPublicId)
      var clusterActivities = remoteActivities.computeIfAbsent(cluster.ClusterId, \_ -> ({}))
      clusterActivities.add(activity)

    }
    return remoteActivities
  }

  function performAssignment(activitiesToCluster : Map<String, List<ActivityDTO>>,
                             computeAssignee : Function<ActivityDTO, MulticlusterAssignee>) {
    var errorMessages = new ArrayList<String>();
    activitiesToCluster.forEach(\clusterId, activityDTOs -> {
      var activityActionContexts = activityDTOs.map(\elt -> createActivityActionContext(elt, computeAssignee.apply(elt)))
      var activityBatchAPIResponse = _activityCommonAPIClient.assignActivities(clusterId, activityActionContexts)
      var contextResponsePair = activityActionContexts.zip(activityBatchAPIResponse.Responses)
      errorMessages.addAll(getBatchRemoteActionErrorMessages(contextResponsePair, DisplayKey.get("Activity.Action.Assignment")))
    })
    if (!errorMessages.isEmpty()) {
      errorMessages.add(DisplayKey.get("Java.Assignment.Popup.AssignmentFailed"))
      throw new DisplayableException(errorMessages.reverse().toTypedArray())
    }
  }

  static function getBatchRemoteActionErrorMessages(contextResponsePairs : List<Pair<ActivityActionContext, FederatedBatchAPIResponse.Response>>, actionTypeKey : String): List<String> {
    var errorMessages: List<String> = {}
    contextResponsePairs.forEach(\contextResponsePair -> {
      if (contextResponsePair.Second.is4xx()) {
        errorMessages.add(DisplayKey.get("Activity.Action.Failed", actionTypeKey, contextResponsePair.First.Subject, contextResponsePair.Second.Body.UserMessage));
      }

      if (contextResponsePair.Second.is5xx()) {
        errorMessages.add(DisplayKey.get("Activity.Action.ServiceUnavailable", contextResponsePair.First.Subject));
      }
    })
    return errorMessages
  }

  private function getAccountToClusterMappings(activities : ActivityDTO[]) : Map<String, ClusterInfoDTO> {
    if (activities == null || activities.length == 0) {
      return Collections.emptyMap()
    }
    var iResolverServicePlugin = Plugins.get(IResolverServicePlugin)
    var clustersForAccounts = iResolverServicePlugin.getClustersForAccounts(getListOfAccountIds(activities))
    return clustersForAccounts
  }

  private function getListOfAccountIds(activities : ActivityDTO[]) : List<String> {
    var accountIds = new ArrayList<String>()
    for (activity in activities) {
      accountIds.add(activity.AccountPublicId)
    }
    return accountIds
  }

  private function createActivityActionContext(activity : ActivityDTO, assignee : MulticlusterAssignee) : ActivityActionContext {
    return ActivityActionContext.assignActionBuilder()
        .withActivityId(activity.PublicId)
        .withAssigneeUserId(assignee.UserId)
        .withAssigneeGroupId(assignee.GroupId)
        .withAssigneeQueueId(assignee.QueueId)
        .withAssigneeRole(assignee.Role)
        .withSubject(activity.Subject)
        .build()
  }
}