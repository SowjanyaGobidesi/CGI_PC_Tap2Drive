package gw.integration.document.production.smartcomms.client

uses com.fasterxml.jackson.annotation.JsonAutoDetect
uses com.fasterxml.jackson.annotation.PropertyAccessor
uses com.fasterxml.jackson.databind.ObjectMapper
uses org.apache.commons.io.IOUtils
uses org.apache.http.HttpResponse
uses org.apache.http.HttpStatus
uses org.apache.http.client.HttpResponseException
uses org.apache.http.client.ResponseHandler
uses org.apache.http.util.EntityUtils
uses org.apache.log4j.Logger

uses java.lang.invoke.MethodHandles

/**
 * Reads the JSON content from {@link HttpResponse} object and
 * converts them into type T objects
 */

@Export
class SmartCommsResponseHandler<T> implements ResponseHandler<T> {

  // Anti-hijack Javascript that the SmartComms API uses to wrap JSON responses.
  static final var JSON_INJECTION = "while(1);"
  static final var LOGGER = Logger.getLogger(MethodHandles.lookup().lookupClass())

  override function handleResponse(response: HttpResponse): T {
    var statusLine = response.StatusLine
    var entity = response.Entity
    if (statusLine.StatusCode >= HttpStatus.SC_MULTIPLE_CHOICES) {
      EntityUtils.consume(entity)
      throw new HttpResponseException(statusLine.StatusCode, statusLine.ReasonPhrase)
    }
    var content =  response.Entity.Content
    if(content == null) {
      return null
    }
    var contentString = IOUtils.toString(content)
    if (LOGGER.DebugEnabled) {
      LOGGER.debug("server response '${contentString}'")
    }
    if (contentString.startsWith(JSON_INJECTION)) {
      contentString = contentString.substring(JSON_INJECTION.length)
    } else if (LOGGER.WarnEnabled) {
      LOGGER.warn("Server response does not contain anti-hijack header")
    }
    var objectMapper = new ObjectMapper()
    objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)
    // Note that this will NOT work for collection of collections like
    // List<List<ConcreteClass>>
    if (Collection.Type.isAssignableFrom(T) && T.ParameterizedType) {
      var clazz = (T.TypeParameters.first() as Type) as Class
      var collectionType = objectMapper.getTypeFactory().constructCollectionType(List, clazz)
      return objectMapper.readValue(contentString, collectionType)
    }
    if (contentString.HasContent) {
      return objectMapper.readValue(contentString, T.Type)
    }
    return null
  }
}