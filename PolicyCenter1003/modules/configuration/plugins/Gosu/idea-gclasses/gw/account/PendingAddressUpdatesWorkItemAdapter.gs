package gw.account

uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.path.Paths
uses gw.pl.persistence.core.Key

@Export
class PendingAddressUpdatesWorkItemAdapter extends PendingUpdatesWorkItemAdapterBase<PendingAddressUpdate> {

  construct(owner: PendingAddressUpdatesWorkItem) {
    super(owner)
  }

  override protected function getUpdates() : Iterator<PendingAddressUpdate> {
    return Query.make(PendingAddressUpdate)
        .compare(PendingAddressUpdate#PendingUpdateTime, LessThanOrEquals, Date.Tomorrow.trimToMidnight().addMinutes(-1))
        .compare(PendingAddressUpdate#TargetAddress, Equals, new Key(Address, _owner.Target))
        .select().orderBy(QuerySelectColumns.path(Paths.make(PendingAddressUpdate#CreateTime))).iterator()
  }
}