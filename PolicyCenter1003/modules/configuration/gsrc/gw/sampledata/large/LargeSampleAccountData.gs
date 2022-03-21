package gw.sampledata.large

uses gw.api.builder.AccountBuilder
uses gw.api.builder.AccountContactBuilder
uses gw.sampledata.AbstractSampleDataCollection
uses gw.sampledata.SampleDataConstants

/**
 * A much fuller set of sample Accounts.
 */
@Export
class LargeSampleAccountData extends AbstractSampleDataCollection
{
  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Large Accounts"
  }
  
  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return accountLoaded("C000456353")
  }
  
  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    loadCompanyAccount("C000478975", null, "Big Lake Bakery", "2051", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    loadCompanyAccount("C000478567", null, "Calloway Cheese Factory", "2022", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    loadCompanyAccount("A000377655", null, "Dominion Logistics", "2022", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    loadCompanyAccount("B000467655", null, "Earth Tech", "2022", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    runTransactionAsUser(null, "Account D000556765", \bundle ->
        new AccountBuilder(false)
            .withAccountNumber("D000556765")
            .withAccountContact(new AccountContactBuilder()
                .withContact(findCompany("Sherman Developments", "415-558-8127"))
                .asAccountHolder()
                .asNamedInsured())
            .withAccountContact(new AccountContactBuilder()
                .withContact(findPerson("Mike", "Sherman"))
                .asNamedInsured())
            .withServiceTier(TC_PLATINUM)
            .create(bundle))
    runTransactionAsUser(null, "Account D000556767", \bundle ->
        new AccountBuilder(false)
            .withAccountNumber("D000556767")
            .withAccountContact(new AccountContactBuilder()
                .withContact(findCompany("Sherman Developments", "415-558-8127"))
                .asAccountHolder())
            .withServiceTier(TC_SILVER)
            .create(bundle))
    runTransactionAsUser(null, "Account C000212107", \bundle ->
        new AccountBuilder(false)
            .withAccountNumber("C000212107")
            .withAccountContact(new AccountContactBuilder()
                .withContact(findCompany("Wright Construction", "818-446-1206"))
                .asAccountHolder())
            .withAccountContact(new AccountContactBuilder()
                .withContact(findPerson("Mike", "Sherman"))
                .asDriver())
            .withServiceTier(TC_SILVER)
            .create(bundle))

    loadPersonAccount("C000456353", "Mary", "Taylor", SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    loadPersonAccount("C000148456", "Bill", "Kinman", SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    loadPersonAccount("A000377766", "Dave", "Worthington", SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    loadPersonAccount("B000457766", "Erica", "Billings", SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    runTransactionAsUser(null, "Account D000556764", \bundle ->
        new AccountBuilder(false)
            .withAccountNumber("D000556764")
            .withAccountContact(new AccountContactBuilder()
                .withContact(findPerson("Mike", "Sherman"))
                .asNamedInsured()
                .asAccountHolder()
                .asDriver())
            .withServiceTier(TC_PLATINUM)
            .create(bundle))
  }
}
