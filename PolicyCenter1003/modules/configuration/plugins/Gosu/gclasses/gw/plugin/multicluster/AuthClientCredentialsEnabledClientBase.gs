package gw.plugin.multicluster

uses gw.logging.TraceabilityIDConstants
uses org.apache.http.client.methods.HttpRequestBase
uses org.slf4j.MDC

uses TraceabilityIDConstants#TRACEABILITY_ID_HEADER

@Export
class AuthClientCredentialsEnabledClientBase {

  public static final var PARAM_HOST : String = "HostUrl"
  public static final var PARAM_CLIENT_ID : String = "ClientId"
  public static final var PARAM_CLIENT_SECRET : String = "ClientSecret"
  public static final var PARAM_SCOPE : String = "Scope"
  public static final var PARAM_TOKEN_URI : String = "TokenUri"

  protected var _authorizer : OAuthTokenAuthorizer

  construct(clientId : String, clientSecret : String, scope : String, tokenUri : String) {
    _authorizer = new OAuthTokenAuthorizer(clientId, clientSecret, scope, tokenUri)
  }

  protected function executeAuthorizedRequest(request : HttpRequestBase) : MultiClusterResponse {
    return _authorizer.executeAuthorizedRequest(request)
  }

  protected function getOrCreateTraceabilityId(messageKey : String = TraceabilityIDConstants.TRACEABILITY_ID_KEY): String {
    var traceabilityId = MDC.get(messageKey)
    if (traceabilityId == null) {
      traceabilityId = UUID.randomUUID().toString()
    }
    return traceabilityId
  }

  protected function setTraceabilityId(request : HttpRequestBase, traceabilityId : String) {
    request.addHeader(TRACEABILITY_ID_HEADER, traceabilityId);
  }
}