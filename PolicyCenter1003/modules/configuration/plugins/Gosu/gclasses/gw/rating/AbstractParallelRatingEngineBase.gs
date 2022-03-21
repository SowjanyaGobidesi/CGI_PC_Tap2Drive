package gw.rating

uses com.google.common.collect.ImmutableList
uses com.google.common.collect.ImmutableMap
uses entity.PolicyLine
uses gw.api.locale.DisplayKey
uses gw.api.profiler.PCProfilerTag
uses gw.api.rating.*
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.rating.worksheet.WorksheetLogger
uses gw.rating.worksheet.worksheetcontainer.AbstractWorksheetContainerContentHandler
uses gw.rating.worksheet.worksheetcontainer.PassThroughWorksheetContainerHandler
uses org.slf4j.Logger

uses java.util.concurrent.*

/**
 * The AbstractParallelRatingEngine provides a template for parallelized rating with method rateInParallel() and
 * supporting methods. It declares a type variable E which represents a place holder for more concrete things
 * parallelized rating can be performed against e.g. {@link EffDated} and {@link EffDatedDTO}. It should be
 * extended by sub-classes that implement parallelized rating for those concrete things such as {@link EffDated}
 * and {@link EffDatedDTO}.
 */
@Export
abstract class AbstractParallelRatingEngineBase<PL extends PolicyLine, E> extends AbstractRatingEngine<PL> {
  var _threadLocalPolicyLine = new ThreadLocal<PL>()
  protected var _worksheetContainerContentHandler : AbstractWorksheetContainerContentHandler as WorksheetContainerContentHandler
  protected var _logger : Logger = PCLoggerCategory.PARALLELIZATION
  protected var _parallelRater : AbstractParallelRater<E>
  /** Returns true if this RatingEngine should parallelize rating for this PolicyLine */
  var _shouldParallelizeRating : boolean as readonly ShouldParallelizeRating
  var _waitTimeInMilliseconds : long

  var _executorService : ExecutorService
  var _threadFactories : Set<ParallelRatingThreadFactory> = {}

  /**
   * Constructs a new rating engine instance based around the particular line.
   */
  construct(line : PL) {
    super(line)
    _threadLocalPolicyLine.set(line)
    _waitTimeInMilliseconds = Math.max(-1, PCConfigParameters.ParallelRatingTimeoutPerCoverable.Value * line.AllCoverables.Count)
    _shouldParallelizeRating = PCConfigParameters.ParallelizedRatingEnabled.Value and line.shouldParallelizeRating()
  }

  /**
   * Get the PolicyLine associated with this rating engine.
   * <p>
   * If parallel rating is enabled, this property returns different instances of PolicyLine that represent the same
   * PolicyLine entity for each child thread.
   */
  override property get PolicyLine() : PL {
    return _threadLocalPolicyLine.get()
  }

  /**
   * Set the PolicyLine for this rating engine.
   * <p>
   * If parallel rating is enabled, each child thread can have a different instance of PolicyLine here. However, they
   * should all represent the same PolicyLine entity though.
   */
  property set PolicyLine(line : PL) {
    _threadLocalPolicyLine.set(line)
 }

  /**
   * Create a new {@link ParallelRatingThreadFactory}.
   */
  protected function createThreadFactory() : ParallelRatingThreadFactory {
    return new DefaultParallelRatingThreadFactory(PolicyLine)
  }

  /**
   * Call this method to end a section of processing where the worksheet container updates to the policy period
   * may need to be deferred to avoid race conditions. This method will update the worksheet container with the
   * deferred changes if it is deferred.
   */
  protected final function endWorksheetContainerProcessing() {
    if (_worksheetContainerContentHandler == null) {
      throw new IllegalStateException(
          "The WorksheetContainerContentHandler has not been initialized. You have called method endWorksheetContainerProcessing before having called method initializeWorksheetContainerHandler")
    }
    _worksheetContainerContentHandler.updatePolicyPeriod()
  }

