package gw.api.web.dashboard.data.impl.billing

uses gw.api.web.dashboard.data.billing.BillingService
uses gw.api.web.dashboard.data.billing.BillingSummaryDTO
uses gw.pl.currency.MonetaryAmount
uses gw.pl.util.ArgCheck
uses gw.plugin.Plugins
uses gw.plugin.billing.BCAccountBillingDisplayTotals
uses gw.plugin.billing.BillingAccountInfo
uses gw.plugin.billing.BillingPeriodInfo
uses gw.plugin.billing.IBillingSummaryPlugin
uses typekey.Currency

@Export
class BillingServiceImpl implements BillingService {
  final var _billingPlugin(): IBillingSummaryPlugin

  construct(billingPlugin: IBillingSummaryPlugin) {
    _billingPlugin = \-> billingPlugin
  }

  construct() {
    _billingPlugin = \-> Plugins.get(IBillingSummaryPlugin)
  }

  override function getBillingSummary(currency: Currency, accountNumbers: String[]): BillingSummaryDTO {
    ArgCheck.nonNull(accountNumbers, "Accounts cannot be null")
    return toDTO(currency, accountNumbers.HasElements ? _billingPlugin().retrieveAccountBillingSummaries(accountNumbers) : {})
  }

  override function getPolicyBillingSummary(policyPeriod: PolicyPeriod): BillingSummaryDTO {
    ArgCheck.nonNull(policyPeriod, "Policy period cannot be null")
    return toDTO(_billingPlugin().retrievePolicyBillingSummary(policyPeriod.PolicyNumber, policyPeriod.TermNumber))
  }

  private function toDTO(currency: Currency, infos: BillingAccountInfo[]): BillingSummaryDTO {
    var totals = new BCAccountBillingDisplayTotals(infos, currency)
    var summary = new BillingSummaryDTO() {
      :Unbilled = new MonetaryAmount(totals.UnbilledTotal.Total, currency),
      :Billed = new MonetaryAmount(totals.BilledOutstandingCurrent.Total, currency),
      :PastDue = new MonetaryAmount(totals.BilledOutstandingPastDue.Total, currency),
      :Paid = totals.Paid.Exists ? new MonetaryAmount(totals.Paid.Total, currency) : null,
      :WrittenOff = totals.WrittenOff.Exists ? new MonetaryAmount(totals.WrittenOff.Total, currency) : null,
      :RelevantAccounts = infos*.AccountCurrencyGroupOwner.toSet().toList(),
      :AggregatedMultipleCurrencies = infos*.BillingCurrency.toSet().size() > 1
    }
    infos.each(\info -> {
      var accountNumber = info.AccountCurrencyGroupOwner
      if (nextInvoicesDueDateValid(info.NextInvoicesDueDate) and
          nextInvoicesDueDateIsEarlier(info, summary, accountNumber)) {
        summary.nextInvoiceDueDate(accountNumber, info.NextInvoicesDueDate)
        info.NextInvoicesDue
            .where(\np -> invoiceValid(np))
            .each(\np -> summary.nextInvoiceDue(accountNumber, np.Amount, np.InvoiceID))
      }
      if (paymentValid(info.LastPaymentReceived) and lastPaymentIsLater(info, summary, accountNumber)) {
        summary.lastPaymentReceived(accountNumber, info.LastPaymentReceived.Date,
            info.LastPaymentReceived.Amount, info.LastPaymentReceived.MoneyReceivedID)
      }
    })
    return summary
  }

  private function lastPaymentIsLater(info: BillingAccountInfo, summary: BillingSummaryDTO, accountNumber: String) : boolean {
    return summary.LastPaymentReceived[accountNumber] == null or
        info.LastPaymentReceived.Date.after(summary.LastPaymentReceived[accountNumber].Date)
  }

  private function nextInvoicesDueDateIsEarlier(info: BillingAccountInfo, summary: BillingSummaryDTO, accountNumber: String) : boolean {
    return summary.NextInvoicesDueDate[accountNumber] == null or
        info.NextInvoicesDueDate.before(summary.NextInvoicesDueDate[accountNumber])
  }

  private function toDTO(info: BillingPeriodInfo): BillingSummaryDTO {
    var summary = new BillingSummaryDTO() {
      :Unbilled = info.Unbilled,
      :Billed = info.TotalBilledUnsettled,
      :PastDue = info.PastDue,
      :Paid = info.Paid,
      :WrittenOff = info.WrittenOff,
      :Invoices = info.Invoices
    }
    return summary
  }

  private function invoiceValid(invoice: BillingAccountInfo.Invoice): boolean {
    return invoice.InvoiceID != null
        and invoice.Amount != null
  }

  private function nextInvoicesDueDateValid(date: Date): boolean {
    return date != null
  }

  private function paymentValid(payment: BillingAccountInfo.MoneyReceived): boolean {
    return payment != null
        and payment.Date != null
        and payment.Amount != null
        and payment.MoneyReceivedID != null
  }
}