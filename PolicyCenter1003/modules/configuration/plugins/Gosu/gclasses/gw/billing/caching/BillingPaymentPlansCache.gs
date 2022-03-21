package gw.billing.caching

uses gw.plugin.Plugins
uses gw.plugin.billing.IBillingSystemPlugin
uses gw.plugin.billing.PaymentPlanData

uses java.util.Objects


@Export
class BillingPaymentPlansCache extends AbstractCachable<BillingPaymentPlansCache.PaymentPlansKey, PaymentPlanData[]> {

  public function getPaymentPlans(billingMethod : BillingMethod, altBillingAccountNumber : String, preferredSettlementCurrency : Currency) : PaymentPlanData[] {
    var key = new PaymentPlansKey(billingMethod, altBillingAccountNumber, preferredSettlementCurrency)
    return Cache.retrieve(key)
  }

  function retrieveFromSource(key : PaymentPlansKey) : PaymentPlanData[] {
    return Plugins.get(IBillingSystemPlugin).retrieveAllPaymentPlans(key.BillingMethod, key.AccountNumber, key.PreferredCurrency)
  }

  protected static class PaymentPlansKey {
    private var _billingMethod : BillingMethod as BillingMethod
    private var _accountNumber : String as AccountNumber
    private var _currency : Currency as PreferredCurrency

    construct(billingMethod : BillingMethod, altBillingAccountNumber : String, preferredSettlementCurrency : Currency) {
      _billingMethod = billingMethod
      _accountNumber = altBillingAccountNumber
      _currency = preferredSettlementCurrency
    }

    public function equals(o : Object) : boolean {
      return o typeis PaymentPlansKey and
          Objects.equals(BillingMethod, o.BillingMethod) and
          Objects.equals(AccountNumber, o.AccountNumber) and
          Objects.equals(PreferredCurrency, o.PreferredCurrency)
    }

    public function hashCode() : int {
      var result = 17
      result = 31 * result + (_billingMethod == null ? 0 : _billingMethod.hashCode())
      result = 31 * result + (_accountNumber == null ? 0 : _accountNumber.hashCode())
      result = 31 * result + (_currency == null ? 0 : _currency.hashCode())
      return result
    }
  }

}