package gw.api.builder

uses com.guidewire.bizrules.system.dependency.BizRulesDependencies
uses gw.api.databuilder.BuilderContext
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.util.CurrencyUtil
uses gw.bizrules.databuilder.ExpressionFragmentBuilders
uses gw.bizrules.databuilder.RuleBuilder
uses gw.bizrules.databuilder.RuleCommandDefinitionBuilder
uses gw.bizrules.pcf.ExpressionInputMode
uses gw.bizrules.provisioning.AddUWIssueRuleAction
uses gw.bizrules.provisioning.LocalizedRuleActionParameter
uses gw.util.Pair
uses gw.web.bizrules.UWRuleInteractiveWidgetSet
uses typekey.PolicyLine

uses java.lang.IllegalAccessException
uses java.lang.IllegalArgumentException
uses java.lang.Integer
uses java.math.BigDecimal
uses java.util.Date
uses java.util.Map

@Export
class UWRuleBuilder extends RuleBuilder<UWRule, UWRuleBuilder> {
  private var _uwIssueTypeBuilder: UWIssueTypeBuilder
  private var _head: RuleHead
  private var _commandParams: Map<String, Pair<String, ExpressionInputMode>>
  private var _comparator: ValueComparator

  construct() {
    this(false)
  }

  construct (excludeHead : boolean) {
    super(UWRule, UWRule.TYPE.get().SubtypeTypeKey as typekey.Rule)

    _commandParams = {}
    // default command params
    _commandParams.put(AddUWIssueRuleAction.PARAM_EVAL_CONTEXT, Pair.make("policyEvalContext", ExpressionInputMode.formula))
    _commandParams.put(AddUWIssueRuleAction.PARAM_ISSUE_KEY, Pair.make("", ExpressionInputMode.template))
    _commandParams.put(AddUWIssueRuleAction.PARAM_VALUE, Pair.make("", ExpressionInputMode.template))
    AddUWIssueRuleAction.SHORT_DESC_PARAMS.eachLangParam(\p -> _commandParams.put(p.ParameterName, Pair.make("", ExpressionInputMode.template)))
    AddUWIssueRuleAction.LONG_DESC_PARAMS.eachLangParam(\p -> _commandParams.put(p.ParameterName, Pair.make("", ExpressionInputMode.template)))

    _uwIssueTypeBuilder = new UWIssueTypeBuilder()
    set(UWRule#UWIssueType, _uwIssueTypeBuilder)

    var id = UniqueKeyGenerator.get().nextInteger()
    withCode("UWIssue_" + id)
    withName("UWIssue " + id)
    withDescription("UWIssue Description " + id)
    withBlockingPoint(TC_BLOCKSBIND)
    withDefaultApprovalBlockingPoint(TC_BLOCKSQUOTE)
    withDefaultValueOffsetCurrency(CurrencyUtil.DefaultCurrency)
    withExternallyManaged(false)

    // populate the command parameters
    addPopulator(\bean -> {
      var builder = new RuleCommandDefinitionBuilder()
          .withRule(bean as UWRule)
          .withOrderNumber(0)
          .withRuleActionKey(RuleActionKey.TC_ADDUWISSUE)
      for (name in _commandParams.Keys) {
        var param = _commandParams.get(name)
        switch (param.Second) {
          case formula:
            builder.addRuleCommandParameter(name, ExpressionFragmentBuilders.forCodeExpression(param.First))
            break
          case template:
            builder.addRuleCommandParameter(name, ExpressionFragmentBuilders.forGosuTemplateExpression(param.First))
            break
          default:
            throw new IllegalArgumentException("Illegal parameter mode: ${param.Second}}")
        }
      }
      builder.create(bean.Bundle)
    })

    if (not excludeHead) {
      addPopulator(Integer.MAX_VALUE, \bean -> {
        _head = BizRulesDependencies.BizRulesVersionController.createNewHead(bean.Bundle, bean as UWRule, false)
      })
    }
  }

  override function createBean(context: BuilderContext): UWRule {
    var bean = super.createBean(context)
    // inject a 'dummy' Value so the parameter passes validation
    if(_comparator == TC_NONE) {
      withValueParam(UWRuleInteractiveWidgetSet.NOOP_VALUE)
    }
    return bean
  }

  property get LastCreatedRuleHead(): RuleHead {
    return _head
  }

  override function withName(name: String): UWRuleBuilder {
    _uwIssueTypeBuilder.withName(name)
    return super.withName(name)
  }

  override function withDescription(description: String): UWRuleBuilder {
    _uwIssueTypeBuilder.withDescription(description)
    return super.withDescription(description)
  }

  override function withTriggeringPointKey(key: TriggeringPointKey): UWRuleBuilder {
    _uwIssueTypeBuilder.withCheckingSet(UWIssueType.mapper.toCheckingSet(key))
    return super.withTriggeringPointKey(key)
  }

  function withStartDate(date: Date): UWRuleBuilder {
    set(UWRule#StartDate, date)
    return this
  }

  function withEndDate(date: Date): UWRuleBuilder {
    set(UWRule#EndDate, date)
    return this
  }

  function withPolicyLine(policyLine: PolicyLine): UWRuleBuilder {
    var builder = new AppCritLineOfBusinessBuilder().withPolicyLine(policyLine)
    addArrayElement(UWRule#LinesOfBusiness, builder)
    return this
  }

  function withPolicyTransaction(job: typekey.Job): UWRuleBuilder {
    var builder = new AppCritPolicyTransactionBuilder().withJob(job)
    addArrayElement(UWRule#PolicyTransactions, builder)
    return this
  }

  function withJurisdiction(jurisdiction: Jurisdiction): UWRuleBuilder {
    var builder = new AppCritJurisdictionBuilder().withJurisdiction(jurisdiction)
    addArrayElement(UWRule#Jurisdictions, builder)
    return this
  }

  function withIssueKeyParam(value: String, mode: ExpressionInputMode = template): UWRuleBuilder {
    _commandParams.put(AddUWIssueRuleAction.PARAM_ISSUE_KEY, Pair.make(value, mode))
    return this
  }

  function withShortDescParam(value: String, lang: String = null, mode: ExpressionInputMode = template): UWRuleBuilder {
    populateLocalizedParam(AddUWIssueRuleAction.SHORT_DESC_PARAMS, Pair.make(value, mode), lang)
    return this
  }

  function withShortDescParamForAllLanguages(value: String, mode: ExpressionInputMode = template): UWRuleBuilder {
    for (langType in LanguageType.getTypeKeys(false)) {
      populateLocalizedParam(AddUWIssueRuleAction.SHORT_DESC_PARAMS, Pair.make(value, mode), langType.Code)
    }
    return this
  }

  function withLongDescParam(value: String, lang: String = null, mode: ExpressionInputMode = template): UWRuleBuilder {
    populateLocalizedParam(AddUWIssueRuleAction.LONG_DESC_PARAMS, Pair.make(value, mode), lang)
    return this
  }

  function withLongDescParamForAllLanguages(value: String, mode: ExpressionInputMode = template): UWRuleBuilder {
    for (langType in LanguageType.getTypeKeys(false)) {
      populateLocalizedParam(AddUWIssueRuleAction.LONG_DESC_PARAMS, Pair.make(value, mode), langType.Code)
    }
    return this
  }

  function withValueParam(value: String, mode: ExpressionInputMode = template): UWRuleBuilder {
    _commandParams.put(AddUWIssueRuleAction.PARAM_VALUE, Pair.make(value, mode))
    return this
  }

  /**
   * @deprecated use the supplied .with&lt;parameter&gt;() methods instead
   */
  override function addRuleCommandDefinition(ruleCommandDefinitionBuilder: RuleCommandDefinitionBuilder): UWRuleBuilder {
    throw new IllegalAccessException("Use with<parameter>() methods instead")
  }

  // --- UWIssueType fields ---
  function withCode(code: String): UWRuleBuilder {
    _uwIssueTypeBuilder.withCode(code);
    return this;
  }

  function withComparator(comparator: ValueComparator): UWRuleBuilder {
    _comparator = comparator
    _uwIssueTypeBuilder.withComparator(comparator)
    return this
  }

  function withBlockingPoint(blockingPoint: UWIssueBlockingPoint): UWRuleBuilder {
    _uwIssueTypeBuilder.withBlockingPoint(blockingPoint)
    return this
  }

  function withAutoApprovable(isAutoApprovable: boolean): UWRuleBuilder {
    _uwIssueTypeBuilder.withAutoApprovable(isAutoApprovable)
    return this
  }

  function withDefaultEditBeforeBind(editBeforeBind: boolean): UWRuleBuilder {
    _uwIssueTypeBuilder.withDefaultEditBeforeBind(editBeforeBind)
    return this
  }

  function withDefaultDurationType(approvalDurationType: UWApprovalDurationType): UWRuleBuilder {
    _uwIssueTypeBuilder.withDefaultDurationType(approvalDurationType)
    return this
  }

  function withDefaultApprovalBlockingPoint(blockingPoint: UWIssueBlockingPoint): UWRuleBuilder {
    _uwIssueTypeBuilder.withDefaultApprovalBlockingPoint(blockingPoint)
    return this
  }

  function withDefaultValueAssignmentType(valueAssignmentType: UWValueAssignmentType): UWRuleBuilder {
    _uwIssueTypeBuilder.withDefaultValueAssignmentType(valueAssignmentType)
    return this
  }

  function withDefaultValueOffsetAmount(offset: BigDecimal): UWRuleBuilder {
    _uwIssueTypeBuilder.withDefaultValueOffsetAmount(offset)
    return this
  }

  function withDefaultValueOffsetCurrency(currency: Currency): UWRuleBuilder {
    _uwIssueTypeBuilder.withDefaultValueOffsetCurrency(currency)
    return this
  }

  function withValueFormatter(valueFormatterType: ValueFormatterType): UWRuleBuilder {
    _uwIssueTypeBuilder.withValueFormatter(valueFormatterType)
    return this
  }

  /**
   * @deprecated use {@link #withTriggeringPointKey(TriggeringPointKey)}
   */
  function withCheckingSet(checkingSet: UWIssueCheckingSet): UWRuleBuilder {
    var triggeringPoint = UWIssueType.mapper.toTriggeringPointKey(checkingSet)
    withTriggeringPointKey(triggeringPoint)
    _uwIssueTypeBuilder.withCheckingSet(checkingSet)
    return this
  }

  function withExternallyManaged(externallyManaged: boolean): UWRuleBuilder {
    set(UWRule#ExternallyManaged, externallyManaged)
    return this
  }

  private function populateLocalizedParam(params: LocalizedRuleActionParameter, value: Pair<String, ExpressionInputMode>, lang: String = null) {
    if (lang == null) {
      params.eachLangParam(\p -> _commandParams.put(p.ParameterName, value))
    } else {
      var langType = getLangForCode(lang)
      if (langType != null) {
        _commandParams.put(params.langParamFor(langType).ParameterName, value)
      }
    }
  }

  private function getLangForCode(lang: String): LanguageType {
    return LanguageType.AllTypeKeys.firstWhere(\l -> l.Code == lang)
  }
}