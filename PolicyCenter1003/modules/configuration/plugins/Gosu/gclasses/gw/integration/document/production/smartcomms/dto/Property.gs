package gw.integration.document.production.smartcomms.dto

uses gw.integration.document.production.json.JSONSerializable

/**
 * Configuration property used both in request and responses.
 */
@Export
class Property extends JSONSerializable {
  var _name: String as Name
  var _value: String as Value
}