package gw.plugin.multicluster

uses org.apache.http.HttpResponse
uses org.apache.http.HttpStatus
uses org.apache.http.util.EntityUtils

@Export
class MultiClusterResponse {

  final var _statusCode : Integer as readonly StatusCode
  final var _reasonPhrase : String as readonly ReasonPhrase
  final var _entity : String as readonly Entity

  construct(httpResponse : HttpResponse) {
    _statusCode = httpResponse.StatusLine.StatusCode
    _reasonPhrase = httpResponse.StatusLine.ReasonPhrase
    _entity = httpResponse.Entity == null ? null : EntityUtils.toString(httpResponse.Entity)
  }

  construct(statusCode : Integer, reason : String) {
    this(statusCode, reason, null)
  }

  construct(statusCode : Integer, reason : String, entity : String) {
    _statusCode = statusCode
    _reasonPhrase = reason
    _entity = entity
  }

  public property get ErrorMessage() : String {
    if (!isResponseStatus2xxOr3xx()) {
      return MultiClusterErrorMessage.from(_entity).map(\error -> error.Message).orElse(_reasonPhrase)
    }
    return null
  }

  public function isResponseStatus2xxOr3xx() : boolean {
    return StatusCode < HttpStatus.SC_BAD_REQUEST && StatusCode >= HttpStatus.SC_OK
  }

}