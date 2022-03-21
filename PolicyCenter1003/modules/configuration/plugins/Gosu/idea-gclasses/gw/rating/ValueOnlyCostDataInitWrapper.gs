package gw.rating

uses java.math.BigDecimal
uses java.math.RoundingMode

/**
 * An implementation of the ICostDataInitWrapper interface. This class can be utilized to preload the
 * properties of a Cost entity that are required to initialize a CostData object. The primary use for
 * this class is to provide a means to improve performance in multi-threaded rating by eliminating the
 * need for bundles during the initialization of CostData objects. ValueOnlyCostDataInitWrappers are
 * typically created by the {@link AbstractDTOParallelRatingEngine#initializeCostWrappers(PolicyLine)} method.
 *
 * @see CostDataWithOverrideSupport
 */
@Export
class ValueOnlyCostDataInitWrapper implements ICostDataInitWrapper {

  var _standardTermAmount: BigDecimal
  var _standardAdjRate: BigDecimal
  var _standardBaseRate: BigDecimal

  var _overrideAmount: BigDecimal
  var _overrideTermAmount: BigDecimal
  var _overrideAdjRate: BigDecimal
  var _overrideBaseRate: BigDecimal
  var _overrideReason: String
  var _overrideSource: OverrideSourceType

  var _costRoundingLevel: Integer
  var _costRoundingMode: RoundingModeType

  var _prorationMethod: ProrationMethod

  var _quoteRoundingLevel: Integer
  var _quoteRoundingMode: RoundingMode

  var _effectiveDate: Date
  var _expirationDate: Date

  var _costCurrencyChangedFromPreferredCurrency: boolean as CostCurrencyChangedFromPreferredCurrency

  private construct(cost: Cost) {
    initialize(cost)
  }

  static function create(cost: Cost): ICostDataInitWrapper {
    return new ValueOnlyCostDataInitWrapper(cost)
  }

  override property get StandardTermAmount(): BigDecimal {
    return _standardTermAmount
  }

  override property get StandardAdjRate(): BigDecimal {
    return _standardAdjRate
  }

  override property get StandardBaseRate(): BigDecimal {
    return _standardBaseRate
  }

  override property get OverrideBaseRate(): BigDecimal {
    return _overrideBaseRate
  }

  override property get OverrideAdjRate(): BigDecimal {
    return _overrideAdjRate
  }

  override property get OverrideAmount(): BigDecimal {
    return _overrideAmount
  }

  override property get OverrideTermAmount(): BigDecimal {
    return _overrideTermAmount
  }

  override property get OverrideReason(): String {
    return _overrideReason
  }

  override property get OverrideSource(): OverrideSourceType {
    return _overrideSource
  }

  override property get QuoteRoundingLevel(): Integer {
    return _quoteRoundingLevel
  }

  override property get QuoteRoundingMode(): RoundingMode {
    return _quoteRoundingMode
  }

  override property get CostRoundingLevel(): Integer {
    return _costRoundingLevel
  }

  override property get CostRoundingMode(): RoundingModeType {
    return _costRoundingMode
  }

  override property get ProrationMethod(): ProrationMethod {
    return _prorationMethod
  }

  override property get CostEffectiveDate(): Date {
    return _effectiveDate
  }

  override property get CostExpirationDate(): Date {
    return _expirationDate
  }

  override property get CostCurrencyChangedFromPreferredCurrency(): boolean {
    return _costCurrencyChangedFromPreferredCurrency
  }

  // =================================================================================== Private Helper Functions

  private function initialize(cost: Cost) {
    _standardTermAmount = cost.StandardTermAmount
    _standardAdjRate = cost.StandardAdjRate
    _standardBaseRate = cost.StandardBaseRate

    _overrideBaseRate = cost.OverrideBaseRate
    _overrideAdjRate = cost.OverrideAdjRate
    _overrideAmount = cost.OverrideAmount
    _overrideTermAmount = cost.OverrideTermAmount
    _overrideReason = cost.OverrideReason
    _overrideSource = cost.OverrideSource

    _quoteRoundingLevel = getQuoteRoundingLevel(cost)
    _quoteRoundingMode = getQuoteRoundingMode(cost)

    _costRoundingLevel = cost.RoundingLevel
    _costRoundingMode = cost.RoundingMode

    _prorationMethod = cost.ProrationMethod

    _effectiveDate = cost.EffectiveDate
    _expirationDate = cost.ExpirationDate

    _costCurrencyChangedFromPreferredCurrency = isCostCurrencyChangedFromPreferredCurrency(cost)
  }

  private static function getQuoteRoundingLevel(cost: Cost): Integer {
    var period = cost.BranchUntyped as PolicyPeriod
    return period.Policy.Product.QuoteRoundingLevel
  }

  private static function getQuoteRoundingMode(cost: Cost): RoundingMode {
    var period = cost.BranchUntyped as PolicyPeriod
    return period.Policy.Product.QuoteRoundingMode
  }

  private static function isCostCurrencyChangedFromPreferredCurrency(cost: Cost): boolean {
    var period = cost.BranchUntyped as PolicyPeriod
    return cost.SettlementCurrency != period.PreferredSettlementCurrency or
        cost.CoverageCurrency != period.PreferredCoverageCurrency
  }
}