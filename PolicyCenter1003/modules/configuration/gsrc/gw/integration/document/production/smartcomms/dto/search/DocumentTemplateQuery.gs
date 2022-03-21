package gw.integration.document.production.smartcomms.dto.search

uses gw.integration.document.production.json.JSONSerializable
uses gw.plugin.document.production.dto.DocumentTemplate

/**
 * DTO for Query items returned from SmartComms.
 * They will be returned as a response to a DocumentTemplateQueryRequest
 */

@Export
class DocumentTemplateQuery extends JSONSerializable {

  public static final var DOC_TYPE_REVIEWCASE: String = "application/reviewcase"
  public static final var DOC_SCOPE_ALL: String = "all"

  var _resourceId: long as ResourceId
  var _effectiveDateFrom: long as EffectiveDateFrom
  var _effectiveDateTo: long as EffectiveDateTo
  var _resourceName: String as ResourceName
  var _resourceType: String as ResourceType
  var _fullPath: String as FullPath
  var _folderId: String as FolderId

  public function toDocumentTemplate(): DocumentTemplate {
    return new DocumentTemplate(){
        :TemplateID = ResourceId as String,
        :Name = ResourceName,
        :Keywords = {},
        :ProductionType = DOC_TYPE_REVIEWCASE,
        :MimeType = DOC_TYPE_REVIEWCASE,
        :Scope = DOC_SCOPE_ALL
        }
  }
}