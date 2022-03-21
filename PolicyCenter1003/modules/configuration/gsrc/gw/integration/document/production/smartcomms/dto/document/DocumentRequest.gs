package gw.integration.document.production.smartcomms.dto.document

uses gw.integration.document.production.json.JSONSerializable

/**
 * DTO for making a create draft or create document request to SmartComms
 */
@Export
class DocumentRequest extends JSONSerializable {
  var _batchConfigResId: String as BatchConfigResId
  var _transactionData: String as TransactionData
}