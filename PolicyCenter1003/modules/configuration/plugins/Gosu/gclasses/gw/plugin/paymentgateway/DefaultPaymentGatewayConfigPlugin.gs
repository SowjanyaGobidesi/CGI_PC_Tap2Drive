package gw.plugin.paymentgateway

uses org.apache.commons.lang.StringUtils

/**
 * Default implementation of payment gateway
 * config plugin.
 */
@Export
class DefaultPaymentGatewayConfigPlugin implements PaymentGatewayConfigPlugin {

  override property get PolicyCenterURL(): String {
    return StringUtils.EMPTY
  }

  override property get PaymentGatewayPostURL(): String {
    return StringUtils.EMPTY
  }

  override property get PaymentGatewayPostConnectionPort(): int {
    return 443
  }

  override property get PaymentGatewayGetURL(): String {
    return StringUtils.EMPTY
  }

  override property get PaymentGatewayUser(): String {
    return StringUtils.EMPTY
  }

  override property get PaymentGatewayPassword(): String {
    return StringUtils.EMPTY
  }

  override property get PaymentGatewayVendor(): String {
    return StringUtils.EMPTY
  }

  override property get PaymentGatewayPartner(): String {
    return StringUtils.EMPTY
  }

  override property get PaymentGatewayConnectionTimeoutInSeconds(): int {
    return 45
  }

  override property get RedirectToPaymentGateway(): boolean {
    return true
  }

  override property get PaymentGatewayTransactionType(): PaymentTransactionType {
    return PaymentTransactionType.TC_SALE
  }
}