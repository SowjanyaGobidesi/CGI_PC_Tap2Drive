package gw.bizrules.provisioning

uses gw.api.system.PCLoggerCategory
uses gw.bizrules.CommandParameterDefinition
uses gw.bizrules.IRuleAction
uses gw.bizrules.IRuleCommand
uses gw.policy.PolicyEvalContext

@Export
class AddUWIssueRuleAction implements IRuleAction {

  public static final var PARAM_EVAL_CONTEXT: String = "Evaluation Context"
  public static final var PARAM_VALUE: String = "Value"
  public static final var PARAM_ISSUE_KEY: String = "Issue Key"

  static final var PARAM_SHORT_DESC = "Short Description"
  static final var PARAM_LONG_DESC = "Long Description"

  public static final var SHORT_DESC_PARAMS: LocalizedRuleActionParameter =
      new LocalizedRuleActionParameter(PARAM_SHORT_DESC, true, "Web.BizRules.AddUWIssueAction.ShortDesc")
  public static final var LONG_DESC_PARAMS: LocalizedRuleActionParameter =
      new LocalizedRuleActionParameter(PARAM_LONG_DESC, true, "Web.BizRules.AddUWIssueAction.LongDesc")

  override property get Key(): RuleActionKey {
    return RuleActionKey.TC_ADDUWISSUE
  }

  override property get CommandParameterDefinitions(): Map<String, CommandParameterDefinition> {
    var params = {
        PARAM_EVAL_CONTEXT->new CommandParameterDefinition(PolicyEvalContext, true, "Web.BizRules.AddUWIssueAction.EvalContext"),
        PARAM_ISSUE_KEY->new CommandParameterDefinition(String, true, "Web.BizRules.AddUWIssueAction.IssueKey"),
        PARAM_VALUE->new CommandParameterDefinition(String, true, "Web.BizRules.AddUWIssueAction.Value")
    }
    SHORT_DESC_PARAMS.eachLangParam(\p -> params.put(p.ParameterName, p.ParameterDefinition))
    LONG_DESC_PARAMS.eachLangParam(\p -> params.put(p.ParameterName, p.ParameterDefinition))
    return params
  }

  /**
   * Perform the UW rule action
   *
   * @param command the RuleCommand containing the evaluated expressions of RuleCommandDefinitions for a rule
   * @throws InvalidValueFormatException when the rule value is not formattable based on its type
   */
  override function execute(command: IRuleCommand) {
    var rule = command.Rule
    PCLoggerCategory.UWRULES.info("Executing AddUWIssueRuleAction for rule: ${rule.Name}")
    if (rule typeis UWRule) {
      var issueKey = command.getValue(PARAM_ISSUE_KEY) as String
      var context = command.getValue(PARAM_EVAL_CONTEXT) as PolicyEvalContext
      var shortDesc = \-> getLocalisedParam(command, SHORT_DESC_PARAMS)
      var longDesc = \-> getLocalisedParam(command, LONG_DESC_PARAMS)
      if (rule.UWIssueType.Comparator == TC_NONE) {
        context.addIssue(rule.UWIssueType.Code, issueKey, shortDesc, longDesc)
      } else {
        var value = validateValueFormat(command)
        context.addIssue(rule.UWIssueType.Code, issueKey, shortDesc, longDesc, value)
      }
    } else {
      throw new IllegalArgumentException(String.format("Attempt to execute rule action '%s' by a non '%s' rule",
          {AddUWIssueRuleAction.Type.RelativeName, UWRule.Type.RelativeName}))
    }
  }

  override function describe(definition: RuleCommandDefinition): String {
    return null // unused
  }

  static function populateCommandDefinition(commandDefinition: RuleCommandDefinition) {
    commandDefinition.RuleActionKey = TC_ADDUWISSUE
    addParameter(commandDefinition, AddUWIssueRuleAction.PARAM_EVAL_CONTEXT, new CodeExpressionFragment())
    addParameter(commandDefinition, AddUWIssueRuleAction.PARAM_ISSUE_KEY, new GosuTemplateExpressionFragment())
    addParameter(commandDefinition, AddUWIssueRuleAction.PARAM_VALUE, new GosuTemplateExpressionFragment())
    SHORT_DESC_PARAMS.eachLangParam(\p -> addParameter(commandDefinition, p.ParameterName, new GosuTemplateExpressionFragment()))
    LONG_DESC_PARAMS.eachLangParam(\p -> addParameter(commandDefinition, p.ParameterName, new GosuTemplateExpressionFragment()))
  }

  // --- private code ---

  private static function addParameter(definition: RuleCommandDefinition, paramName: String, expressionFragment: ExpressionFragment) {
    var param = new RuleCommandParameter()
    param.ParameterName = paramName
    param.Expression = expressionFragment
    definition.addToRuleCommandParameters(param)
  }

  private function getLocalisedParam(command: IRuleCommand, param: LocalizedRuleActionParameter): String {
    return command.getValue(param.CurrentLangParam.ParameterName)
  }

  /**
   * Validates the rule value based on the value formatter type specified in the rule.
   *
   * @param command the <code>IRuleCommand</code> containing the value
   * @return the rule value as a <code>String</code>
   * @throws InvalidValueFormatException when the rule value is not formattable based on its type
   */
  private function validateValueFormat(command: IRuleCommand): String {
    var rule = command.Rule as UWRule
    var value = command.getValue(PARAM_VALUE) as String
    try {
      rule.UWIssueType.formatValue(value)
    } catch (e: Exception) {
      var exception = new InvalidValueFormatException(rule, value)
      PCLoggerCategory.UWRULES.error(exception.Message, exception)
      throw exception
    }
    return value
  }
}
