package gw.plugin.billing.impl

uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.path.Paths
uses gw.api.util.CurrencyUtil
uses gw.plugin.billing.BillingAccountInfo
uses gw.plugin.billing.BillingInvoiceInfo
uses gw.plugin.billing.BillingPeriodInfo
uses gw.plugin.billing.BillingPeriodInfo.PolicyTermInfo
uses gw.plugin.billing.BillingTermInfo
uses gw.plugin.billing.IBillingSummaryPlugin

uses java.util.ArrayList
uses java.util.Date

@Export
class StandAloneBillingSummaryPlugin implements IBillingSummaryPlugin {

  // query path constants

  static final var CANCELLATION_DATE = "CancellationDate"
  static final var EDIT_EFFECTIVE_DATE = "EditEffectiveDate"
  static final var PERIOD_END = "PeriodEnd"
  static final var POLICY_NUMBER = "PolicyNumber"
  static final var TERM_NUMBER = "TermNumber"


  override function retrieveAccountBillingSummaries(accountNumber : String): BillingAccountInfo[] {
    var now = Date.Now
    var mockSoapAccount = new MockAccountBilling() {
      :AccountNumber = accountNumber,
      :AccountCurrencyGroupOwner = accountNumber,
      :BilledOutstandingTotal = 12077.18bd.ofDefaultCurrency(),
      :BilledOutstandingCurrent = 11077.18bd.ofDefaultCurrency(),
      :BilledOutstandingPastDue = 1000.18bd.ofDefaultCurrency(),
      :BillingLevel = BillingLevel.TC_POLICYDESIGNATEDUNAPPLIED.Code,
      :UnbilledTotal = 35999.38bd.ofDefaultCurrency(),
      :UnappliedFundsTotal = 0.00bd.ofDefaultCurrency(),
      :CollateralRequirement = 5000.00bd.ofDefaultCurrency(),
      :CollateralHeld = 5000.00bd.ofDefaultCurrency(),
      :CollateralChargesBilled = 0.00bd.ofDefaultCurrency(),
      :CollateralChargesPastDue = 0.00bd.ofDefaultCurrency(),
      :CollateralChargesUnbilled = 0.00bd.ofDefaultCurrency(),
      :Paid = 5000.00bd.ofDefaultCurrency(),
      :WrittenOff = 7000.00bd.ofDefaultCurrency(),
      :Delinquent = false,
      :BillingCurrency = CurrencyUtil.DefaultCurrency,
      :MockBillingSettings = new MockBillingSettings() {
        :InvoiceDeliveryMethod = InvoiceDeliveryMethod.TC_MAIL,
        :PaymentMethod = AccountPaymentMethod.TC_CREDITCARD,
        :CreditCardIssuer = CreditCardIssuer.TC_DISCOVER,
        :CreditCardNumber = "************3044", 
        :CreditCardExpMonth = 5,
        :CreditCardExpYear = 2012
      },
      :MockPrimaryPayer = new MockBillingContact() {
        :Name = "Bill Kinman",
        :Address = "4040 Elmwood Ave, Floor 0000, Louisville, KY 40207, US",
        :Phone = "850-578-1682 x0007"
      },
      :NextInvoicesDueDate = now.addDays(60),
      :NextInvoicesDue = {new MockAccountBilling.Invoice() {
        :Amount = 5000.00bd.ofDefaultCurrency(),
        :InvoiceID = "Invoice" + accountNumber
      }},
      :LastPaymentReceived = new MockAccountBilling.MoneyReceived() {
        :Date = now.addDays(-10),
        :Amount = 7000.00bd.ofDefaultCurrency(),
        :MoneyReceivedID = "Payment" + accountNumber
      }
    }
    return { mockSoapAccount }
  }

  override function retrieveAccountBillingSummaries(accountNumbers: String[]): BillingAccountInfo[] {
    return accountNumbers.flatMap(\acct -> retrieveAccountBillingSummaries(acct))
  }

  override function retrievePolicyBillingSummary(policyNumber: String, termNumber: int): BillingPeriodInfo {
    return createMockPolicyPeriodBilling(policyNumber, termNumber)
  }

