package gw.plugin.paymentgateway

uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.payment.paymentgateway.PaymentGatewayResponse
uses gw.api.payment.paymentgateway.PaymentInformation
uses gw.api.payment.paymentgateway.PaymentInstrumentDetails
uses gw.payment.paymentgateway.PaymentGatewayConfig
uses gw.payment.paymentgateway.PaymentGatewayDemoUtils
uses gw.payment.paymentgateway.impl.PaymentGatewayResponseBase
uses gw.payment.paymentgateway.impl.TokenizedCreditCardDetails
uses gw.plugin.Plugins
uses gw.plugin.billing.IBillingSystemPlugin
uses pcf.DemoPaymentGatewayPage

uses javax.servlet.http.HttpServletRequest

/**
 * Standalone implementation of Payment Gateway plugin.
 */
@Export
class StandAlonePaymentGatewayPlugin implements PaymentGatewayPlugin {

  private static final var SUCCESSFUL_PG_RESPONSES = {"0"}
  private static final var APPROVED_RESPONSES_MESSAGES = {"Approved", "Credited"}

  override function requestSecureToken(paymentInformation : PaymentInformation) : PaymentGatewayResponse {
    return PaymentGatewayResponseBase.builder()
        .result("0")
        .referenceNumber(PaymentGatewayDemoUtils.getTransactionReference())
        .responseMessage("Approved")
        .amount(String.valueOf(paymentInformation.TransactionAmount))
        .token("T" + UniqueKeyGenerator.get().nextID()) // ends up being stuffed in a varchar(32)
        .transactionTypeCode(PaymentGatewayConfig.PaymentTransactionTypeCode)
        .build()
  }

  override function takePaymentUsingPaymentInstrument(paymentInformation : PaymentInformation) : PaymentGatewayResponse {
    var plugin = Plugins.get(IBillingSystemPlugin)
    var instrument = plugin.getExistingPaymentInstruments(paymentInformation.BillingAccountNumber, paymentInformation.TransactionCurrency)
        .firstWhere( \ elt -> elt.DisplayName == paymentInformation.PaymentInstrument)

    return PaymentGatewayResponseBase.builder()
        .result("0")
        .referenceNumber(PaymentGatewayDemoUtils.getTransactionReference())
        .responseMessage("Approved")
        .amount(String.valueOf(paymentInformation.TransactionAmount))
        .token(instrument.Token)
        .originalTransactionID(instrument.Token)
        .transactionTypeCode(PaymentGatewayConfig.PaymentTransactionTypeCode)
        .build()
  }

  override function inquiryPaymentGatewayTransaction(referenceNumber : String) : PaymentGatewayResponse {
    return PaymentGatewayResponseBase.builder()
        .result("0")
        .referenceNumber(PaymentGatewayDemoUtils.getTransactionReference())
        .responseMessage("Approved")
        .amount("20")
        .originalTransactionID(referenceNumber)
        .transactionTypeCode(PaymentTransactionType.TC_INQUIRY)
        .build()
  }

  override function getCardDetails(reference : String) : TokenizedCreditCardDetails {
    var cardDetails = new TokenizedCreditCardDetails()
    cardDetails.CardName = "Visa xxxx-3452"
    cardDetails.Token = "CT123456789"
    return cardDetails
  }

  override function refundFullAmountForTransaction(paymentInformation: PaymentInformation) : PaymentGatewayResponse {
    return PaymentGatewayResponseBase.builder()
        .result("0")
        .referenceNumber(paymentInformation.TransactionID)
        .responseMessage("Credited")
        .amount(paymentInformation.TransactionAmount.toString())
        .originalTransactionID(paymentInformation.TransactionID)
        .transactionTypeCode(PaymentTransactionType.TC_CREDIT)
        .build()
  }

  override function redirectToPaymentGateway(response : PaymentGatewayResponse, paymentInformation : PaymentInformation) {
    DemoPaymentGatewayPage.go(paymentInformation.TransactionAmount, paymentInformation.PolicyPeriod.Job.JobNumber)
  }

  override function submitAccountVerification(paymentInformation: PaymentInstrumentDetails) : PaymentGatewayResponse {
    return PaymentGatewayResponseBase.builder().build()
  }

  override function mapSilentPostRequestToPaymentGatewayResponse(request : HttpServletRequest) : PaymentGatewayResponse {
    return PaymentGatewayResponseBase.builder().build()
  }

  override function isApprovedTransaction(response: PaymentGatewayResponse) : boolean {
    return SUCCESSFUL_PG_RESPONSES.contains(response.Result) and APPROVED_RESPONSES_MESSAGES.contains(response.ResponseMessage)
  }

  override function isVoidedTransaction(response: PaymentGatewayResponse) : boolean {
    if ({"V987654321", "V123456789"}.contains(getReferenceNumberFromResponse(response))) {
      return true
    } else {
      return false
    }
  }

  /**
   * Get transaction reference number.
   *
   * @return response reference number
   */
  private function getReferenceNumberFromResponse(response : PaymentGatewayResponse) : String {
    var referenceNumber : String
    if (response.Token != null) {
      referenceNumber = response.Token
    } else {
      referenceNumber = response.ReferenceNumber
    }
    return referenceNumber
  }
}
