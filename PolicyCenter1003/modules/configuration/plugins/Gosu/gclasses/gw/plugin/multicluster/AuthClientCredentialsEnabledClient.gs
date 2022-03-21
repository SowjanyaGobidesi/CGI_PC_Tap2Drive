package gw.plugin.multicluster

uses gw.api.intentionallogging.IntentionalLogger
uses gw.api.system.PCLoggingMarker
uses gw.api.system.PLLoggerCategory
uses gw.api.util.DisplayableException
uses gw.logging.TraceabilityIDConstants
uses gw.pl.logging.LogMessageParams
uses org.apache.http.HttpHeaders
uses org.apache.http.NameValuePair
uses org.apache.http.client.methods.HttpDelete
uses org.apache.http.client.methods.HttpEntityEnclosingRequestBase
uses org.apache.http.client.methods.HttpGet
uses org.apache.http.client.methods.HttpPost
uses org.apache.http.client.methods.HttpPut
uses org.apache.http.client.methods.HttpRequestBase
uses org.apache.http.client.utils.URIBuilder
uses org.apache.http.entity.StringEntity
uses org.slf4j.Marker

uses java.net.ConnectException
uses java.net.URI

uses PCLoggingMarker#MULTICLUSTER_OAUTH_CLIENT_CALL
uses PCLoggingMarker#MULTICLUSTER_OAUTH_CLIENT_CREATE
uses PCLoggingMarker#MULTICLUSTER_OAUTH_CLIENT_UPDATE
uses PCLoggingMarker#MULTICLUSTER_OAUTH_CLIENT_DELETE
uses PCLoggingMarker#MULTICLUSTER_OAUTH_CLIENT_GET


/**
 * OAuth enabled client that offers basic REST operations.
 */
@Export
abstract class AuthClientCredentialsEnabledClient extends AuthClientCredentialsEnabledClientBase {
  private static final var IL = IntentionalLogger.from(PLLoggerCategory.SERVER_CLUSTER);
  public static final var MESSAGE_TRACEABILITY_ID_KEY: String = 'messageTraceabilityId'

  protected final var _baseUrl : String

  construct(baseUrl : String, clientId : String, clientSecret : String, scope : String, tokenUri : String) {
    super(clientId, clientSecret, scope, tokenUri)
    _baseUrl = baseUrl
  }

  protected function getEntityUriBuilder(baseControllerPart : String, additionalControllerPathElements : String = null) : URIBuilder {
    var additionalUriPart = additionalControllerPathElements == null ? "" : "/${additionalControllerPathElements}"
    return new URIBuilder("${_baseUrl}/${baseControllerPart}${additionalUriPart}")
  }

  /**
   * Create an entity ({@link HttpPost}).
   *
   * @param controller The controller URL
   * @param data The data to send
   * @return The {@link MultiClusterResponse}
   */
  function createEntity(controller : String, data : String) : MultiClusterResponse {
    IL.logStart(MULTICLUSTER_OAUTH_CLIENT_CREATE, '', getLogParams(controller))
    var uri = getEntityUriBuilder(controller).build()
    var httpPost = new HttpPost(uri)
    var response = handleEntity(httpPost, data)
    IL.logStop(MULTICLUSTER_OAUTH_CLIENT_CREATE)
    return response
  }

  /**
   * Update an entity ({@link HttpPut}).
   *
   * @param controller The controller URL
   * @param entityId The id of the entity to update
   * @param data The data to send
   * @return The {@link MultiClusterResponse}
   */
  function updateEntity(controller : String, entityId : String, data : String) : MultiClusterResponse {
    IL.logStart(MULTICLUSTER_OAUTH_CLIENT_UPDATE, '', getLogParams(controller, entityId))
    var uri = getEntityUriBuilder(controller, entityId).build()
    var httpPut = new HttpPut(uri)
    var response = handleEntity(httpPut, data)
    IL.logStop(MULTICLUSTER_OAUTH_CLIENT_UPDATE)
    return response
  }

