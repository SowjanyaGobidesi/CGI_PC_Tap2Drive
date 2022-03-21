package gw.api.builder

uses gw.api.databuilder.DataBuilder

@Export
class AppCritJurisdictionBuilder extends DataBuilder<AppCritJurisdiction, AppCritJurisdictionBuilder> {

  construct() {
    super(AppCritJurisdiction)
  }

  function withJurisdiction(jurisdiction: Jurisdiction): AppCritJurisdictionBuilder {
    set(AppCritJurisdiction#Jurisdiction, jurisdiction)
    return this
  }

  function withUWRule(rule: UWRule): AppCritJurisdictionBuilder {
    set(AppCritJurisdiction#UWRule, rule)
    return this
  }
}