package gw.account

uses entity.PendingUpdatesWorkItem
uses gw.api.domain.account.PendingUpdate
uses gw.api.system.PCLoggerCategory
uses gw.transaction.Transaction

/**
 * Base implementation of {@link PendingUpdates}
 * Create default operation for applyUpdates
 * @param <P> A type of pending account data update
 */
@Export
abstract class PendingUpdatesWorkItemAdapterBase<P extends PendingUpdate & PendingUpdateDelegate & KeyableBean> implements PendingUpdates {
  /** User which the updates execute as */
  private static var APPLY_UPDATE_USER = "sys"
  private static var LOGGER = PCLoggerCategory.APPLY_PENDING_ACCOUNT_DATA_UPDATES

  protected var _owner : PendingUpdatesWorkItem

  construct(owner: PendingUpdatesWorkItem) {
    _owner = owner
  }

  /**
   * Apply the pending updates that are linked to this work item
   */
  function applyUpdates() {
    var updates = getUpdates()
    Transaction.runWithNewBundle(\bundle -> {
      for (update in updates) {
        if (LOGGER.TraceEnabled) {
          LOGGER.trace("Updating ${update.Target.PublicID} with updates scheduled for ${update.ExecuteTime.ShortFormat}")
        }
        update = bundle.add(update)
        update.applyUpdate()
        update.remove()
      }
    }, APPLY_UPDATE_USER)
  }

  /**
   * @return the iterator over the list of the {@link PendingUpdate}s that need to be applied
   */
  protected abstract function getUpdates(): Iterator<P>
}