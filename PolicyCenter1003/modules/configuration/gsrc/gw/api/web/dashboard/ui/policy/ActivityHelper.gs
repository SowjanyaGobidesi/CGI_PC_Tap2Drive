package gw.api.web.dashboard.ui.policy

uses entity.Activity
uses gw.api.database.IQueryBeanResult
uses gw.api.database.QuerySelectColumns
uses gw.api.web.dashboard.ui.DashboardParameters

@Export
class ActivityHelper {
  final var _activities: Activity[] as readonly Activities
  final var _viewMoreVisible: boolean as readonly ViewMoreVisible

  construct(period: PolicyPeriod) {
    this(period, DashboardParameters.ListViewLimit)
  }

  construct(period: PolicyPeriod, limit: int) {
    var activitiesQueryResult = orderByPriorityThenDueDate(period.Policy.AllOpenActivities)
    _viewMoreVisible = activitiesQueryResult.Count > limit
    _activities = activitiesQueryResult.toTypedArray()
  }

  private static function orderByPriorityThenDueDate(result: IQueryBeanResult<Activity>): IQueryBeanResult<Activity> {
    result.orderBy(QuerySelectColumns.path(Activity.PRIORITY_PROP.get()))
        .thenBy(QuerySelectColumns.path(Activity.TARGETDATE_PROP.get()))
    return result
  }
}