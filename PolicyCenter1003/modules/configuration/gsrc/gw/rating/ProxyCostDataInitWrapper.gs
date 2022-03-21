package gw.rating

uses java.math.BigDecimal
uses java.math.RoundingMode

/**
 * An implementation of the ICostDataInitWrapper interface. This class can be utilized to provide the
 * properties of a Cost entity that are required to initialize a CostData object. ProxyCostDataInitWrapper
 * is the default cost wrapper created by the {@link CostData#createCostDataInitWrapper(Cost)} method
 * during the initialization of CostDataWithOverrideSupport objects.
 *
 * @see CostDataWithOverrideSupport
 */
@Export
class ProxyCostDataInitWrapper implements ICostDataInitWrapper {

  final var _cost: Cost as Cost

  private construct(cost: Cost) {
    _cost = cost
  }

  static function create(cost: Cost) : ICostDataInitWrapper {
    return new ProxyCostDataInitWrapper(cost)
  }

  override property get StandardTermAmount(): BigDecimal {
    return Cost.StandardTermAmount
  }

  override property get StandardAdjRate(): BigDecimal {
    return Cost.StandardAdjRate
  }

  override property get StandardBaseRate(): BigDecimal {
    return Cost.StandardBaseRate
  }

  override property get OverrideBaseRate(): BigDecimal {
    return Cost.OverrideBaseRate
  }

  override property get OverrideAdjRate(): BigDecimal {
    return Cost.OverrideAdjRate
  }

  override property get OverrideAmount(): BigDecimal {
    return Cost.OverrideAmount
  }

  override property get OverrideTermAmount(): BigDecimal {
    return Cost.OverrideTermAmount
  }

  override property get OverrideReason(): String {
    return Cost.OverrideReason
  }

  override property get OverrideSource(): OverrideSourceType {
    return Cost.OverrideSource
  }

  override property get QuoteRoundingLevel(): Integer {
    var period = Cost.BranchUntyped as PolicyPeriod
    return period.Policy.Product.QuoteRoundingLevel
  }

  override property get QuoteRoundingMode(): RoundingMode {
    var period = Cost.BranchUntyped as PolicyPeriod
    return period.Policy.Product.QuoteRoundingMode
  }

  override property get CostRoundingLevel(): Integer {
    return Cost.RoundingLevel
  }

  override property get CostRoundingMode(): RoundingModeType {
    return Cost.RoundingMode
  }

  override property get ProrationMethod(): ProrationMethod {
    return Cost.ProrationMethod
  }

  override property get CostEffectiveDate(): Date {
    return Cost.EffectiveDate
  }

  override property get CostExpirationDate(): Date {
    return Cost.ExpirationDate
  }

  override property get CostCurrencyChangedFromPreferredCurrency(): boolean {
    var period = Cost.BranchUntyped as PolicyPeriod
    return Cost.SettlementCurrency != period.PreferredSettlementCurrency or
        Cost.CoverageCurrency != period.PreferredCoverageCurrency
  }
}