package gw.billing.caching

uses gw.plugin.Plugins
uses gw.plugin.billing.BillingPaymentInstrument
uses gw.plugin.billing.IBillingSystemPlugin
uses java.util.Objects


@Export
class BillingPaymentInstrumentsCache extends AbstractCachable<BillingPaymentInstrumentsCache.PaymentInstrumentKey, BillingPaymentInstrument[]> {

  function getExistingPaymentInstruments(accountNumber : String, currency : Currency) : BillingPaymentInstrument[] {
    var key = new PaymentInstrumentKey(accountNumber, currency)
    return Cache.retrieve(key)
  }

  function retrieveFromSource(key: PaymentInstrumentKey) : BillingPaymentInstrument[] {
    return Plugins.get(IBillingSystemPlugin).getExistingPaymentInstruments(key.AccountNumber, key.PreferredCurrency)
  }

  protected static class PaymentInstrumentKey {
    private var _accountNumber : String as AccountNumber
    private var _currency : Currency as PreferredCurrency

    construct(billingAccountNumber : String, preferredSettlementCurrency : Currency) {
      _accountNumber = billingAccountNumber
      _currency = preferredSettlementCurrency
    }

    public function equals(o : Object) : boolean {
      return o typeis PaymentInstrumentKey and
          Objects.equals(AccountNumber, o.AccountNumber) and
          Objects.equals(PreferredCurrency, o.PreferredCurrency)
    }

    public function hashCode() : int {
      var result = 17
      result = 31 * result + (_accountNumber == null ? 0 : _accountNumber.hashCode())
      result = 31 * result + (_currency == null ? 0 : _currency.hashCode())
      return result
    }
  }
}