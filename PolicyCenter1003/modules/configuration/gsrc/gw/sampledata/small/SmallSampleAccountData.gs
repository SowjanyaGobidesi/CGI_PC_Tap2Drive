package gw.sampledata.small

uses gw.api.web.prefs.UserPreferencesImpl
uses gw.api.web.userpreference.UserPreferencesOfCurrentUser
uses gw.sampledata.AbstractSampleDataCollection
uses gw.api.builder.*
uses gw.sampledata.SampleDataConstants
uses gw.api.database.Query
uses typekey.*

/**
 * A small set of sample Accounts.
 */
@Export
class SmallSampleAccountData extends AbstractSampleDataCollection {
  
  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Small Accounts"
  }
  
  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return accountLoaded("C000212105")
  }
    
  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    
    // Wright Construction
    runTransactionAsUser("bbaker", "Account C000212105", \b -> {
       var builder = new AccountBuilder(false)
                             .withPublicId("pc:ds:1")
                             .withAccountHolderContact(findCompany("Wright Construction", "818-446-1206"))
           .withAccountNumber("C000212105")
           .withIndustryCode(findIndustryCode("1522"))
                             .withAccountLocation(new AccountLocationBuilder(1).withState(TC_TX))
           .withAccountLocation(new AccountLocationBuilder(2).withState(TC_NY))
                             .withAccountContact(new AccountContactBuilder().asDriver().withContact(buildDriver("John","Smith")))
       addCompanyContacts(builder, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
       builder.create(b)
    })

    // Ray Newton
    var query = Query.make(Person)
    query.compare("FirstName", Equals, "Ray")
    query.compare("LastName", Equals, "Newton")
    var rayNewtonContact = query.select().single()
    runTransactionAsUser("aapplegate", "Account C000143542", \b -> { 
      var builder = new AccountBuilder(false)
                             .withAccountContact(new AccountContactBuilder().asDriver().asAccountHolder().withContact(rayNewtonContact))                             
                             .withAccountNumber("C000143542")
                             .withAccountLocation(new AccountLocationBuilder(1).withState(TC_TX))
                             .withAccountLocation(new AccountLocationBuilder(2).withState(TC_NY))
                             .withAccountContact(new AccountContactBuilder().asDriver().withContact(buildDriver("John","Smith")))
      addCompanyContacts(builder, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
      builder.create(b)
    })
     
    loadCompanyAccount("S000212121", "pc:ds2", "Armstrong Cleaners", "1522", "626-473-9576", SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    loadCompanyAccount("C000456352", null, "Monrovia Metalworking", "3444", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    loadPersonAccount("C000456354", "Wendell", "Jackson", SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    loadPersonAccount("C000456355", "Helen", "Delancy", SampleDataConstants.ACCOUNT_COMPANY_NAMES)

   runTransactionAsUser("aapplegate", "Account C000456356", \b -> {
      var aliciaContact = buildPerson("Alicia", "Shirley", null, null, null)
      var builder = new AccountBuilder(false)
          .withAccountContact(new AccountContactBuilder().asAccountHolder().withContact(aliciaContact))
          .withAccountNumber("C000456356")
          .withAccountLocation(new AccountLocationBuilder(1).withState(TC_TX))
          .withAccountLocation(new AccountLocationBuilder(2).withState(TC_NY))
          .withAccountContact(new AccountContactBuilder().asAdditionalInterest().withContact(buildPerson("Simon", "Smith", null, null, null)))
          .withAccountContact(new AccountContactBuilder().asAdditionalInsured().withContact(buildPerson("Robert", "Stone", null, null, null)))
          .withAccountContact(new AccountContactBuilder().asNamedInsured().withContact(buildPerson("John", "Shirley", null, null, null)))
      builder.create(b)
    })

    // Give aapplegate some account history
    runTransactionAsUser("aapplegate", "User history aapplegate", \b -> {
      var userPreferences = new UserPreferencesImpl(User.util.CurrentUser)
      var preferenceObject = userPreferences.getPreferences(UserPreferencesOfCurrentUser.USER_PREFERENCES_KEY)
      preferenceObject.putString(UserPreferencesOfCurrentUser.LAST_ACCOUNTS, "C000212105|C000143542|S000212121|C000456356")
      userPreferences.applyPreferencesForPreferenceKey(UserPreferencesOfCurrentUser.USER_PREFERENCES_KEY, preferenceObject)
      userPreferences.flush()
    })
  }
    
}
