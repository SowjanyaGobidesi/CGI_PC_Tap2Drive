package gw.api.builder

uses gw.api.databuilder.DataBuilder
uses typekey.*

@Export
class AppCritLineOfBusinessBuilder extends DataBuilder<AppCritLineOfBusiness, AppCritLineOfBusinessBuilder> {

  construct() {
    super(AppCritLineOfBusiness)
  }

  function withPolicyLine(line: typekey.PolicyLine): AppCritLineOfBusinessBuilder {
    set(AppCritLineOfBusiness#PolicyLine, line)
    return this
  }

  function withUWRule(rule: UWRule): AppCritLineOfBusinessBuilder {
    set(AppCritLineOfBusiness#UWRule, rule)
    return this
  }
}