  /**
   * Construct the worksheet container handler and initialize it with the policy period
   * This method MUST be called from the main thread.
   */
  protected final function initializeWorksheetContainerHandler() {
     // If parallel rating is enabled, then we will be running parallel processing in one or more separate threads so
     // construct a worksheet container handler that will defer the updating of the worksheet container
    if (ShouldParallelizeRating) {
      initializeParallelWorksheetContainerHandler()
    } else {
      _worksheetContainerContentHandler = new PassThroughWorksheetContainerHandler(PolicyLine.Branch)
    }
  }

  /**
   * Initialize any thread related setup (e.g.: thread pool, rating worksheet container, preloading of a PolicyFXRate).
   * See the CPRatingEngine for an example of how this method is used.
   * In method {@link #rateSlice} call method {@link #preRateStep} before the rating code and
   * {@link #postRateStep} after the rating code.
   *
   * @param line the given slice of the PolicyLine being rated
   */
  protected function preRateStep(line : PolicyLine) {
    initializeParallelRater()
    initializeWorksheetContainerHandler()
    if (ShouldParallelizeRating) {
      loadPolicyFXRates(line)
      var threadPoolSize = PCConfigParameters.MaxRatingThreadPoolSize.Value
      _logger.info("Rating " + PolicyLine + " in parallel with initialized max thread pool size: " + threadPoolSize
          + " for job #" + PolicyLine.Branch.Job.JobNumber)
      var threadFactory = createThreadFactory()
      _executorService = Executors.newFixedThreadPool(threadPoolSize, threadFactory)
      _threadFactories.add(threadFactory)
      initOriginalBundleState(ParallelRatingHelper.recordBundleState(PolicyLine.Bundle))
    } else {
      _logger.info("Rating " + PolicyLine + " in single-threaded mode for job #" + PolicyLine.Branch.Job.JobNumber)
      _executorService = null
      initOriginalBundleState(null)
    }
  }

  abstract protected function initializeParallelRater()

  abstract protected function initializeParallelWorksheetContainerHandler()

  protected function initOriginalBundleState(bundleState : BundleState) {/*nop*/}

  /**
   * Clean-up any thread related setup (e.g.: thread pool, rating worksheet container).
   * See the CPRatingEngine for an example of how this method is used.
   * In method {@link #rateSlice} call method {@link #preRateStep} before the rating code and
   * {@link #postRateStep} after the rating code.
   */
  protected function postRateStep() {
    checkOriginalBundleState()
    shutdownExecutorServiceNow()
    endWorksheetContainerProcessing()
    logRating()
  }

  /**
   * Log the rating by telling the parallel rater that the rating has ended and that the values should be logged.
   */
  private function logRating() {
    _parallelRater.end()
    _parallelRater.log()
  }

  /**
   * If the original bundle state is set, validates the current state of the main thread's bundle against the
   * state that was recorded before parallel rating began.  Will throw an IllegalStateException if there is a
   * change.
   */
  protected function checkOriginalBundleState() {/*nop*/}

  /**
   * If the executor service is running this method will call the {@link ExecutorService#shutdownNow()} method.
   * If it is not running then nothing will be done.
   * <p>
   * It also explicitly interrupts all the threads immediately because {@link ExecutorService#shutdownNow()} might
   * take a while to interrupt the running threads.
   */
  protected function shutdownExecutorServiceNow() {
    if (ShouldParallelizeRating) {
      interruptThreads()
      _executorService.shutdownNow()
    }
  }

  /**
   * If the executor service is running this method will call the {@link ExecutorService#shutdown()} method.
   * If it is not running then nothing will be done.
   */
  protected function shutdownExecutorService() {
    if (ShouldParallelizeRating) {
      _executorService.shutdown()
    }
  }

  /**
   * To prevent the inserting of a bean into the child bundle during parallelized rating, any PolicyFXRate needed for
   * rating
   * must be preloaded into the PolicyPeriodFXRateCache prior to the parallel section of code.
   * <p>
   * The passed in line's SliceDate is used as the MarketTime for the preloaded PolicyFXRate(s). If line
   * is null
   * or if the line is not in SliceMode, fall back to using all the PolicyPeriod's possible EffectiveDates for
   * market times of the PolicyFXRates.
   *
   * @param line the given slice of the PolicyPeriod that is being rated
   */
  private function loadPolicyFXRates(line : PolicyLine) {
    var branch = PolicyLine.Branch
    var effectiveDates : List<Date>
    if (line != null and line.Slice) {
      effectiveDates = {line.SliceDate}
    } else {
      effectiveDates = branch.AllEffectiveDates
    }
    for (currency in PolicyLine.exchangeRateCurrencies()) {
      for (marketTime in effectiveDates) {
        RateCache.getPolicyFXRate(currency, marketTime)
      }
    }
  }

