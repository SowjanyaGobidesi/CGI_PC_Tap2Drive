package gw.payment.paymentgateway

uses gw.plugin.Plugins
uses gw.plugin.paymentgateway.PaymentGatewayPlugin
uses gw.servlet.Servlet
uses gw.util.HttpServletRequestLogger
uses org.apache.log4j.Logger

uses javax.servlet.http.HttpServlet
uses javax.servlet.http.HttpServletRequest
uses javax.servlet.http.HttpServletResponse
uses java.lang.Exception
uses java.lang.invoke.MethodHandles

/**
 * This servlet is responsible for dispatching creation of response
 * object from incoming Payment Gateway request and for dispatching
 * process of created response.
 *
 * It allows to create UpFrontPayment record before coming from
 * PaymentGateway to PolicyCenter in case of successful transaction.
 */
@Export
@Servlet( \ path -> path.matches("/PaymentGatewaySilentPost"))
class PaymentGatewaySilentPostServlet extends HttpServlet {

  private static final var LOGGER = Logger.getLogger(MethodHandles.lookup().lookupClass())

  override function doPost(req : HttpServletRequest, resp : HttpServletResponse) {
    handleRequest(req)
  }

  /**
   * This method handles incoming request from payment gateway.
   * Creates response object and dispatch to processor method.
   *
   * @param req a http request incoming from payment gateway
   */
  private function handleRequest(req : HttpServletRequest) {
    try {
      var plugin = Plugins.get(PaymentGatewayPlugin)
      var response = plugin.mapSilentPostRequestToPaymentGatewayResponse(req)
      var responseProcessor = new PaymentGatewayResponseProcessor(response)
      responseProcessor.processPostBackPaymentResponse()
    } catch (e : Exception) {
      LOGGER.error("An error has occured during payment gateway response processing: " + e.LocalizedMessage, e)
      LOGGER.error("Response from Payment Gateway: \n" + HttpServletRequestLogger.logRequest(req))
    }
  }

}