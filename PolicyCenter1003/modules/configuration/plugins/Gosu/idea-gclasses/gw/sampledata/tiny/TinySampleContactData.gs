package gw.sampledata.tiny

uses gw.sampledata.AbstractSampleDataCollection
uses gw.transaction.Transaction

/**
 * A tiny set of Persons and Companies, just enough for testing.
 */
@Export
class TinySampleContactData extends AbstractSampleDataCollection
{
  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Tiny Contacts"
  }
  
  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return companyLoaded("Wright Construction")
  }
  
  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    Transaction.runWithNewBundle(\bundle -> {
    
      // PEOPLE
      loadPerson(bundle, TC_MS, "Nancy", "Furman", TC_WORK, "818-446-1206", null, TC_BUSINESS, "846 Yount Ln.", "Hollywood", TC_CA, "91357", "US")
      loadPerson(bundle, TC_MR, "Ray", "Newton", TC_WORK, "818-446-1206", null, TC_HOME, "1253 Paloma Ave", "Arcadia", TC_CA, "91007", "US")
      loadPerson(bundle, TC_MR, "Stan", "Newton", TC_WORK, "818-446-1206", null, TC_HOME, "1253 Paloma Ave", "Arcadia", TC_CA, "91007", "US")
      loadPerson(bundle, TC_MR, "Dirk", "Lamparter", TC_WORK, "626-473-9576", null, TC_BUSINESS, "12534 Ocean View Blvd. #2F", "Santa Monica", TC_CA, "91112", "US")
      loadPerson(bundle, TC_MR, "Bill", "Kinman", TC_HOME, "502-897-3038", null, TC_HOME, "4040 Elmwood Ave", "Louisville", TC_KY, "40207", "US")
      
      // COMPANIES
      loadCompany(bundle, "Wright Construction", "818-446-1206", null, false, TC_BUSINESS, "846 Yount Ln.", "Hollywood", TC_CA, "91357", "US")
      loadCompany(bundle, "Armstrong Cleaners", "626-473-9576", null, false, TC_BUSINESS, "1 Energy Drive", "San Ramon", TC_CA, "94833", "US")
      loadCompany(bundle, "Monrovia Metalworking", "626-473-9576", null, false, TC_BUSINESS, "3465 E Foothill Blvd", "Monrovia", TC_CA, "91006", "US")
      loadCompany(bundle, "Calloway Cheese Factory", "608-833-5798", null, false, TC_BUSINESS, "6604 Odana Rd", "Madison", TC_WI, "53719", "US")
      loadCompany(bundle, "Big Lake Bakery", "920-208-6733", null, false, TC_BUSINESS, "826 N 8th St", "Sheboygan", TC_WI, "53081", "US")
      
    })
  }
    
}
