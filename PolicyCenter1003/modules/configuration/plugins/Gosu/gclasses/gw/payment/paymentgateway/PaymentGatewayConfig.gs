package gw.payment.paymentgateway

uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.plugin.Plugins
uses gw.plugin.paymentgateway.PaymentGatewayConfigPlugin
uses org.apache.commons.lang.StringUtils

@Export
class PaymentGatewayConfig {

  private static final var _logger = PCLoggerCategory.BILLING

  private static final var HTTP_PREFIX = "http://";
  private static final var HTTPS_PREFIX = "https://";
  private static final var PAYMENT_GATEWAY_ENTRY_POINT : String = "/PaymentGatewayEntryPoint.do"

  private static final var configPlugin = Plugins.get("PaymentGatewayConfigPlugin") as PaymentGatewayConfigPlugin

  public static property get PCReturnURL() : String {
     return PolicyCenterURL + PAYMENT_GATEWAY_ENTRY_POINT
  }

  public static property get PCErrorURL() : String {
    return PolicyCenterURL + PAYMENT_GATEWAY_ENTRY_POINT
  }

  public static property get PCCancelURL() : String {
    return PolicyCenterURL
  }

  public static property get PolicyCenterURL() : String {
    if (StringUtils.isEmpty(configPlugin.PolicyCenterURL)) {
      _logger.warn("PolicyCenterURL config parameter is not set")
    }
    return configPlugin.PolicyCenterURL
  }  

  public static property get PaymentGatewayPostURL() : String {
    return configPlugin.PaymentGatewayPostURL
  }

  public static property get PaymentGatewayPostURLHost() : String {
    var url = configPlugin.PaymentGatewayPostURL
    if (url.startsWith(HTTP_PREFIX)) {
      return url.replace(HTTP_PREFIX, "")
    } else if (url.startsWith(HTTPS_PREFIX)) {
      return url.replace(HTTPS_PREFIX, "")
    }
    return url
  }

  public static property get PaymentGatewayGetURL() : String {
    return configPlugin.PaymentGatewayGetURL
  }

  public static property get PaymentGatewayPostConnectionPort() : int {
    return configPlugin.PaymentGatewayPostConnectionPort
  }

  public static property get PaymentTransactionTypeCode() : PaymentTransactionType {
    return configPlugin.PaymentGatewayTransactionType
  }

  public static property get PaymentGatewayUser() : String {
    return configPlugin.PaymentGatewayUser
  }

  public static property get PaymentGatewayVendor() : String {
    return configPlugin.PaymentGatewayVendor
  }

  public static property get PaymentGatewayPartner() : String {
    return configPlugin.PaymentGatewayPartner
  }

  public static property get PaymentGatewayPassword() : String {
    return configPlugin.PaymentGatewayPassword
  }

  public static property get PaymentGatewayConnectionTimeout() : int {
    return configPlugin.PaymentGatewayConnectionTimeoutInSeconds
  }

  public static property get RedirectToPaymentGateway() : boolean {
    return configPlugin.RedirectToPaymentGateway
  }
}
