package gw.plugin.multicluster.federateddata

uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.plugin.messaging.MessageTransport
uses gw.plugin.multicluster.AuthClientCredentialsEnabledClient
uses gw.plugin.multicluster.MultiClusterHttpResponseException
uses org.slf4j.MDC

uses AuthClientCredentialsEnabledClient#MESSAGE_TRACEABILITY_ID_KEY
uses Optional#ofNullable

@Export
class FederatedDataTransport implements MessageTransport {

  var _logger = PCLoggerCategory.FEDERATED_DATA_PLUGIN

  private static final var HANDLERS = FederatedEventHandler.AllValues
      .mapToKeyAndValue(\handler -> handler.eventName(), \handler -> handler)

  override function send(message : Message, transformedPayload : String) {
    if (!Enabled) {
      _logger.debug("Plugin called but disabled")
      return
    }

    try {
      handlerFor(message.EventName).ifPresent(\handler -> {
        MDC.put(MESSAGE_TRACEABILITY_ID_KEY, message.TraceabilityID)
        handler.handleEvent(message, transformedPayload)
      })
      message.reportAck()
    } catch (re : MultiClusterHttpResponseException) {
      message.ErrorDescription = re.LocalizedMessage
      _logger.debug("Error occured while sending message to Federated Data Service. Status code: " + re.StatusCode, re)
      message.reportError()
    } catch (e : Exception) {
      message.ErrorDescription = e.LocalizedMessage
      _logger.debug("Exception occured while sending message to Federated Data Service", e)
      message.reportError()
    } finally {
      MDC.remove(MESSAGE_TRACEABILITY_ID_KEY)
    }
  }

  override function shutdown() {
  }

  override function suspend() {
  }

  override function resume() {
  }

  override property set DestinationID(destinationID : int) {
  }

  static property get Enabled() : boolean {
    return PCConfigParameters.EnableFederatedData.Value
  }

  private static function handlerFor(eventName : String) : Optional<FederatedEventHandler> {
    return ofNullable(HANDLERS.get(eventName))
  }

}