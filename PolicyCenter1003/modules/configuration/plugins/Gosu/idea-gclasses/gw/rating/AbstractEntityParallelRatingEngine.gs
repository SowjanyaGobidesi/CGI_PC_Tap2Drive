package gw.rating

uses entity.PolicyLine
uses gw.api.rating.BundleState
uses gw.api.rating.ParallelRater
uses gw.api.rating.ParallelRatingHelper
uses gw.rating.worksheet.worksheetcontainer.DeferredWorksheetContainerHandler

/**
 * This sub-class of AbstractParallelRatingEngine performs parallel rating using "Entity" objects
 * <p/>
 * Method rateInParallel() iterates over a list of {@link KeyableBean} entities, usually a list of {@link Coverable}s.
 * Because bundles are not thread-safe, each element in the list creates a new bundle for its own use and copies all beans
 * from the main thread's bundle to the child thread's bundle. The PolicyLine entity is copied to the
 * child thread's bundle and later that bean will be assigned to the AbstractParallelRatingEngine's ThreadLocal PolicyLine.
 * <p/>
 * Using an ExecutorService class from Java's Concurrent library, execute the specified rating code block in a
 * separate child thread. Within the parallel section of code, there are setup steps including initializing a
 * WorksheetLogger, setting a separate user authentication token, and setting the PolicyLine bean of the child thread's
 * bundle. Then the rating code block is executed.
 * Then there are cleanup steps including restoring the user token and finishing the WorksheetLogger.
 * <p/>
 * The rateInParallel method returns a list of Futures and we call handleFutures on each Future which handles
 * Worksheet exceptions if there are any.
 * <p/>
 * Note that if you want to use a NoCostWorksheetContainer to record worksheet information that is not associated with
 * CostData, then you should call the method
 * <p/>
 * {@link WorksheetContainerContentHandler#addWorksheetFor(EffDated, Worksheet, String)} on
 * _worksheetContainerContentHandler
 * <p/>
 * because this will take care of a possible race condition when multiple threads try to simultaneously initialize the
 * common WorksheetContainer.
 * @param E is a type variable that represents the {@link EffDated} on which rating is performed
 */
@Export
abstract class AbstractEntityParallelRatingEngine<PL extends PolicyLine, E extends EffDated> extends AbstractParallelRatingEngineBase<PL, E> {
  var _origBundleState: BundleState

  /**
   * Constructs a new rating engine instance based around the particular line.
   */
  construct(line: PL) {
    super(line)
  }

  /**
   * Initializes a new ParallelRater, setting the description and the logger, then starts it.
   */
  override final function initializeParallelRater() {
    _parallelRater = new ParallelRater<E>(PolicyLine.JobType.toString(), _logger)
    _parallelRater.start()
  }

  override final function initializeParallelWorksheetContainerHandler() {
    _worksheetContainerContentHandler = new DeferredWorksheetContainerHandler(PolicyLine.Branch)
  }

  override function checkOriginalBundleState() {
    // Let's make sure the child threads didn't modify the original bundle directly.
    if (_origBundleState != null) {
      _origBundleState.validate(PolicyLine.Bundle)
      _origBundleState = null
    }
  }

  override function initOriginalBundleState(bundleState: BundleState) {
    _origBundleState = bundleState
  }

  override function resetPolicyLine() {
    PolicyLine = null
  }

  override function copyPolicyLineFromThreadLocal() {
    PolicyLine = ParallelRatingHelper.currentThreadPolicyLine() as PL
  }

  override function executeRatingCodeOnItem(item: E, doRating(item: E): void) {
    var entityBasedParallelRater = _parallelRater as ParallelRater<E>
    entityBasedParallelRater.rateInChildThread(item, doRating)
  }
}