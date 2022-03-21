package gw.lob.cpp.ui

uses gw.api.productmodel.PolicyLinePattern

@Export
class CPPLineSelectionCheckboxWrapper {

  private var _policyLinePattern : PolicyLinePattern
  private var _period : PolicyPeriod
  private var _checkBoxValue : boolean

  construct(pattern : PolicyLinePattern, period : PolicyPeriod){
    _policyLinePattern = pattern
    _period = period
    _checkBoxValue = _period.getLineExists(pattern)
  }

  property get Value() : boolean {
    return _checkBoxValue
  }

  property set Value(shouldCreateLine : boolean) {
    CPPLineSelectionScreenHelper.createOrRemoveLine(_period, _policyLinePattern, shouldCreateLine)
    _checkBoxValue = _period.getLineExists(_policyLinePattern)
  }
}