package gw.web.bizrules

uses gw.bizrules.BizRulesComponentMapper
uses gw.bizrules.context.provider.RuleContextDefinitionProvider
uses gw.bizrules.pcf.CommandDefinitionUIConfig
uses gw.bizrules.pcf.CommandParameterUIConfigBuilder
uses gw.bizrules.pcf.HiddenContextPassThruCommandParameterUIConfig
uses gw.bizrules.pcf.RuleCommandDefinitionHolder
uses gw.bizrules.provisioning.AddUWIssueRuleAction
uses gw.bizrules.provisioning.contexts.GenericUWRuleContextDefinition

uses java.lang.IllegalArgumentException
uses java.util.Map

@Export
class AddUWIssueCommandDefinitionUIConfig implements CommandDefinitionUIConfig {
  override function getParameterConfig(parameterName: String): CommandDefinitionUIConfig.CommandParameterUIConfig {
    if (parameterName == AddUWIssueRuleAction.PARAM_EVAL_CONTEXT) {
      return new EvalContextUIConfig()
    }
    if (parameterName == AddUWIssueRuleAction.PARAM_ISSUE_KEY) {
      return CodeAndTemplateUIConfig
    }
    if (parameterName == AddUWIssueRuleAction.PARAM_VALUE) {
      return CodeAndTemplateUIConfig
    }
    if (AddUWIssueRuleAction.SHORT_DESC_PARAMS.AllLangParams*.ParameterName.contains(parameterName)) {
      return CodeAndTemplateUIConfig
    }
    if (AddUWIssueRuleAction.LONG_DESC_PARAMS.AllLangParams*.ParameterName.contains(parameterName)) {
      return CodeAndTemplateUIConfig
    }
    throw new IllegalArgumentException("Unknown parameter '${parameterName}'")
  }

  override property get CommandDefinitionDVMode(): String {
    return null
  }

  override function onContextChange(context: RuleContextDefinitionProvider, commandDef: RuleCommandDefinitionHolder) {
  }

  private static class EvalContextUIConfig extends HiddenContextPassThruCommandParameterUIConfig {
    construct() {
      super(contextParams())
    }

    private static function contextParams(): Map<RuleContextDefinitionKey, String> {
      var mapper = BizRulesComponentMapper.Instance
      return RuleContextDefinitionKey.getTypeKeys(false)
          .where(\k -> mapper.getContextDefinition(k) typeis GenericUWRuleContextDefinition)
          .mapToKeyAndValue(\k -> k, \v -> GenericUWRuleContextDefinition.PARAM_POLICYEVALCONTEXT)
    }
  }

  private property get CodeAndTemplateUIConfig(): CommandDefinitionUIConfig.CommandParameterUIConfig {
    return new CommandParameterUIConfigBuilder()
        .withAvailableMode(template)
        .withAvailableMode(formula)
        .withDefaultMode(template).build();
  }
}