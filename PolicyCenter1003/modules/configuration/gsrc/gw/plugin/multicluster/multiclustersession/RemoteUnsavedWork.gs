package gw.plugin.multicluster.multiclustersession

uses gw.plugin.web.multicluster.IRemoteUnsavedWork

@Export
class RemoteUnsavedWork implements IRemoteUnsavedWork {
  final var _clusterId : String as readonly ClusterId
  final var _globalKey : String as readonly GlobalKey
  final var _title : String as readonly Title
  final var _timeStamp : long as readonly TimeStamp
  final var _globalGroupKey : String as readonly GlobalGroupKey
  final var _groupTitle : String as readonly GroupTitle

  construct(clusterId : String, globalKey : String, title : String, timeStamp : long, globalGroupKey : String, groupTitle : String) {
    this._clusterId = clusterId
    this._globalKey = globalKey
    this._title = title
    this._timeStamp = timeStamp
    this._globalGroupKey = globalGroupKey
    this._groupTitle = groupTitle
  }

  static function from(unsavedWorkDto : UnsavedWorkDTO) : RemoteUnsavedWork {
    return new RemoteUnsavedWork(
        unsavedWorkDto.ClusterId,
        unsavedWorkDto.Key,
        unsavedWorkDto.Title,
        unsavedWorkDto.Timestamp,
        unsavedWorkDto.GroupKey,
        unsavedWorkDto.GroupTitle)
  }
}