package gw.plugin.etlprodmodloader.impl

uses gw.api.server.AvailabilityLevel
uses gw.api.startable.StartablePluginCallbackHandler
uses gw.api.startable.StartablePluginState
uses gw.plugin.etlprodmodloader.IETLProductModelLoaderPlugin

/**
 * This plugin's implementation is purposely left empty.
 *
 * Use this class in IETLProductModelLoaderPlugin.gwp if you choose not to
 * run product model ETL at startup.
 */
@Export
@gw.api.server.Availability(AvailabilityLevel.MULTIUSER) // needs to start in Multiuser so that it follows Product Model verification
class ETLProductModelLoaderEmptyPlugin implements IETLProductModelLoaderPlugin {
  override function loadProductModel() {
  }

  override function start(pluginCallbackHandler: StartablePluginCallbackHandler, serverStarting: boolean) {

  }

  override function stop(serverShuttingDown: boolean) {

  }

  override property get State(): StartablePluginState {
    return StartablePluginState.Stopped
  }
}
