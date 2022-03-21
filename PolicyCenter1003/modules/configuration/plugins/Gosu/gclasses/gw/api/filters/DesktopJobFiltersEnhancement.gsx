package gw.api.filters

uses com.guidewire.pl.system.filters.BeanBasedQueryFilter
uses gw.api.locale.DisplayKey
uses gw.api.web.filter.NamedFilter
uses gw.plugin.util.CurrentUserUtil

enhancement DesktopJobFiltersEnhancement : gw.api.web.desktop.DesktopJobFilters {

  static function producerFilters(): BeanBasedQueryFilter[] {
    return {allOpen(), createdJobsWithin7Days(), completedJobsWithin30Days()}
  }

  static function allOpen(): NamedFilter {
    return new NamedFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Jobs.Open"), Job.restrictors.open().asFilter())
  }

  static function createdJobsWithin7Days(): NamedFilter {
    return new NamedFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Jobs.Created7Days"),
        Job.restrictors.createdOnOrAfter(Date.Today.addDays(-7)).asFilter())
  }

  static function completedJobsWithin30Days(): NamedFilter {
    return new NamedFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Jobs.Completed30Days"),
        Job.restrictors.complete().with(Job.restrictors.closedOnOrAfter(Date.Today.addDays(-30))).asFilter())
  }

  static function filters() : BeanBasedQueryFilter[] {
    return {myOpenActivitiesFilter(), myOpenActivitiesFilterDueWithin7Days()}
  }
  
  static function myOpenActivitiesFilter() : NamedFilter {
    var user = CurrentUserUtil.getCurrentUser().User
    var filterParts = {Job.restrictors.open().asFilter(), 
                       Job.restrictors.activityAssignedToUser(user).asFilter()}
    return new NamedFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Activities.Open"), filterParts.toTypedArray())
  }
  
  static function myOpenActivitiesFilterDueWithin7Days() : NamedFilter {
    var filterParts = {Job.restrictors.open().asFilter(), 
                       Job.restrictors.activityTargetDateOnOrBefore(CurrentUserUtil.getCurrentUser().User, Date.Today.addDays(7)).asFilter()}
    return new NamedFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Activities.Created7Days"), filterParts.toTypedArray())
  }
  
  static function openIssuanceJobFilter() : NamedFilter {
    var filterParts = {Job.restrictors.open().asFilter(), 
                       Job.restrictors.ofTypes({typekey.Job.TC_ISSUANCE}).asFilter()}
    return new NamedFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Jobs.OpenIssuance"), filterParts.toTypedArray())
  }
  
}