  protected function createMockPolicyPeriodBilling(policyNumber: String, termNumber: int, withoutInvoiceStream: boolean = false): BillingPeriodInfo {
    var invoice1 = new MockInvoice() {
      :Amount = 10000bd.ofDefaultCurrency(),
      :Billed = 2000bd.ofDefaultCurrency(),
      :InvoiceDate = Date.CurrentDate.addDays(-10),
      :InvoiceDueDate = Date.CurrentDate.addDays(20),
      :Paid = 1000bd.ofDefaultCurrency(),
      :PastDue = 0bd.ofDefaultCurrency(),
      :InvoiceStream = withoutInvoiceStream ? null : "Monthly / Send Invoice"
    }
    var invoice2 = new MockInvoice() {
      :Amount = 3000bd.ofDefaultCurrency(),
      :Billed = 0bd.ofDefaultCurrency(),
      :InvoiceDate = Date.CurrentDate.addDays(20),
      :InvoiceDueDate = Date.CurrentDate.addDays(50),
      :Paid = 0bd.ofDefaultCurrency(),
      :PastDue = 0bd.ofDefaultCurrency(),
      :InvoiceStream = withoutInvoiceStream ? null : "Monthly / Send Invoice"
    }
    var mockObject = new MockPolicyPeriodBilling() {
      :PolicyNumber = policyNumber,
      :TermNumber = termNumber,
      :PolicyTermInfos = findPolicyTermInfos(policyNumber, termNumber),
      :BillingMethod = TC_AGENCYBILL,
      :CurrentOutstanding = 6000bd.ofDefaultCurrency(),
      :DepositRequirement = 5000bd.ofDefaultCurrency(),
      :MockInvoices = new MockInvoice[] {invoice1, invoice2},
      :Paid = 15000bd.ofDefaultCurrency(),
      :PastDue = 1000bd.ofDefaultCurrency(),
      :PaymentPlanName = "5 Pay",
      :TotalBilled = 22000bd.ofDefaultCurrency(),
      :TotalBilledUnsettled = 22000bd.ofDefaultCurrency(),
      :Unbilled = 12000bd.ofDefaultCurrency(),
      :TotalCharges = 34000bd.ofDefaultCurrency(),
      :Delinquent = false,
      :InvoiceStream = withoutInvoiceStream ? null : "Monthly / Manual Payment",
      :AltBillingAccount = "Uncle Sam",
      :WrittenOff = 7000.00bd.ofDefaultCurrency()
    }
    return mockObject
  }

  override function retrieveBillingPolicies(accountNumber: String): BillingPeriodInfo[] {
    var bcPeriods = new ArrayList<BillingPeriodInfo>()
    var periods = Account.finder.findAccountByAccountNumber(accountNumber).Policies*.BoundPeriods
    for(period in periods index i){
      var soapObject = new MockPolicyPeriodBilling() {
        :BillingMethod = BillingMethod.TC_DIRECTBILL,
        :Delinquent = i % 2 == 0,
        :EffectiveDate = period.PeriodStart,
        :ExpirationDate = period.PeriodEnd,
        :PastDue = 2000bd.ofDefaultCurrency(),
        :PolicyNumber = period.PolicyNumber,
        :TermNumber = period.TermNumber,
        :Product = period.Policy.Product.Description,
        :TotalBilled = 4000bd.ofDefaultCurrency(),
        :Unbilled = 1000bd.ofDefaultCurrency(),
        :AltBillingAccount = period.AltBillingAccountNumber,
        :InvoiceStream = {"Monthly / Visa xxxx-4857", "Weekly / Amex xxxx-4624"}[i%2]
      }
      bcPeriods.add(soapObject)
    }
    return bcPeriods.toTypedArray()
  }

