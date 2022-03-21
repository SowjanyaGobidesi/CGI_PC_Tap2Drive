package gw.integration.document.production.smartcomms.dto.draft

uses gw.integration.document.production.json.JSONSerializable
uses gw.integration.document.production.smartcomms.dto.JobReportMessage
uses gw.integration.document.production.smartcomms.dto.ReviewCaseException

/**
 * DTO for response from a Create Draft call
 */
@Export
class DraftResponse extends JSONSerializable {
  var _jobMessages: Collection<JobReportMessage> as JobMessages
  var _numberTransactions: Integer as NumberTransactions
  var _previewKey: String as PreviewKey
  var _reviewCaseExceptions: Collection<ReviewCaseException> as ReviewCaseExceptions
  var _reviewCaseLocation: String as ReviewCaseLocation
}