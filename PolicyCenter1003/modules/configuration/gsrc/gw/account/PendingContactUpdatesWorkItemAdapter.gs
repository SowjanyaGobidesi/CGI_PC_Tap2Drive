package gw.account

uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.path.Paths
uses gw.pl.persistence.core.Key

@Export
class PendingContactUpdatesWorkItemAdapter extends PendingUpdatesWorkItemAdapterBase<PendingContactUpdate> {

  construct(owner: PendingContactUpdatesWorkItem) {
    super(owner)
  }

  override protected function getUpdates() : Iterator<PendingContactUpdate> {
    return Query.make(PendingContactUpdate)
        .compare(PendingContactUpdate#PendingUpdateTime, LessThanOrEquals, Date.Tomorrow.trimToMidnight().addMinutes(-1))
        .compare(PendingContactUpdate#TargetContact, Equals, new Key(Contact, _owner.Target))
        .select().orderBy(QuerySelectColumns.path(Paths.make(PendingContactUpdate#CreateTime))).iterator()
  }
}