package gw.api.web.desktop.data.queue

uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.FederatedDataIteratorBackingData
uses gw.api.web.desktop.data.activity.ActivityDTO

uses Collections#emptyList()

@Export
class QueueActivityFederatedData extends FederatedDataIteratorBackingData<ActivityDTO> {

  private final var _queueIds : List<String>

  construct(queues : AssignableQueue[]) {
    _queueIds = queues.map(\q -> q.PublicID).toList()
  }

  override function getEntries(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<ActivityDTO> {
    return FilteredQueues.isEmpty() ? emptyList() : findActivitiesInRemoteService(startIndex, numEntries, sortings)
  }

  private function findActivitiesInRemoteService(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<ActivityDTO> {
    return Plugin.findActivities(FilteredQueues, startIndex, numEntries, sortings) as List<ActivityDTO>;
  }

  override protected property get EntryCount() : int {
    return FilteredQueues.isEmpty() ? 0 : countActivitiesInRemoteService()
  }

  private function countActivitiesInRemoteService() : int {
    return Plugin.getActivityCount(FilteredQueues)
  }

  private property get FilteredQueues() : List<String> {
    if (QueueDataFilters.all().Code == Filter.Code) {
      return _queueIds
    }
    return _queueIds.where(\queueId -> queueId == Filter.QueueId)
  }

  protected property get Filter() : QueueDataFilters.QueueFederatedDataFilter {
    return super.Filter as QueueDataFilters.QueueFederatedDataFilter
  }

}