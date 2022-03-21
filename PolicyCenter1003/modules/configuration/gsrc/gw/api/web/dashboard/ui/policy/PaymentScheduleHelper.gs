package gw.api.web.dashboard.ui.policy

uses gw.api.web.dashboard.ui.DashboardParameters
uses gw.plugin.billing.BillingInvoiceInfo
uses gw.plugin.billing.IBillingSummaryPlugin
uses gw.web.policy.PolicyBillingUIHelper
uses pcf.PolicyFile_Billing

@Export
class PaymentScheduleHelper {

  private var _invoices: BillingInvoiceInfo[]
  private var _policyPeriod: PolicyPeriod
  private var _asOfDate: Date

  construct(policyPeriod: PolicyPeriod, asOfDate: Date) {

    _policyPeriod = policyPeriod
    _asOfDate = asOfDate

    var billingSummary = PolicyBillingUIHelper.retrieveBillingSummary(gw.plugin.Plugins.get(IBillingSummaryPlugin), policyPeriod)
    _invoices = billingSummary.Invoices
  }

  property get ViewMoreVisible(): boolean {
    return _invoices.Count > DashboardParameters.ListViewLimitShort
  }

  property get Invoices(): BillingInvoiceInfo[] {
    return _invoices == null ? null : _invoices.sortBy(\invoice -> invoice.InvoiceDate).limit(DashboardParameters.ListViewLimitShort)
  }

  function viewMore(): void {
    PolicyFile_Billing.push(_policyPeriod, _asOfDate)
  }
}