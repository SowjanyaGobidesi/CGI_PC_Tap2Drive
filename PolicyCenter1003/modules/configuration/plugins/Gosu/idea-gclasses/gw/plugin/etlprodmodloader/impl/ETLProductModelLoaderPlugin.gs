package gw.plugin.etlprodmodloader.impl

uses gw.api.database.Query
uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.ModifierPattern
uses gw.api.server.AvailabilityLevel
uses gw.api.startable.StartablePluginCallbackHandler
uses gw.api.startable.StartablePluginState
uses gw.api.system.PCDependenciesGateway
uses gw.api.system.PCLoggerCategory
uses gw.plugin.etlprodmodloader.IETLProductModelLoaderPlugin
uses gw.plugin.etlprodmodloader.impl.factory.ETLClausePatternCreator
uses gw.plugin.etlprodmodloader.impl.factory.ETLModifierPatternCreator
uses gw.transaction.Transaction

/**
 * This plugin does the creation of the ETL Product Model entities which maps the publicIDs of clause
 * and clause terms to actual values. The current definitions and decoding of the product model
 * information in PolicyCenter currently resides in XML files does not currently exist at the database level.
 * This plugin performs the extraction of coverage data into meaningful business relevance that could be
 * utilized by downstream systems.
 */
@Export
@gw.api.server.Availability(AvailabilityLevel.MULTIUSER) // needs to start in Multiuser so that it follows Product Model verification
class ETLProductModelLoaderPlugin implements IETLProductModelLoaderPlugin {

  private var _started = StartablePluginState.Stopped
  private var _callback : StartablePluginCallbackHandler

  override function loadProductModel() {
    if(PCDependenciesGateway.getProductModel().isProductModelConfigurationChangedThisStartup()) {
      PCLoggerCategory.ETL_PRODMODLOADER_PLUGIN.info("ETLProductModelLoaderPlugin: ETL product model tables - starting load...")
      deleteModel()
      loadModel()
      PCLoggerCategory.ETL_PRODMODLOADER_PLUGIN.info("ETLProductModelLoaderPlugin: ETL product model tables - load complete...")
    } else {
      PCLoggerCategory.ETL_PRODMODLOADER_PLUGIN.info("ETLProductModelLoaderPlugin: no changes to Product Model detected, skipping reload")
    }
  }

  /**
   * This methods deletes all of the ETL product model rows from the database
   */
  internal function deleteModel() {
    _callback.execute(\ -> {
      var aBundle = Transaction.getCurrent()
      var etlClausePatterns = Query.make(ETLClausePattern).select().toList()
      for (clausePattern in etlClausePatterns) {
        clausePattern = aBundle.add(clausePattern)
        clausePattern.remove()
      }
      var etlModifierPatterns = Query.make(ETLModifierPattern).select().toList()
      for (modifierPattern in etlModifierPatterns) {
        modifierPattern = aBundle.add(modifierPattern)
        modifierPattern.remove()
      }
    })
  }

  /**
   * This method loads the ETL product model entities into the database by calling
   * the appropriate ETL pattern creators
   */
  internal function loadModel() {
    _callback.execute(\ -> {
      var aBundle = Transaction.getCurrent()
      for (clausePattern in PCDependenciesGateway.getProductModel().getAllInstances(ClausePattern).toTypedArray()) {
        ETLClausePatternCreator.createETLClausePattern(clausePattern, aBundle)
      }

      // Load all Modifier Patterns and associated Rate Factor Patterns
      for (modifierPattern in PCDependenciesGateway.getProductModel().getAllInstances(ModifierPattern).toTypedArray()) {
        ETLModifierPatternCreator.createETLModifierPattern(modifierPattern, aBundle)
      }
    })
  }

  function start(pluginCallbackHandler: StartablePluginCallbackHandler, serverStarting: boolean) {
    _callback = pluginCallbackHandler
    loadProductModel()
    _started = StartablePluginState.Started
  }

  function stop(serverShuttingDown: boolean) {
    _started = StartablePluginState.Stopped
  }

  property get State(): StartablePluginState {
    return _started
  }
}