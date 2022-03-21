package gw.plugin.billing.impl

uses gw.pl.currency.MonetaryAmount
uses gw.plugin.billing.BillingInvoiceInfo
uses gw.plugin.billing.BillingPeriodInfo
uses gw.plugin.billing.BillingTermInfo

uses java.lang.Integer
uses java.util.Date

@Export
class MockPolicyPeriodBilling implements BillingPeriodInfo {
  construct() {}
  
  var _billingMethod : BillingMethod as BillingMethod
  var _delinquent : Boolean as Delinquent
  var _effectiveDate : Date as EffectiveDate
  var _expirationDate : Date as ExpirationDate
  var _pastDue : MonetaryAmount as PastDue
  var _policyNumber : String as PolicyNumber
  var _termNumber : Integer as TermNumber
  var _product : String as Product
  var _paymentPlanName : String as PaymentPlanName
  var _totalBilled : MonetaryAmount as TotalBilled
  var _billedOutstandingTotal : MonetaryAmount as TotalBilledUnsettled
  var _unbilled : MonetaryAmount as Unbilled
  var _currentOutstanding : MonetaryAmount as CurrentOutstanding
  var _depositRequirement : MonetaryAmount as DepositRequirement
  var _paid : MonetaryAmount as Paid
  var _writtenOff : MonetaryAmount as WrittenOff
  var _totalCharges : MonetaryAmount as TotalCharges
  var _altBillingAccount : String as AltBillingAccount
  var _invoiceStream : String as InvoiceStream
  var _owningAccount : String as OwningAccount
  var _pcpolicypublicid : String as PCPolicyPublicID
  var _archived : Boolean as Archived
  var _retrieved : Boolean as Retrieved
  
  var _periods : String[] as Periods
  var _policyTermInfos : BillingTermInfo[] as PolicyTermInfos
  var _invoices : MockInvoice[] as MockInvoices

  override function findPolicyPeriod() : PolicyPeriod {
    return PolicyPeriod.finder.findByPolicyNumberAndTerm(PolicyNumber, TermNumber).FirstResult
  }

  override property get Invoices() : BillingInvoiceInfo[] {
    return MockInvoices
  }

}
