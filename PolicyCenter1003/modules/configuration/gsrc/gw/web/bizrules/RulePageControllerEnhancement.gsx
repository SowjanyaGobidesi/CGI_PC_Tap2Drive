package gw.web.bizrules

uses gw.bizrules.pcf.RuleCommandDefinitionHolder
uses gw.bizrules.pcf.RulePageController

@Export
enhancement RulePageControllerEnhancement: RulePageController {
  property get FirstCommandDefinitionHolder(): RuleCommandDefinitionHolder {
    return this.CommandDefinitionController.CommandDefinitionHolders[0]
  }
}