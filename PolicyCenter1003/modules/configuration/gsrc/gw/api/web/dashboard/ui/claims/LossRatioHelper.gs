package gw.api.web.dashboard.ui.claims

uses gw.api.util.StringUtil
uses gw.policy.PolicyLossCalculator
uses gw.util.concurrent.LockingLazyVar

uses java.math.BigDecimal

@Export
class LossRatioHelper {
  final var _lossCalculator: PolicyLossCalculator
  final var _lossResult: LockingLazyVar<PolicyLossCalculator.LossCalculationResult>
  var _errorMessage: String as ErrorMessage

  static function forPolicyPeriod(period: PolicyPeriod): LossRatioHelper {
    return new LossRatioHelper(PolicyLossCalculator.forPolicyPeriod(period))
  }

  static function forAccount(account: Account): LossRatioHelper {
    return new LossRatioHelper(PolicyLossCalculator.forAccount(account))
  }

  static function formatLossRatio(points: BigDecimal): String {
    var format = "#%"
    if (points > 0) {
      format = "0.00%"
    }

    return StringUtil.formatNumber(Double.valueOf(points.doubleValue() / 100), format)
  }

  private construct(lossCalculator: PolicyLossCalculator) {
    _lossCalculator = lossCalculator
    _lossResult = LockingLazyVar.make(\-> _lossCalculator.calculate())
  }

  function recalculateLossRatio() {
    _errorMessage = _lossCalculator.recalculate()
  }

  property get LossCalculationResult(): PolicyLossCalculator.LossCalculationResult {
    _lossResult.clear()
    return _lossResult.get()
  }
}