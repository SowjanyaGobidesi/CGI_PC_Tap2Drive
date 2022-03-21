package gw.plugin.billing

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.LocationUtil
uses gw.plugin.Plugins

uses java.io.Serializable
/**
 * A search criteria utility class used to search for Agency bill plans in the Billing system
 */
@Export
class AgencyBillPlanSearchCriteria implements Serializable {
  var _planName : String as PlanName

  function doSearch() : AgencyBillPlanSummary[] {
    if (_planName == null) {
      return AllAgencyBillPlans
    }
    return AllAgencyBillPlans.where(\plan -> plan.Name.toLowerCase().contains(_planName.toLowerCase()))
  }

  static property get AllAgencyBillPlans() : AgencyBillPlanSummary[] {
    try {
      return Plugins.get(IBillingSystemPlugin).retrieveAllAgencyBillPlans()
    } catch (e: Exception) {
      LocationUtil.addRequestScopedErrorMessage(DisplayKey.get("Web.Errors.BillingSystem.AgencyPlans"))
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.error(DisplayKey.get("Web.Errors.BillingSystem.AgencyPlans"), e)
    }
    return {}
  }
}