package gw.plugin.billing

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory

uses java.io.Serializable

/**
 * A search criteria utility class used to search for Commission plans in the Billing system
 */
@Export
class CommissionPlanSearchCriteria implements Serializable {

  var _name : String as CommissionPlanName
  var _tier : Tier as Tier

  construct (tier : Tier){
    _tier = tier
  }

  public function doSearch() : CommissionPlanSummary[] {
    var commissionPlanSummaries = getCommissionPlans(_tier).toList()

    if(_name != null) {
      commissionPlanSummaries.removeWhere(\planSummary -> !planSummary.Name.toLowerCase().contains(_name.toLowerCase()))
    }

    return commissionPlanSummaries.toTypedArray()
  }

  public static function getCommissionPlans(tier: typekey.Tier): CommissionPlanSummary[] {
    var plans: CommissionPlanSummary[]
    var producerTier = tier == null ? typekey.Tier.TC_BRONZE : tier
    try {
      var BillingSystem = gw.plugin.Plugins.get(gw.plugin.billing.IBillingSystemPlugin)
      plans = BillingSystem.retrieveAllCommissionPlans().where(\c -> c.AllowedTiers.contains(producerTier))
    } catch (e: java.lang.Exception) {
      gw.api.util.LocationUtil.addRequestScopedErrorMessage(DisplayKey.get("Web.Errors.BillingSystem.CommissionPlans"))
      PCLoggerCategory.SERVER.error("Unable to contact billing service about commission plans", e)
      return {}
    }
    if (plans.Count == 0) {
      gw.api.util.LocationUtil.addRequestScopedErrorMessage(DisplayKey.get("Web.Admin.ProducerCodeDetail.Error.NoCommissionPlan", producerTier))
    }
    return plans
  }
}