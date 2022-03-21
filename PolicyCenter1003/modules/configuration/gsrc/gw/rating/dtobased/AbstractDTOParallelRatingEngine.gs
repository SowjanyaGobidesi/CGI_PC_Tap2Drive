package gw.rating.dtobased

uses entity.PolicyLine
uses gw.api.rating.ParallelRatingThreadFactory
uses gw.api.rating.dtobased.DTOBasedParallelRater
uses gw.api.rating.dtobased.DTOParallelRatingThreadFactory
uses gw.api.rating.dtobased.data.EffDatedBaseDTO
uses gw.api.rating.dtobased.data.PolicyLineDTO
uses gw.pl.persistence.core.Key
uses gw.rating.AbstractParallelRatingEngineBase
uses gw.rating.CostData
uses gw.rating.ICostDataInitWrapper
uses gw.rating.ValueOnlyCostDataInitWrapper
uses gw.rating.worksheet.worksheetcontainer.dtobased.DeferredDTOWorksheetContainerHandler
uses gw.util.AutoMap

/**
 * This sub-class of AbstractParallelRatingEngine performs parallel rating using DTO objects.
 * <p/>
 * The method rateInParallel() works with a list of {@link KeyableDTO} objects usually created from {@link Coverable}s.
 * <p/>
 * It does not need to deal with bundles or thread safety issues because DTOs, unlike entities, are not associated with
 * bundles.
 * <p/>
 * Using an ExecutorService class from Java's Concurrent library, it executes the specified rating code block in a
 * separate child thread. Within the parallel section of code there are setup steps including initializing a
 * WorksheetLogger and setting a separate user authentication token.
 * Then the rating code block is executed.
 * Then there are cleanup steps including restoring the user token and finishing the WorksheetLogger.
 * <p/>
 * The rateInParallel() method returns a list of {@link Future}s and we call handleFutures on each Future which handles
 * Worksheet exceptions if there are any.
 * <p/>
 * Note that if you want to use a NoCostWorksheetContainer to record worksheet information that is not associated with
 * {@link CostData}, then you should call the method:
 * <p/>
 * {@link DeferredDTOWorksheetContainerHandler#addWorksheetFor(EffDatedDTO, Worksheet, String)} on
 * _worksheetContainerContentHandler
 * <p/>
 * because this will take care of a possible race condition when multiple threads try to simultaneously initialize the
 * common WorksheetContainer.
 * <p/>
 * With DTO based rating {@link CostData} objects are not directly added to the {@link AbstractRatingEngineBase#CostDataMap}
 * property as is the case in non-parallel and entity based parallel rating. In DTO based parallel rating {@link CostData}
 * objects are staged during rating and are applied to the CostDataMap in a post rating step. This is required to eliminate
 * dependencies on entities during DTO based parallel rating.
 *
 * @param E is a type variable that represents the {@link EffDatedBaseDTO} on which rating is performed
 */
