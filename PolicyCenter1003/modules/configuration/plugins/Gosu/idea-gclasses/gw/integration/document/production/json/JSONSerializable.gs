package gw.integration.document.production.json

uses com.fasterxml.jackson.databind.ObjectMapper
uses gw.riskassessment.JacksonEnabledSerializable

/**
 * Base for Serializing Gosu class values into JSON String
 */
@Export
abstract class JSONSerializable implements JacksonEnabledSerializable{

  static final var _mapper = new ObjectMapper()

  /**
   * Serialize any Gosu value as String
   * @return JSON string
   */
  public function writeAsJSONString() : String {
    return _mapper.writeValueAsString(this)
  }
}