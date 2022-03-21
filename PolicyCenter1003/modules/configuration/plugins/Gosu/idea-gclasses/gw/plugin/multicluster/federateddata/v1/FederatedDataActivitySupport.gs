package gw.plugin.multicluster.federateddata.v1

uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.activity.ActivityDTO
uses gw.plugin.multicluster.federateddata.FederatedDataCustomParams
uses gw.plugin.multicluster.federateddata.FederatedDataPageParams
uses gw.plugin.multicluster.federateddata.IFederatedDataActivitySupport
uses gw.plugin.multicluster.federateddata.IFederatedDataFilter

uses FederatedDataClient#*

@Export
class FederatedDataActivitySupport extends FederatedDataSupportBase implements IFederatedDataActivitySupport {

  construct(serviceClient : FederatedDataClient) {
    super(serviceClient)
  }

  override function createActivity(data : String) {
    ServiceClient.createEntity(ACTIVITY_CONTROLLER, data)
  }

  override function updateActivity(activityId : String, data : String) {
    ServiceClient.updateEntity(ACTIVITY_CONTROLLER, activityId, data)
  }

  override function deleteActivity(activityId : String) {
    ServiceClient.deleteEntity(ACTIVITY_CONTROLLER, activityId)
  }

  override function findActivities(userId : String, filter : IFederatedDataFilter, startIndex : int, numEntries : int, sorting : List<IteratorBackingDataSorting>) : List<DesktopDataDTO> {
    var queryParams = queryParamsFor(:userId = userId, :filter = filter)
    return findActivitiesFor(startIndex, numEntries, sorting, queryParams);
  }

  override function findActivities(queueIds : List<String>, startIndex : int, numEntries : int, sorting : List<IteratorBackingDataSorting>) : List<DesktopDataDTO> {
    var queryParams = queryParamsFor(:queueId = queueIds)
    return findActivitiesFor(startIndex, numEntries, sorting, queryParams);
  }

  override function getActivityCount(userId : String, filter : IFederatedDataFilter) : int {
    return getCountForUserFromController(ACTIVITY_CONTROLLER, userId, filter);
  }

  override function getActivityCount(queueIds : List<String>) : int {
    var queryParams = queryParamsFor(:queueId = queueIds)
    return sendCountRequest(ACTIVITY_CONTROLLER, queryParams);
  }

  private function findActivitiesFor(startIndex : int, numEntries : int, sorting : List<IteratorBackingDataSorting>, queryParams : FederatedDataCustomParams) : List<DesktopDataDTO> {
    var pageParams = new FederatedDataPageParams(startIndex, numEntries, sorting)

    var response = ServiceClient.getEntities(ACTIVITY_CONTROLLER, queryParams, pageParams)

    return ActivityDTO.fromCollection(response.Entity)
  }

}