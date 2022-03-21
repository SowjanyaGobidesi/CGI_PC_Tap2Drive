package gw.contingency

uses gw.api.database.Query
uses gw.processes.BulkInsertWorkQueueBase

/**
 * This work queue recalculates action start dates of unresolved contingencies.
 * This is meant to be run as a manual work queue.
 *
*/
@Export
public class RecalculateContingencyActionStartDateWorkQueue extends BulkInsertWorkQueueBase<Contingency, StandardWorkItem> {

  construct () {
    super(BatchProcessType.TC_RECALCULATECONTINGENCYACTIONSTARTDATE, StandardWorkItem, Contingency)
  }

  override function buildBulkInsertSelect(builder : Object, args: List<Object>) {
    excludeDuplicatesOnStandardWorkItem(builder, false);
    final var sourceQuery = extractSourceQuery(builder)
    sourceQuery.compare(Contingency#ActionStarted, Equals, false)
    sourceQuery.compare(Contingency#Status, Equals, ContingencyStatus.TC_PENDING)
    (sourceQuery as Query).withLogSQL(true)
  }

  override function processWorkItem(workItem: StandardWorkItem) {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var contingency = bundle.add(extractTarget(workItem))
      contingency.ActionStartDate = null
      contingency.updateActionStartDate()
    })
  }
}
