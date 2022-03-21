package gw.plugin.billing.bc900

uses gw.api.locale.DisplayKey
uses gw.api.webservice.exception.DataConversionException
uses gw.plugin.billing.PlanSummary
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PlanCurrencyInfo

/**
 * Defines an enhancement to {@code PlanSummary} and its subclasses that
 * encapsulates synchronization with a {@code PlanCurrencyInfo}.
 */
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement PlanSummaryEnhancement : PlanSummary {
  function syncCurrency(plan : PlanCurrencyInfo) {
    var currency = Currency.get(plan.Currency)
    if (currency == null) {
      throw new DataConversionException(
          DisplayKey.get("Webservice.Error.Currency.Unknown", plan.Currency))
    }
    this.Currencies = {currency}
    this.Name = plan.Name
    this.Id = plan.PublicID
  }
}
