package gw.integration.document.production.smartcomms.exception

uses gw.integration.document.production.exception.DocumentProductionErrorInfo

/**
 * Implementation of Exception that is specific to the HttpResponseException of HTTPClient. This wraps any error messages
 * returned from the Smart Communication APIs.
 */

@Export
class SmartCommsException extends Exception {
  var _apiDocumentProductionErrorInfo: DocumentProductionErrorInfo as APIErrorInfo

  construct(){}

  construct(apiDocumentProductionErrorInfo: DocumentProductionErrorInfo, cause: Throwable){
    super("Error ID: ${apiDocumentProductionErrorInfo.Id}, Message: ${apiDocumentProductionErrorInfo.Message}", cause)
    _apiDocumentProductionErrorInfo = apiDocumentProductionErrorInfo
  }

  construct(cause: Throwable){
    super(cause)
  }

  construct(message: String){
    super(message)
  }
}