  /**
   * Handles multiple threaded rating execution flow. It blocks the execution flow until all the threads associated
   * with the passed-in Futures are done or timed out.
   * <p>
   * It also handles exceptions thrown by rating (and worksheet processing).
   */
  function handleFutures(futures : List<Future>) {
    if (not ShouldParallelizeRating) {
      return
    }

    shutdownExecutorService()
    if (_waitTimeInMilliseconds > -1) {
      var allTasksCompleted = _executorService.awaitTermination(_waitTimeInMilliseconds, TimeUnit.MILLISECONDS)
      if (not allTasksCompleted) {
        throw new RatingException(DisplayKey.get("Rating.Parallelization.Error.Timeout", _waitTimeInMilliseconds))
      }
    }
    try {
      futures.each(\f -> f.get())
    } catch (ex : ExecutionException) {
      checkOriginalBundleState()
      throw ex.Cause
    }
  }

  /**
   * For each element in the list, execute the specified rating code block in a separate worker thread.
   *
   * @param items       the items (e.g. coverables/coverages/DTOs created from those) to be rated
   * @param doRating(E) the code block that does the rating
   *
   * @return a List of {@link Future}) for the created worker threads.
   */
  protected function rateInParallel(items : List<E>, doRating(item : E) : void) : List<Future> {
    if (not ShouldParallelizeRating) {
      // Rate in series instead of in parallel
      for (item in items) {
        _parallelRater.rate(item, doRating)
      }
      return {}
    }

    var futures = new ArrayList<Future>()
    for (item in items) {
      var profiledRateBlock = gw.api.profiler.Profiler.createPotentiallyProfiledRunnable(
          PCProfilerTag.RATE_IN_PARALLEL, "RateInParallel Thread Entry Point", \-> {
        /*
         * The following setup is executed multi-threaded, so it needs to be thread safe.
         */
        WorksheetLogger.beginRating()
        try {
          copyPolicyLineFromThreadLocal()
          executeRatingCodeOnItem(item, doRating)
        } finally {
          resetPolicyLine()
          WorksheetLogger.endRating()
        }
      })

      /*
       * Create a runnable task that performs the rating, submit it to the executor service, and store the returned
       * future in the future list.  The executor service will manage the execution of the runnable task in a child
       * thread.
       */
      futures.add(_executorService.submit(\-> profiledRateBlock.run()))
    }
    return futures
  }

  protected function resetPolicyLine() {/*nop*/}

  /**
   * Set the policy line, stored in a thread local, to be the policy line that was created when the thread was
   * created
   */
  protected function copyPolicyLineFromThreadLocal() {/*nop*/}

  /**
   * Execute in child thread the specified rating code block
   *
   * @param item     the item (e.g. coverable/coverage/DTO created from it) to rate on
   * @param doRating the code block that does the rating
   */
  protected function executeRatingCodeOnItem(item : E, doRating(item : E) : void) {/*nop*/}

  // ================================================================================================================
  // The methods and properties below override the AbstractRatingEngine to provide thread safe versions. In
  // each method the content is wrapped in block synchronizedCostsAccess which acquires a lock on the CostDataMap.
  // ================================================================================================================

  /**
   * Returns an immutable copy of the List of CostData objects associated with the specified line.
   * This access of the cost data map is thread safe.
   *
   * @return an immutable copy of the list of CostData objects associated with the specified line.
   */
  override protected property get CostDatas() : List<CostData> {
    var costs : List<CostData>
    synchronizedCostsAccess(\costDataMap -> {
      costs = Collections.unmodifiableList(costDataMap.get(PolicyLine))
    })
    return costs
  }

  /**
   * Sets the list of costs associated with the passed in line to the passed in values
   * This update to the cost data map is thread safe.
   *
   * @param costs the list of costs that should be set
   */
  override protected final property set CostDatas(costs : List<CostData>) {
    synchronizedCostsAccess(\costDataMap -> {
      var _data = costDataMap.get(PolicyLine)
      _data.clear()
      _data.addAll(costs)
    })
  }

