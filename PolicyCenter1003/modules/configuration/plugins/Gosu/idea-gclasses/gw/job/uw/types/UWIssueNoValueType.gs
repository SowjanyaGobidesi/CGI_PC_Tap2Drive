package gw.job.uw.types

uses gw.api.locale.DisplayKey
uses gw.job.uw.UWIssueValueType
uses java.lang.IllegalArgumentException

@Export
class UWIssueNoValueType implements UWIssueValueType {
  override function deserialize(value : String) : Object {
    if (value == null) {
      return null
    }
    throw new IllegalArgumentException(DisplayKey.get("UWIssue.NoValueType.ExpectNullValue"))
  }
  
  override function serialize(value : Object) : String {
    if (value == null) {
      return null
    }
    throw new IllegalArgumentException(DisplayKey.get("UWIssue.NoValueType.ExpectNullValue"))
  }

  override function validate(value : String) : String {
    if (value == null) {
      return null
    }
    return DisplayKey.get("UWIssue.NoValueType.ValueShouldBeNull", value)
  }
}
