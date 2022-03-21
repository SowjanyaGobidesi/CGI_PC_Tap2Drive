package gw.account

uses com.google.common.collect.Iterators
uses com.guidewire.pl.system.workqueue.DistributedWorker
uses com.guidewire.pl.system.workqueue.WorkItemCreator
uses com.guidewire.pl.system.workqueue.WorkQueue
uses com.guidewire.pl.system.workqueue.WorkQueueTargetFinder
uses entity.PendingUpdatesWorkItem
uses gw.api.database.IQuery
uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.path.Paths
uses gw.api.system.PCLoggerCategory
uses org.apache.commons.lang.exception.ExceptionUtils

/**
 * Apply account syncable changes that were made during future dated jobs to 
 * the backing account information. For example if a policy change updates a 
 * driver's marital status in the future, that change should be applied to 
 * the corresponding person at the account level on the edit effective date 
 * of the policy change job.
 */
@Export
class ApplyPendingAccountDataUpdatesWorkQueue extends WorkQueue<PendingUpdatesWorkItemCreatorBase, PendingUpdatesWorkItem> {

  private static var WORK_ITEM_CREATOR : WorkItemCreator<PendingUpdatesWorkItemCreatorBase, PendingUpdatesWorkItem> = \target, queueType, bundle -> target.createWorkItem(bundle)
  private static var LOGGER = PCLoggerCategory.APPLY_PENDING_ACCOUNT_DATA_UPDATES

  public construct() {
    super(BatchProcessType.TC_APPLYPENDINGACCOUNTDATAUPDATES, PendingUpdatesWorkItem)
  }

  override property get WorkItemCreator() : WorkItemCreator<PendingUpdatesWorkItemCreatorBase, PendingUpdatesWorkItem> {
    return WORK_ITEM_CREATOR
  }

  override function createWorker() : DistributedWorker<PendingUpdatesWorkItem> {
    return new DistributedWorker<PendingUpdatesWorkItem>() {
      override function processWorkItem(item : PendingUpdatesWorkItem) {
          item.applyUpdates()
      }

      override function logStackTraceForWorkItem(workItem : PendingUpdatesWorkItem, throwable : Throwable) {
        LOGGER.warn("Exception thrown while processing ${workItem.DisplayName}: " + ExceptionUtils.getStackTrace(throwable))
      }

      override function workItemFailed(workItem : PendingUpdatesWorkItem) {
        LOGGER.error("Failed to apply update(s) for ${workItem}}")
      }
    }
  }

  override function getFinder(args : Object[]) : WorkQueueTargetFinder<PendingUpdatesWorkItemCreatorBase> {
    return new WorkQueueTargetFinder<PendingUpdatesWorkItemCreatorBase>() {
      override function findTargets() : Iterator<PendingUpdatesWorkItemCreatorBase> {
        var updateComparisonTime = Date.Tomorrow.trimToMidnight().addMinutes(-1)

        var contactUpdates = makePendingUpdateQuery(PendingContactUpdate, updateComparisonTime)
            .select({QuerySelectColumns.path(Paths.make(PendingContactUpdate#TargetContact))})
            .transformQueryRow(\row -> new PendingContactUpdatesWorkItemCreator(row.getColumn(0) as long)).iterator()

        var accountContactUpdates = makePendingUpdateQuery(PendingAccountContactRoleUpdate, updateComparisonTime)
            .select({QuerySelectColumns.path(Paths.make(PendingAccountContactRoleUpdate#TargetAccountContactRole))})
            .transformQueryRow(\row -> new PendingAccountContactRoleUpdatesWorkItemCreator(row.getColumn(0) as long)).iterator()

        var addressUpdates = makePendingUpdateQuery(PendingAddressUpdate, updateComparisonTime)
            .select({QuerySelectColumns.path(Paths.make(PendingAddressUpdate#TargetAddress))})
            .transformQueryRow(\row -> new PendingAddressUpdatesWorkItemCreator(row.getColumn(0) as long)).iterator()

        return Iterators.concat(contactUpdates, accountContactUpdates, addressUpdates)
      }

      override function shouldProcessItem(target : PendingUpdatesWorkItemCreatorBase) : boolean {
        return target.shouldProcessItem()
      }

      private reified function makePendingUpdateQuery<T extends PendingUpdateDelegate>(type: Type<T>, updateComparisonTime: Date): IQuery<T> {
        return Query.make(type).withDistinct(true).compare(PendingUpdateDelegate#PendingUpdateTime, LessThanOrEquals, updateComparisonTime)
      }
    }
  }
}