  /**
   * Adds the passed in CostData to the list of costs associated with the thread local line.
   * This update to the cost data map is thread safe.
   *
   * @param cost the cost to be added
   */
  override protected final function addCost(cost : CostData) {
    addCost(PolicyLine, cost)
  }

  /**
   * Adds the passed in CostData to the list of costs associated with the line.
   * This update to the cost data map is thread safe.
   *
   * @param line the thread local PolicyLine
   * @param cost the CostData to be added
   */
  override protected final function addCost(line : PolicyLine, cost : CostData) {
    if (cost != null) {
      synchronizedCostsAccess(\costDataMap ->
          costDataMap.get(line).add(cost)
      )
    }
  }

  /**
   * Adds the CostDatas to the CostDataMap for the specified policy line.
   * This update to the cost data map is thread safe.
   *
   * @param line  the thread local PolicyLine
   * @param costs the CostData to be added
   */
  override protected final function addCosts(line : PolicyLine, costs : List<CostData>) {
    if (costs != null) {
      synchronizedCostsAccess(\costDataMap -> {
        var lineCosts = costDataMap.get(line)
        if (lineCosts.HasElements) {
          lineCosts.addAll(costs)
        } else {
          costDataMap.put(line, costs)
        }
      })
    }
  }

  /**
   * Removes the specified CostData from the list of CostDatas of the thread local PolicyLine.
   * This update to the cost data map is thread safe.
   *
   * @param cost the CostData to be removed
   */
  override protected final function removeCost(cost : CostData) {
    if (cost != null) {
      synchronizedCostsAccess(\costDataMap ->
          costDataMap.get(PolicyLine).remove(cost)
      )
    }
  }

  /**
   * Adds all the passed in CostDatas to the list of costs associated with the thread local line.
   * This update to the cost data map is thread safe.
   *
   * @param costs the list of costs that should be added
   */
  override protected final function addCosts(costs : List<CostData>) {
    synchronizedCostsAccess(\costDataMap ->
        costDataMap.get(PolicyLine).addAll(costs)
    )
  }

  /**
   * Returns an immutable copy of the CostDataMap where the values are immutable copies of the lists of CostData
   * objects.
   * This access of the cost data map is thread safe.
   *
   * @return an immutable copy of the CostDataMap.
   */
  override final property get CostDataMap() : Map<PolicyLine, List<CostData>> {
    var costDataMapCopy : ImmutableMap<PolicyLine, ImmutableList<CostData>>
    synchronizedCostsAccess(\costDataMap -> {
      var mapBuilder : ImmutableMap.Builder<PolicyLine, ImmutableList<CostData>> = ImmutableMap<PolicyLine, ImmutableList<CostData>>.builder()
      for (entry in costDataMap.entrySet()) {
        mapBuilder.put(entry.Key, ImmutableList.copyOf(entry.Value))
      }
      costDataMapCopy = mapBuilder.build()
    })
    return costDataMapCopy
  }

  /**
   * Any access to the cost data map should be performed in a thread safe manner in case it happens during parallel
   * rating.  This method performs the passed in block only when a lock on the cost data map has been acquired.
   * It is used by methods in this class that need to update the cost data map, and should be used by any code in
   * subclasses that need to update the cost data map.
   *
   * @param costAccess the block of code to be performed while a lock is held on the cost data map
   */
  protected final function synchronizedCostsAccess(costAccess(costDataMap : Map<PolicyLine, List<CostData>>) : void) {
    using (super.CostDataMap as IMonitorLock) {
      costAccess(super.CostDataMap)
    }
  }

  override function rate() {
    super.rate()

    // Clear all the beans from the child thread bundles here after rating the whole PolicyPeriod is done. We can't
    // clear them earlier, for example immediately after the thread pool was shut down, because we reference some of
    // the beans while populating the rating worksheet.
    cleanupThreads()
  }

  protected function interruptThreads() {
    _threadFactories.each(\t -> t.interruptThreads())
  }

  protected function cleanupThreads() {
    _threadFactories.each(\t -> t.cleanupThreads())
  }
}
