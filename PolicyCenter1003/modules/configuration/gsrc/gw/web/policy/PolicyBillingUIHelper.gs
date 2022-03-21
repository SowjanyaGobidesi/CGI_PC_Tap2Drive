package gw.web.policy

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.api.util.LocationUtil
uses gw.plugin.billing.BillingPeriodInfo
uses gw.plugin.billing.BillingTermInfo
uses gw.plugin.billing.IBillingSummaryPlugin
uses org.apache.commons.lang.exception.ExceptionUtils

@Export
class PolicyBillingUIHelper {

  var _currentPolicyTermInfo : gw.plugin.billing.BillingTermInfo as CurrentPolicyTermInfo

  construct() {
  }

  construct(period: PolicyPeriod, policyTermInfos : gw.plugin.billing.BillingTermInfo[]) {
    if(policyTermInfos==null) {
      policyTermInfos = new BillingTermInfo[0]
    }
    _currentPolicyTermInfo = getPolicyTermInfoFor(period, policyTermInfos)
  }

  /**
   * Look up the {@link BillingTermInfo} in the specified array that corresponds
   *    to the specified {@link PolicyPeriod}.
   *
   * @param policyPeriod the {@link PolicyPeriod}
   * @param policyTermInfos the array of {@link BillingTermInfo}s that identify
   *                        the terms
   * @return the {@link BillingTermInfo} that identifies the
   *         {@link PolicyPeriod}, if any.
   */
  static function getPolicyTermInfoFor(
      policyPeriod : PolicyPeriod, policyTermInfos : BillingTermInfo []) : BillingTermInfo {
    return policyTermInfos.firstWhere( \ termInfo ->
        termInfo.PolicyNumber == policyPeriod.PolicyNumber
            and termInfo.TermNumber == policyPeriod.TermNumber)
  }

  function createBillingSummary(billingPlugin :IBillingSummaryPlugin , policyPeriod: PolicyPeriod): BillingPeriodInfo {
    if(CurrentPolicyTermInfo.TermNumber!=policyPeriod.TermNumber) {
      return gw.web.policy.PolicyBillingUIHelper.retrieveBillingSummary(billingPlugin, CurrentPolicyTermInfo)
    }
      return gw.web.policy.PolicyBillingUIHelper.retrieveBillingSummary(billingPlugin, policyPeriod)
  }

  /**
   * Fetch the {@link BillingPeriodInfo billing summary} for the specified
   *    {@link PolicyPeriod}.
   *
   * This uses the {@link PolicyPeriod#PolicyNumber} and {@link
   * PolicyPeriod#TermNumber} to identify the billing summary.
   *
   * @param billingPlugin the {@link IBillingSummaryPlugin billing system
   *                      summary} plugin
   * @param policyPeriod the {@link PolicyPeriod} for which to fetch the summary
   * @return the {@link BillingPeriodInfo} for the {@link PolicyPeriod}.
   */
  static function retrieveBillingSummary(
      billingPlugin : IBillingSummaryPlugin, policyPeriod : PolicyPeriod) : BillingPeriodInfo {
    return retrieveBillingSummary(billingPlugin, policyPeriod.PolicyNumber, policyPeriod.TermNumber)
  }

  /**
   * Fetch the {@link BillingPeriodInfo billing summary} for the billing period
   *    identified by the {@link BillingTermInfo}.
   *
   * @param billingPlugin the {@link IBillingSummaryPlugin billing system
   *                      summary} plugin
   * @param policyTermInfo the policy term info' whose PolicyNumber and TermNumber
   *                       identify for which billing period to fetch the summary
   * @return the {@link BillingPeriodInfo} for the billing period.
   */
  static function retrieveBillingSummary(
      billingPlugin : IBillingSummaryPlugin, policyTermInfo : BillingTermInfo) : BillingPeriodInfo {
    return retrieveBillingSummary(billingPlugin, policyTermInfo.PolicyNumber, policyTermInfo.TermNumber)
  }

  /**
   * Fetch the {@link BillingPeriodInfo billing summary} for the period
   *    identified by the specified PolicyNumber and TermNumber.
   *
   * @param billingPlugin the {@link IBillingSummaryPlugin billing system
   *                      summary} plugin
   * @param policyNumber the policy number that identifies the billing period
   * @param termNumber   the term number that identifies the billing period
   * @return the {@link BillingPeriodInfo} for the identified billing period.
   */
  static function retrieveBillingSummary(billingPlugin : IBillingSummaryPlugin, policyNumber : String,
                                        termNumber : int) : BillingPeriodInfo {
    try {
      return billingPlugin.retrievePolicyBillingSummary(policyNumber, termNumber)
    } catch (e: DisplayableException) {
      LocationUtil.addRequestScopedWarningMessage(e.Message)
      return null
    } catch (e : Exception) {
      LocationUtil.addRequestScopedErrorMessage(DisplayKey.get("Web.AccountBilling.Error.GeneralException", ExceptionUtils.getRootCauseMessage(e)))
      return null
      }
    }

  /**
   * Format a {@link BillingTermInfo} for use as an option label.
   */
  static function optionFormat(policyTermInfo : BillingTermInfo) : String {
    return DisplayKey.get("Web.Billing.BillingPeriod.Entry", policyTermInfo.TermNumber,
        policyTermInfo.EffectiveDate.ShortFormat,
        policyTermInfo.ExpirationDate.ShortFormat)
  }
}

