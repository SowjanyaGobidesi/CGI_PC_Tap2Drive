package gw.integration.document.production.smartcomms.dto

uses gw.integration.document.production.json.JSONSerializable

/**
 * Note that it contains more than API doc states.
 */
@Export
class JobReportMessage extends JSONSerializable {
  var _batchId: int as BatchID
  var _transactionNo: int as TransactionNo
  var _packageId: int as PackageID
  var _docID: int as DocID
  var _channelID: int as ChannelID
  var _destID: int as DestID
  var _msgID: int as MsgID
  var _msgType: String as MsgType
  var _msgText: String as MsgText
  var _msgDate: String as MsgDate
  var _args: String[] as Args

  override public function toString(): String {
    return "JobReportMessage{" +
        "_msgType='" + _msgType + '\'' +
        ", _msgText='" + _msgText + '\'' +
        ", _msgDate='" + _msgDate + '\'' +
        '}'
  }
}