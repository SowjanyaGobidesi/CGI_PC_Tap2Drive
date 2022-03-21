package gw.integration.document.production.smartcomms.client

uses gw.integration.document.production.client.RestClientConfig
uses gw.integration.document.production.exception.DocumentProductionErrorInfo
uses gw.integration.document.production.json.JSONSerializable
uses gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider
uses gw.integration.document.production.smartcomms.exception.SmartCommsException
uses oauth.signpost.commonshttp.CommonsHttpOAuthConsumer
uses org.apache.commons.io.output.ByteArrayOutputStream
uses org.apache.http.HttpHeaders
uses org.apache.http.NameValuePair
uses org.apache.http.client.HttpClient
uses org.apache.http.client.HttpResponseException
uses org.apache.http.client.ResponseHandler
uses org.apache.http.client.methods.HttpUriRequest
uses org.apache.http.client.methods.RequestBuilder
uses org.apache.http.entity.ContentType
uses org.apache.http.entity.StringEntity
uses org.apache.http.impl.client.HttpClientBuilder
uses org.apache.log4j.Logger

uses javax.xml.ws.http.HTTPException
uses java.lang.invoke.MethodHandles

/**
 * Custom HttpClient for interacting with Smart Communications Rest APIs.
 */

@Export
class SmartCommsRestClient {
  var _client: HttpClient
  var _config: RestClientConfig
  static final var LOGGER = Logger.getLogger(MethodHandles.lookup().lookupClass())

  construct(config: RestClientConfig) {
    _config = config
    _client = HttpClientBuilder
        .create()
        .setMaxConnTotal(config.MaxTotalConns)
        .setMaxConnPerRoute(config.MaxConnPerRoute)
        .build()
  }

  /**
   * Executes a http request and process the response handler
   *
   * @param request HttpUriRequest object
   * @param <T>    The return type of the ResponseHandler
   * @return  ResponseHandler of type T
   * @throws SmartCommsException if any exception while processing the request
   */
  private function execute<T>(request: HttpUriRequest, responseHandler: ResponseHandler<T>): T {
    try {
      sign(request)
      return _client.execute(request, responseHandler)
    } catch (ex: HTTPException) {
      throw new SmartCommsException(new DocumentProductionErrorInfo(ex.StatusCode, ex.Message), ex)
    } catch (ex: HttpResponseException) {
      throw new SmartCommsException(new DocumentProductionErrorInfo(ex.StatusCode, ex.Message), ex)
    }
  }

  private function sign(request: HttpUriRequest) {
    var config = SmartCommsConfigurationProvider.Configuration
    var consumer = new CommonsHttpOAuthConsumer(
        config.ConsumerKey + "!" + config.Username,
        config.ConsumerSecret)
    consumer.sign(request)
  }

  /**
   * GET request
   * @param uri
   * @param parameters
   * @return raw response
   */
  function get(uri: String, parameters: NameValuePair[]): byte[] {
    try {
      var request = RequestBuilder
          .get()
          .setUri(uri)
          .addParameters(parameters)
          .setConfig(_config.RequestConfig)
          .build()
      sign(request)
      var output = new ByteArrayOutputStream();
      _client.execute(request).getEntity().writeTo(output)
      return output.toByteArray()
    } catch (ex: HTTPException) {
      throw new SmartCommsException(new DocumentProductionErrorInfo(ex.StatusCode, ex.Message), ex)
    } catch (ex: HttpResponseException) {
      throw new SmartCommsException(new DocumentProductionErrorInfo(ex.StatusCode, ex.Message), ex)
    }
  }

  /**
   * For post requests that doesn't receive a response body
   */
  reified function post<T>(json: JSONSerializable, uri: String, parameters: NameValuePair[]): T {
    return post(json, uri, parameters, null)
  }

  reified function post<T>(json: JSONSerializable, uri: String, parameters: NameValuePair[], responseType: Class<T>): T {
    if (LOGGER.DebugEnabled) {
      LOGGER.debug(json.writeAsJSONString())
    }
    var requestEntity = new StringEntity(json.writeAsJSONString())
    requestEntity.setContentType(ContentType.APPLICATION_JSON.MimeType)
    var request = RequestBuilder
        .post()
        .setUri(uri)
        .setConfig(_config.RequestConfig)
        .setEntity(requestEntity)
        .setHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.MimeType)
        .setHeader(HttpHeaders.ACCEPT, ContentType.APPLICATION_JSON.MimeType)
        .addParameters(parameters)
        .build()
    sign(request)
    return execute(request, new SmartCommsResponseHandler<T>())
  }

  internal function getConfigForTest(): RestClientConfig {
    return _config
  }

  internal function setHttpClientForTest(client: HttpClient) {
    _client = client
  }
}
