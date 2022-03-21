package gw.bizrules.provisioning.contexts

uses gw.api.financials.IMoney
uses gw.api.locale.DisplayKey
uses gw.api.util.CurrencyUtil
uses gw.api.util.FXRateUtil
uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

uses typekey.Currency

@Export
class PolicyContextDefinitionLibrary {

  function localize(key: String): String {
    return DisplayKey.get(key)
  }

  function localize(key: String, p: Object): String {
    return DisplayKey.get(key, p)
  }

  function localize(key: String, p1: Object, p2: Object): String {
    return DisplayKey.get(key, p1, p2)
  }

  function localize(key: String, p1: Object, p2: Object, p3: Object): String {
    return DisplayKey.get(key, p1, p2, p3)
  }

  function renderAsCurrency(value: IMoney): String {
    return CurrencyUtil.renderAsCurrency(value)
  }

  function renderAsCurrency(amount: BigDecimal, currency: Currency): String {
    return CurrencyUtil.renderAsCurrency(amount, currency)
  }

  function monetaryAmount(amount: BigDecimal, currency: Currency): MonetaryAmount {
    return new MonetaryAmount(amount, currency)
  }

  function hasGoodDriverDiscount(driver: PolicyDriver): boolean {
    return (driver.AccountContactRole.AccountContact.getRole(TC_DRIVER) as Driver).GoodDriverDiscount
  }

  function convertAmount(amount: MonetaryAmount, toCurrency: Currency): MonetaryAmount {
    return FXRateUtil.convertAmount(amount, toCurrency)
  }

  function currentDate() : Date {
    return Date.Today
  }
}