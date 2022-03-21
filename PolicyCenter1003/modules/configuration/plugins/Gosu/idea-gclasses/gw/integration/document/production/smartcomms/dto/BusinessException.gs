package gw.integration.document.production.smartcomms.dto

uses gw.integration.document.production.json.JSONSerializable

/**
 * User-defined business exception
 */
@Export
class BusinessException extends JSONSerializable {
  var _className: String as ClassName
  var _classId: Long as ClassId
  var _id: Long as Id
  var _msg: String as Msg

  override public function toString(): String {
    return "BusinessException{" +
        "_className='" + _className + '\'' +
        ", _classId=" + _classId +
        ", _id=" + _id +
        ", _msg='" + _msg + '\'' +
        '}';
  }
}