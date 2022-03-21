package gw.api.filters
uses gw.api.locale.DisplayKey
uses com.guidewire.pl.system.dependency.PLDependencies
uses gw.api.web.filter.NamedFilter
uses com.guidewire.pl.system.filters.BeanBasedQueryFilter
uses java.util.Date
uses com.guidewire.pc.web.desktop.AccountFilters

enhancement DesktopAccountFiltersEnhancement : gw.api.web.desktop.DesktopAccountFilters {
  
  static function myAccountFilters()  : BeanBasedQueryFilter[] {
    var user = PLDependencies.CommonDependencies.CurrentUser
    
    var allPending = new NamedFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Accounts.AllPending"),
                  AccountFilters.Status.getPending()) 
                  
    var createdInPast7Days = new NamedFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Accounts.CreatedInPast7Days"),
                  Account.restrictors.createdOnOrAfter(Date.Today.addDays(-7)).asFilter())

    var all = new NamedFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Accounts.All"), Account.restrictors.satisfiesSecurityForUser(user).asFilter())
    return {allPending, createdInPast7Days, all}
  }
  
}
