package gw.pcf

@Export
class TabBarHelper {

  public static function accountSearch(searchText : String) : entity.Account { 
    var acct = Account.finder.findAccountByAccountNumber(searchText)
    var currentUser: User = User.util.CurrentUser
    if (acct != null and not currentUser.canView(acct)) {
      acct = null
    }
    return acct
  }
  
  public static function jobFinder(searchText : String) : entity.Job {
    var job = Job.finder.findJobByJobNumber(searchText)
    var currentUser: User = User.util.CurrentUser
    if (job != null and not currentUser.canView(job)) {
      job = null
    }
    return job
  }

  public static function periodFinder(searchText : String) : entity.PolicyPeriod {
    var policyPeriod = Policy.retrievePeriod(searchText, Date.Today)
    return policyPeriod?.getSlice(policyPeriod.EditEffectiveDate)
  }
}
