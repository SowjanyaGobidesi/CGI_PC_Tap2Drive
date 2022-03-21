package gw.job.audit

uses gw.api.locale.DisplayKey
uses com.guidewire.pl.system.filters.BeanBasedQueryFilter

uses java.util.Date

@Export
class AuditInformationFilterSet {
  construct() {}
  
  property get FilterOptions() : BeanBasedQueryFilter[] {
    return {
      new ScheduledAndInProgressFilter(),
      new InProgressFilter(),
      new ClosedFilter(),
      new DueDateFilter(),
      new EndDateFilter(),
      new AllFilter()
    }
  }
  
  //
  // PRIVATE CLASSES REPRESENTING FILTERS
  //
  private class ScheduledAndInProgressFilter implements BeanBasedQueryFilter {
  
    construct() {}

    override function applyFilter(obj: Object) : boolean {
      var info = (obj as DisplayableAuditInfo).ActualInfo
      return info.IsOpen or info.IsScheduled
    }
    
    override function toString() : String {
      return DisplayKey.get("Web.PolicyFile.Audits.Filters.ScheduledInProgress")
    }
  }
  
  private class InProgressFilter implements BeanBasedQueryFilter {
  
    construct() {}

    override function applyFilter(obj: Object) : boolean {
      return (obj as DisplayableAuditInfo).ActualInfo.IsOpen
    }
    
    override function toString() : String {
      return DisplayKey.get("Web.PolicyFile.Audits.Filters.InProgress")
    }
  }
  
  private class ClosedFilter implements BeanBasedQueryFilter {
  
    construct() {}

    override function applyFilter(obj: Object) : boolean {
      var info = (obj as DisplayableAuditInfo).ActualInfo
      return (info.IsComplete or info.IsWaived or info.IsWithdrawn) and after12MonthsAgo(info.DueDate)
    }
    
    override function toString() : String {
      return DisplayKey.get("Web.PolicyFile.Audits.Filters.Closed")
    }
  }
  
  private class DueDateFilter implements BeanBasedQueryFilter {
  
    construct() {}

    override function applyFilter(obj: Object) : boolean {
      return after12MonthsAgo((obj as DisplayableAuditInfo).DueDate)
    }
    
    override function toString() : String {
      return DisplayKey.get("Web.PolicyFile.Audits.Filters.DueDate")
    }
  }
  
  private class EndDateFilter implements BeanBasedQueryFilter {
  
    construct() {}

    override function applyFilter(obj: Object) : boolean {
      return after12MonthsAgo((obj as DisplayableAuditInfo).EndDate)
    }
    
    override function toString() : String {
      return DisplayKey.get("Web.PolicyFile.Audits.Filters.EndDate")
    }
  }

  private class AllFilter implements BeanBasedQueryFilter {
  
    construct() {}

    override function applyFilter(obj: Object) : boolean {
      return true
    }
    
    override function toString() : String {
      return DisplayKey.get("Web.PolicyFile.Audits.Filters.All")
    }
  }
  
  //
  // PRIVATE SUPPORT FUNCTIONS
  //
  private function after12MonthsAgo(target : Date) : boolean {
    return target >= Date.Today.addMonths(-12)
  }
}
