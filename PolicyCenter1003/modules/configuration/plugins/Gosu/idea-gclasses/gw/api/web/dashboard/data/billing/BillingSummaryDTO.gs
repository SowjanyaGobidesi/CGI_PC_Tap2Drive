package gw.api.web.dashboard.data.billing

uses com.google.common.collect.ArrayListMultimap
uses com.google.common.collect.ListMultimap
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.billing.BillingInvoiceInfo

/**
 * Billing Data for use in Billing/Payment Dashboard Tiles
 */
@Export
class BillingSummaryDTO {
  static var _empty: BillingSummaryDTO as readonly EMPTY = new BillingSummaryDTO()

  class Invoice {
    var _amount: MonetaryAmount as Amount
    var _invoiceID: String as InvoiceID

    override function equals(that: Object): boolean {
      if (this === that) {
        return true
      }
      if (not (that typeis Invoice)) {
        return false
      }
      var thatInvoice = that as Invoice
      return this._amount == thatInvoice._amount and
          this._invoiceID == thatInvoice._invoiceID
    }

    override function hashCode(): int {
      return Objects.hash({_amount, _invoiceID})
    }
  }

  class MoneyReceived {
    var _date: Date as Date
    var _amount: MonetaryAmount as Amount
    var _moneyReceivedID: String as MoneyReceivedID

    override function equals(that: Object): boolean {
      if (this === that) {
        return true
      }
      if (not (that typeis MoneyReceived)) {
        return false
      }
      var thatPayment = that as MoneyReceived
      return this._date == thatPayment._date and
          this._amount == thatPayment._amount and
          this._moneyReceivedID == thatPayment._moneyReceivedID
    }

    override function hashCode(): int {
      return Objects.hash({_date, _amount, _moneyReceivedID})
    }
  }

  var _unbilled: MonetaryAmount as Unbilled
  var _paid: MonetaryAmount as Paid
  var _writtenOff: MonetaryAmount as WrittenOff
  var _billed: MonetaryAmount as Billed
  var _pastDue: MonetaryAmount as PastDue
  var _invoices: BillingInvoiceInfo[] as Invoices
  var _nextInvoicesDueDate: Map<String, Date> as readonly NextInvoicesDueDate = {}
  var _nextInvoicesDue: ListMultimap<String, Invoice> as readonly NextInvoicesDue = ArrayListMultimap.create()
  var _lastPaymentReceived: Map<String, MoneyReceived> as readonly LastPaymentReceived = {}
  var _relevantAccounts: List<String> as RelevantAccounts = {}
  var _aggregatedMultipleCurrencies: boolean as AggregatedMultipleCurrencies = false

  function nextInvoiceDueDate(accountNumber: String, dueDate: Date): BillingSummaryDTO {
    NextInvoicesDueDate[accountNumber] = dueDate
    return this
  }

  function nextInvoiceDue(accountNumber: String, amount: MonetaryAmount, invoiceId: String): BillingSummaryDTO {
    NextInvoicesDue.put(accountNumber, new Invoice() {
      :Amount = amount,
      :InvoiceID = invoiceId
    })
    return this
  }

  function lastPaymentReceived(accountNumber: String, date: Date, amount: MonetaryAmount, moneyReceivedId: String): BillingSummaryDTO {
    LastPaymentReceived[accountNumber] = new MoneyReceived() {
      :Date = date,
      :Amount = amount,
      :MoneyReceivedID = moneyReceivedId
    }
    return this
  }

  override function equals(that: Object): boolean {
    if (that === this) {
      return true
    }
    if (not (that typeis BillingSummaryDTO)) {
      return false
    }
    var thatBilling = that as BillingSummaryDTO
    return this._unbilled == thatBilling._unbilled and
        this._paid == thatBilling._paid and
        this._writtenOff == thatBilling._writtenOff and
        this._billed == thatBilling._billed and
        this._pastDue == thatBilling._pastDue and
        this._nextInvoicesDueDate == thatBilling._nextInvoicesDueDate and
        this._nextInvoicesDue == thatBilling._nextInvoicesDue and
        this._lastPaymentReceived == thatBilling._lastPaymentReceived and
        this._relevantAccounts == thatBilling._relevantAccounts and
        this._invoices == thatBilling._invoices

  }

  override function hashCode(): int {
    return Objects.hash({
        _paid,
        _writtenOff,
        _billed,
        _pastDue,
        _nextInvoicesDueDate,
        _nextInvoicesDue,
        _lastPaymentReceived,
        _relevantAccounts,
        _invoices
    })
  }
}