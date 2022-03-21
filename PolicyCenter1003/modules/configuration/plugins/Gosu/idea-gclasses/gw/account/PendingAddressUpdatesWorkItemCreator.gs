package gw.account

uses gw.api.database.Query

@Export
class PendingAddressUpdatesWorkItemCreator extends PendingUpdatesWorkItemCreatorBase<PendingAddressUpdatesWorkItem> {

  construct(pendingUpdateTarget : long) {
    super(pendingUpdateTarget)
  }

  /**
   * Only process the PendingAddressUpdatesWorkItem if there isn't already one for the same target
   * @return true if should process
   */
  override function shouldProcessItem() : boolean {
    return Query.make(PendingAddressUpdatesWorkItem)
        .compare(PendingAddressUpdatesWorkItem#Target, Equals, _pendingUpdateTarget)
        .select().Empty
  }
}