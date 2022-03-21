package gw.integration.document.production.smartcomms.dto

uses gw.integration.document.production.json.JSONSerializable

/**
 * Response DTO for 'Generate Document', 'Finalize Draft' requests.
 */
@Export
class GenerateDocumentResponse extends JSONSerializable {

  /**
   * The number of transactions encountered in the job.
   */
  var _numberTransactions: Integer as NumberTransactions

  /**
   * The reference to the data model values part.
   */
  var _dataModelValuesLocation: String as DataModelValuesLocation

  /**
   * This key is used to retrieve document parts.
   * This is not used when includeDocumentData is set to `true` in the request.
   */
  var _previewKey: String as PreviewKey

  /**
   * List of document envelopes generated.
   */
  var _envelopes: Collection<DocumentEnvelope> as Envelopes

  /**
   * List of user-defined business exceptions in the document.
   */
  var _exceptions: Collection<BusinessException> as Exceptions

  /**
   * List of messages that occurred while executing the job.
   */
  var _jobMessages: Collection<JobReportMessage> as JobMessages
}