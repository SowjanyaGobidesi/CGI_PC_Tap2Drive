package gw.integration.document.production.smartcomms.dto

uses gw.integration.document.production.json.JSONSerializable

/**
 * Single envelope of document generated.
 */
@Export
class DocumentEnvelope extends JSONSerializable {

  /**
   * The primary document in the envelope.
   */
  var _masterChannel: DocumentObject as MasterChannel

  /**
   * The list of child documents in the envelope. See document object definition below.
   */
  var _slaveChannels: Collection<DocumentObject> as SlaveChannels
}