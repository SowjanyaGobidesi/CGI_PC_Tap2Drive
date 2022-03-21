package gw.bizrules

uses gw.api.util.DisplayableException
uses gw.bizrules.pcf.DefaultBizRulesPageNavigationSupport
uses gw.bizrules.pcf.RuleExportImportPageHelper
uses gw.pc.bizrules.PCBizRulesVersionController
uses gw.pc.bizrules.UWRulesUtil
uses pcf.CreateLookup
uses pcf.CreateUWRule
uses pcf.UWRuleComparisonPopup
uses pcf.UWRuleEditPopup
uses pcf.PCBizRulesExportImportStatus
uses pcf.UWRulePopup
uses pcf.UWRules

@Export
class PCBizRulesNavigationSupport extends DefaultBizRulesPageNavigationSupport {

  static final var _instance = new PCBizRulesNavigationSupport()

  static var VALIDATION_INFO_MODE_UWRULE = "uwrule"
  static var EXECUTION_INFO_MODE_UWRULE = "uwrule"

  private construct() {
  }

  static property get Instance(): PCBizRulesNavigationSupport {
    return _instance
  }

  override property get VersionController(): PCBizRulesVersionController {
    return UWRulesUtil.VersionController
  }

  override function pushRuleVersionDetailsPopup(version: RuleVersion, importing: boolean) {
    UWRulePopup.push(version, importing)
  }

  override function pushRuleComparisonPopup(
      importEntry: RuleImportTaskEntry, importHelper: RuleExportImportPageHelper) {
    if (importEntry.ImportedVersion.Rule typeis UWRule) {
      UWRuleComparisonPopup.push(importEntry, importHelper as RuleExportImportPageHelper)
    } else {
      throw new DisplayableException(String.format("Version comparison for imported rule type: %s is not supported",
          {importEntry.ImportedVersion.IntrinsicType.Name}))
    }
  }

  override function pushRuleComparisonEditPopup(
      importEntry: RuleImportTaskEntry, importHelper: RuleExportImportPageHelper, chosenSide: RuleImportSide) {
    if (importEntry.ImportedVersion.Rule typeis UWRule) {
      UWRuleEditPopup.push(importEntry, importHelper, chosenSide)
    } else {
      throw new DisplayableException(
          String.format("Version comparison for imported rule type: %s is not supported",
                  {importEntry.ImportedVersion.IntrinsicType.Name})
      )
    }
  }

  override function goToCreateRulePage() {
    CreateUWRule.push()
  }

  override function goToCreateRulePage(ruleTypeKey: typekey.Rule) {
    switch(ruleTypeKey) {
      case typekey.Rule.TC_UWRULE:
        CreateUWRule.push()
        break
      default:
        throw new DisplayableException(
            String.format("Creation of rule type: %s is not supported", {ruleTypeKey.DisplayName}))
    }
  }

  override function goToCloneRulePage(ruleToClone: Rule) {
    if (ruleToClone typeis UWRule) {
      CreateUWRule.push(ruleToClone)
    } else {
      throw new DisplayableException(
          String.format("Clone of rule type: %s is not supported", {ruleToClone.IntrinsicType.Name})
      )
    }
  }

  override function goToRulesListPage() {
    UWRules.go()
  }

  override function goToRulesListPage(ruleTypeKey: typekey.Rule) {
    switch(ruleTypeKey) {
      case typekey.Rule.TC_UWRULE:
        UWRules.go()
        break
      default:
        throw new DisplayableException(String.format("Rule type: %s is not supported", {ruleTypeKey.DisplayName}))
    }
  }

  override function goToExportImportStatusPage() {
    PCBizRulesExportImportStatus.go()
  }

  override property get ValidationInfoMode(): String {
    return VALIDATION_INFO_MODE_UWRULE
  }

  override property get ExecutionInfoMode(): String {
    return EXECUTION_INFO_MODE_UWRULE
  }

  override function gotoCreateLookupPage() {
    CreateLookup.push()
  }

  override public function shouldDisplayCreateLookupButton() : boolean {
    return perm.System.lookuptableedit
  }

}