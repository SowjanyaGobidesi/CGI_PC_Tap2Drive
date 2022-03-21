package gw.rating.worksheet.worksheetcontainer

uses gw.rating.worksheet.worksheetcontainer.AbstractWorksheetContainerContentHandler

/**
 * Stores WorksheetContainer updates and applies them later.  During parallel rating, you can create
 * worksheets that are not associated with cost data, and are instead associated with NoCostWorksheetContainers.
 * These have to be stored in the main thread's PolicyPeriod.WorksheetContainer.  There is a potential thread safety
 * issue in the creation of the WorksheetContainer if multiple threads attempt to add the first worksheet at the
 * same time.  This class allows the worksheet updates to be stored when running in multiple threads and applied
 * in the main thread when processing is complete. This avoids the thread safety issues with the creation of the
 * worksheet container and means we don't have to access the worksheet container in the main thread from a child
 * thread where the beans are associated with the child bundle.
 */
@Export
class DeferredWorksheetContainerHandler extends AbstractWorksheetContainerContentHandler<EffDated> {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  /**
   * This version of updatePolicyPeriod in DeferredWorksheetContainerHandler should only be called from the main thread
   * once processing in the individual child threads has completed.
   */
  override function updatePolicyPeriod() {
    log("Starting to update the Policy Period from the Queue")
    while(!_queue.isEmpty()) {
      var entry = _queue.poll()
      log("About to add a worksheet to Policy Period")
      /*
       * PolicyPeriodWorksheetEnhancement.addWorksheetFor is not thread safe, so running this method from the main
       * thread removes the risk of a race condition.
       */
      _policyPeriod.addWorksheetFor(entry.Bean, entry.Worksheet, entry.Tag)
    }
  }
}