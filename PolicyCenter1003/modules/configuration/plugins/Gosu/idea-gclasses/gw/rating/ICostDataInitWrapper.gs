package gw.rating;

uses typekey.OverrideSourceType;
uses typekey.ProrationMethod;
uses typekey.RoundingModeType;
uses java.math.BigDecimal;
uses java.math.RoundingMode
uses java.util.Date;

/**
 * This interface defines a wrapper class utilized in the initialization of CostData objects.
 *
 * @see ProxyCostDataInitWrapper
 * @see ValueOnlyCostDataInitWrapper
 * @see CostDataWithOverrideSupport
 */
@Export
interface ICostDataInitWrapper {

  property get StandardTermAmount(): BigDecimal

  property get StandardAdjRate(): BigDecimal

  property get StandardBaseRate(): BigDecimal

  property get OverrideBaseRate(): BigDecimal

  property get OverrideAdjRate(): BigDecimal

  property get OverrideAmount(): BigDecimal

  property get OverrideTermAmount(): BigDecimal

  property get OverrideReason(): String

  property get OverrideSource(): OverrideSourceType

  property get QuoteRoundingLevel(): Integer

  property get QuoteRoundingMode(): RoundingMode

  property get CostRoundingLevel(): Integer

  property get CostRoundingMode(): RoundingModeType

  property get ProrationMethod(): ProrationMethod

  property get CostEffectiveDate(): Date

  property get CostExpirationDate(): Date

  property get CostCurrencyChangedFromPreferredCurrency(): boolean
}