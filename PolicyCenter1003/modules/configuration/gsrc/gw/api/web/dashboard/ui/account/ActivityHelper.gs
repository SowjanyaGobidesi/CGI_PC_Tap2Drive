package gw.api.web.dashboard.ui.account

uses entity.Activity
uses gw.api.database.IQueryBeanResult
uses gw.api.database.QuerySelectColumns
uses gw.api.web.dashboard.ui.DashboardParameters

@Export
class ActivityHelper {

  final var _activities: IQueryBeanResult<Activity>
  final var _activitiesLimit: int

  construct(account: Account) {
    this(account, DashboardParameters.ListViewLimit)
  }

  construct(account: Account, activitiesLimit: int) {
    _activities = orderByPriorityThenDueDate(account.AllOpenActivities)
    _activitiesLimit = activitiesLimit
  }

  private static function orderByPriorityThenDueDate(result: IQueryBeanResult<Activity>): IQueryBeanResult<Activity> {
    result.orderBy(QuerySelectColumns.path(Activity.PRIORITY_PROP.get()))
        .thenBy(QuerySelectColumns.path(Activity.TARGETDATE_PROP.get()))
    return result
  }

  property get Activities(): Activity[] {
    return _activities.limit(_activitiesLimit).toTypedArray()
  }

  property get ViewMoreVisible(): boolean {
    return _activities.Count > _activitiesLimit
  }
}
