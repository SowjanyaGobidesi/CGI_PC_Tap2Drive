package gw.sampledata.small

uses gw.sampledata.AbstractSampleDataCollection
uses gw.transaction.Transaction
uses gw.api.database.Query

/**
 * A larger set of Users / Groups / Orgs / ProducerCodes.
 */
@Export
class SmallSampleCommunityData extends AbstractSampleDataCollection
{
  private static var busProdOffsUsGrp : entity.Group
  private static var westRgnGrp : entity.Group
  private static var eastRgnGrp : entity.Group
  private static var losAngBrnchGrp : entity.Group
  private static var losAngBrnchUwGrp : entity.Group
  private static var homeOffUwGrp : entity.Group
  private static var homeOffLcGrp : entity.Group
  private static var homeOffMktngGrp : entity.Group
  private static var homeOffAdmSrvcsGrp : entity.Group
  private static var sltnsGrp : entity.Group
  private static var westMidWestRgnGrp : entity.Group
  private static var eastMidWestRgnGrp : entity.Group
  private static var alxBrnchGrp : entity.Group
  private static var birmBrnchGrp : entity.Group
  private static var bostBrnchGrp : entity.Group
  private static var bridgeBrnchGrp : entity.Group
  private static var tmpaBrnchGrp : entity.Group
  private static var trenBrnchGrp : entity.Group
  private static var boisBrnchGrp : entity.Group
  private static var phnxBrnchGrp : entity.Group
  private static var portBrnchGrp : entity.Group
  private static var sacrBrnchGrp : entity.Group
  private static var sltLakeCtyBrnchGrp : entity.Group
  private static var dlsBrnchGrp : entity.Group
  private static var dnvBrnchGrp : entity.Group
  private static var stLousBrnchGrp : entity.Group
  private static var cleveBrnchGrp : entity.Group
  private static var minnBrnchGrp : entity.Group
  private static var minnBrnchUwGrp : entity.Group



  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Small Community"
  }
  
  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return credentialLoaded("enyugen")
  }
  
  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    var underwriter1 = Query.make(UWAuthorityProfile).compare(UWAuthorityProfile#PublicID, Equals, "pc:underwriter1").select().single()
    var underwriter2 = Query.make(UWAuthorityProfile).compare(UWAuthorityProfile#PublicID, Equals, "pc:underwriter2").select().single()
    var agent1 = Query.make(UWAuthorityProfile).compare(UWAuthorityProfile#PublicID, Equals, "pc:agent1").select().single()
    
    var enigmaOrg = findOrganization("Enigma Fire & Casualty")
    var svisor = findUser("svisor")
    var ccraft = findUser("ccraft")
      
    var enyugen : User  
    var fwagner : User
    var gwang : User
    var hjohnson : User
    var mmaples : User
      
    Transaction.runWithNewBundle( \bundle ->  {
      // carrier     
      loadUser(bundle, "superuser", TC_OTHER, enigmaOrg, false, false, "system", "guidewire@enigma_fc.com ", "Guidewire", "System", "213-555-8164", "143 Lake Ave. Suite 500", "Pasadena", TC_CA, "91253", "US")
      enyugen = loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, 
                             "enyugen", "enyugen@enigma_fc.com", "Elizabith", "Nyugen", "213-555-8164", 
                             "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      fwagner = loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, 
                             "fwagner", "fwagner@enigma_fc.com", "Felicien", "Wagner", "213-555-8164", 
                             "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      gwang = loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, 
                           "gwang", "gwang@enigma_fc.com", "Gracy", "Wang", "213-555-8164", 
                           "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      hjohnson = loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, 
                              "hjohnson", "hjohnson@enigma_fc.com", "Harold", "Johnson", "213-555-8164", 
                              "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      mmaples = loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, 
                             "mmaples", "mmaples@enigma_fc.com", "Mary", "Maples", "213-555-8164", 
                             "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter2})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, 
               "jwork", "jwork@enigma_fc.com", "Jane", "Work", "213-555-8164", 
               "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, 
               "kraftly", "kraftly@enigma_fc.com", "Ken", "Raftly", "213-555-8164", 
               "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "ldonahue", "ldonahue@enigma_fc.com", "Larry", "Donahue", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "mikeshaw", "mshaw@enigma_fc.com", "Mandy", "Shaw", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "ndrew", "ndrew@enigma_fc.com", "Ned", "Drew", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "oyoung", "oyoung@enigma_fc.com", "Olive", "Young", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "pgrimes", "pgrimes@enigma_fc.com", "Patricia", "Grimes", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "rwest", "rwest@enigma_fc.com", "Raylene", "West", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "sfarley", "sfarley@enigma_fc.com", "Sharon", "Farley", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "wmann", "wmann@enigma_fc.com", "Wendy", "Mann", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "alevin", "alevin@enigma_fc.com", "Adele", "Levin", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "bhunter", "bhunter@enigma_fc.com", "Branda", "Hunter", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "ctersley", "ctersley@enigma_fc.com", "Clara", "Tersley", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "devans", "devans@enigma_fc.com", "Donald", "Evans", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "dmyers", "dmyers@enigma_fc.com", "Doug", "Myers", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "erogers", "erogers@enigma_fc.com", "Erica", "Rogers", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "fford", "fford@enigma_fc.com", "Francoise", "Ford", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "gearnhart", "gearnhart@enigma_fc.com", "Gilbert", "Earnhart", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "alee", "alee@enigma_fc.com", "Allie", "Lee", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "amunoz", "amunoz@enigma_fc.com", "Albert", "Munoz", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "jhendricks", "jhendricks@enigma_fc.com", "Jana", "Hendricks", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "jcumberland", "jcumberland@enigma_fc.com", "Jill", "Cumberland", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "jroberts", "jroberts@enigma_fc.com", "Jacob", "Roberts", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "clevitt", "clevitt@enigma_fc.com", "Chris", "Levitt", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "sbain", "sbain@enigma_fc.com", "Stan", "Bain", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "tmcdermott", "tmcdermott@enigma_fc.com", "Terry", "McDermott", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "cbeaumont", "cbeaumont@enigma_fc.com", "Claudia", "Beaumont", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "rdavis", "rdavis@enigma_fc.com", "Ray", "Davis", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "kbrown", "kbrown@enigma_fc.com", "Karen", "Brown", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "lquinn", "lquinn@enigma_fc.com", "Laura", "Quinn", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "vpignano", "vpignano@enigma_fc.com", "Vince", "Pignano", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "abaxter", "abaxter@enigma_fc.com", "Amy", "Baxter", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "jcalhoon", "jcalhoon@enigma_fc.com", "James", "Calhoon", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "ddederick", "ddederick@enigma_fc.com", "Don", "Dederick", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "revans", "revans@enigma_fc.com", "Rachel", "Evans", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "bfawcett", "bfawcett@enigma_fc.com", "Beth", "Fawcett", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "wgompers", "wgompers@enigma_fc.com", "Wendy", "Gompers", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "bhamilton", "bhamilton@enigma_fc.com", "Burt", "Hamilton", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "sjacobs", "sjacobs@enigma_fc.com", "Sandra", "Jacobs", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "wkennison", "wkennison@enigma_fc.com", "Wesley", "Kennison", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "gloch", "gloch@enigma_fc.com", "Gwenn", "Loch", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "tmazzon", "tmazzon@enigma_fc.com", "Terence", "Mazzon", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "inumin", "inumin@enigma_fc.com", "Isabel", "Numin", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "coppley", "coppley@enigma_fc.com", "Carlos", "Oppley", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "epasquale", "epasquale@enigma_fc.com", "Ernie", "Pasquale", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "rralston", "rralston@enigma_fc.com", "Rick", "Ralston", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "tsanders", "tsanders@enigma_fc.com", "Thomas", "Sanders", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "fthomson", "fthomson@enigma_fc.com", "Faith", "Thomson", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "sulveling", "sulveling@enigma_fc.com", "Sylvia", "Ulveling", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "pvance", "pvance@enigma_fc.com", "Pam", "Vance", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "kwinslow", "kwinslow@enigma_fc.com", "Kerrie", "Winslow", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "jyancy", "jyancy@enigma_fc.com", "Jill", "Yancy", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "bzimmerson", "bzimmerson@enigma_fc.com", "Becky", "Zimmerson", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "hatley", "hatley@enigma_fc.com", "Harry", "Atley", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "pbenson", "pbenson@enigma_fc.com", "Paulette", "Benson", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "tcrawford", "tcrawford@enigma_fc.com", "Todd", "Crawford", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "sdunn", "sdunn@enigma_fc.com", "Spencer", "Dunn", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "jegertson", "jegertson@enigma_fc.com", "Jonah", "Egertson", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "lfarrell", "lfarrell@enigma_fc.com", "Lynzi", "Farrell", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "tgunderson", "tgunderson@enigma_fc.com", "Trevor", "Gunderson", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "shenson", "shenson@enigma_fc.com", "Scott", "Henson", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "gickes", "gickes@enigma_fc.com", "Gerald", "Ickes", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "ljames", "ljames@enigma_fc.com", "Lana", "James", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "fkillian", "fkillian@enigma_fc.com", "Francis", "Killian", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "ilang", "ilang@enigma_fc.com", "Ilene", "Lang", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "wmotley", "wmotley@enigma_fc.com", "Warren", "Motley", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "jnafferty", "jnafferty@enigma_fc.com", "Janet", "Nafferty", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "dolsen", "dolsen@enigma_fc.com", "Darlene", "Olsen", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "cpayne", "cpayne@enigma_fc.com", "Candice", "Payne", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "mrickter", "mrickter@enigma_fc.com", "Molly", "Rickter", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "ntamden", "ntamden@enigma_fc.com", "Nick", "Tamden", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "aclinton", "aclinton@enigma_fc.com", "Amy", "Clinton", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "jdole", "jdole@enigma_fc.com", "James", "Dole", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "dbush", "dbush@enigma_fc.com", "Don", "Bush", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "rreagan", "rreagan@enigma_fc.com", "Rachel", "Reagan", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "bcarter", "bcarter@enigma_fc.com", "Beth", "Carter", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "weisenhower", "weisenhower@enigma_fc.com", "Wendy", "Eisenhower", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "bnixon", "bnixon@enigma_fc.com", "Burt", "Nixon", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "struman", "struman@enigma_fc.com", "Sandra", "Truman", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter_supervisor"}, TC_UNDERWRITER, enigmaOrg, false, false, "wroosevelt", "wroosevelt@enigma_fc.com", "Wesley", "Roosevelt", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {underwriter1})
      loadUser(bundle, {"underwriter"}, TC_UNDERWRITER, enigmaOrg, false, false, "nmyrick", "nmyrick@enigma_fc.com", "Nomi", "Myrick", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {underwriter1})
    })
    
    Transaction.runWithNewBundle( \bundle ->  {
      // GROUPS 
      busProdOffsUsGrp = findGroup( "Business Production Offices - U.S.")
      westRgnGrp = findGroup( "Western Region")
      eastRgnGrp = findGroup( "Eastern Region")
      losAngBrnchGrp = findGroup( "Los Angeles Branch")
      losAngBrnchUwGrp = findGroup( "Los Angeles Branch UW")
      homeOffUwGrp = loadGroup(bundle, "Home Office U.W.", enigmaOrg.RootGroup, TC_HOMEOFFICEUW, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      homeOffLcGrp = loadGroup(bundle, "Home Office L.C.", enigmaOrg.RootGroup, TC_HOMEOFFICELC, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      homeOffMktngGrp = loadGroup(bundle, "Home Office Marketing", enigmaOrg.RootGroup, TC_HOMEOFFICEMKT, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      homeOffAdmSrvcsGrp = loadGroup(bundle, "Home Office Admin Services", enigmaOrg.RootGroup, TC_HOMEOFFICEADMIN, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      sltnsGrp = loadGroup(bundle, "Solutions Group", homeOffMktngGrp, TC_SOLUTIONS, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      westMidWestRgnGrp = loadGroup(bundle, "Western Mid-West Region", busProdOffsUsGrp, TC_REGION, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Western Part of Mid-west")
      eastMidWestRgnGrp = loadGroup(bundle, "Eastern Mid-West Region", busProdOffsUsGrp, TC_REGION, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Eastern Part of Mid-west")
      alxBrnchGrp = loadGroup(bundle, "Alexandria Branch ", eastRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Alexandria Branch")
      birmBrnchGrp = loadGroup(bundle, "Birmingham Branch ", eastMidWestRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Birmingham Branch")
      bostBrnchGrp = loadGroup(bundle, "Boston Branch ", eastRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Boston Branch")
      bridgeBrnchGrp = loadGroup(bundle, "Bridgeport Branch ", eastRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Bridgeport Branch")
      tmpaBrnchGrp = loadGroup(bundle, "Tampa Branch ", eastRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Tampa Branch")
      trenBrnchGrp = loadGroup(bundle, "Trenton Branch ", eastRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Trenton Branch")
      boisBrnchGrp = loadGroup(bundle, "Boise Branch ", westRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Boise Branch")
      phnxBrnchGrp = loadGroup(bundle, "Phoenix Branch ", westRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Phoenix Branch")
      portBrnchGrp = loadGroup(bundle, "Portland Branch ", westRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Portland Branch")
      sacrBrnchGrp = findGroup( "Sacramento Branch")
      sltLakeCtyBrnchGrp = loadGroup(bundle, "Salt Lake City Branch ", westRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Salt Lake City Branch")
      dlsBrnchGrp = loadGroup(bundle, "Dallas Branch ", westMidWestRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Dallas Branch")
      dnvBrnchGrp = loadGroup(bundle, "Denver Branch ", westRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Denver Branch")
      stLousBrnchGrp = loadGroup(bundle, "St. Louis Branch ", westMidWestRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "St. Louis Branch")
      cleveBrnchGrp = loadGroup(bundle, "Cleveland Branch ", eastMidWestRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Cleveland Branch")
      minnBrnchGrp = loadGroup(bundle, "Minneapolis Branch ", westMidWestRgnGrp, TC_BRANCH, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "Minneapolis Branch")
      minnBrnchUwGrp = loadGroup(bundle, "Minneapolis Branch UW", minnBrnchGrp, TC_BRANCHUW, "E. Mid-West", fwagner, new User[] { enyugen, fwagner, gwang, hjohnson }, "301", enigmaOrg, "")
      loadGroup(bundle, "Eastern Mid-West Underwriting", homeOffUwGrp, TC_REGIONUW, "E. Mid-West", ccraft, new User[] { ccraft }, "", enigmaOrg, "Eastern Part of Mid-west")
      loadGroup(bundle, "Finance & Treasury", enigmaOrg.RootGroup, TC_FINANCE, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Actuary Unit", enigmaOrg.RootGroup, TC_ACTUARY, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "System administrators", enigmaOrg.RootGroup, TC_SYSTEMADMIN, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Policy Services", homeOffUwGrp, TC_POLICYSERVE, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Premium Accounting", homeOffUwGrp, TC_PREMACCT, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Customer Service", homeOffUwGrp, TC_CUSTSERV, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Western Region Underwriting", homeOffUwGrp, TC_REGIONUW, "Western Region", mmaples, new User[] { mmaples }, "", enigmaOrg, "Western Region")
      loadGroup(bundle, "Western Mid-West Underwriting", homeOffUwGrp, TC_REGIONUW, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "Western Part of Mid-west")
      loadGroup(bundle, "Eastern Region Audit", homeOffUwGrp, TC_REGIONAUDIT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "Eastern Region")
      loadGroup(bundle, "Western Mid-West Audit", homeOffUwGrp, TC_REGIONAUDIT, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "Western Part of Mid-west")
      loadGroup(bundle, "Eastern Mid-West Audit", homeOffUwGrp, TC_REGIONAUDIT, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "Eastern Part of Mid-west")
      loadGroup(bundle, "Eastern Region Marketing", homeOffMktngGrp, TC_REGIONMKT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "Eastern Region")
      loadGroup(bundle, "Western Region Marketing", homeOffMktngGrp, TC_REGIONMKT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "Western Region")
      loadGroup(bundle, "Western Mid-West Marketing", homeOffMktngGrp, TC_REGIONMKT, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "Western Part of Mid-west")
      loadGroup(bundle, "Eastern Mid-West Marketing", homeOffMktngGrp, TC_REGIONMKT, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "Eastern Part of Mid-west")
      loadGroup(bundle, "Eastern Region Loss Control", homeOffLcGrp, TC_REGIONLC, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "Eastern Region")
      loadGroup(bundle, "Western Region Loss Control", homeOffLcGrp, TC_REGIONLC, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "Western Region")
      loadGroup(bundle, "Western Mid-West Loss Control", homeOffLcGrp, TC_REGIONLC, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "Western Part of Mid-west")
      loadGroup(bundle, "Eastern Mid-West Loss Control", homeOffLcGrp, TC_REGIONLC, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "Eastern Part of Mid-west")
      loadGroup(bundle, "Alexandria Branch UW", alxBrnchGrp, TC_BRANCHUW, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Birmingham Branch UW", birmBrnchGrp, TC_BRANCHUW, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boston Branch UW", bostBrnchGrp, TC_BRANCHUW, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Bridgeport Branch UW", bridgeBrnchGrp, TC_BRANCHUW, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Tampa Branch UW", tmpaBrnchGrp, TC_BRANCHUW, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Trenton Branch UW", trenBrnchGrp, TC_BRANCHUW, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boise Branch UW", boisBrnchGrp, TC_BRANCHUW, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Phoenix Branch UW", phnxBrnchGrp, TC_BRANCHUW, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Portland Branch UW", portBrnchGrp, TC_BRANCHUW, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Sacramento Branch UW", sacrBrnchGrp, TC_BRANCHUW, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Salt Lake City Branch UW", sltLakeCtyBrnchGrp, TC_BRANCHUW, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Dallas Branch UW", dlsBrnchGrp, TC_BRANCHUW, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Denver Branch UW", dnvBrnchGrp, TC_BRANCHUW, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "St. Louis Branch UW", stLousBrnchGrp, TC_BRANCHUW, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Cleveland Branch UW", cleveBrnchGrp, TC_BRANCHUW, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Alexandria Branch Audit", alxBrnchGrp, TC_BRANCHAUDIT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Birmingham Branch Audit", birmBrnchGrp, TC_BRANCHAUDIT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boston Branch Audit", bostBrnchGrp, TC_BRANCHAUDIT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Bridgeport Branch Audit", bridgeBrnchGrp, TC_BRANCHAUDIT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Tampa Branch Audit", tmpaBrnchGrp, TC_BRANCHAUDIT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Trenton Branch Audit", trenBrnchGrp, TC_BRANCHAUDIT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boise Branch Audit", boisBrnchGrp, TC_BRANCHAUDIT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Los Angeles Branch Audit", losAngBrnchGrp, TC_BRANCHAUDIT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Phoenix Branch Audit", phnxBrnchGrp, TC_BRANCHAUDIT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Portland Branch Audit", portBrnchGrp, TC_BRANCHAUDIT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Sacramento Branch Audit", sacrBrnchGrp, TC_BRANCHAUDIT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Salt Lake City Branch Audit", sltLakeCtyBrnchGrp, TC_BRANCHAUDIT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Dallas Branch Audit", dlsBrnchGrp, TC_BRANCHAUDIT, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Denver Branch Audit", dnvBrnchGrp, TC_BRANCHAUDIT, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "St. Louis Branch Audit", stLousBrnchGrp, TC_BRANCHAUDIT, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Cleveland Branch Audit", cleveBrnchGrp, TC_BRANCHAUDIT, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Minneapolis Branch Audit", minnBrnchGrp, TC_BRANCHAUDIT, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Alexandria Branch LC", alxBrnchGrp, TC_BRANCHLC, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Birmingham Branch LC", birmBrnchGrp, TC_BRANCHLC, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boston Branch LC", bostBrnchGrp, TC_BRANCHLC, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Bridgeport Branch LC", bridgeBrnchGrp, TC_BRANCHLC, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Tampa Branch LC", tmpaBrnchGrp, TC_BRANCHLC, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Trenton Branch LC", trenBrnchGrp, TC_BRANCHLC, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boise Branch LC", boisBrnchGrp, TC_BRANCHLC, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Los Angeles Branch LC", losAngBrnchGrp, TC_BRANCHLC, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Phoenix Branch LC", phnxBrnchGrp, TC_BRANCHLC, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Portland Branch LC", portBrnchGrp, TC_BRANCHLC, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Sacramento Branch LC", sacrBrnchGrp, TC_BRANCHLC, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Salt Lake City Branch LC", sltLakeCtyBrnchGrp, TC_BRANCHLC, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Dallas Branch LC", dlsBrnchGrp, TC_BRANCHLC, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Denver Branch LC", dnvBrnchGrp, TC_BRANCHLC, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "St. Louis Branch LC", stLousBrnchGrp, TC_BRANCHLC, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Cleveland Branch LC", cleveBrnchGrp, TC_BRANCHLC, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Minneapolis Branch LC", minnBrnchGrp, TC_BRANCHLC, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Alexandria Branch Admin", alxBrnchGrp, TC_CLERICAL, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Birmingham Branch Admin", birmBrnchGrp, TC_CLERICAL, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boston Branch Admin", bostBrnchGrp, TC_CLERICAL, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Bridgeport Branch Admin", bridgeBrnchGrp, TC_CLERICAL, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Tampa Branch Admin", tmpaBrnchGrp, TC_CLERICAL, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Trenton Branch Admin", trenBrnchGrp, TC_CLERICAL, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boise Branch Admin", boisBrnchGrp, TC_CLERICAL, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Phoenix Branch Admin", phnxBrnchGrp, TC_CLERICAL, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Portland Branch Admin", portBrnchGrp, TC_CLERICAL, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Sacramento Branch Admin", sacrBrnchGrp, TC_CLERICAL, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Salt Lake City Branch Admin", sltLakeCtyBrnchGrp, TC_CLERICAL, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Dallas Branch Admin", dlsBrnchGrp, TC_CLERICAL, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Denver Branch Admin", dnvBrnchGrp, TC_CLERICAL, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "St. Louis Branch Admin", stLousBrnchGrp, TC_CLERICAL, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Cleveland Branch Admin", cleveBrnchGrp, TC_CLERICAL, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Minneapolis Branch Admin", minnBrnchGrp, TC_CLERICAL, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Eastern Region Clerical", homeOffAdmSrvcsGrp, TC_CLERICAL, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Western Region Clerical", homeOffAdmSrvcsGrp, TC_CLERICAL, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Western Mid-West Clerical", homeOffAdmSrvcsGrp, TC_CLERICAL, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Eastern Mid-West Clerical", homeOffAdmSrvcsGrp, TC_CLERICAL, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Alexandria Branch Marketing", alxBrnchGrp, TC_BRANCHMKT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Birmingham Branch Marketing", birmBrnchGrp, TC_BRANCHMKT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boston Branch Marketing", bostBrnchGrp, TC_BRANCHMKT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Bridgeport Branch Marketing", bridgeBrnchGrp, TC_BRANCHMKT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Tampa Branch Marketing", tmpaBrnchGrp, TC_BRANCHMKT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Trenton Branch Marketing", trenBrnchGrp, TC_BRANCHMKT, "Eastern Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Boise Branch Marketing", boisBrnchGrp, TC_BRANCHMKT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Los Angeles Branch Marketing", losAngBrnchGrp, TC_BRANCHMKT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Phoenix Branch Marketing", phnxBrnchGrp, TC_BRANCHMKT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Portland Branch Marketing", portBrnchGrp, TC_BRANCHMKT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Sacramento Branch Marketing", sacrBrnchGrp, TC_BRANCHMKT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Salt Lake City Branch Marketing", sltLakeCtyBrnchGrp, TC_BRANCHMKT, "Western Region", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Dallas Branch Marketing", dlsBrnchGrp, TC_BRANCHMKT, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Denver Branch Marketing", dnvBrnchGrp, TC_BRANCHMKT, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "St. Louis Branch Marketing", stLousBrnchGrp, TC_BRANCHMKT, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Cleveland Branch Marketing", cleveBrnchGrp, TC_BRANCHMKT, "W. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Minneapolis Branch Marketing", minnBrnchGrp, TC_BRANCHMKT, "E. Mid-West", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Fac Reinsurance Unit", homeOffUwGrp, TC_FACRE, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
      loadGroup(bundle, "Web Services Unit", sltnsGrp, TC_ESERVICES, "HO UW", svisor, new User[] { svisor }, "", enigmaOrg, "")
    })
    
    Transaction.runWithNewBundle( \bundle ->  {
      // External 
      var org : Organization
      var user1 : User
      var group1 : Group

      org = loadOrganization(bundle, "ACV Property Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "carkle", "carkle@ACVProperty.com", "Charles", "Arkle", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008578", "ACV Property Insurance", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Allrisk Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "chart", "chart@AllriskIns.com", "Carlos", "Hart", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      loadProducerCode(bundle, "501-002552", "Allrisk Insurance", losAngBrnchUwGrp, org, null, new User[]{ user1 }, "4460 Boulder Drive", "Tampa", TC_FL, "33605", "US")

      org = loadOrganization(bundle, "Bluto Janckowiz Independent Agent", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "emazuch", "emazuch@Bluto.com", "Edward", "Mazuch", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008586", "Bluto Janckowiz Independent Agent", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Boiler Specialists", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "rbarnes", "rbarnes@BoilerSpec.com", "Ronald", "Barnes", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008579", "Boiler Specialists", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Builders' Risk brokers", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "edean", "edean@Builders.com", "Ernie", "Dean", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002553", "Builders' Risk brokers", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Carpenters Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "rkerrey", "rkerrey@Carpenters.com", "Rick", "Kerrey", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002554", "Carpenters Insurance", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Cid Vicious agency", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "fdwight", "fdwight@CidVicious.com", "Frederick", "Dwight", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008597", "Cid Vicious agency", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Claus Workmanuberseer agency", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "pgebhardt", "pgebhardt@ClausWorkman.com", "Paul", "Gebhardt", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008598", "Claus Workmanuberseer agency", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Commercial insurers", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "ccarley", "ccarley@Commercial.com", "Cheryl", "Carley", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008580", "Commercial insurers", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Derrick Crane agency", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "tedwards", "tedwards@Derrick.com", "Thomas", "Edwards", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002555", "Derrick Crane agency", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Dimitrios Xenopolus agency", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "tgrant", "tgrant@Dimitrios.com", "Tamara", "Grant", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008575", "Dimitrios Xenopolus agency", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Drivers' Choice Truckers' Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "wdufraine", "wdufraine@Drivers.com", "William", "Dufraine", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008581", "Drivers' Choice Truckers' Insurance", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Effective Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "rgregoire", "rgregoire@Effective.com", "Robert", "Gregoire", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008582", "Effective Insurance", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Exceptional Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "fdonahue", "fdonahue@Exceptional.com", "Faith", "Donahue", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002556", "Exceptional Insurance", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Farmowners Group", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "jjosloff", "jjosloff@Farmowners.com", "John", "Josloff", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008583", "Farmowners Group", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Finalist Insurance Group", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "slieberman", "slieberman@Finalist.com", "Sylvia", "Lieberman", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002557", "Finalist Insurance Group", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Garagemen Insurance brokerage", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "mking", "mking@Garagemen.com", "Michele", "King", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008584", "Garagemen Insurance brokerage", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Greatwest Bonds and Surety", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "pmoseley", "pmoseley@Greatwest.com", "Pam", "Moseley", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002558", "Greatwest Bonds and Surety", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Harliquin and Daughter Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      loadProducerCode(bundle, "501-002559", "Harliquin and Daughter Insurance", losAngBrnchUwGrp, org, null, null)

      org = loadOrganization(bundle, "Hu, Harmless, Hier Partners", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "pmansur", "pmansur@HuHarmlesss.com", "Phyllis", "Mansur", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008585", "Hu, Harmless, Hier Partners", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Independence Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "jrandolph", "jrandolph@Independent.com", "Jill", "Randolph", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002560", "Independence Insurance", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Jillian Losttime Workers Comp", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "cnorris", "cnorris@Jillian.com", "Carl", "Norris", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008588", "Jillian Losttime Workers Comp", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Johnson and Johnson", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "bhearst", "bhearst@Johnson.com", "Becky", "Hearst", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002561", "Johnson and Johnson", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Kearney and O'Shaugnessy agency", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "rmyette", "rmyette@Kearney.com", "Richard", "Myette", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008587", "Kearney and O'Shaugnessy agency", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Killarney Creek agency", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "hdienstfrey", "hdienstfrey@Killarney.com", "Harry", "Dienstfrey", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002562", "Killarney Creek agency", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Lemon Growers", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "pflores", "pflores@LemonGrowers.com", "Paulette", "Flores", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002563", "Lemon Growers", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Manufacturers' Risk", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "twilson", "twilson@Manufacturers.com", "Todd", "Wilson", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002564", "Manufacturers' Risk", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Market Share Managing agency", TC_MGA, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "iharkin", "iharkin@Market.com", "Isabel", "Harkin", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002551", "Market Share Managing agency", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 }, "610 Fifth Avenue", "Indianapolis", TC_IN, "46201", "US")

      org = loadOrganization(bundle, "Monoline brokers", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "krice", "krice@Monoline.com", "Kirk", "Rice", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008589", "Monoline brokers", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "No Fault Group", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "shoover", "shoover@NoFault.com", "Spencer", "Hoover", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002565", "No Fault Group", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Nolocontendere brokers", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "jruhl", "jruhl@Nolocontendre.com", "Jerome", "Ruhl", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008590", "Nolocontendere brokers", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Occurrence Group", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "csherman", "csherman@Occurrence.com", "Chonghyo", "Sherman", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008591", "Occurrence Group", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Omniscient Inspections", TC_FEEINSPECT, false, null, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "gkennedy", "gkennedy@Omniscient.com", "Gwenn", "Kennedy", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})

      org = loadOrganization(bundle, "Openhand brokers", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "jcoolidge", "jcoolidge@Openhand.com", "Jonah", "Coolidge", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002566", "Openhand brokers", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Package Partners", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "mspanbauer", "mspanbauer@Package.com", "Mark", "Spanbauer", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008592", "Package Partners", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Premier Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "ltaft", "ltaft@PremierIns.com", "Lynzi", "Taft", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002567", "Premier Insurance", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Quad Cities Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "twilkie", "twilkie@QuadCities.com", "Trevor", "Wilkie", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002568", "Quad Cities Insurance", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Quick Quote Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "jstreeter", "jstreeter@QuickQuote.com", "James", "Streeter", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008593", "Quick Quote Insurance", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Risk Management Group", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "sarthur", "sarthur@RiskManagement.com", "Scott", "Arthur", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002569", "Risk Management Group", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Rubicon Flood Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "lwhipple", "lwhipple@Rubicon.com", "Lawrence", "Whipple", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008594", "Rubicon Flood Insurance", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Security Group", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      var dhayes = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "dhayes", "dhayes@Security.com", "Danny", "Hayes", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      var asecure = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, false, "asecure", "asecure@secure.com", "Able", "Secure", "213-555-8164", "143 Lake Ave. Suite 500", "Pasadena", TC_CA, "91253", "US", {agent1})
      var bsecure = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, false, "bsecure", "bsecure@secure.com", "Betty", "Secure", "213-555-8164", "143 Lake Ave. Suite 500", "Pasadena", TC_CA, "91253", "US", {agent1})
      var secAblGrp = loadGroup(bundle, "Security Group Able", org.RootGroup, TC_PRODUCER, "Western Region", dhayes, new User[] { dhayes, asecure }, "", org, "")
      var secBkrGrp = loadGroup(bundle, "Security Group Baker", org.RootGroup, TC_PRODUCER, "Western Region", dhayes, new User[] { dhayes, bsecure }, "", org, "")
      loadProducerCode(bundle, "501-002570", "Security Group", losAngBrnchUwGrp, org, null, new User[] { dhayes })
      loadProducerCode(bundle, "502-002570", "Security Group Able", losAngBrnchUwGrp, org, new Group[] { secAblGrp }, new User[] { asecure, dhayes })
      loadProducerCode(bundle, "503-002570", "Security Group Baker", losAngBrnchUwGrp, org, new Group[] { secBkrGrp }, new User[] { bsecure, dhayes })
      
      org = loadOrganization(bundle, "Special Form Property brokers", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "jfilipkowski", "jfilipkowski@SpecialForm.com", "John", "Filipkowski", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008595", "Special Form Property brokers", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Thomson Jones agency", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "tgarfield", "tgarfield@Thomson.com", "Tony", "Garfield", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "501-002571", "Thomson Jones agency", losAngBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Uninsurable brokers", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "wcummings", "wcummings@Uninsurable.com", "Walter", "Cummings", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008596", "Uninsurable brokers", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Universal Insurance ", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "slincoln", "slincoln@Universal.com", "Sarah", "Lincoln", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008572", "Universal Insurance ", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Verity Bonds and Surety", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "sbuchanan", "sbuchanan@VerityBond.com", "Susan", "Buchanan", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008573", "Verity Bonds and Surety", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Whiplash Bros. Auto Insurance", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "pharrison", "pharrison@Whiplash.com", "Phillip", "Harrison", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008574", "Whiplash Bros. Auto Insurance", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Xoria Farm Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "dguest", "dguest@XoriaFarm.com", "Debra", "Guest", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008599", "Xoria Farm Insurance", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Yellowcreek Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "akim", "akim@Yellowcreek.com", "Alan", "Kim", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      var frdUnitGrp = loadGroup(bundle, "Fraud Unit", org.RootGroup, TC_CLERICAL, "Western Region", user1, new User[] {  }, "", org, "")
      loadGroup(bundle, "Commercial Fraud Unit", frdUnitGrp, TC_CLERICAL, "Western Region", user1, new User[] {  }, "", org, "")
      loadGroup(bundle, "Personal Fraud Unit", frdUnitGrp, TC_CLERICAL, "Western Region", user1, new User[] {  }, "", org, "")
      loadProducerCode(bundle, "301-008600", "Yellowcreek Insurance", minnBrnchUwGrp, org, null, new User[]{ user1 })

      org = loadOrganization(bundle, "Youngblood Insurance", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "spierce", "spierce@Youngblood.com", "Sally", "Pierce", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008576", "Youngblood Insurance", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Zorba Przmeleski Specialty Lines", TC_BROKER, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "btyler", "btyler@Zorba.com", "Beth", "Tyler", "213-555-8164", "143 Lake Ave. Suite 501", "Pasadena", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle,"Producers", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008577", "Zorba Przmeleski Specialty Lines", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })

      org = loadOrganization(bundle, "Zealot and Zaire Insurance Partners", TC_AGENCY, false, TC_ACTIVE, "Western Region")
      user1 = loadUser(bundle, { "producer", "user_admin" }, TC_PRODUCER, org, true, true, "bmalouin", "bmalouin@ZealotandZ.com", "Brian", "Malouin", "847-555-8164", "1500 Maple Ave.", "Evanston", TC_CA, "91253", "US", {agent1})
      group1 = loadGroup(bundle, "Fraud Unit", org.RootGroup, TC_PRODUCER, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadGroup(bundle, "Commercial Fraud Unit", group1, TC_CLERICAL, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadGroup(bundle, "Personal Fraud Unit", group1, TC_CLERICAL, "Western Region", user1, new User[] { user1 }, "", org, "")
      loadProducerCode(bundle, "301-008601", "Zealot and Zaire Insurance Partners", minnBrnchUwGrp, org, new Group[] { group1 }, new User[]{ user1 })
    })
  }
}
