package gw.account

uses gw.api.database.Query

@Export
class PendingContactUpdatesWorkItemCreator extends PendingUpdatesWorkItemCreatorBase<PendingContactUpdatesWorkItem> {

  construct(pendingUpdateTarget : long) {
    super(pendingUpdateTarget)
  }

  /**
   * Only process the PendingContactUpdatesWorkItem if there isn't already one for the same target
   * @return true if should process
   */
  override function shouldProcessItem() : boolean {
    return Query.make(PendingContactUpdatesWorkItem)
        .compare(PendingContactUpdatesWorkItem#Target, Equals, _pendingUpdateTarget)
        .select().Empty
  }
}