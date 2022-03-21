package gw.plugin.billing.bc1000

uses gw.api.locale.DisplayKey
uses gw.api.webservice.exception.DataConversionException
uses gw.plugin.billing.PlanSummary
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PlanCurrencyInfo

/**
 * Defines an enhancement to {@code PlanSummary} and its subclasses that
 * encapsulates synchronization with a {@code PlanCurrencyInfo}.
 */
enhancement PlanSummaryEnhancement : PlanSummary {
  function syncCurrency(plan : PlanCurrencyInfo) {
    this.Currencies = new Currency[plan.Currencies.Count]
    for (currency in plan.Currencies index i) {
      this.Currencies[i] = Currency.get(currency)
      if (this.Currencies[i] == null) {
        throw new DataConversionException(
            DisplayKey.get("Webservice.Error.Currency.Unknown", currency))
      }
    }
    this.Name = plan.Name
    this.Id = plan.PublicID
  }
}
