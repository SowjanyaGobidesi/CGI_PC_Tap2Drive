package gw.integration.document.production.smartcomms.dto.draft

uses gw.integration.document.production.json.JSONSerializable
uses gw.integration.document.production.smartcomms.dto.Property

/**
 * DTO for 'Finalize Draft' request.
 */
@Export
class FinalizeDraftRequest extends JSONSerializable {

  /**
   * The CMS Project scope that the job will execute in.
   * If this value is not specified then the job will execute in
   * production mode.
   */
  var _projectId: String as ProjectId

  /**
   * The draft document (review case) XML data.
   * The data is encoded as Base64.
   */
  var _reviewCaseData: String as ReviewCaseData

  /**
   * The final format of the draft document.
   */
  var _printFormat: Integer as PrintFormat

  /**
   * Optional configuration properties.
   */
  var _properties: Collection<Property> as Properties
}