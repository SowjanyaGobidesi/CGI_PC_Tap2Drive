package gw.rating.worksheet.worksheetcontainer.dtobased

uses gw.api.rating.dtobased.data.EffDatedDTO
uses gw.rating.worksheet.worksheetcontainer.AbstractWorksheetContainerContentHandler

/**
 * Stores WorksheetContainer updates and applies them later.  During parallel rating, you can create
 * worksheets that are not associated with cost data, and are instead associated with NoCostWorksheetContainers.
 * These have to be stored in the main thread's PolicyPeriod.WorksheetContainer.  There is a potential thread safety
 * issue in the creation of the WorksheetContainer if multiple threads attempt to add the first worksheet at the
 * same time.  This class allows the worksheet updates to be stored when running in multiple threads and applied
 * in the main thread when processing is complete. This avoids the thread safety issues with the creation of the
 * worksheet container and means we don't have to access the worksheet container in the main thread from a child
 * thread where the dtos are associated with the child bundle.
 */
@Export
class DeferredDTOWorksheetContainerHandler extends AbstractWorksheetContainerContentHandler<EffDatedDTO> {

  construct(policyPeriod: PolicyPeriod) {
    super(policyPeriod)
  }

  /**
   * This version of updatePolicyPeriod in DeferredDTOWorksheetContainerHandler should only be called from the main thread
   * once processing in the individual child threads has completed.
   */
  override function updatePolicyPeriod() {
    log("Starting to update the Policy Period from the Queue")
    while(!_queue.isEmpty()) {
      var dtoEntry = _queue.poll()
      log("About to add a worksheet to Policy Period")
      /*
       * PolicyPeriodWorksheetEnhancement.addWorksheetFor is not thread safe, so running this method from the main
       * thread removes the risk of a race condition.
       */

      // Load the entity bean using the id property of the dto
      var bean = gw.transaction.Transaction.Current.loadBean(dtoEntry.Bean.ID) as EffDated
      _policyPeriod.addWorksheetFor(bean, dtoEntry.Worksheet, dtoEntry.Tag)
    }
  }
}