package gw.integration.document.production.smartcomms.dto

uses javax.xml.bind.annotation.XmlRootElement

/**
 *  DTO for an exception thrown during review case creation
 */
@Export
class ReviewCaseException {
  var _className: String as ClassName
  var _classId: long as ClassId
  var _msg: String as Msg

  override public function toString(): String  {
    return "ReviewCaseException{" +
        "_className='" + _className + '\'' +
        ", _classId=" + _classId +
        ", _msg='" + _msg + '\'' +
        '}';
  }
}