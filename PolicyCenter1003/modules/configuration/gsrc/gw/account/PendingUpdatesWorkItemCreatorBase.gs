package gw.account

uses gw.pl.persistence.core.Bundle

/**
 * Base class for creating {@link entity.PendingUpdatesWorkItem}s.  These work items are used by the
 * {@link ApplyPendingAccountDataUpdatesWorkQueue} to apply account-level data changes that were made
 * during future dated jobs to the backing account information.
 */
@Export
public abstract class PendingUpdatesWorkItemCreatorBase<W extends PendingUpdatesWorkItem>{
  protected var _pendingUpdateTarget : long

  construct(pendingUpdateTarget : long) {
    _pendingUpdateTarget = pendingUpdateTarget
  }

  /**
   * Creates and populates a PendingUpdatesWorkItem of type T in the given bundle.
   */
  function createWorkItem(bundle: Bundle): W {
    var workItem = new W(bundle)
    workItem.Target = _pendingUpdateTarget
    return workItem
  }

  /**
   * @return true if the PendingUpdatesWorkItem should be processed
   */
  abstract function shouldProcessItem(): boolean
}