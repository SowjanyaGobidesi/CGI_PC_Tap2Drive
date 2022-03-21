package gw.bizrules.provisioning

uses gw.api.util.DisplayableException
uses org.apache.commons.lang.StringUtils

/**
 * Thrown when an UW issue rule value is not formattable based on its type.
 */
@Export
class InvalidValueFormatException extends DisplayableException {
  private var _rule: UWRule as readonly Rule
  private var _value: String as readonly Value

  construct(rule: UWRule, value: String) {
    super(String.format("Underwriter rule '%s' failed to execute due to the invalid format of the issue detail value '%s'. Expected value to be of type %s.",
        {rule.Name,
            StringUtils.isEmpty(value) ? "(blank)" : value,
            rule.UWIssueType.ValueFormatterType.DisplayName}))
    _rule = rule
    _value = value
  }
}