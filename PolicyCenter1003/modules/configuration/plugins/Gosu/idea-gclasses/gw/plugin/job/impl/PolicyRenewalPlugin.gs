package gw.plugin.job.impl

uses gw.plugin.job.IPolicyRenewalPlugin
uses gw.api.productmodel.Product
uses gw.plugin.notification.INotificationPlugin
uses gw.plugin.Plugins
uses gw.api.database.Query
uses gw.util.concurrent.LocklessLazyVar
uses gw.api.archive.PolicyTermInArchiveException
uses gw.api.system.PCLoggerCategory
uses java.util.Date
uses gw.api.upgrade.PCCoercions

@Export
class PolicyRenewalPlugin implements IPolicyRenewalPlugin
{
  public final static var CONCURRENT_JOB_DELAY_DAYS : int = 3

  /**
   * This method determines whether to start a renewal for the given <code>PolicyPeriod</code>.  It is called by
   * the <code>PolicyRenewalStartWorkQueue</code>, which will start the actual renewal when this method returns true
   * 
   * This implementation will first evaluate the date the Renewal would normally start by calling {@link #getRenewalStartDate},
   * and then see if there are any open conflicting jobs on the Policy.  If there are no conflicting jobs, this method returns true
   * if getRenewalStartDate() returns a date in the past; when there are conflicting jobs, this method returns true if getRenewalStartDate
   * + 3 days is in the past.  All other cases return false.
   */
  override function shouldStartRenewal( periodToRenew: PolicyPeriod ) : boolean
  {
    if ((periodToRenew.Status != PolicyPeriodStatus.TC_BOUND) || (periodToRenew.Job.LatestPeriod != periodToRenew)) {
      return false
    }

    if (periodToRenew.PolicyTerm.CheckArchived) {
      throw new PolicyTermInArchiveException(periodToRenew.PolicyTerm)
    }
    
    var plannedRenewalStartDate = getRenewalStartDate(periodToRenew)
    var currentTime = Date.CurrentDate
    if (hasOpenConflictingJob(periodToRenew)) {
      var concurrentJobDelayExceeded = currentTime.afterOrEqual(plannedRenewalStartDate.addDays(CONCURRENT_JOB_DELAY_DAYS))
      if (not concurrentJobDelayExceeded) {
        PCLoggerCategory.SERVER_BATCHPROCESS.warn("Renewal for policy, " + periodToRenew.PolicyNumber + ", not started due to concurrent job")
      }
      return concurrentJobDelayExceeded
    } else {
      return currentTime.afterOrEqual(plannedRenewalStartDate)
    }    
  }

  /**
   * This method evaluates the given PolicyPeriod to determine the earliest date that a Renewal Job
   * would be created for this PolicyPeriod.  The {@link #shouldStartRenewal} calls this method to
   * help determine when to start a Renewal.  This method is additionally useful to get the date
   * a Renewal should start, whether for display or for testing purposes.
   * 
   * This implementation gets a notification date for the <code>PolicyPeriod</code> from the 
   * {@Link INotificationPlugin}, and then adds further lead time based on the Product and PeriodEndDate 
   * of the PolicyPeriod.  The date returned is always truncated to Midnight so that any date comparison
   * to the Date returned by this plugin will be reduced to a Day comparison (ignoring the time of day)
   */
  override function getRenewalStartDate( periodToRenew: PolicyPeriod ) : Date
  {
    var renewalMailDate = getRenewalMailDate(periodToRenew)    
    var daysOutToStartRenewal = getLeadTimeByProduct(periodToRenew.Policy.Product) + getLeadTimeByExpirationDate(periodToRenew.PeriodEnd)
    
    // we want the renewal to start daysOutToStartRenewal days earlier than the renewalMailDate
    return renewalMailDate.addDays(-1 * daysOutToStartRenewal).trimToMidnight()
  }

  private var _renewalUser = new LocklessLazyVar<User>() {
    override function init() : User {
      return findUserByCredential("renewal_daemon")
    }
  }

  override function getAutomatedRenewalUser(periodToRenew : PolicyPeriod) : User {
    return _renewalUser.get()
  }
  
  protected function findUserByCredential(userName : String) : User {
    var q = Query.make(User)
    q.join("Credential").compare(Credential#UserName, Equals, userName)
    var results = q.select()
    return results.AtMostOneRow  
  }
  
  /**
   * This method will return an offset based on <code>Product</code>, given the different lead
   * times to process a Renewal based on the Product of the <code>PolicyPeriod</code>
   */
   function getLeadTimeByProduct(product : Product) : int {
    switch (product) {
      case PCCoercions.makeProductModel<Product>("BusinessOwners") : return 90
      case PCCoercions.makeProductModel<Product>("BusinessAuto") : return 30
      case PCCoercions.makeProductModel<Product>("CommercialProperty") : return 60
      case PCCoercions.makeProductModel<Product>("CommercialPackage") : return 90
      case PCCoercions.makeProductModel<Product>("GeneralLiability") : return 60
      //case "HomeOwners" : return 30
      case PCCoercions.makeProductModel<Product>("InlandMarine") : return 60
      case PCCoercions.makeProductModel<Product>("PersonalAuto") : return 30
      case PCCoercions.makeProductModel<Product>("WorkersComp") : return 60
      default : {
        return 60
      }
    }
  }
  
  /**
   * This method will return an offset for additional/less time needed to process a Renewal based on when the expiration date
   * of the period falls on the calendar according to the following rules:
   *   - between Jan 1 and Jan 15 - add 15 days
   *   - between Aug 1 and Sep 15 - subtract 10 days
   */
  function getLeadTimeByExpirationDate(expirationDate : Date) : int {
    var expDateYear = expirationDate.YearOfDate
    var newYearDateRange = Date.createDateInstance(1, 1, expDateYear)..Date.createDateInstance(1, 15, expDateYear)
    if (newYearDateRange.contains(expirationDate.trimToMidnight())) {
      return 15
    }
    
    var summerDateRange = Date.createDateInstance(8, 1, expDateYear)..Date.createDateInstance(9, 15, expDateYear)
    if (summerDateRange.contains(expirationDate.trimToMidnight())) {
      return -10
    }
    
    return 0
  }
  
  /**
   * This method calls out to the <code>INotificationPlugin</code> to figure out the date materials must be mailed by,
   * given the expiration date, jurisdictions and lines of the <code>PolicyPeriod</code> being evaluated for renewal
   */
  private function getRenewalMailDate(periodToRenew : PolicyPeriod) : Date {
    var notificationPlugin = Plugins.get(INotificationPlugin)
    var periodEnd = periodToRenew.PeriodEnd
    var lineToJurisdictions = periodToRenew.AllPolicyLinePatternsAndJurisdictions
    var leadTime = notificationPlugin.getMaximumLeadTime(periodEnd, lineToJurisdictions, NotificationCategory.TC_RENEWAL)
    return periodEnd.addDays(-leadTime)
  }
  
  /**
   * This method checks for conflicting jobs for the Policy.  Currently Open PolicyChange and Cancellation jobs are considered
   * as conflicts with the Renewal
   */
  private function hasOpenConflictingJob(periodToRenew: PolicyPeriod) : boolean {
    return periodToRenew.Policy.Jobs.hasMatch( \ job -> not job.Complete and ((job typeis PolicyChange) or (job typeis Cancellation)))
  }


  override function isRenewalOffered( periodToRenew : PolicyPeriod ) : boolean {
    return false
  }

  override function doesRenewalRequireConfirmation( periodToRenew : PolicyPeriod) : boolean {
    return false
  }

}
