package gw.billing.caching

uses gw.plugin.Plugins
uses gw.plugin.billing.BillingUnappliedFundInfo
uses gw.plugin.billing.IBillingSystemPlugin

uses java.util.Objects


@Export
class BillingUnappliedFundsCache extends AbstractCachable<BillingUnappliedFundsCache.UnappliedFundsKey, BillingUnappliedFundInfo[]> {

  function retrieveAccountUnappliedFunds(billingAccountNumber: String, settlementCurrency: Currency): BillingUnappliedFundInfo[] {
    var key = new UnappliedFundsKey(billingAccountNumber, settlementCurrency)
    return Cache.retrieve(key)
  }

  function retrieveFromSource(key : UnappliedFundsKey) : BillingUnappliedFundInfo[] {
    return Plugins.get(IBillingSystemPlugin).retrieveAccountUnappliedFunds(key.AccountNumber, key.PreferredCurrency)
  }

  protected static class UnappliedFundsKey {
    private var _accountNumber : String as AccountNumber
    private var _currency : Currency as PreferredCurrency

    construct(billingAccountNumber : String, preferredSettlementCurrency : Currency) {
      _accountNumber = billingAccountNumber
      _currency = preferredSettlementCurrency
    }

    public function equals(o : Object) : boolean {
      return o typeis UnappliedFundsKey and
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