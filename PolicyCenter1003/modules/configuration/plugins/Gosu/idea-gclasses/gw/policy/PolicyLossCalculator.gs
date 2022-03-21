package gw.policy

uses gw.api.locale.DisplayKey
uses gw.api.system.PLDependenciesGateway
uses gw.api.util.LocaleUtil
uses gw.api.util.MultiCurrencySummation
uses gw.api.web.color.GWColor
uses gw.api.web.dashboard.ui.DashboardParameters
uses gw.api.web.dashboard.ui.claims.LossRatioHelper
uses gw.i18n.DateTimeFormat
uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

/**
 * Class implementing calculation of Total Losses, Earned Premium and Loss Ratio for policies.
 */
@Export
class PolicyLossCalculator {
  final var _policyTerms: PolicyTerm[]
  final var _useSimplifiedWarnings: boolean
  final var _currency: block() : Currency

  /**
   * Create a policy calculator instance for a given policy period.
   * @param period Policy Period for which loss ratio should be calculated.
   * @return New PolicyLossCalculator instance.
   */
  static function forPolicyPeriod(period: PolicyPeriod): PolicyLossCalculator {
    return new PolicyLossCalculator({period.PolicyTerm}, \-> period.PreferredCoverageCurrency, true)
  }

  /**
   * Create a policy calculator instance for policies issued by given account. Calculations are performed
   * between startDate and today.
   * @param account Account with policies to calculate.
   * @param startDate Start date for calculations.
   * @return New PolicyLossCalculator instance.
   */
  static function forAccount(account: Account, startDate: Date = null): PolicyLossCalculator {
    var today = PLDependenciesGateway.SystemClock.DateTime
    if (startDate == null) {
      startDate = today.addYears(-DashboardParameters.LossRatioCalculationYears)
    }

    var policyTerms = new HashSet<PolicyTerm>()
    for (var policySummary in account.IssuedPolicies) {
      if (policySummary.PeriodStart.compareIgnoreTime(today) <= 0
          and policySummary.PeriodEnd.compareIgnoreTime(startDate) >= 0) {
        var policyPeriod = policySummary.fetchPolicyPeriod()
        if (policyPeriod.Archived or policyPeriod.MultiLine) {
          continue
        }
        policyTerms.add(policyPeriod.PolicyTerm)
      }
    }

    return new PolicyLossCalculator(policyTerms.toTypedArray(), \-> account.PreferredSettlementCurrency)
  }

  /**
   * Constructor of the class.
   *
   * @param policyTerms Policy Terms for calculations
   * @param currency Currency for produced results
   * @param useSimplifiedWarnings When true, the messages from loss ratio recalculation are returned as is.
   *                              When false, the messages are decorated with additional information (e.g. policy number).
   */
  private construct(policyTerms: PolicyTerm[], currency(): Currency, useSimplifiedWarnings: boolean = false) {
    _policyTerms = policyTerms
    _currency = currency
    _useSimplifiedWarnings = useSimplifiedWarnings
  }

  /**
   * Calculates the Total Loss, Earned Premium and Loss Ratio based on data already stored in PolicyTerm table
   * (data aggregation only).
   *
   * @return Calculation result object.
   */
  function calculate(): LossCalculationResult {
    var totalEarned = new MultiCurrencySummation()
    var totalIncurred = new MultiCurrencySummation()
    var calculationDate: Date = null

    for (var policyTerm in _policyTerms) {
      if (policyTerm.LossRatioCalculationDate == null or
          (calculationDate != null and calculationDate.compareIgnoreTime(policyTerm.LossRatioCalculationDate) != 0)) {
        return new LossCalculationResult(0bd.ofCurrency(_currency()), 0bd.ofCurrency(_currency()), null, null)
      }
      calculationDate = policyTerm.LossRatioCalculationDate
      totalEarned.add(policyTerm.LossRatioEarnedPremium)
      totalIncurred.add(policyTerm.ClaimSystemTotalIncurred)
    }

    var totalEarnedSummed = totalEarned.sum(_currency())
    var totalIncurredSummed = totalIncurred.sum(_currency())

    // protect against border conditions and divide by zero
    if (totalEarnedSummed.Amount <= 0bd) {
      return new LossCalculationResult(totalEarnedSummed, totalIncurredSummed, null, calculationDate)
    }

    return new LossCalculationResult(
        totalEarnedSummed,
        totalIncurredSummed,
        (100 * totalIncurredSummed.Amount / totalEarnedSummed.Amount).setScale(2, HALF_UP),
        calculationDate)
  }

  /**
   * Iterates over the Policy Terms and recalculates the Total Loss, Earned Premium and Loss Ratio
   * values. Results are persisted in the PolicyTerm table.
   *
   * @return Aggregated warnings/errors from recalculation process (each in a separate line) since recalculateLossRatio
   *         method in PolicyTermEnhancement returns a string with warning/error (if any).
   *
   * @see PolicyTermEnhancement#recalculateLossRatio()
   */
  function recalculate(): String {
    var messageList = new LinkedHashSet<String>()
    if (_policyTerms.IsEmpty) {
      messageList.add(DisplayKey.get("Web.Policy.LossRatioCalculationNoPolicies"))
    }
    for (var policyTerm in _policyTerms) {
      gw.transaction.Transaction.runWithNewBundle(\bundle -> {
        bundle.add(policyTerm)
        var message = policyTerm.recalculateLossRatio()
        if (message != null) {
          if (_useSimplifiedWarnings) {
            messageList.add(message)
          } else {
            messageList.add(DisplayKey.get("Web.Policy.LossRatioCalculationError", policyTerm.PolicyNumber, message))
          }
        }
      })
    }

    if (messageList.HasElements) {
      return String.join(System.lineSeparator(), messageList)
    }

    return null
  }

  /**
   * Class representing the calculation result.
   */
  public static class LossCalculationResult {
    private static final var MAX_ON_TARGET = 50
    private static final var MAX_NEUTRAL = 100

    final var _earnedPremium: MonetaryAmount as readonly EarnedPremium
    final var _totalIncurred: MonetaryAmount as readonly TotalIncurred
    final var _lossRatio: BigDecimal as readonly LossRatio
    final var _calculationDate: Date as readonly CalculationDate

    construct(earnedPremium: MonetaryAmount, totalIncurred: MonetaryAmount, lossRatio: BigDecimal, calculationDate: Date) {
      _earnedPremium = earnedPremium
      _totalIncurred = totalIncurred
      _lossRatio = lossRatio
      _calculationDate = calculationDate
    }

    property get LossRatioFormatted(): String {
      return Optional.ofNullable(LossRatio)
          .map(\lr -> LossRatioHelper.formatLossRatio(lr))
          .orElse("-")
    }

    property get LossRatioCalculationDate(): String {
      return Optional.ofNullable(CalculationDate)
          .map(\lr -> LocaleUtil.CurrentLocale.getOutputDateFormat(DateTimeFormat.SHORT, null).format(CalculationDate))
          .orElse("-")
    }

    property get LossRatioColor(): GWColor {
      if (LossRatio == null) {
        return GWColor.THEME_ACTION_NEUTRAL;
      }

      if (LossRatio < MAX_ON_TARGET) {
        return GWColor.THEME_ACTION_SAFE
      } else if (LossRatio < MAX_NEUTRAL) {
        return GWColor.THEME_ACTION_NEUTRAL
      } else {
        return GWColor.THEME_ACTION_DANGER
      }
    }
  }
}
