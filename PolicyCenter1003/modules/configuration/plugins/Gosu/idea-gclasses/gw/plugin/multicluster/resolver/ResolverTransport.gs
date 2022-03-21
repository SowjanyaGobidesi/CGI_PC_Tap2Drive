package gw.plugin.multicluster.resolver

uses gw.api.domain.account.PCAccountTransfer
uses gw.api.personaldata.purge.PersonalDataPurgeEvent
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.plugin.Plugins
uses gw.plugin.messaging.MessageTransport
uses gw.plugin.multicluster.AuthClientCredentialsEnabledClient
uses gw.plugin.multicluster.FederatedDataPurgeSource
uses gw.plugin.multicluster.MultiClusterHttpResponseException
uses org.slf4j.MDC

uses java.lang.reflect.UndeclaredThrowableException

uses PersonalDataPurgeEvent#PERSONAL_DATA_PURGE_EVENT
uses AuthClientCredentialsEnabledClient#MESSAGE_TRACEABILITY_ID_KEY

@Export
public class ResolverTransport implements MessageTransport {

  public static final var DEST_ID : int = 321

  var _logger = PCLoggerCategory.RESOLVER_PLUGIN

  override function send(message : Message, transformedPayload : String) {
    if (!Enabled) {
      _logger.debug("Plugin called but disabled")
      return
    }

    var plugin = Plugins.get(IResolverServicePlugin)

    try {
      MDC.put(MESSAGE_TRACEABILITY_ID_KEY, message.TraceabilityID)
      if (message.EventName == Account.ACCOUNTADDED_EVENT) {
        _logger.trace("Account added: ${transformedPayload}")
        plugin.addAccount(transformedPayload)
      } else if (message.EventName == Policy.POLICYADDED_EVENT) {
        _logger.trace("Policy added: ${transformedPayload}")
        plugin.addPolicy(transformedPayload)
      } else if (message.EventName == PolicyPeriod.CREATEPERIOD_EVENT
          || message.EventName == PolicyPeriod.RENEWPERIOD_EVENT
          || message.EventName == PolicyPeriod.REWRITEPERIOD_EVENT) {
        _logger.trace("Policy period created: ${transformedPayload}")
        plugin.addPolicyPeriod(transformedPayload)
      } else if (message.EventName == PCAccountTransfer.ACCOUNTUNFROZEN_EVENT) {
        plugin.updateAccount(transformedPayload)
      } else if (message.EventName == PCAccountTransfer.POLICYUNFROZEN_EVENT) {
        plugin.updatePolicy(transformedPayload)
      } else if (message.EventName == entity.Policy.POLICYPURGED_EVENT || (
          message.SenderRefID == FederatedDataPurgeSource.POLICY.Name && message.EventName == PERSONAL_DATA_PURGE_EVENT)) {
        plugin.purgePolicy(transformedPayload)
      } else if (message.SenderRefID == FederatedDataPurgeSource.ACCOUNT.Name && message.EventName == PERSONAL_DATA_PURGE_EVENT) {
        plugin.purgeAccount(transformedPayload)
      }

      message.reportAck()
    } catch (re : MultiClusterHttpResponseException) {
      message.ErrorDescription = re.LocalizedMessage
      _logger.debug("Error occured while sending message to Resolver Service. Status code: " + re.StatusCode, re)
      message.reportError()
    } catch (e : Exception) {
      message.ErrorDescription = e typeis UndeclaredThrowableException ? e.UndeclaredThrowable.LocalizedMessage : e.LocalizedMessage
      _logger.debug("Exception occured while sending message to Resolver Service", e)
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
    return PCConfigParameters.EnableClusterResolver.Value
  }
}