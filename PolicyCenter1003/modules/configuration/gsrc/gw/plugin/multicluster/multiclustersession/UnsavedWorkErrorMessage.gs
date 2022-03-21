package gw.plugin.multicluster.multiclustersession

uses com.fasterxml.jackson.core.JsonParseException
uses com.fasterxml.jackson.databind.ObjectMapper
uses gw.api.intentionallogging.IntentionalLogger
uses gw.api.system.PCLoggerCategory
uses gw.api.system.PCLoggingMarker
uses gw.api.system.PLLoggerCategory
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class UnsavedWorkErrorMessage implements JacksonEnabledSerializable {
  private static final var IL = IntentionalLogger.from(PLLoggerCategory.SERVER_CLUSTER);
  static final var _reader = new ObjectMapper().readerFor(UnsavedWorkErrorMessage)

  var _errorType : String as ErrorType
  var _message : String as Message
  var _fieldErrors : List<FieldError> as FieldErrors = {}

  static function from(json : String) : UnsavedWorkErrorMessage {
    try {
      return _reader.readValue(json)
    } catch (e : JsonParseException) {
      IL.logError(PCLoggingMarker.MULTICLUSTER_SESSION, "Cannot parse json error message: ${json}")
      return new UnsavedWorkErrorMessage()
    }
  }

  static class FieldError {
    var _field : String as Field
    var _errorMessage : String as ErrorMessage
  }
}