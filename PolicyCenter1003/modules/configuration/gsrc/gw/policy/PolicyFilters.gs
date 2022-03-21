package gw.policy

uses gw.api.locale.DisplayKey
uses com.guidewire.pl.system.filters.BeanBasedQueryFilter

@Export
class PolicyFilters {
  construct() {}

  property get FilterOptions() : BeanBasedQueryFilter[] {
    return {
      new InForceOrScheduledStatusFilter(),
      new ExpiredStatusFilter(),
      new CancelledStatusFilter(),
      new AllPolicyPeriodStatusFilter()
    }
  }

  static class AllPolicyPeriodStatusFilter implements BeanBasedQueryFilter {
    construct() {}
    override function applyFilter(obj: Object) : boolean {
      return true
    }
    override function toString() : String {
      return DisplayKey.get("Web.Policy.Filter.All")
    }
  }

  static class InForceOrScheduledStatusFilter implements BeanBasedQueryFilter {
    construct() {}
    override function applyFilter(obj: Object) : boolean {
      var dispStatus = (obj as PolicyPeriod).PeriodDisplayStatus
      return (dispStatus == DisplayKey.get("PolicyPeriod.PeriodDisplayStatus.InForce")) or 
             (dispStatus == DisplayKey.get("PolicyPeriod.PeriodDisplayStatus.Scheduled"))
    }
    override function toString() : String {
      return (DisplayKey.get("PolicyPeriod.PeriodDisplayStatus.InForceOrScheduled"))
    }
  }

  static class ExpiredStatusFilter implements BeanBasedQueryFilter {
    construct() {}
    override function applyFilter(obj: Object) : boolean {
      var dispStatus = (obj as PolicyPeriod).PeriodDisplayStatus
      return (dispStatus == DisplayKey.get("PolicyPeriod.PeriodDisplayStatus.Expired"))
    }
    override function toString() : String {
      return DisplayKey.get("PolicyPeriod.PeriodDisplayStatus.Expired")
    }
  }

  static class CancelledStatusFilter implements BeanBasedQueryFilter {
    construct() {}
    override function applyFilter(obj: Object) : boolean {
      var dispStatus = (obj as PolicyPeriod).PeriodDisplayStatus
      return (dispStatus == DisplayKey.get("PolicyPeriod.PeriodDisplayStatus.Canceled"))
    }
    override function toString() : String {
      return DisplayKey.get("PolicyPeriod.PeriodDisplayStatus.Canceled")
    }
  }
}