  /**
   * Delete an entity ({@link HttpDelete}).
   *
   * @param controller The controller URL
   * @param entityId The id of the entity to delete
   * @return The {@link MultiClusterResponse}
   */
  function deleteEntity(controller : String, entityId : String, parameters: List<NameValuePair> = null) : MultiClusterResponse {
    IL.logStart(MULTICLUSTER_OAUTH_CLIENT_DELETE, '', getLogParams(controller, entityId))
    var entityUriBuilder = getEntityUriBuilder(controller, entityId)
    if (parameters != null) {
      entityUriBuilder.setParameters(parameters)
    }
    var uri = entityUriBuilder.build()
    var httpDelete = new HttpDelete(uri)
    var multiClusterResponse = makeCall(httpDelete, MESSAGE_TRACEABILITY_ID_KEY)
    IL.logStop(MULTICLUSTER_OAUTH_CLIENT_DELETE)
    return multiClusterResponse
  }

  protected function doGet(uri : URI) : MultiClusterResponse {
    IL.logStart(MULTICLUSTER_OAUTH_CLIENT_GET, '', getLogParams(uri.Path))
    var httpGet = new HttpGet(uri)
    var response = makeCall(httpGet)
    if (response.Entity == null) {
      logMessageProcessingFailure(MULTICLUSTER_OAUTH_CLIENT_GET, EmptyResponseMessage, EmptyResponseMessage)
      throw new DisplayableException(EmptyResponseMessage)
    }
    IL.logStop(MULTICLUSTER_OAUTH_CLIENT_GET)
    return response
  }

  protected function makeCall(request : HttpRequestBase, traceabilityIdKey: String = TraceabilityIDConstants.TRACEABILITY_ID_KEY) : MultiClusterResponse {
    IL.logStart(MULTICLUSTER_OAUTH_CLIENT_CALL)
    setTraceabilityId(request, getOrCreateTraceabilityId(traceabilityIdKey))
    try {
      var response = executeAuthorizedRequest(request)
      checkResponseStatus(response, request)
      IL.logStop(MULTICLUSTER_OAUTH_CLIENT_CALL)
      return response
    } catch (e : ConnectException) {
      logMessageProcessingFailure(MULTICLUSTER_OAUTH_CLIENT_CALL, NoConnectionMessage, NoConnectionMessage)
      throw new DisplayableException(NoConnectionMessage, e)
    }
  }

  protected function sendCustomEntity(request : HttpEntityEnclosingRequestBase, data : String) : MultiClusterResponse {
    var stringEntity = new StringEntity(data)
    request.addHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    request.setEntity(stringEntity)
    return makeCall(request)
  }

  private function checkResponseStatus(response : MultiClusterResponse, request : HttpRequestBase) {
    if (!response.isResponseStatus2xxOr3xx()) {
      if (request typeis HttpGet) {
        logMessageProcessingFailure(MULTICLUSTER_OAUTH_CLIENT_CALL, response.StatusCode.toString(), response.ErrorMessage)
        throw new DisplayableException(getNotOkMessage(response.StatusCode.toString(), response.ErrorMessage))
      }
      logMessageProcessingFailure(MULTICLUSTER_OAUTH_CLIENT_CALL, response.StatusCode.toString(), response.ErrorMessage)
      throw new MultiClusterHttpResponseException(response.StatusCode, response.ErrorMessage)
    }
  }

  private function getLogParams(controller : String, entityId : String) : LogMessageParams {
    var logMessageParams = getLogParams(controller)
    logMessageParams.put('entityId', entityId)
    return logMessageParams
  }

  private function getLogParams(controller : String) : LogMessageParams {
    var logMessageParams = LogMessageParams.create()
    logMessageParams.put('controller', controller)
    return logMessageParams
  }

  private function logMessageProcessingFailure(marker: Marker, errorMessage : String, failMessage : String) {
    IL.logError(marker, errorMessage)
    IL.logFail(marker, failMessage)
  }

  private function handleEntity(request : HttpEntityEnclosingRequestBase, data : String) : MultiClusterResponse {
    var stringEntity = new StringEntity(data)
    request.addHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    request.setEntity(stringEntity)
    return makeCall(request, MESSAGE_TRACEABILITY_ID_KEY)
  }

  protected abstract property get EmptyResponseMessage() : String
  protected abstract property get NoConnectionMessage() : String
  protected abstract function getNotOkMessage(code : String, message : String) : String
}