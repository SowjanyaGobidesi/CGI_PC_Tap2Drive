package gw.job.uw

uses gw.api.locale.DisplayKey
uses gw.job.uw.types.UWIssueStateSetValueType
uses java.lang.Integer
uses java.util.Formatter
uses java.util.LinkedHashMap
uses java.math.BigDecimal
uses gw.api.util.CurrencyUtil
uses gw.pl.currency.MonetaryAmount
uses gw.api.util.MonetaryAmounts
uses java.lang.IllegalArgumentException

/**
 * This class contains
 */
@Export
abstract class ValueFormatter {

  private static var registeredFormatters = new LinkedHashMap<ValueFormatterType, ValueFormatter>()

  public static function forType(type : ValueFormatterType) : ValueFormatter {
    return registeredFormatters.get(type)
  }

  private var _type : ValueFormatterType as readonly ValueFormatterType
  protected construct(typeArg : ValueFormatterType) {
    _type = typeArg
    registeredFormatters[_type] = this
  }

  /**
   * Formats a value.
   * @param value The value to format
   * @param format Format to use when formatting this value. Exact meaning depends on the formatter.
   * @return The formatted value
   */
  abstract function format(value : String) : String

  // ---------- Standard Formatters ----------

  final public static var UNFORMATTED : ValueFormatter = new ValueFormatter(TC_UNFORMATTED) {
    override function format(value : String) : String {
      return value
    }
  }

  final public static var FOR_INTEGER : ValueFormatter = new ValueFormatter(TC_INTEGER) {
    override function format(value : String) : String {
      return formatInteger(value)
    }
  }

  final public static var FOR_UNITS : ValueFormatter = new ValueFormatter(TC_UNITS) {
    override function format(value : String) : String {
      return DisplayKey.get("UWIssue.ValueFormat.Units", formatInteger(value))
    }
  }

  final public static var FOR_AGE : ValueFormatter = new ValueFormatter(TC_AGE) {
    override function format(value : String) : String {
      return DisplayKey.get("UWIssue.ValueFormat.Age", formatInteger(value))
    }
  }

  final public static var FOR_NUMBER: ValueFormatter = new ValueFormatter(TC_NUMBER) {
    override function format(value : String) : String {
      return formatBigDecimal(value, "%g")
    }
  }

  final public static var FOR_MONETARYAMOUNT: ValueFormatter = new ValueFormatter(TC_MONETARYAMOUNT) {
    override function format(value : String) : String {
      var originalValue : MonetaryAmount;
      try {
        originalValue = new MonetaryAmount(value)
      } catch (ex : IllegalArgumentException) {
        // UW issues that were created before 8.x did not have currencies in the Value column. This is why the
        // constructor of MonetaryAmount is throwing the IllegalArgumentException. In this case, we use the default
        // currency.
        originalValue = new MonetaryAmount(new BigDecimal(value.trim()), CurrencyUtil.getDefaultCurrency())
      }
      return MonetaryAmounts.render(originalValue)
    }
  }

  final public static var FOR_CURRENCY: ValueFormatter = new ValueFormatter(TC_CURRENCY) {
    override function format(value : String) : String {
      var numericValue = new BigDecimal(value)
      return CurrencyUtil.renderAsCurrency(numericValue,null)
    }
  }

  final public static var FOR_USD: ValueFormatter = new ValueFormatter(TC_USD) {
    override function format(value : String) : String {
      return DisplayKey.get("UWIssue.ValueFormat.USD", formatBigDecimal(value, "%,.2f"))
    }
  }

  final public static var FOR_USDBRIEF: ValueFormatter = new ValueFormatter(TC_USDBRIEF) {
    override function format(value : String) : String {
      return DisplayKey.get("UWIssue.ValueFormat.USD", formatBigDecimal(value, "%,.0f"))
    }
  }

  final public static var FOR_STATESET: ValueFormatter = new ValueFormatter(TC_STATESET) {
    override function format(value : String) : String {
      var states = new UWIssueStateSetValueType().deserialize(value)
      var statesAsDisplayed = states.Values.join(", ")
      return states.Exclusive
          ? DisplayKey.get("UWIssue.ValueFormat.StatesBut", statesAsDisplayed)
          : DisplayKey.get("UWIssue.ValueFormat.States", statesAsDisplayed)
    }
  }

  // ----- UTILS -----

  private static function formatBigDecimal(value : String, format : String) : String {
    var numericValue = new BigDecimal(value)
    var sb = new Formatter().format(format, {numericValue}).out()
    return sb.toString()
  }

  private static function formatInteger(value : String) : String {
      var intValue = Integer.parseInt(value)
      var stringBuffer = new Formatter().format("%d", {intValue}).out()
      return stringBuffer.toString()
  }

}
