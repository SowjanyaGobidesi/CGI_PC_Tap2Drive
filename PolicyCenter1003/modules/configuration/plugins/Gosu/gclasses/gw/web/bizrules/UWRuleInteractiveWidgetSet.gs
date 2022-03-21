package gw.web.bizrules

uses gw.api.util.CurrencyUtil
uses gw.bizrules.pcf.RulePageController
uses gw.bizrules.pcf.TextExpressionFragmentHolder
uses gw.bizrules.provisioning.AddUWIssueRuleAction
uses typekey.Currency

uses java.math.BigDecimal

/**
 * Groups together widgets which interact with one another including the necessary interaction logic
 */
@Export
class UWRuleInteractiveWidgetSet {
  public final static var NOOP_VALUE: String = "null"

  final var _rule: UWRule
  final var _controller: RulePageController
  final var _issueType: UWIssueType
  final var _comparator: ComparatorWidget as Comparator
  final var _formatter: FormatterWidget as Formatter
  final var _assignmentType: AssignmentTypeWidget as AssignmenType
  final var _offsetAmount: OffsetAmountWidget as OffsetAmount
  final var _offsetCurrency: OffsetCurrencyWidget as OffsetCurrency
  final var _valueParameter: ValueParameterWidget as ValueParameter

  construct(rule: UWRule, controller: RulePageController) {
    _rule = rule
    _controller = controller
    _issueType = rule.UWIssueType
    _comparator = new ComparatorWidget()
    _formatter = new FormatterWidget()
    _assignmentType = new AssignmentTypeWidget()
    _offsetAmount = new OffsetAmountWidget()
    _offsetCurrency = new OffsetCurrencyWidget()
    _valueParameter = new ValueParameterWidget()
  }

  /**
   * Value parameter widget
   */
  class ValueParameterWidget extends InteractiveWidget<String> {
    override property get Value(): String {
      var fragHolder = _controller.CommandDefinitionController.CommandDefinitionHolders.single().getParameterHolder(AddUWIssueRuleAction.PARAM_VALUE).FragHolder
      assert fragHolder typeis TextExpressionFragmentHolder
      return (fragHolder as TextExpressionFragmentHolder).outputConversion()
    }

    override property set Value(value: String) {
      var fragHolder = _controller.CommandDefinitionController.CommandDefinitionHolders.single().getParameterHolder(AddUWIssueRuleAction.PARAM_VALUE).FragHolder
      assert fragHolder typeis TextExpressionFragmentHolder
      fragHolder.Fragment = (fragHolder as TextExpressionFragmentHolder).inputConversion(value)
    }

    override property get Visible(): boolean {
      return _comparator.Value != TC_NONE
    }

    function onComparatorChange(cache: ValueParameterCache) {
      if (_comparator.Value == TC_NONE) {
        cache.LastValue = Value
        Value = NOOP_VALUE
      } else if (cache.LastComparator == TC_NONE) {
        Value = cache.LastValue
      }
      cache.LastComparator = _comparator.Value
    }
  }

  /**
   * Comparator widget
   */
  class ComparatorWidget extends InteractiveWidget<ValueComparator> {
    var _specificFormatters: Set<ValueFormatterType>

    construct() {
      _specificFormatters = ValueComparator.AllTypeKeys*.Categories.whereTypeIs(ValueFormatterType).toSet()
    }

    override property get Value(): ValueComparator {
      return _issueType.Comparator
    }

    override property set Value(value: ValueComparator) {
      _issueType.Comparator = value
      // reset the formatter if necessary
      var availableFormatters = availableFormatters()
      if (not availableFormatters.contains(_formatter.Value)) {
        _formatter.Value = availableFormatters.first()
      }
    }

    override property get Editable(): boolean {
      return _rule.isFirstVersion()
    }

    function availableFormatters(): Set<ValueFormatterType> {
      var formatters = Value.Categories.whereTypeIs(ValueFormatterType)
      if (formatters.Count > 0) {
        return formatters.toSet()
      }
      return ValueFormatterType.TF_USERSELECTABLE.TypeKeys.subtract(_specificFormatters)
    }
  }

  /**
   * Value Formatter widget
   */
  class FormatterWidget extends InteractiveWidget<ValueFormatterType> {
    override property get Value(): ValueFormatterType {
      return _issueType.ValueFormatterType
    }

    override property set Value(value: ValueFormatterType) {
      _issueType.ValueFormatterType = value
      if (value == TC_MONETARYAMOUNT and _offsetCurrency.Value == null) {
        _offsetCurrency.Value = CurrencyUtil.DefaultCurrency
      }
    }

    override property get Visible(): boolean {
      return _comparator.Value != TC_NONE
    }

    override property get Editable(): boolean {
      return _comparator.Value != TC_STATE_SET
          and _comparator.Value != TC_MONETARY_LE
          and _comparator.Value != TC_MONETARY_GE
    }

    function filter(values: ValueFormatterType[]): List<ValueFormatterType> {
      return _comparator.availableFormatters().toList()
    }
  }

  /**
   * Default Value Assignment Type widget
   */
  class AssignmentTypeWidget extends InteractiveWidget<UWValueAssignmentType> {
    override property get Value(): UWValueAssignmentType {
      return _issueType.DefaultValueAssignmentType
    }

    override property set Value(value: UWValueAssignmentType) {
      _issueType.DefaultValueAssignmentType = value
    }

    override property get Visible(): boolean {
      return _comparator.Value != TC_NONE
    }
  }

  /**
   * Default Value Offset widget
   */
  class OffsetAmountWidget extends InteractiveWidget<BigDecimal> {
    override property get Value(): BigDecimal {
      return _issueType.DefaultValueOffsetAmount
    }

    override property set Value(value: BigDecimal) {
      _issueType.DefaultValueOffsetAmount = value
    }

    override property get Visible(): boolean {
      return _comparator.Value != TC_NONE
    }
  }

  /**
   * Default Value Offset Currency widget
   */
  class OffsetCurrencyWidget extends InteractiveWidget<Currency> {
    override property get Value(): Currency {
      return _issueType.DefaultValueOffsetCurrency
    }

    override property set Value(value: Currency) {
      _issueType.DefaultValueOffsetCurrency = value
    }

    override property get Visible(): boolean {
      return _comparator.Value != TC_NONE
          and _formatter.Value == TC_MONETARYAMOUNT
          and CurrencyUtil.isMultiCurrencyMode()
    }
  }

  abstract class InteractiveWidget<T> {
    abstract property get Value(): T

    abstract property set Value(value: T)

    property get Visible(): boolean {
      return true
    }

    property get Editable(): boolean {
      return true
    }
  }

  function createParameterCache(): ValueParameterCache {
    var value = _comparator.Value == TC_NONE and _valueParameter.Value == NOOP_VALUE ? "" : _valueParameter.Value
    return new ValueParameterCache(){:LastComparator = _comparator.Value, :LastValue = value}
  }

  /**
   * Caches the state of the previous values together (to survive pcf refresh at post-on-change)
   */
  static class ValueParameterCache {
    private var _lastComparator: ValueComparator as LastComparator
    private var _lastValue: String as LastValue
  }
}