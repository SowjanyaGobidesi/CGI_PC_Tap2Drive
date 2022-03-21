package gw.web.bizrules

uses gw.api.locale.DisplayKey
uses gw.bizrules.pcf.BizRulesPageNavigationSupport
uses gw.bizrules.pcf.CommandDefinitionUIConfig
uses gw.bizrules.pcf.ExpressionInputMode
uses gw.bizrules.pcf.RuleConditionLineHolder
uses gw.bizrules.pcf.DefaultRuleDetailsStateHolder
uses gw.bizrules.pcf.RulePageController
uses pcf.api.Location

uses java.util.Map
uses java.util.Set

@Export
class PCBizRulesDetailsStateHolder extends DefaultRuleDetailsStateHolder {
  private var _location: Location

  construct(head: RuleHead,
            navigationSupport: BizRulesPageNavigationSupport,
            uiConfigs: Map<RuleActionKey, CommandDefinitionUIConfig>, location: Location) {
    super(head, navigationSupport, uiConfigs, location);
    _location = location
  }

  override function createRulePageController(ruleVersion: RuleVersion, location: Location): RulePageController {
    return new RulePageController(ruleVersion, _uiConfigs, location, SwitchableModes)
  }

  static property get SwitchableModes(): Set<ExpressionInputMode> {
    return RuleConditionLineHolder.SWITCHABLE_LINE_EXPRESSION_MODES_SUPERSET.subtract({lastsavedvalue})
  }

  property get ExternallyManagedAlert(): String {
    return _location.InEditMode
        ? DisplayKey.get("Web.BizRules.UWRules.RuleIsNotManagedByBusinessRulesFrameworkEditAlert")
        : DisplayKey.get("Web.BizRules.UWRules.RuleIsNotManagedByBusinessRulesFrameworkAlert")
  }

  override public property get EnableDisableToggleVisible() : boolean {
    return super.isEnableDisableToggleVisible() and not (SelectedVersion.Rule as UWRule).ExternallyManaged
  }
}
