package gw.billing.caching

uses gw.plugin.Plugins
uses gw.plugin.billing.BillingInvoiceStreamInfo
uses gw.plugin.billing.IBillingSystemPlugin
uses gw.plugin.billing.PaymentPlanData
uses java.util.Objects

@Export
class BillingInvoiceStreamsCache extends AbstractCachable<BillingInvoiceStreamsCache.InvoiceStreamKey, BillingInvoiceStreamInfo[]> {

  function getInvoiceStreams(billingAccountNumber: String, settlementCurrency: Currency, paymentPlan: PaymentPlanData): BillingInvoiceStreamInfo[] {
    var key = new InvoiceStreamKey(billingAccountNumber, settlementCurrency, paymentPlan)
    return Cache.retrieve(key)
  }

  function retrieveFromSource(key : InvoiceStreamKey) : BillingInvoiceStreamInfo[] {
    return Plugins.get(IBillingSystemPlugin).getInvoiceStreams(key.AccountNumber, key.PreferredCurrency, key.PaymentPlan)
  }

  protected static class InvoiceStreamKey {
    private var _accountNumber : String as AccountNumber
    private var _currency : Currency as PreferredCurrency
    private var _paymentPlan : PaymentPlanData as PaymentPlan

    construct(billingAccountNumber : String, preferredSettlementCurrency : Currency, paymentPlan : PaymentPlanData) {
      _accountNumber = billingAccountNumber
      _currency = preferredSettlementCurrency
      _paymentPlan = paymentPlan
    }

    public function equals(o : Object) : boolean {
      return o typeis InvoiceStreamKey and
          Objects.equals(AccountNumber, o.AccountNumber) and
          Objects.equals(PreferredCurrency, o.PreferredCurrency) and
          Objects.equals(PaymentPlan, o.PaymentPlan)
    }

    public function hashCode() : int {
      var result = 17
      result = 31 * result + (_accountNumber == null ? 0 : _accountNumber.hashCode())
      result = 31 * result + (_currency == null ? 0 : _currency.hashCode())
      result = 31 * result + (_paymentPlan == null ? 0 : _paymentPlan.hashCode())
      return result
    }
  }

}