package gw.web.account

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.api.util.LocationUtil
uses gw.plugin.billing.BCAccountBillingDisplayTotals
uses gw.plugin.billing.BillingAccountInfo
uses gw.web.contact.impl.AccountQueryHelper
uses gw.xml.ws.WebServiceException
uses typekey.Currency

@Export
class AccountBillingUIHelper {

  static function retrieveAccountNumbers(account: Account): Map<String, String> {
    var result : Map<String, String> = {}
    result.put(account.AccountNumber, renderAccount(account.AccountNumber, account.AccountHolderContact.DisplayName))
    try {
      var plugin = gw.plugin.Plugins.get(gw.plugin.billing.IBillingSystemPlugin)
      plugin.getSubAccounts(account.AccountNumber)
          .each(\g -> result.put(g.AccountNumber, g.DisplayName))
    } catch (e: gw.api.util.DisplayableException) {
      LocationUtil.addRequestScopedErrorMessage(e.LocalizedMessage)
    } catch (e: WebServiceException) {
      PCLoggerCategory.SERVER.warn("", e)
    }
    return result
  }

  static function retrieveBillingSummary(accountNumbers: Set<String>, currency: Currency): BCAccountBillingDisplayTotals {
    var billingInfos: BillingAccountInfo[] = {}
    try {
      var plugin = gw.plugin.Plugins.get(gw.plugin.billing.IBillingSummaryPlugin)
      billingInfos = plugin.retrieveAccountBillingSummaries(accountNumbers.toTypedArray())

      var retrievedAccountNumbers = billingInfos.map(\info -> info.AccountCurrencyGroupOwner).toSet()
      var missingAccountNumbers = accountNumbers.where(\accountNumber -> !retrievedAccountNumbers.contains(accountNumber))
      missingAccountNumbers.each(\accountNumber -> {
        var warningMessage = DisplayKey.get("Web.AccountBilling.Warning.BillingNotAvailable")
        LocationUtil.addRequestScopedWarningMessage(warningMessage)
      })
    } catch (e: DisplayableException) {
      LocationUtil.addRequestScopedErrorMessage(e.LocalizedMessage)
    }
    return new BCAccountBillingDisplayTotals(billingInfos, currency)
  }

  static function renderAccount(accountNumber : String, accountName : String) : String {
    return accountNumber + " (" + accountName + ")"
  }
}
