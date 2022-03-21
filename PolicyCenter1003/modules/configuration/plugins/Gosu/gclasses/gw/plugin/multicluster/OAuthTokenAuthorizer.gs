package gw.plugin.multicluster

uses com.fasterxml.jackson.databind.ObjectMapper
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses org.apache.http.HttpHeaders
uses org.apache.http.HttpResponse
uses org.apache.http.HttpStatus
uses org.apache.http.client.methods.HttpPost
uses org.apache.http.client.methods.HttpRequestBase
uses org.apache.http.client.utils.URIBuilder
uses org.apache.http.impl.client.CloseableHttpClient
uses org.apache.http.impl.client.HttpClients
uses org.apache.http.util.EntityUtils

uses java.net.ConnectException
uses java.util.concurrent.atomic.AtomicReference

uses DisplayKey#get(String)

/**
 * OAuth authorization helper that holds the current token if there is one.
 */
@Export
class OAuthTokenAuthorizer {

  static final var _logger = PCLoggerCategory.MULTI_CLUSTER_AUTHORIZATION

  static final var CLIENT_ID_PARAM = "client_id"
  static final var CLIENT_SECRET_PARAM = "client_secret"
  static final var GRANT_TYPE_PARAM = "grant_type"
  static final var SCOPE_PARAM = "scope"
  static final var CLIENT_CREDENTIALS = "client_credentials"
  static final var ACCESS_TOKEN = "access_token"

  static final var OBJECT_MAPPER = new ObjectMapper()

  final var _clientId : String
  final var _clientSecret : String
  final var _scope : String
  final var _tokenUri : String
  final var _currentToken = new AtomicReference<String>()

  construct(clientId : String, clientSecret : String, scope : String, tokenUri : String) {
    _clientId = clientId
    _clientSecret = clientSecret
    _scope = scope
    _tokenUri = tokenUri
  }

  /**
   * Retrieves authorization token if needed and executes request with corresponding headers.
   *
   * @param request The {@link HttpRequestBase} to execute
   * @return The response encapsulated in {@link MultiClusterResponse}
   */
  function executeAuthorizedRequest(request : HttpRequestBase) : MultiClusterResponse {
    using (var httpClient = HttpClients.createDefault()) {
      var accessToken = _currentToken.get() ?: retrieveAndUpdateToken(httpClient)
      addOAuthHeader(request, accessToken)

      using (var response = httpClient.execute(request)) {
        if (response.StatusLine.StatusCode == HttpStatus.SC_UNAUTHORIZED) {
          _logger.info("Token expired.")
          addOAuthHeader(request, retrieveAndUpdateToken(httpClient))
          using (var newResponse = httpClient.execute(request)) {
            return new MultiClusterResponse(newResponse)
          }
        }
        return new MultiClusterResponse(response)
      }

    }
  }

  private function retrieveAndUpdateToken(client : CloseableHttpClient) : String {
    _logger.info("Retrieving new OAuth token...")
    var uriBuilder = new URIBuilder(_tokenUri)
    uriBuilder.addParameter(GRANT_TYPE_PARAM, CLIENT_CREDENTIALS)
              .addParameter(CLIENT_ID_PARAM, _clientId)
              .addParameter(CLIENT_SECRET_PARAM, _clientSecret)
              .addParameter(SCOPE_PARAM, _scope)
    var post = new HttpPost(uriBuilder.build())
    post.addHeader(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded")
    try {
      using (var tokenResponse = client.execute(post)) {
        var tokenJson = EntityUtils.toString(tokenResponse.Entity)
        var node = OBJECT_MAPPER.readTree(tokenJson)
        var token = node.get(ACCESS_TOKEN).asText()
        _currentToken.set(token)
        return token
      }
    } catch (e : ConnectException) {
      throw new DisplayableException(get("Multicluster.OAuth.NoConnection"), e)
    }
  }

  private function addOAuthHeader(request : HttpRequestBase, token : String) {
    request.setHeader(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
  }

}