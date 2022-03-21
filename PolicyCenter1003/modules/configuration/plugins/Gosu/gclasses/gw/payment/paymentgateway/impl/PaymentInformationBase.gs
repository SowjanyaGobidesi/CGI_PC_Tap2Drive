package gw.payment.paymentgateway.impl

uses gw.api.payment.paymentgateway.PaymentInformation
uses gw.pl.currency.MonetaryAmount

uses java.math.BigDecimal

/**
 * Base implementation of payment information.
 */
@Export
class PaymentInformationBase implements PaymentInformation {
  var _amount : BigDecimal as TransactionAmount
  var _currency : Currency as TransactionCurrency
  var _billingAccountNumber : String as BillingAccountNumber
  var _policyPeriod : PolicyPeriod as PolicyPeriod
  var _paymentInstrument : String as PaymentInstrument
  var _transactionType : PaymentTransactionType as TransactionTypeCode
  var _transactionId : String as TransactionID
  var _saveForFutureUse : boolean as SaveForFutureUse
  var _internalPaymentReference : String as InternalPaymentReference
}