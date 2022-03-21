package gw.api.web.dashboard.data.accountoverview

uses gw.pl.currency.MonetaryAmount

/**
 * The data for use in Account Overview Dashboard Tile
 */
@Export
class AccountOverviewDTO {
  static final var _empty: AccountOverviewDTO as readonly EMPTY = new AccountOverviewDTO()

  public static final var DELINQUENCIES_UNAVAILABLE: int = -1

  var _inForcePremium: MonetaryAmount as InForcePremium
  var _lifetimePremium: MonetaryAmount as LifetimePremium
  var _totalLosses: MonetaryAmount as TotalLosses
  var _firstEffectivePolicyDate: Date as FirstEffectivePolicyDate
  var _openClaims: int as OpenClaims
  var _inForcePolicies: int as InForcePolicies
  var _nonPaymentCancellations: int as NonPaymentCancellations
  var _serviceTier: Optional<CustomerServiceTier> as ServiceTier = Optional.empty()
  /**
   * Number of delinquencies. Negative value means the data about delinquencies is unavailable.
   */
  var _delinquenciesValue: int as DelinquenciesValue

  property get Tiered(): boolean {
    return _serviceTier.Present
  }

  property get Delinquencies(): Optional<Integer> {
    return DelinquenciesValue >= 0 ? Optional.of(DelinquenciesValue) : Optional.empty()
  }

  override function equals(that: Object): boolean {
    if (that === this) {
      return true
    }
    if (not (that typeis AccountOverviewDTO)) {
      return false
    }
    var thatCustomer = that as AccountOverviewDTO
    return this._inForcePremium == thatCustomer._inForcePremium and
        this._lifetimePremium == thatCustomer._lifetimePremium and
        this._totalLosses == thatCustomer._totalLosses and
        this._firstEffectivePolicyDate == thatCustomer._firstEffectivePolicyDate and
        this._openClaims == thatCustomer._openClaims and
        this._inForcePolicies == thatCustomer._inForcePolicies and
        this._nonPaymentCancellations == thatCustomer._nonPaymentCancellations and
        this._delinquenciesValue == thatCustomer._delinquenciesValue and
        this._serviceTier == thatCustomer._serviceTier
  }

  override function hashCode(): int {
    return Objects.hash({
        _inForcePremium,
        _lifetimePremium,
        _totalLosses,
        _firstEffectivePolicyDate,
        _openClaims,
        _inForcePolicies,
        _nonPaymentCancellations,
        _delinquenciesValue,
        _serviceTier
    })
  }
}