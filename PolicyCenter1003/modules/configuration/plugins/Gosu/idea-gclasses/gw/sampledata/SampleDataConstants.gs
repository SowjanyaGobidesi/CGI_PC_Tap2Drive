package gw.sampledata
uses java.util.Date
uses java.lang.Double

/**
 * Static constants referenced by sample data
 */
@Export
class SampleDataConstants
{
  private construct() { }

  /**
   * Company names used on all the accounts
   */
  public static final var ACCOUNT_COMPANY_NAMES : String[] = new String[] {
    "Metals Unlimited", "Speedy Glass Repair", "EverReady Rentals", "Harry's Towing", "BlackBurn's Plumbing", "Acta Motors"
  }

  /**
   * This is the 'seed' date for which most other dates will be based off of.
   */
  public static function getBaseDate() : Date {
    return java.util.Date.Today
  }
  
  /**
   * This is the 'seed' date minus the given number of days
   */
  public static function getBaseDateMinus(days : Double) : Date {
    return getBaseDateMinus(0, 0, days)
  }
  
  /**
   * This is the 'seed' date minus the given number of years / months days
   */
  public static function getBaseDateMinus(years : Double, months : Double, days : Double) : Date {
    var d = getBaseDate()
    d = d.addYears( -years as int)
    d = d.addMonths( -months as int)
    d = d.addDays( -days as int) 
    return d
  }
  
  /**
   * This is the 'seed' date plus the given number of days
   */
  public static function getBaseDatePlus(days : Double) : Date {
    return getBaseDatePlus(0, 0, days)
  }
  
  /**
   * This is the 'seed' date plus the given number of years / months days
   */
  public static function getBaseDatePlus(years : Double, months : Double, days : Double) : Date {
    var d = getBaseDate()
    d = d.addYears( years as int)
    d = d.addMonths( months as int)
    d = d.addDays(days as int) 
    return d
  }
  
}
