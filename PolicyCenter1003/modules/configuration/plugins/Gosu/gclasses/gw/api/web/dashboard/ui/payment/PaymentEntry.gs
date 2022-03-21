package gw.api.web.dashboard.ui.payment

uses gw.api.system.PCConfigParameters
uses gw.api.web.dashboard.data.billing.BillingSummaryDTO
uses gw.pl.currency.MonetaryAmount
uses pcf.BCInvoice
uses pcf.BCPayment

uses PaymentFormatter#formatLastPayment(Date, MonetaryAmount)
uses PaymentFormatter#formatNextInvoice(Date, MonetaryAmount[])

@Export
class PaymentEntry {
  final var _account: Account as readonly Account
  final var _lastPayment: BillingSummaryDTO.MoneyReceived as readonly LastPayment
  final var _nextInvoicesDate: Date as readonly NextInvoicesDate
  final var _nextInvoices: List<BillingSummaryDTO.Invoice> as readonly NextInvoices

  construct(account: Account, lastPayment: BillingSummaryDTO.MoneyReceived, nextInvoicesDate: Date, nextInvoices: List<BillingSummaryDTO.Invoice>) {
    _account = account
    _lastPayment = lastPayment
    _nextInvoicesDate = nextInvoicesDate
    _nextInvoices = nextInvoices
  }

  property get LastPaymentAvailable(): boolean {
    return _lastPayment != null
  }

  function viewLastPaymentInBillingCenter() {
    if (_lastPayment != null) {
      BCPayment.push(PCConfigParameters.BillingSystemURL.Value, _lastPayment.MoneyReceivedID)
    }
  }

  property get FormattedLastPayment(): String {
    return formatLastPayment(_lastPayment.Date, _lastPayment.Amount)
  }

  function viewNextInvoiceInBillingCenter() {
    BCInvoice.push(PCConfigParameters.BillingSystemURL.Value, _nextInvoices.first().InvoiceID)
  }

  property get NextInvoiceAvailable(): boolean {
    return _nextInvoicesDate != null
  }

  property get FormattedNextInvoice(): String {
    return formatNextInvoice(_nextInvoicesDate, _nextInvoices*.Amount)
  }
}