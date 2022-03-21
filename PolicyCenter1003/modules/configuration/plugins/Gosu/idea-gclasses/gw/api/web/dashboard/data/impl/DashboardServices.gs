package gw.api.web.dashboard.data.impl

uses gw.api.web.dashboard.data.billing.BillingService
uses gw.api.web.dashboard.data.claims.ClaimService
uses gw.api.web.dashboard.data.accountoverview.AccountOverviewService
uses gw.api.web.dashboard.data.impl.customersummary.AccountOverviewServiceImpl
uses gw.api.web.dashboard.data.impl.billing.BillingServiceImpl
uses gw.api.web.dashboard.data.impl.claims.ClaimServiceImpl
uses gw.api.web.dashboard.data.impl.currentpolicies.CurrentPoliciesServiceImpl
uses gw.api.web.dashboard.data.currentpolicies.CurrentPoliciesService

@Export
class DashboardServices {
  static var _instance: DashboardServices as readonly Instance = new DashboardServices()

  var _claimService: ClaimService as ClaimService = new ClaimServiceImpl()
  var _currentPoliciesService: CurrentPoliciesService as CurrentPoliciesService = new CurrentPoliciesServiceImpl()
  var _billingService: BillingService as BillingService = new BillingServiceImpl()
  var _accountOverviewService: AccountOverviewService as AccountOverviewService = new AccountOverviewServiceImpl()
}