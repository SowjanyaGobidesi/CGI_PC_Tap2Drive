package gw.web.contact.impl

uses gw.plugin.billing.BCAccountBillingDisplayTotals
uses gw.web.account.AccountBillingUIHelper
uses typekey.Currency

/**
 * Implements the 7.0 accelerator version of a helper that provides access to
 * Billing Account Information for accounts used to calculate metrics associated
 * with a specified contact who is the account holder.
 */
@Export
class BillingMetricsCollector {

  static final var _instance : BillingMetricsCollector as readonly Instance
      = new BillingMetricsCollector()

  private construct() {
  }

  function findBillingInfosForAccounts(accountNumbers : Set<String>, currency : Currency) : BCAccountBillingDisplayTotals {
    return AccountBillingUIHelper.retrieveBillingSummary(accountNumbers, currency)
  }

  function findBillingInfosForAccount(accountNumber : String, currency : Currency) : BCAccountBillingDisplayTotals {
    return AccountBillingUIHelper.retrieveBillingSummary({accountNumber}, currency)
  }
}