  override function retrieveAccountInvoices(p0: String): BillingInvoiceInfo[] {
    var now = Date.Now
    var invoice1 = new MockInvoice() {
      :InvoiceNumber = "GH3455860",
      :Status = "Closed",
      :PaidStatus = "Fully Paid",
      :Amount = 100.73bd.ofDefaultCurrency(),
      :InvoiceDate = now.addMonths(-4),
      :InvoiceDueDate = now.addMonths(-3),
      :Unpaid = 0bd.ofDefaultCurrency(),
      :InvoiceStream = "PA, Manual Payment"
    }
    var invoice2 = new MockInvoice() {
      :InvoiceNumber = "YU12349567",
      :Status = "Open",
      :PaidStatus = "Partially Paid",
      :Amount = 400.67bd.ofDefaultCurrency(),
      :InvoiceDate = now.addMonths(1),
      :InvoiceDueDate = now.addMonths(2),
      :Unpaid = 123.56bd.ofDefaultCurrency(),
      :InvoiceStream = "PA, Manual Payment"
    }
    var invoice3 = new MockInvoice() {
      :InvoiceNumber = "JH34798456",
      :Status = "Planned",
      :PaidStatus = "Current",
      :Amount = 400.67bd.ofDefaultCurrency(),
      :InvoiceDate = now.addMonths(3),
      :InvoiceDueDate = now.addMonths(4),
      :Unpaid = 400.67bd.ofDefaultCurrency(),
      :InvoiceStream = "PA, Manual Payment"
    }
    return new BillingInvoiceInfo[]{invoice1, invoice2, invoice3}
  }

  override function getPoliciesBilledToAccount(accountNumber : String) : BillingPeriodInfo [] {
    var bcPeriods = new ArrayList<BillingPeriodInfo>()
    var query = Query.make(PolicyPeriod)
    query.compare("Status", Equals, PolicyPeriodStatus.TC_BOUND)
    var policyNumber = query.select({QuerySelectColumns.path(Paths.make(PolicyPeriod#PolicyNumber))}).transformQueryRow(\row -> row.getColumn(0) as String).FirstResult
    var soapObject = new MockPolicyPeriodBilling() {
      :BillingMethod = BillingMethod.TC_DIRECTBILL,
      :Delinquent = true,
      :EffectiveDate = Date.Today,
      :ExpirationDate = Date.Today.addYears(1),
      :PastDue = 2000bd.ofDefaultCurrency(),
      :PolicyNumber = policyNumber,
      :TermNumber = 1,
      :Product = "Business Auto",
      :TotalBilled = 4000bd.ofDefaultCurrency(),
      :Unbilled = 1000bd.ofDefaultCurrency(),
      :OwningAccount = accountNumber + " Sub",
      :InvoiceStream = "PA, Manual Payment"
    }
    bcPeriods.add(soapObject)
    return bcPeriods.toTypedArray()
  }

  private function findPolicyTermInfos(policyNumber : String, termNumber : int) : BillingTermInfo[] {
    final var policyPeriod = PolicyPeriod.finder
        .findByPolicyNumberAndTerm(policyNumber, termNumber)
        .FirstResult
    final var query = Query.make(PolicyPeriod)
    query.compare(PolicyPeriod#Policy, Equals, policyPeriod.Policy)
    query.compare(PolicyPeriod#MostRecentModel, Equals, true)
    return query
        .select({
            QuerySelectColumns.pathWithAlias(POLICY_NUMBER, Paths.make(PolicyPeriod#PolicyNumber)),
            QuerySelectColumns.pathWithAlias(TERM_NUMBER, Paths.make(PolicyPeriod#TermNumber)),
            QuerySelectColumns.pathWithAlias(EDIT_EFFECTIVE_DATE, Paths.make(PolicyPeriod#EditEffectiveDate)),
            QuerySelectColumns.pathWithAlias(CANCELLATION_DATE, Paths.make(PolicyPeriod#CancellationDate)),
            QuerySelectColumns.pathWithAlias(PERIOD_END, Paths.make(PolicyPeriod#PeriodEnd))
        })
        .transformQueryRow(\ row ->
          new PolicyTermInfo(row.getColumn(POLICY_NUMBER) as String, row.getColumn(TERM_NUMBER) as Integer,
              row.getColumn(EDIT_EFFECTIVE_DATE) as Date, (row.getColumn(CANCELLATION_DATE) as Date)?:(row.getColumn(PERIOD_END) as Date))
        )
      .orderBy(QuerySelectColumns.path(Paths.make(PolicyPeriod#EditEffectiveDate)))
      .toTypedArray()
  }
}
