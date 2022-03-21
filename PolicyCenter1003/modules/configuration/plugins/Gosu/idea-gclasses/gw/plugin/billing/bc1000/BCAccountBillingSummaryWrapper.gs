package gw.plugin.billing.bc1000

uses gw.pl.currency.MonetaryAmount
uses gw.plugin.billing.BillingAccountInfo
uses gw.plugin.billing.BillingContactInfo
uses gw.plugin.billing.BillingPaymentInfo
uses typekey.Currency
uses wsi.remote.gw.webservice.bc.bc1000.billingsummaryapi.types.complex.BCPCAccountBillingSummary

@Export
class BCAccountBillingSummaryWrapper implements BillingAccountInfo {
  private static class InvoiceWrapper implements Invoice {
    var _amount: MonetaryAmount as Amount
    var _invoiceID : String as InvoiceID
  }

  private static class MoneyReceivedWrapper implements MoneyReceived {
    var _date: Date as Date
    var _amount: MonetaryAmount as Amount
    var _moneyReceivedID: String as MoneyReceivedID
  }

  var _soapObject : BCPCAccountBillingSummary
  var _nextInvoiceDueDate : Date as readonly NextInvoicesDueDate
  var _nextInvoicesDue: InvoiceWrapper[] as readonly NextInvoicesDue
  var _lastPayment: MoneyReceivedWrapper as readonly LastPaymentReceived

  construct(o : BCPCAccountBillingSummary) {
    _soapObject = o
    _nextInvoiceDueDate = _soapObject.NextInvoicesDueDate
    _nextInvoicesDue = _soapObject.NextInvoicesDue.Entry.map(\invoice -> new InvoiceWrapper() {
      :Amount = invoice.Amount,
      :InvoiceID = invoice.InvoiceID
    }).toTypedArray()
    _lastPayment = new MoneyReceivedWrapper() {
      :Date = _soapObject.LastPaymentReceived.Date,
      :Amount = _soapObject.LastPaymentReceived.Amount,
      :MoneyReceivedID = _soapObject.LastPaymentReceived.MoneyReceivedID
    }
  }

  override property get BilledOutstandingCurrent() : MonetaryAmount {
    return _soapObject.BilledOutstandingCurrent
  }

  override property get BilledOutstandingPastDue() : MonetaryAmount {
    return _soapObject.BilledOutstandingPastDue
  }

  override property get BilledOutstandingTotal() : MonetaryAmount {
    return _soapObject.BilledOutstandingTotal
  }

  override property get BillingSettings() : BillingPaymentInfo {
    return new gw.plugin.billing.bc1000.BCAccountBillingSettingsWrapper(_soapObject.BillingSettings.$TypeInstance)
  }

  override property get BillingLevel() : String {
    return _soapObject.BillingLevel
  }

  override property get CollateralChargesBilled() : MonetaryAmount {
    return _soapObject.CollateralChargesBilled
  }

  override property get CollateralChargesPastDue() : MonetaryAmount {
    return _soapObject.CollateralChargesPastDue
  }

  override property get CollateralChargesUnbilled() : MonetaryAmount {
    return _soapObject.CollateralChargesUnbilled
  }

  override property get CollateralHeld() : MonetaryAmount {
    return _soapObject.CollateralHeld
  }

  override property get CollateralRequirement() : MonetaryAmount {
    return _soapObject.CollateralRequirement
  }

  override property get Delinquent() : boolean {
    return _soapObject.Delinquent
  }

  override property get UnappliedFundsTotal() : MonetaryAmount {
    return _soapObject.UnappliedFundsTotal
  }

  override property get UnbilledTotal() : MonetaryAmount {
    return _soapObject.UnbilledTotal
  }

  override property get PrimaryPayer() : BillingContactInfo {
    return new gw.plugin.billing.bc1000.BCContactSummaryWrapper(_soapObject.PrimaryPayer)
  }

  override property get AccountName() : String {
    return _soapObject.AccountName
  }

  override property get AccountNameKanji(): String {
    return _soapObject.AccountNameKanji
  }

  override property get BillingCurrency(): Currency {
    return Currency.get(_soapObject.Currency.name())
  }

  override property get AccountNumber(): String {
    return _soapObject.AccountNumber
  }

  override property get AccountCurrencyGroupOwner(): String {
    return _soapObject.AccountCurrencyGroupOwner
  }

  override property get Paid(): MonetaryAmount {
    return _soapObject.Paid
  }

  override property get WrittenOff(): MonetaryAmount {
    return _soapObject.WrittenOff
  }

  override property get DelinquenciesLast12Months(): int {
    return _soapObject.DelinquenciesLast12Months
  }
}
