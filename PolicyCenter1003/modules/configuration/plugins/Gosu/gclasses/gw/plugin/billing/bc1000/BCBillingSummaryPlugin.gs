package gw.plugin.billing.bc1000

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.api.util.LocaleUtil
uses gw.plugin.billing.BillingAccountInfo
uses gw.plugin.billing.BillingInvoiceInfo
uses gw.plugin.billing.BillingPeriodInfo
uses gw.plugin.billing.BillingPolicyNotFoundException
uses gw.plugin.billing.IBillingSummaryPlugin
uses org.apache.commons.lang.exception.ExceptionUtils
uses wsi.remote.gw.webservice.bc.bc1000.billingsummaryapi.BillingSummaryAPI
uses wsi.remote.gw.webservice.bc.bc1000.billingsummaryapi.faults.BadIdentifierException

@Export
class BCBillingSummaryPlugin implements IBillingSummaryPlugin {
  var logger = gw.api.system.PCLoggerCategory.BILLING_SUMMARY_PLUGIN

  construct() {
  }

  protected function callWebService<T>(call : block(api : BillingSummaryAPI) : T) : T {
    var api = new BillingSummaryAPI()
    try {
      api.Config.Guidewire.Locale = LocaleUtil.CurrentLanguage.Code
      return call(api)
    } catch (e : BadIdentifierException) {
      logger.error(e as String)
      return null
    } catch (e : Exception) {
      logger.error("Server exception was encountered during retrieval of the billing summary", e)
      throw new DisplayableException(
          DisplayKey.get("Web.AccountBilling.Error.GeneralException", ExceptionUtils.getRootCauseMessage(e)))
    }
  }

  override function retrieveAccountBillingSummaries(accountNumber: String) : BillingAccountInfo[] {
    var bcSummary = callWebService(\ api -> {
      return api.retrieveAccountBillingSummary(accountNumber)
    })

    if (bcSummary == null) {
      throw new DisplayableException(DisplayKey.get("Web.AccountBilling.Warning.BillingNotAvailable"))
    }

    return bcSummary.map(\s -> new gw.plugin.billing.bc1000.BCAccountBillingSummaryWrapper(s))
  }

  override function retrieveAccountBillingSummaries(accountNumbers: String[]): BillingAccountInfo[] {
    return callWebService(\api -> api.retrieveMultipleAccountsBillingSummary(accountNumbers))
        .map(\s -> new BCAccountBillingSummaryWrapper(s))
  }

  override function retrievePolicyBillingSummary(policyNumber : String, termNumber : int) : BillingPeriodInfo {
    var bcSummary = callWebService(\ api -> {
      return api.retrievePolicyBillingSummary(policyNumber, termNumber)
    })

    if (bcSummary == null) {
      throw new BillingPolicyNotFoundException(DisplayKey.get("Web.AccountBilling.Warning.PolicyNotFound", policyNumber))
    }
    return new gw.plugin.billing.bc1000.BCPolicyBillingSummaryWrapper(bcSummary, policyNumber, termNumber)
  }

  override function retrieveBillingPolicies(accountNumber: String) : BillingPeriodInfo[] {
    var periodInfos = callWebService(\ api -> {
      return api.retrievePeriodsForAccount(accountNumber)
    })

    if (periodInfos == null) {
      throw new DisplayableException(DisplayKey.get("Web.AccountBilling.Warning.BillingNotAvailable"))
    }

    return periodInfos.map(\ periodInfo -> new gw.plugin.billing.bc1000.BCDisplayablePolicyPeriodWrapper(periodInfo))
  }


  override function retrieveAccountInvoices(accountNumber: String) : BillingInvoiceInfo[] {
    var invoices = callWebService(\ api -> {
      return api.retrieveInvoicesForAccount(accountNumber)
    })
    if (invoices == null) {
      throw new DisplayableException(DisplayKey.get("Web.AccountBilling.Warning.BillingNotAvailable"))
    }
    return invoices.map(\ p -> new BCInvoiceInfoWrapper(p))
  }

  override function getPoliciesBilledToAccount(accountNumber : String) : BillingPeriodInfo [] {
    var periodInfos = callWebService(\ api -> {
      return api.retrievePeriodsBilledToAccount(accountNumber)
    })
    if (periodInfos == null) {
      throw new DisplayableException(DisplayKey.get("Web.AccountBilling.Warning.BillingNotAvailable"))
    }
    return periodInfos.map(\ periodInfo -> new gw.plugin.billing.bc1000.BCDisplayablePolicyPeriodWrapper(periodInfo))
  }

}
