package gw.account

uses gw.api.database.Query

@Export
class PendingAccountContactRoleUpdatesWorkItemCreator extends PendingUpdatesWorkItemCreatorBase<PendingAccountContactRoleUpdatesWorkItem> {

  construct(pendingUpdateTarget : long) {
    super(pendingUpdateTarget)
  }

  /**
   * Only process the PendingAccountContactRoleUpdatesWorkItem if there isn't already one for the same target
   * @return true if should process
   */
  override function shouldProcessItem() : boolean {
    return Query.make(PendingAccountContactRoleUpdatesWorkItem)
        .compare(PendingAccountContactRoleUpdatesWorkItem#Target, Equals, _pendingUpdateTarget)
        .select().Empty
  }
}