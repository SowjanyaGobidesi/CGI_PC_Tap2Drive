package gw.product

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.CurrencyUtil
uses gw.api.util.LocationUtil
uses gw.plugin.Plugins
uses gw.plugin.billing.IBillingSystemPlugin
uses gw.transaction.Transaction

uses java.lang.Exception

/**
 * This enhancement enables user to retrieve a list of Currencies associated with a given ProducerCode
 */

enhancement ProducerCodeCommissionPlanEnhancement: entity.ProducerCode {

  property get Currencies() : Currency[] {
    return this.CommissionPlans.map( \ c -> c.Currency)
  }

  property get SingleCurrencyCommissionPlanCurrency() : Currency {
    return SingleCurrencyCommissionPlan?.Currency
  }

  property get SingleCurrencyCommissionPlanID() : String {
    return SingleCurrencyCommissionPlan?.CommissionPlanID
  }

  property set SingleCurrencyCommissionPlanID(commissionPlanID : String) {
    var commissionPlan = SingleCurrencyCommissionPlan
    if (commissionPlan == null) {
      this.addCommissionPlanForCurrency(CurrencyUtil.DefaultCurrency)
      commissionPlan = this.findCommissionPlanByCurrency(CurrencyUtil.DefaultCurrency)
    }
    commissionPlan.CommissionPlanID = commissionPlanID
  }

  private property get SingleCurrencyCommissionPlan() : CommissionPlan {
    var commissionPlan = this.CommissionPlans.where( \ elt -> elt.Currency == CurrencyUtil.DefaultCurrency)
    return commissionPlan.IsEmpty ? null : commissionPlan.single()
  }

  function syncWithBillingSystem() {
    if (!this.New) {
      Transaction.runWithNewBundle(\b -> {
        var syncedProducerCode = b.add(this)
        try {
          Plugins.get(IBillingSystemPlugin).syncProducerCode(syncedProducerCode)
        } catch (e: Exception) {
          LocationUtil.addRequestScopedErrorMessage(DisplayKey.get("Web.Errors.BillingSystem.CommissionPlans"))
          PCLoggerCategory.SERVER.error("", e)
        }
      })
      this.refresh()
    }
  }
}
