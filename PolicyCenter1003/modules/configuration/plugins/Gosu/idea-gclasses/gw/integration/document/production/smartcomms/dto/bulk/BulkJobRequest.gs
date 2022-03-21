package gw.integration.document.production.smartcomms.dto.bulk

uses gw.integration.document.production.json.JSONSerializable

/**
 * DTO to make the request for bulk document process
 */
@Export
class BulkJobRequest extends JSONSerializable {
  var _queue: String as Queue
  var _type: String as Type
  var _input: String as Input
  var _config: String as Config
  var _name: String as Name
  var _project: String as Project
}