package gw.integration.document.production.smartcomms.dto

uses gw.integration.document.production.json.JSONSerializable

@Export
class DocumentObject extends JSONSerializable {
  var _channelId: String as ChannelId

  /**
   * Reference to the document part for retrieval via the cachedItems method.
   * This is not used when includeDocumentData is set to true in the request.
   */
  var _partLocation: String as PartLocation

  /**
   * Content type.
   */
  var _mimeType: String as MimeType

  /**
   * Document data encoded as Base64.
   * Only populated when includeDocumentData is set to true in the request.
   */
  var _data: String as Data

  /**
   * User defined keys associated with this document.
   * Note: documentation says this is a list but it isn't.
   */
  var _userKeys: Map<String, String> as UserKeys

  var _documentName: String as DocumentName

  /**
   * User defined properties associated with this document
   */
  var _properties: Collection<Property> as Properties
}