package gw.billing.caching

uses gw.plugin.Plugins
uses gw.plugin.billing.BillingAccountSearchResult
uses gw.plugin.billing.IBillingSystemPlugin
uses java.util.Objects

@Export
class BillingSubAccountsCache extends AbstractCachable<BillingSubAccountsCache.SubAccountsKey, BillingAccountSearchResult[]> {

  function getSubAccounts(billingAccountNumber : String, currency : Currency = null): BillingAccountSearchResult[] {
    var key = new SubAccountsKey(billingAccountNumber, currency)
    return Cache.retrieve(key)
  }

  function retrieveFromSource(key : SubAccountsKey) : BillingAccountSearchResult[] {
    return Plugins.get(IBillingSystemPlugin).getSubAccounts(key.AccountNumber, key.Currency)
  }

  protected static class SubAccountsKey {
    private var _accountNumber : String as AccountNumber
    private var _currency : Currency as Currency

    construct(billingAccountNumber : String, currency : Currency) {
      _accountNumber = billingAccountNumber
      _currency = currency
    }

    public function equals(o : Object) : boolean {
      return o typeis SubAccountsKey and
          Objects.equals(AccountNumber, o.AccountNumber) and
          Objects.equals(Currency, o.Currency)
    }

    public function hashCode() : int {
      var result = 17
      result = 31 * result + (_accountNumber == null ? 0 : _accountNumber.hashCode())
      result = 31 * result + (_currency == null ? 0 : _currency.hashCode())
      return result
    }
  }
}