package gw.payment.paymentgateway.impl

uses gw.api.payment.paymentgateway.PaymentGatewayResponse
uses gw.plugin.Plugins
uses gw.plugin.paymentgateway.PaymentGatewayPlugin

/**
 * Base implementation of payment gateway response.
 */
@Export
class PaymentGatewayResponseBase implements PaymentGatewayResponse {

  var _result : String as readonly Result
  var _referenceNumber : String as readonly ReferenceNumber
  var _responseMessage : String as readonly ResponseMessage
  var _amount : String as readonly Amount
  var _token : String as readonly Token
  var _originalTransactionID : String as readonly OriginalTransactionID
  var _transactionTypeCode : PaymentTransactionType as readonly TransactionType

  private construct(builder : Builder) {
    _result = builder._result
    _referenceNumber = builder._referenceNumber
    _responseMessage = builder._responseMessage
    _amount = builder._amount
    _token = builder._token
    _originalTransactionID = builder._originalTransactionID
    _transactionTypeCode = builder._transactionTypeCode
  }

  override property get IsSaleTransaction(): boolean {
    return _transactionTypeCode == PaymentTransactionType.TC_SALE
  }

  override property get IsAuthorizationTransaction(): boolean {
    return _transactionTypeCode == PaymentTransactionType.TC_AUTHORIZE
  }

  override property get IsInquiryTransaction(): boolean {
    return _transactionTypeCode == PaymentTransactionType.TC_INQUIRY
  }

  override property get IsCreditTransaction(): boolean {
    return _transactionTypeCode == PaymentTransactionType.TC_CREDIT
  }

  override property get IsPaymentConfirmationTransaction(): boolean {
    return _transactionTypeCode == PaymentTransactionType.TC_DELAYED_PAYMENT
  }

  override property get IsDataUploadTransaction(): boolean {
    return _transactionTypeCode == PaymentTransactionType.TC_DATA_UPLOAD
  }

  override property get IsApprovedTransaction() : boolean {
    var plugin = Plugins.get(PaymentGatewayPlugin)
    return plugin.isApprovedTransaction(this)
  }

  override property get IsVoidedTransaction() : boolean {
    var plugin = Plugins.get(PaymentGatewayPlugin)
    return  plugin.isVoidedTransaction(this)
  }

  public static function builder() : Builder {
    return new PaymentGatewayResponseBase.Builder()
  }
  /**
   * Inner class builder pattern.
   */
  public static class Builder {

    var _result : String as readonly Result
    var _referenceNumber : String as readonly ReferenceNumber
    var _responseMessage : String as readonly ResponseMessage
    var _amount : String as readonly Amount
    var _token : String as readonly Token
    var _originalTransactionID : String as readonly OriginalTransactionID
    var _transactionTypeCode : PaymentTransactionType as readonly TransactionType

    final function result(result : String) : Builder {
      _result = result
      return this
    }

    final function referenceNumber(referenceNumber : String) : Builder {
      _referenceNumber = referenceNumber
      return this
    }

    final function responseMessage(responseMessage : String): Builder {
      _responseMessage = responseMessage
      return this
    }

    final function amount(amount : String): Builder {
      _amount = amount
      return this
    }

    final function token(token : String): Builder {
      _token = token
      return this
    }

    final function originalTransactionID(originalTransactionID : String): Builder {
      _originalTransactionID = originalTransactionID
      return this
    }

    final function transactionTypeCode(transactionTypeCode : PaymentTransactionType): Builder {
      _transactionTypeCode = transactionTypeCode
      return this
    }

    function build() : PaymentGatewayResponseBase {
      return new PaymentGatewayResponseBase(this)
    }
  }
}