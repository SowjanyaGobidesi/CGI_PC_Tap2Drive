package gw.api.web.desktop.data.queue

uses gw.api.locale.DisplayKey
uses gw.api.web.desktop.data.filter.FederatedDataFilter

@Export
class QueueDataFilters {

  static function all() : FederatedDataFilter {
    return new QueueFederatedDataFilter(DisplayKey.get("Web.DesktopAssignableQueues.Filter.All"), "ALL")
  }

  var _filters : List<QueueFederatedDataFilter>as readonly Filters

  construct(queues : AssignableQueue[]) {
    _filters = queues?.map(\elt -> getFilterForQueue(elt))?.toList() ?: {}
  }

  function getFilterForQueue(queue : AssignableQueue) : QueueFederatedDataFilter {
    var queueName = queue.Name
    if (queue.Group != null) {
      queueName += " - " + queue.Group.Name
    }
    return new QueueFederatedDataFilter(queueName, queueName, queue.PublicID);
  }

  public static class QueueFederatedDataFilter extends FederatedDataFilter {
    var _queueId : String as QueueId

    construct(label : String, code : String) {
      super(label, code)
    }

    construct(label : String, code : String, queueId : String) {
      super(label, code)
      _queueId = queueId
    }
  }

}
