package gw.job.uw.types

uses gw.api.locale.DisplayKey
uses gw.job.uw.UWIssueValueType
uses java.math.BigDecimal
uses java.lang.NumberFormatException
uses java.lang.NullPointerException
uses java.lang.RuntimeException
uses gw.api.util.PCNumberFormatUtil

@Export
class UWIssueBigDecimalType implements UWIssueValueType {
  override function deserialize(value : String) : BigDecimal {
    return value == null ? null : new BigDecimal(value)  
  }
  
  override function serialize(obj : Object) : String {
    var value = obj as BigDecimal
    return value == null ? null : value.toString()  
  }

  override function validate(value : String) : String {
    if (value == null) {
      return DisplayKey.get("UWIssue.BigDecimalType.InvalidDecimal")
    }
    try {
      var bdValue = PCNumberFormatUtil.parse(value)
      return null 
    } catch (e : NumberFormatException) {
      return DisplayKey.get("UWIssue.BigDecimalType.InvalidDecimalValue", value)
    } catch (e: NullPointerException) {
      return DisplayKey.get("UWIssue.BigDecimalType.InvalidDecimal")
    } catch (e: RuntimeException) {
      return DisplayKey.get("UWIssue.BigDecimalType.InvalidDecimalValue", value)
    }
  }
}
