package gw.plugin.multicluster.multiclustersession.v1

uses gw.api.intentionallogging.IntentionalLogger
uses gw.api.system.PCLoggingMarker
uses gw.api.system.PLLoggerCategory
uses gw.plugin.multicluster.AuthClientCredentialsEnabledClientBase
uses gw.plugin.multicluster.MultiClusterResponse
uses gw.plugin.multicluster.multiclustersession.UnsavedWorkErrorMessage
uses org.apache.http.HttpStatus
uses org.apache.http.client.methods.HttpDelete
uses org.apache.http.client.methods.HttpGet
uses org.apache.http.client.methods.HttpPut
uses org.apache.http.client.methods.HttpRequestBase
uses org.apache.http.client.utils.URIBuilder
uses org.apache.http.entity.StringEntity

uses java.net.ConnectException
uses java.net.URI

uses String#format(String, Object[])
uses PCLoggingMarker#*

@Export
class UnsavedWorkServiceClient extends AuthClientCredentialsEnabledClientBase {
  public static final var CONTEXT_PATTERN : String = '/session/%s/unsaved-work'
  public static final var CLUSTER_ID_PARAM : String = 'clusterId'
  public static final var UNSAVED_WORK_KEY_PARAM : String = 'unsavedWorkKey'

  private final var _baseUrl : String
  private static final var IL = IntentionalLogger.from(PLLoggerCategory.SERVER_CLUSTER);

  construct(baseUrl : String, clientId : String, clientSecret : String, scope : String, tokenUri : String) {
    super(clientId, clientSecret, scope, tokenUri)
    _baseUrl = baseUrl
  }

  function get(sessionKey : String) : MultiClusterResponse {
    var uri = getURIBuilder(sessionKey).build()

    return doGet(uri)
  }

  function save(sessionKey : String, data : String) : MultiClusterResponse {
    var uri = getURIBuilder(sessionKey).build()
    var httpPut = new HttpPut(uri)

    var stringEntity = new StringEntity(data)
    httpPut.addHeader("content-type", "application/json")
    httpPut.setEntity(stringEntity)

    return makeCall(httpPut)
  }

  function delete(sessionKey : String) : MultiClusterResponse {
    var uri = getURIBuilder(sessionKey).build()
    var httpDelete = new HttpDelete(uri)

    return makeCall(httpDelete)
  }

  function delete(sessionKey : String, clusterId : String) : MultiClusterResponse {
    var uri = getURIBuilder(sessionKey)
        .addParameter(CLUSTER_ID_PARAM, clusterId)
        .build()
    var httpDelete = new HttpDelete(uri)

    return makeCall(httpDelete)
  }

  function delete(sessionKey : String, clusterId : String, unsavedWorkKey : String) : MultiClusterResponse {
    var uri = getURIBuilder(sessionKey)
        .addParameter(CLUSTER_ID_PARAM, clusterId)
        .addParameter(UNSAVED_WORK_KEY_PARAM, unsavedWorkKey)
        .build()
    var httpDelete = new HttpDelete(uri)

    return makeCall(httpDelete)
  }

  internal function logErrorMessage(message : String) {
    IL.logError(MULTICLUSTER_SESSION, message)
    IL.logFail(MULTICLUSTER_SESSION, message)
  }

  private function getURIBuilder(sessionKey : String) : URIBuilder {
    return new URIBuilder(_baseUrl + format(CONTEXT_PATTERN, {sessionKey}))
  }

  private function doGet(uri : URI) : MultiClusterResponse {
    return makeCall(new HttpGet(uri))
  }

  private function verifyAndLogResponse(response : MultiClusterResponse) : boolean {
    if (!response.isResponseStatus2xxOr3xx()) {
      var errorMessage = UnsavedWorkErrorMessage.from(response.Entity)
      logErrorMessage("Cannot perform HTTP operation, statusCode: " + response.StatusCode + ", message: " + errorMessage.Message)
      return false
    }
    IL.logStop(MULTICLUSTER_SESSION)
    return true
  }

  private function makeCall(httpMethod : HttpRequestBase) : MultiClusterResponse {
    try {
      IL.logStart(MULTICLUSTER_SESSION)
      setTraceabilityId(httpMethod, getOrCreateTraceabilityId())
      var multiClusterResponse = executeAuthorizedRequest(httpMethod)
      verifyAndLogResponse(multiClusterResponse)
      return multiClusterResponse
    } catch (e : ConnectException) {
      logErrorMessage(e.Message)
      return new MultiClusterResponse(HttpStatus.SC_SERVICE_UNAVAILABLE, e.Message)
    }
  }
}