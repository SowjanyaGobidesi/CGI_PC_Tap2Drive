package gw.activity

uses gw.api.locale.DisplayKey
uses gw.api.system.PLDependenciesGateway
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses java.util.Date
uses java.util.GregorianCalendar
uses java.util.Calendar
uses gw.api.database.Relop
uses gw.api.database.InOperation
uses gw.search.EntitySearchCriteria

@Export
class ActivitySearchCriteria extends EntitySearchCriteria<Activity> {
  
  var _policyNumber : String as PolicyNumber
  var _accountNumber : String as AccountNumber
  var _overdueNow : Boolean as OverdueNow
  var _activityStatus : ActivityStatus as SearchedActivityStatus
  var _priority : Priority as SearchedPriority
  var _assignedUser : User as SearchedAssignedUser 
   
  
  function makeQuery() : Query<Activity> {
    var query = Query.make(Activity)
    if (SearchedAssignedUser != null) {
      query.compare(Activity#AssignedUser,Equals , SearchedAssignedUser)
    }
    if (SearchedActivityStatus != null) {
      query.compare(Activity#Status, Equals, SearchedActivityStatus)
    }
    if (SearchedPriority != null) {
      query.compare(Activity#Priority, Equals, SearchedPriority)
    }
    if(OverdueNow  != null) {
      var operator = OverdueNow ? Relop.LessThan : Relop.GreaterThanOrEquals 
      query.compare(Activity#Status, Equals, ActivityStatus.TC_OPEN)
      query.compare(Activity#TargetDate, operator, getCurrentNormalizedDate())
    }
    if (AccountNumber != null && PolicyNumber != null) {
      // if user specified both account and policy number
      // first join Activity with PolicyPeriod via JobID  
      // join chain: Activity -> Job <- PolicyPeriod)
      var policyPeriodTable = query.join(Activity#Job).join(PolicyPeriod#Job)
      policyPeriodTable.compare(PolicyPeriod#PolicyNumber, Equals, PolicyNumber)
      // then join with Policy then Account table
      // join chain: PolicyPeriod -> Policy -> Account)
      policyPeriodTable.join(PolicyPeriod#Policy).join(Policy#Account).compare(Account#AccountNumber, Equals, AccountNumber)
    } else if (PolicyNumber != null) {
      // if user only specified policy number but not account number
      // Need to get both job and policy activities that are related to policy with specified policy number
      var periodQuery = Query.make(PolicyPeriod)
      periodQuery.compare(PolicyPeriod#PolicyNumber, Equals, PolicyNumber)
      var policyQuery = Query.make(Policy)
      policyQuery.subselect(Policy#ID, InOperation.CompareIn, periodQuery, PolicyPeriod#Policy)
      query.subselect(Activity#Policy, InOperation.CompareIn, policyQuery, Policy#ID)
    } else if (AccountNumber != null) {
      // if user only specified account number but not policy number
      // join Activity with Account on AccountID
      query.join(Activity#Account).compare(Account#AccountNumber, Equals, AccountNumber)
    }
    return query
  }
  
  function getCurrentNormalizedDate() : Date {
    var cal = GregorianCalendar.getInstance()
    cal.setTime(PLDependenciesGateway.getSystemClock().DateTime)
    cal.set(Calendar.HOUR_OF_DAY, 0)
    cal.set(Calendar.MINUTE, 0)
    cal.set(Calendar.SECOND, 0)
    cal.set(Calendar.MILLISECOND, 0)
    return cal.Time
  }
  
  
  
  override protected function doSearch() : IQueryBeanResult<Activity> {
    return makeQuery().select()  
  }

  override protected property get InvalidSearchCriteriaMessage() : String {
    return null
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    if(_assignedUser != null) return null
    if(_policyNumber.NotBlank) return null
    if(_accountNumber.NotBlank) return null
    return DisplayKey.get("Web.ActivitySearch.MinimumSearchCriteria")
  }
}
