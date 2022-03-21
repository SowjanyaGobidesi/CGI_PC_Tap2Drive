package gw.plugin.multicluster

uses com.fasterxml.jackson.core.JsonParseException
uses com.fasterxml.jackson.databind.ObjectMapper
uses gw.api.system.PCLoggerCategory
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class MultiClusterErrorMessage implements JacksonEnabledSerializable {
  private static final var logger = PCLoggerCategory.RESOLVER_PLUGIN
  static final var _reader = new ObjectMapper().readerFor(MultiClusterErrorMessage)

  var _message : String as Message
  var _resourceId : String as ResourceId

  static function from(json : String) : Optional<MultiClusterErrorMessage> {
    if (json != null) {
      try {
        return Optional.of(_reader.readValue(json))
      } catch (e : Exception) {
        logger.warn("Cannot parse json error message: ${json}", e)
      }
    }
    return Optional.empty()
  }

}