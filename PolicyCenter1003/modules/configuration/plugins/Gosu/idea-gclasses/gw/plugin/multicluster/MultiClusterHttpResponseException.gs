package gw.plugin.multicluster

@Export
class MultiClusterHttpResponseException extends RuntimeException {
  private static final var MESSAGE_PATTERN = 'status code: %d, reason: %s'

  final var _statusCode : Integer as readonly StatusCode
  final var _reason : String as readonly Reason

  construct(statusCode : Integer, reason : String) {
    super(String.format(MESSAGE_PATTERN, {statusCode, reason}))
    _statusCode = statusCode
    _reason = reason
  }

}