package gw.integration.document.production.smartcomms.dto.search

uses gw.integration.document.production.json.JSONSerializable

/**
 * DTO for making a query template request
 */

@Export
class DocumentTemplateQueryRequest extends JSONSerializable {
  var _dataModelResId: Long as DataModelResId
  var _dataModelResVerId: Long as DataModelResVerId
  var _effectiveDate: Long as EffectiveDate
  var _resourceName: String as ResourceName
  var _keywords: Collection<String> as Keywords
}