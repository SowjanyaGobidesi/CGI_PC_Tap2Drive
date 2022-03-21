package gw.payment.paymentgateway

uses gw.api.payment.paymentgateway.PaymentInformation
uses gw.payment.paymentgateway.impl.PaymentInformationBase
uses gw.pl.currency.MonetaryAmount
uses entity.Job

/**
 * Payment information helper class.
 */
@Export
class PaymentInformationHelper {

  /**
   * Create payment information from base payment info. Allow to add any number of
   * custom payment information.
   *
   * @param job a job object
   * @param billingAccountNumber billing account number
   * @param policyPeriod a policy period object
   * @param saveForFutureUse save for future use flag
   * @param paymentInstrument string representation of payment instrument
   * @return payment information object
   */
  public static function createPaymentInformation(job : Job,
                                                  billingAccountNumber : String,
                                                  policyPeriod : PolicyPeriod,
                                                  saveForFutureUse : boolean,
                                                  paymentInstrument : String,
                                                  amount : MonetaryAmount) : PaymentInformation {
    var paymentInformation = new PaymentInformationBase()
    paymentInformation.TransactionAmount = amount
    paymentInformation.TransactionCurrency = policyPeriod.PreferredSettlementCurrency
    paymentInformation.BillingAccountNumber = billingAccountNumber
    paymentInformation.PolicyPeriod = policyPeriod
    paymentInformation.PaymentInstrument = paymentInstrument
    paymentInformation.TransactionTypeCode = PaymentGatewayConfig.PaymentTransactionTypeCode
    paymentInformation.SaveForFutureUse = saveForFutureUse
    paymentInformation.InternalPaymentReference = job.JobNumber
    return paymentInformation
  }
}