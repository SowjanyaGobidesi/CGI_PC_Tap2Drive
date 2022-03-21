package gw.api.web.dashboard.ui.billing

uses gw.api.web.ExternalSystemPages
uses pcf.BCAccount
uses pcf.BCPolicy

@Export
class OpenBillingHandler {

  final var _openInBilling()
  final var _actionLabel: String as ActionLabel

  construct(account: Account, actionLabel: String) {
    _openInBilling = \-> BCAccount.push(ExternalSystemPages.BillingPageURL, account.AccountNumber)
    _actionLabel = actionLabel
  }

  construct(policyPeriod: PolicyPeriod, actionLabel: String) {
    _openInBilling = \-> BCPolicy.push(ExternalSystemPages.BillingPageURL, policyPeriod.PolicyNumber, policyPeriod.TermNumber)
    _actionLabel = actionLabel
  }

  function openInBillng() {
    _openInBilling()
  }
}