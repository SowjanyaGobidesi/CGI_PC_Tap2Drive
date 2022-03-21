package gw.account

uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.path.Paths
uses gw.pl.persistence.core.Key

@Export
class PendingAccountContactRoleUpdatesWorkItemAdapter extends PendingUpdatesWorkItemAdapterBase<PendingAccountContactRoleUpdate> {

  construct(owner: PendingAccountContactRoleUpdatesWorkItem) {
    super(owner)
  }

  override protected function getUpdates() : Iterator<PendingAccountContactRoleUpdate> {
    return Query.make(PendingAccountContactRoleUpdate)
        .compare(PendingAccountContactRoleUpdate#PendingUpdateTime, LessThanOrEquals, Date.Tomorrow.trimToMidnight().addMinutes(-1))
        .compare(PendingAccountContactRoleUpdate#TargetAccountContactRole, Equals, new Key(AccountContactRole, _owner.Target))
        .select().orderBy(QuerySelectColumns.path(Paths.make(PendingAccountContactRoleUpdate#CreateTime))).iterator()
  }
}