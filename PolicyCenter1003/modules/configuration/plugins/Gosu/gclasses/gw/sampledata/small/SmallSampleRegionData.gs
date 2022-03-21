package gw.sampledata.small

uses gw.sampledata.AbstractSampleDataCollection
uses gw.transaction.Transaction

/**
 * A larger set of Regions and SecurityZones.
 */
@Export
class SmallSampleRegionData extends AbstractSampleDataCollection
{
  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Small Regions"
  }
  
  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return securityZoneLoaded("Commercial Lines")
  }
  
  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    Transaction.runWithNewBundle( \bundle -> {
      
      // ZONES
      loadSecurityZone(bundle, "Commercial Lines", "Commercail Standard Lines")
      loadSecurityZone(bundle, "Personal Lines", "Personal Lines Underwriting")
      loadSecurityZone(bundle, "Specialty Lines", "Special Lines Underwriting")
      loadSecurityZone(bundle, "W. Mid-West", "W. Mid-West")
      loadSecurityZone(bundle, "E. Mid-West", "E. Mid-West")
    
      // REGIONS
      loadRegion(bundle, "Eastern Part of Mid-west", {
        loadRegionZone(bundle, "AL", "US", TC_STATE),
        loadRegionZone(bundle, "IL", "US", TC_STATE),
        loadRegionZone(bundle, "IN", "US", TC_STATE),
        loadRegionZone(bundle, "KY", "US", TC_STATE),
        loadRegionZone(bundle, "MI", "US", TC_STATE),
        loadRegionZone(bundle, "MS", "US", TC_STATE),
        loadRegionZone(bundle, "TN", "US", TC_STATE),
        loadRegionZone(bundle, "OH", "US", TC_STATE),
        loadRegionZone(bundle, "WI", "US", TC_STATE)
      })
      loadRegion(bundle, "Western Part of Mid-west", {
        loadRegionZone(bundle, "AR", "US", TC_STATE),
        loadRegionZone(bundle, "IA", "US", TC_STATE),
        loadRegionZone(bundle, "KS", "US", TC_STATE),
        loadRegionZone(bundle, "LA", "US", TC_STATE),
        loadRegionZone(bundle, "MN", "US", TC_STATE),
        loadRegionZone(bundle, "OK", "US", TC_STATE),
        loadRegionZone(bundle, "MO", "US", TC_STATE),
        loadRegionZone(bundle, "ND", "US", TC_STATE),
        loadRegionZone(bundle, "NE", "US", TC_STATE),
        loadRegionZone(bundle, "SD", "US", TC_STATE),
        loadRegionZone(bundle, "TX", "US", TC_STATE)
      })
      loadRegion(bundle, "Alexandria Branch", {
        loadRegionZone(bundle, "DC", "US", TC_STATE),
        loadRegionZone(bundle, "MD", "US", TC_STATE),
        loadRegionZone(bundle, "NC", "US", TC_STATE),
        loadRegionZone(bundle, "VA", "US", TC_STATE),
        loadRegionZone(bundle, "WV", "US", TC_STATE)
      })
      loadRegion(bundle, "Birmingham Branch", {
        loadRegionZone(bundle, "AL", "US", TC_STATE),
        loadRegionZone(bundle, "KY", "US", TC_STATE),
        loadRegionZone(bundle, "MS", "US", TC_STATE),
        loadRegionZone(bundle, "TN", "US", TC_STATE)
      })
      loadRegion(bundle, "Boise Branch", {
        loadRegionZone(bundle, "ID", "US", TC_STATE),
        loadRegionZone(bundle, "MT", "US", TC_STATE)
      })
      loadRegion(bundle, "Boston Branch", {
        loadRegionZone(bundle, "MA", "US", TC_STATE),
        loadRegionZone(bundle, "ME", "US", TC_STATE),
        loadRegionZone(bundle, "NH", "US", TC_STATE),
        loadRegionZone(bundle, "VT", "US", TC_STATE)
      })
      loadRegion(bundle, "Bridgeport Branch", {
        loadRegionZone(bundle, "CT", "US", TC_STATE),
        loadRegionZone(bundle, "NY", "US", TC_STATE),
        loadRegionZone(bundle, "RI", "US", TC_STATE)
      })
      loadRegion(bundle, "Cleveland Branch", {
        loadRegionZone(bundle, "IL", "US", TC_STATE),
        loadRegionZone(bundle, "IN", "US", TC_STATE),
        loadRegionZone(bundle, "MI", "US", TC_STATE),
        loadRegionZone(bundle, "OH", "US", TC_STATE),
        loadRegionZone(bundle, "WI", "US", TC_STATE)
      })
      loadRegion(bundle, "Dallas Branch", {
        loadRegionZone(bundle, "AR", "US", TC_STATE),
        loadRegionZone(bundle, "LA", "US", TC_STATE),
        loadRegionZone(bundle, "OK", "US", TC_STATE),
        loadRegionZone(bundle, "TX", "US", TC_STATE)
      })
      loadRegion(bundle, "Denver Branch", {
        loadRegionZone(bundle, "CO", "US", TC_STATE),
        loadRegionZone(bundle, "WY", "US", TC_STATE)
      })
      loadRegion(bundle, "Los Angeles Branch - SoCal", {
        loadRegionZone(bundle, "CA:Imperial", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Kern", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Los Angeles", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Orange", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Riverside", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:San Bernardino", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:San Diego", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:San Luis Obispo", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Santa Barbara", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Ventura", "US", TC_COUNTY)
      })
      loadRegion(bundle, "Minneapolis Branch", {
        loadRegionZone(bundle, "MN", "US", TC_STATE),
        loadRegionZone(bundle, "ND", "US", TC_STATE),
        loadRegionZone(bundle, "SD", "US", TC_STATE)
      })
      loadRegion(bundle, "Phoenix Branch", {
        loadRegionZone(bundle, "AZ", "US", TC_STATE),
        loadRegionZone(bundle, "NM", "US", TC_STATE)
      })
      loadRegion(bundle, "Portland Branch", {
        loadRegionZone(bundle, "AK", "US", TC_STATE),
        loadRegionZone(bundle, "OR", "US", TC_STATE),
        loadRegionZone(bundle, "WA", "US", TC_STATE)
      })
      loadRegion(bundle, "Salt Lake City Branch", {
        loadRegionZone(bundle, "NV", "US", TC_STATE),
        loadRegionZone(bundle, "UT", "US", TC_STATE)
      })
      loadRegion(bundle, "St. Louis Branch", {
        loadRegionZone(bundle, "IA", "US", TC_STATE),
        loadRegionZone(bundle, "KS", "US", TC_STATE),
        loadRegionZone(bundle, "MO", "US", TC_STATE),
        loadRegionZone(bundle, "NE", "US", TC_STATE)
      })
      loadRegion(bundle, "Tampa Branch", {
        loadRegionZone(bundle, "FL", "US", TC_STATE),
        loadRegionZone(bundle, "GA", "US", TC_STATE),
        loadRegionZone(bundle, "PR", "US", TC_STATE),
        loadRegionZone(bundle, "SC", "US", TC_STATE)
      })
      loadRegion(bundle, "Trenton Branch", {
        loadRegionZone(bundle, "DE", "US", TC_STATE),
        loadRegionZone(bundle, "NJ", "US", TC_STATE),
        loadRegionZone(bundle, "PA", "US", TC_STATE)
      })
      loadRegion(bundle, "LA Local Area", {
        loadRegionZone(bundle, "CA:Kern", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Los Angeles", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Orange", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Riverside", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:San Bernardino", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:San Luis Obispo", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Santa Barbara", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:Ventura", "US", TC_COUNTY)
      })
      loadRegion(bundle, "San Diego Local Area", {
        loadRegionZone(bundle, "CA:Imperial", "US", TC_COUNTY),
        loadRegionZone(bundle, "CA:San Diego", "US", TC_COUNTY)
      })
      loadRegion(bundle, "Chicago Local Area", {
        loadRegionZone(bundle, "IL:Lake", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Cook", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:McHenry", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Boone", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:DeKalb", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Kane", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Kendall", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:DuPage", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Will", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Bureau", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Carroll", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Ford", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Grundy", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Henry", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Iroquois", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Jo Daviess", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Kankakee", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Knox", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:La Salle", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Lee", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Livingston", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Marshall", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Mercer", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Ogle", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Peoria", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Putnam", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Rock Island", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Stark", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Stephenson", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Whiteside", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Winnebago", "US", TC_COUNTY)
      })
      loadRegion(bundle, "Southwest Illinois Local Area", {
        loadRegionZone(bundle, "IL:Adams", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Alexander", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Bond", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Brown", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Calhoun", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Cass", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Champaign", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Christian", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Clark", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Clay", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Clinton", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Coles", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Crawford", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Cumberland", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:De Witt", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Douglas", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Edgar", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Edwards", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Effingham", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Fayette", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Franklin", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Fulton", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Gallatin", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Greene", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Hamilton", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Hancock", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Hardin", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Henderson", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Jackson", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Jasper", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Jefferson", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Jersey", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Johnson", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Kendall", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Lawrence", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Logan", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Macon", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Macoupin", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Madison", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Marion", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Mason", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Massac", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:McDonough", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:McLean", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Menard", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Monroe", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Montgomery", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Morgan", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Moultrie", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Perry", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Piatt", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Pike", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Pope", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Pulaski", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Randolph", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Richland", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Saline", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Sangamon", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Schuyler", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Scott", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Shelby", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:St. Clair", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Tazewell", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Union", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Vermilion", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Wabash", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Warren", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Washington", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Wayne", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:White", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Will", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Williamson", "US", TC_COUNTY),
        loadRegionZone(bundle, "IL:Woodford", "US", TC_COUNTY)
      })
    
    })
  }
  
}
