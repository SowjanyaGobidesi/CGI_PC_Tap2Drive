package gw.api.web.dashboard.ui.policy

uses gw.api.locale.DisplayKey
uses gw.api.system.PLDependenciesGateway
uses gw.api.util.LocaleUtil
uses gw.api.util.StringUtil
uses gw.api.web.dashboard.ui.claims.LossRatioHelper
uses gw.i18n.DateTimeFormat
uses gw.pl.currency.MonetaryAmount
uses org.apache.commons.lang3.tuple.Pair

uses java.math.BigDecimal

@Export
class PremiumHelper {
  final var _period: PolicyPeriod
  final var _commercialLines: Pair<String, MonetaryAmount>[] as CommercialLines

  construct(period: PolicyPeriod) {
    _period = period
    _commercialLines = _period.calculateEarnedPremium(
        PLDependenciesGateway.SystemClock.DateTime, _period.IncludeEarnedButUnreported)
        .entrySet().map(\line -> Pair.of(line.Key, line.Value)).sortBy(\line -> line.Key).toTypedArray()
  }

  property get TotalPremium(): MonetaryAmount {
    return _period.TotalPremiumRPT
  }

  property get EarnedPremium(): MonetaryAmount {
    return _period.EarnedPremium.values().sumDifferentCurriences(_period.PreferredSettlementCurrency)
  }

  property get TotalIncurred(): MonetaryAmount{
    return _period.PolicyTerm.ClaimSystemTotalIncurred ?: 0bd.ofCurrency(_period.PreferredCoverageCurrency)
  }

  property get TaxesAndFees(): MonetaryAmount {
    return _period.TaxAndSurchargesRPT
  }

  property get LossRatio(): String {
    return formatLossRatio(_period.PolicyTerm.LossRatio)
  }

  property get LossRatioCalculationDate(): String {
    var calculationDate = _period.PolicyTerm.LossRatioCalculationDate
    return lossRatioCalculationDate(calculationDate)
  }

  property get EarnedPremiumLabel(): String {
    if (FinalAuditComplete) {
      return DisplayKey.get('Web.Dashboard.Tile.TermFinancials.EarnedPremiumFinalAuditComplete')
    }
    return DisplayKey.get('Web.Dashboard.Tile.TermFinancials.EarnedPremium')
  }

  private property get FinalAuditComplete(): boolean {
    return IsPremiumReporting and _period.CompletedNotReversedFinalAudits.Count != 0
  }

  static function formatLossRatio(lossRatio: BigDecimal): String {
    return Optional.ofNullable(lossRatio)
        .map(\lr -> LossRatioHelper.formatLossRatio(lr))
        .orElse("-")
  }

  static function lossRatioCalculationDate(calculationDate : Date): String {
    return Optional.ofNullable(calculationDate)
        .map(\lr -> LocaleUtil.CurrentLocale.getOutputDateFormat(DateTimeFormat.SHORT, null).format(calculationDate))
        .orElse("-")
  }

  static function lossRatioWithDate(policyPeriod: PolicyPeriod): String {
    return DisplayKey.get('Web.Dashboard.Tile.CurrentPolicyTerms.LossRatioValue',
        formatLossRatio(policyPeriod.PolicyTerm.LossRatio),
        lossRatioCalculationDate(policyPeriod.PolicyTerm.LossRatioCalculationDate))
  }

  property get IsPremiumReporting(): boolean {
    return not _period.Archived and _period.IsReportingPolicy
  }

  property get IncludesEarnedButUnreportedText(): String {
    return _period.IncludeEarnedButUnreported ?
        DisplayKey.get('Web.Dashboard.Tile.TermFinancials.IncludeEarnedButUnreported.True') :
        DisplayKey.get('Web.Dashboard.Tile.TermFinancials.IncludeEarnedButUnreported.False')
  }
}