@Export
abstract class AbstractDTOParallelRatingEngine<PL extends PolicyLine, D extends PolicyLineDTO, E extends EffDatedBaseDTO>
    extends AbstractParallelRatingEngineBase<PL, E> {
  var _policyLineDTO : D as readonly PolicyLineDTO
  final var _stagedCostsByPolicyLineKey : Map<Key, List<CostData>>
  final var _costWrappersByCoverageKey : Map<Key, Map<Class, ICostDataInitWrapper>>

  /**
   * Constructs a new rating engine instance based around the particular line.
   */
  construct(line : PL) {
    super(line)
    _costWrappersByCoverageKey = initializeCostWrappersMap()
    _stagedCostsByPolicyLineKey = initializeStagedCostsMap()
  }

  override property get PolicyLine() : PL {
    return super.PolicyLine
  }

  /**
   * Set the PolicyLine DTO
   */
  override property set PolicyLine(line : PL) {
    super.PolicyLine = line
    _policyLineDTO = createPolicyLineDTO(line)
  }

  /**
   * Create a new {@link ParallelRatingThreadFactory}.
   */
  override protected function createThreadFactory() : ParallelRatingThreadFactory {
    return new DTOParallelRatingThreadFactory(PolicyLineDTO)
  }

  override protected function preRateStep(lineVersion : PolicyLine) {
    super.preRateStep(lineVersion)
    initializeCostWrappers(lineVersion)
  }

  override protected function postRateStep() {
    applyStagedCosts()
    super.postRateStep()
  }

  /**
   * Stage a {@link CostData} object. This method is thread safe.
   */
  protected function addStagedCost(cost : CostData) {
    synchronizedStagedCostAccess(\costDataMap ->
        costDataMap.get(PolicyLineDTO.ID).add(cost)
    )
  }

  /**
   * Stage the {@link CostData} objects. This method is thread safe.
   */
  protected function addStagedCosts(costs : List<CostData>) {
    synchronizedStagedCostAccess(\costDataMap ->
        costDataMap.get(PolicyLineDTO.ID).addAll(costs)
    )
  }

  /**
   * Applies the staged {@link CostData} objects to the CostDataMap property, and then flushes out the currently staged  {@link CostData} objects. This method is thread safe.
   */
  protected function applyStagedCosts() {
    synchronizedStagedCostAccess(\stagedCostDataMap -> {
      addCosts(PolicyLine, stagedCostDataMap.get(PolicyLineDTO.ID))
      stagedCostDataMap.remove(PolicyLineDTO.ID)
    }
    )
  }

  /**
   * Any access to the staged cost data map should be performed in a thread safe manner in case it happens during
   * parallel rating. This method performs the passed in block only when a lock on the staged cost data map has
   * been acquired. It is used by methods in this class that need to update the staged cost data map, and should
   * be used by any code in subclasses that need to update the cost data map.
   *
   * @param costDataAccess the block of code to be performed while a lock is held on the staged cost data map
   */
  protected function synchronizedStagedCostAccess(costDataAccess(costDataMap : Map<Key, List<CostData>>) : void) {
    using (_stagedCostsByPolicyLineKey as IMonitorLock) {
      costDataAccess(_stagedCostsByPolicyLineKey)
    }
  }

  /**
   * Returns the cost wrapper associated with the specified coverage key.
   *
   * @param coverageKey the key of the coverage to look up the cost wrapper for
   * @param costData    the CostData associated with the cost wrapper
   *
   * @return the cost wrapper
   */
  protected function getCostWrapper(coverageKey : Key, costData : CostData) : ICostDataInitWrapper {
    return _costWrappersByCoverageKey.get(coverageKey)?.get(costData.getCostClassType())
  }

  /**
   * Returns a Map of the cost wrappers associated with the specified coverage key.
   *
   * @param coverageKey the key of the coverage to look up the cost wrappers for
   *
   * @return a Map containing the cost wrappers associated with the specified coverage
   *         key that is keyed by the CostData class type. If no wrappers exists, an empty Map
   *         is returned; null is never returned.
   */
  protected function getCostWrappers(coverageKey : Key) : Map<Class, ICostDataInitWrapper> {
    return _costWrappersByCoverageKey.get(coverageKey)
  }

  /**
   * Creates a cost wrapper based on the specified cost value and adds it to the coverage cost map.
   */
  protected function addCostWrapper(cost : Cost, coverageKey : Key) {
    _costWrappersByCoverageKey.get(coverageKey).put(cost.Class, createCostWrapper(cost))
  }

  /**
   * Creates and instance of a cost data initialization wrapper based on the specified cost.
   */
  protected function createCostWrapper(cost : Cost) : ICostDataInitWrapper {
    return ValueOnlyCostDataInitWrapper.create(cost)
  }

  /**
   * Initializes the cost wrappers based on the indicated policy line. These wrappers
   * are used to initialize CostData objects that are utilized during rating.
   */
  abstract protected function initializeCostWrappers(lineVersion : PolicyLine)

  /**
   * Initializes a new line specific DTO for use in the underlying rating code.
   */
  protected abstract function createPolicyLineDTO(line : PL) : D

  /**
   * Initializes a new ParallelRater, setting the description and the logger, then starts it.
   */
  override final function initializeParallelRater() {
    _parallelRater = new DTOBasedParallelRater<E>(PolicyLine.JobType.toString(), _logger)
    _parallelRater.start()
  }

  override function executeRatingCodeOnItem(item : E, doRating(item : E) : void) {
    _parallelRater.rate(item, doRating)
  }

  protected override function initializeParallelWorksheetContainerHandler() {
    _worksheetContainerContentHandler = new DeferredDTOWorksheetContainerHandler(PolicyLine.Branch)
  }

  private function initializeStagedCostsMap() : Map<Key, List<CostData>> {
    return new AutoMap<Key, List<CostData>>(\l -> ({}))
  }

  private function initializeCostWrappersMap() : Map<Key, Map<Class, ICostDataInitWrapper>> {
    return new AutoMap<Key, Map<Class, ICostDataInitWrapper>>(\l -> {
      return new HashMap<Class, ICostDataInitWrapper>()
    })
  }
}
