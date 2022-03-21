package gw.plugin.multicluster.multiclustersession

uses com.fasterxml.jackson.core.type.TypeReference
uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class UnsavedWorkDTO implements JacksonEnabledSerializable {
  var _clusterId : String as ClusterId
  var _key : String as Key
  var _title : String as Title
  var _timestamp : long as Timestamp
  var _groupKey : String as GroupKey
  var _groupTitle : String as GroupTitle

  construct() {

  }

  construct(clusterId : String, key : String, title : String, timestamp : long, groupKey : String, groupTitle : String) {
    this._clusterId = clusterId
    this._key = key
    this._title = title
    this._timestamp = timestamp
    this._groupKey = groupKey
    this._groupTitle = groupTitle
  }

  static function from(json : String) : UnsavedWorkDTO {
    return DesktopDTOSerializationHelper.Mapper.readValue(json, UnsavedWorkDTO)
  }

  static function fromCollection(jsonCollection : String) : List<UnsavedWorkDTO> {
    return DesktopDTOSerializationHelper.Mapper.readValue(jsonCollection, new TypeReference<List<UnsavedWorkDTO>>() {
    })
  }

  function writeAsJSONString() : String {
    return DesktopDTOSerializationHelper.Mapper.writeValueAsString(this)
  }
}