package gw.rating.startup

uses com.google.common.base.Stopwatch
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCDependenciesGateway
uses gw.api.system.PCLoggerCategory
uses gw.lang.reflect.TypeSystem
uses gw.rating.CostDataWithOverrideSupport
uses gw.rating.RateBookClusterMessaging
uses gw.rating.flow.RatingFunctionSource
uses gw.rating.rtm.util.ProductModelUtils

uses java.util.concurrent.TimeUnit

@Export
public final class RatebookPrimer {
  /**
   * This function is invoked during PolicyCenter startup.
   * To disable ratebook preloading, change RateBookPreloadEnabled parameter in config.
   * Removing this function will result in PolicyCenter not being able to start.
   *
   * @see PCConfigParameters#AsyncParameterSetPreload
   */
  public static function prime() {
    final var _log = PCLoggerCategory.RTM

    if (PCConfigParameters.RatingModuleOn()) {
      _log.info("Preloading all ratebooks")
      RTMLoadActions.primeForAllRateBooks()

      _log.info("Loading cost subtypes started")
      var stopwatch = Stopwatch.createStarted()
      loadPrimeCostSubtypes()
      _log.info("Loading cost subtypes done in ${stopwatch.elapsed(TimeUnit.SECONDS)} seconds")

      _log.info("Loading rating sources started")
      stopwatch.reset().start()
      loadPrimeRatingSources()
      _log.info("Loading rating sources done in ${stopwatch.elapsed(TimeUnit.SECONDS)} seconds")

      /**
       * <b>Must</b> do this last because we may optionally no longer wait for the caching to complete.
       * If we do this earlier, we get concurrent modification exception in loading prime cost subtypes.
       * Suspect it has to do with the typesystem.
       *
       *
       * @see PCConfigParameters.AsyncParameterSetPreload
       */
      // noinspection HiddenPackageReference
      if (PCDependenciesGateway.ServerMode.Dev) {
        // This is to speed up rate routine editing. Don't do this on systems where configuration of rate
        // routine definitions is not habitual, i.e., consider before enabling on production systems...
        _log.info("Loading parameter sets started")
        stopwatch.reset().start()
        RTMLoadActions.primeCachesForAllParameterSets()
        _log.info("Loading parameter sets done in ${stopwatch.elapsed(TimeUnit.SECONDS)} seconds")
      }

      RateBookClusterMessaging.registerMessageListener()
    } else {
      _log.info("Rating module is turned off, skipping rating preload.")
    }
  }

  private static function loadPrimeRatingSources() {
    ProductModelUtils
        .getAllPolicyLines()
        .forEach(\policyLine -> RatingFunctionSource.getFunctionSourcesForLine(policyLine))
  }

  private static function loadPrimeCostSubtypes() : void {
    /* There is an expensive call to: CostDataWithOverrideSupport which loads all the subtypes and caches the result.
    * Unfortunately, there is no exposed method for initializing this.  Instead, load the subtypes so that they will
    * likely get cached on the class-loader and make subsequent calls a little bit faster.
    */
    TypeSystem.lock()
    try {
      // noinspection unused
      var primeCostSubtypes = CostDataWithOverrideSupport.Type.Subtypes
    } finally {
      TypeSystem.unlock()
    }
  }
}
