package gw.api.web.dashboard.ui.payment

uses gw.api.locale.DisplayKey
uses gw.api.util.LocaleUtil
uses gw.i18n.DateTimeFormat
uses gw.pl.currency.MonetaryAmount

@Export
class PaymentFormatter {

  static function formatNextInvoice(nextInvoiceDate : Date, nextInvoices: MonetaryAmount[]) : String {
    if (nextInvoiceDate == null || nextInvoices == null || nextInvoices.IsEmpty) {
      return "-"
    }
    if (nextInvoices.length > 1) {
      return DisplayKey.get("Web.Dashboard.Tile.Payments.NextInvoiceMultiple",
          formatDate(nextInvoiceDate))
    }
    final var amount = nextInvoices.first()
    return DisplayKey.get("Web.Dashboard.Tile.Payments.NextInvoiceAmountAndDate",
        amount,
        formatDate(nextInvoiceDate))
  }

  static function formatLastPayment(lastPaymentDate: Date, lastPayment: MonetaryAmount): String {
    if (lastPayment != null) {
      return DisplayKey.get("Web.Dashboard.Tile.Payments.LastPaymentAmountAndDate",
          lastPayment,
          formatDate(lastPaymentDate))
    }
    return DisplayKey.get("Web.Dashboard.Tile.Payments.NoPaymentsReceived")
  }

  private static function formatDate(date: Date): String {
    return formatDate(date, DateTimeFormat.SHORT)
  }

  private static function formatDate(date: Date, format: DateTimeFormat): String {
    return LocaleUtil.CurrentLocale.getOutputDateFormat(format, null).format(date)
  }
}
