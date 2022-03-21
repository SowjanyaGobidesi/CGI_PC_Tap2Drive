package gw.api.web.dashboard.ui.billing

uses entity.Contact
uses gw.api.locale.DisplayKey
uses gw.api.util.LocationUtil
uses gw.api.web.ExternalSystemPages
uses gw.api.web.color.GWColor
uses gw.api.web.dashboard.data.billing.BillingSummaryDTO
uses gw.api.web.dashboard.data.impl.DashboardServices
uses gw.api.web.dashboard.ui.DataFetchResult
uses gw.api.web.dashboard.ui.payment.PaymentEntry
uses pcf.AccountFile_Billing
uses pcf.ContactFile_Billing
uses typekey.Currency

@Export
class BillingSummaryHelper {
  var _payments: PaymentEntry[]

  final var _fetchResult: DataFetchResult<BillingSummaryDTO>
  final var _openBillings: OpenBillingHandler[] as BillingHandlers
  final var _policyRelatedData: boolean
  final var _viewMore: block() as ViewMore

  construct(contact: Contact) {
    this(contact.getAccountsByRoleType(TC_ACCOUNTHOLDER), contact.PreferredSettlementCurrency, \-> ContactFile_Billing.push(contact))
  }

  construct(account: Account) {
    this({account}, account.PreferredSettlementCurrency, \-> AccountFile_Billing.push(account))
  }

  construct(policyPeriod: PolicyPeriod) {
    _viewMore = null
    _fetchResult = DataFetchResult.of(
        \-> DashboardServices.Instance.BillingService.getPolicyBillingSummary(policyPeriod),
        \err -> BillingSummaryDTO.EMPTY)
    _openBillings = {new OpenBillingHandler(policyPeriod, DisplayKey.get('Web.Dashboard.Tile.BillingSummary.OpenBilling'))}
    _policyRelatedData = true
  }

  private function displayWarningForMissingAccounts(accounts: Account[]) {
    accounts.where(\account -> !_fetchResult.Data.RelevantAccounts.contains(account.AccountNumber))
        .each(\account -> LocationUtil.addRequestScopedWarningMessage(
            DisplayKey.get("Web.AccountBilling.Warning.BillingNotAvailable")))
  }

  private construct(accounts: Account[], currency: Currency, viewMore()) {
    _viewMore = viewMore
    _fetchResult = DataFetchResult.of(\-> {
      var numbers = accounts.map(\account -> account.AccountNumber)
      return DashboardServices.Instance.BillingService.getBillingSummary(currency, numbers)
    }, \err -> BillingSummaryDTO.EMPTY)

    _openBillings = accounts.map(\account ->
        new OpenBillingHandler(
            account,
            accounts.length > 1 ?
                account.AccountHolderContactNameAndNick :
                DisplayKey.get('Web.Dashboard.Tile.BillingSummary.OpenBilling')))

    if (_fetchResult.Data != BillingSummaryDTO.EMPTY) {
      displayWarningForMissingAccounts(accounts)
    }

    if (HasNoErrors) {
      _payments = accounts
          .where(\account -> _fetchResult.Data.RelevantAccounts.contains(account.AccountNumber))
          .map(\account -> {
            final var accountNumber = account.AccountNumber
            return new PaymentEntry(
                account,
                BillingSummary.LastPaymentReceived[accountNumber],
                BillingSummary.NextInvoicesDueDate[accountNumber],
                BillingSummary.NextInvoicesDue.get(accountNumber))
          }).sortBy(\payment -> payment.NextInvoicesDate)
    }
    _policyRelatedData = false
  }

  property get BillingSummary(): BillingSummaryDTO {
    return _fetchResult.Data
  }

  property get HasNoErrors(): boolean {
    return _fetchResult.HasNoErrors
  }

  property get DisplayChart(): boolean {
    return HasNoErrors and (_policyRelatedData or _fetchResult.Data.RelevantAccounts.HasElements)
  }

  property get BillingSummaryData(): List<BillingSummaryChartEntry> {
    var entries = new ArrayList<BillingSummaryChartEntry>()

    entries.add(new BillingSummaryChartEntry("Unbilled", BillingSummary.Unbilled,  GWColor.THEME_PROGRESS_UNSTARTED))
    entries.add(new BillingSummaryChartEntry("Paid", BillingSummary.Paid,  GWColor.THEME_PROGRESS_COMPLETE))
    entries.add(new BillingSummaryChartEntry("WrittenOff", BillingSummary.WrittenOff,  GWColor.THEME_PROGRESS_ABANDONDED))
    entries.add(new BillingSummaryChartEntry("Billed", BillingSummary.Billed,  GWColor.THEME_PROGRESS_INPROGRESS))
    entries.add(new BillingSummaryChartEntry("PastDue", BillingSummary.PastDue,  GWColor.THEME_PROGRESS_OVERDUE))

    return entries
  }

  property get SummaryChartColors() : List<GWColor> {
    return BillingSummaryData.map(\entry -> entry.Color)
  }

  property get OpenInBillingSystemAvailable(): boolean {
    return HasNoErrors and ExternalSystemPages.BillingPageAvailable
  }

  property get NumberOfOpenBillings(): int {
    return _fetchResult.Data.Invoices?.where(\inv -> inv.Unpaid.IsPositive).length
  }

  property get Payments(): PaymentEntry[] {
    return _payments
  }

  function entryAvailable(idx: int): boolean {
    return idx < _payments.length
  }

  function lastPaymentAvailable(idx: int): boolean {
    return HasNoErrors and ExternalSystemPages.BillingPageAvailable and entryAvailable(idx) and _payments[idx].LastPaymentAvailable
  }

  function nextInvoiceAvailable(idx: int): boolean {
    return HasNoErrors and ExternalSystemPages.BillingPageAvailable and entryAvailable(idx) and _payments[idx].NextInvoiceAvailable
  }

  function accountLabel(idx: int): String {
    return entryAvailable(idx) ? _payments[idx].Account.AccountHolderContactNameAndNick : null
  }

  function viewLastPaymentInBillingCenter(idx: int) {
    if (entryAvailable(idx)) {
      _payments[idx].viewLastPaymentInBillingCenter()
    }
  }

  function formattedLastPayment(idx: int): String {
    return entryAvailable(idx) ? _payments[idx].FormattedLastPayment : null
  }

  function viewNextInvoiceInBillingCenter(idx: int) {
    if (entryAvailable(idx)) {
      _payments[idx].viewNextInvoiceInBillingCenter()
    }
  }

  function formattedNextInvoice(idx: int): String {
    return entryAvailable(idx) ? _payments[idx].FormattedNextInvoice : null
  }
}