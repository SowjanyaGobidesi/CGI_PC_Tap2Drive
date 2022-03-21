package gw.sampledata.tiny

uses gw.sampledata.AbstractSampleDataCollection
uses gw.transaction.Transaction

/**
 * A tiny set of Regions and SecurityZones, just enough for testing.
 */
@Export
class TinySampleRegionData extends AbstractSampleDataCollection
{
  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Tiny Regions"
  }

  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return securityZoneLoaded("HO UW")
  }

  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    Transaction.runWithNewBundle( \bundle -> {

      // ZONES
      loadSecurityZone(bundle, "HO UW", "HO Underwriting")
      loadSecurityZone(bundle, "Eastern Region", "Eastern Region")
      loadSecurityZone(bundle, "Western Region", "Western Region")

      // REGIONS
      loadRegion(bundle, "Western Region", {
          loadRegionZone(bundle, "AK", "US", TC_STATE),
          loadRegionZone(bundle, "AZ", "US", TC_STATE),
          loadRegionZone(bundle, "CA", "US", TC_STATE),
          loadRegionZone(bundle, "CO", "US", TC_STATE),
          loadRegionZone(bundle, "HI", "US", TC_STATE),
          loadRegionZone(bundle, "ID", "US", TC_STATE),
          loadRegionZone(bundle, "MT", "US", TC_STATE),
          loadRegionZone(bundle, "NM", "US", TC_STATE),
          loadRegionZone(bundle, "NV", "US", TC_STATE),
          loadRegionZone(bundle, "OR", "US", TC_STATE),
          loadRegionZone(bundle, "UT", "US", TC_STATE),
          loadRegionZone(bundle, "WA", "US", TC_STATE),
          loadRegionZone(bundle, "WY", "US", TC_STATE)
      })
      loadRegion(bundle, "Eastern Region", {
          loadRegionZone(bundle, "CT", "US", TC_STATE),
          loadRegionZone(bundle, "DC", "US", TC_STATE),
          loadRegionZone(bundle, "DE", "US", TC_STATE),
          loadRegionZone(bundle, "FL", "US", TC_STATE),
          loadRegionZone(bundle, "GA", "US", TC_STATE),
          loadRegionZone(bundle, "MA", "US", TC_STATE),
          loadRegionZone(bundle, "MD", "US", TC_STATE),
          loadRegionZone(bundle, "ME", "US", TC_STATE),
          loadRegionZone(bundle, "NC", "US", TC_STATE),
          loadRegionZone(bundle, "NH", "US", TC_STATE),
          loadRegionZone(bundle, "NJ", "US", TC_STATE),
          loadRegionZone(bundle, "NY", "US", TC_STATE),
          loadRegionZone(bundle, "PA", "US", TC_STATE),
          loadRegionZone(bundle, "PR", "US", TC_STATE),
          loadRegionZone(bundle, "RI", "US", TC_STATE),
          loadRegionZone(bundle, "SC", "US", TC_STATE),
          loadRegionZone(bundle, "VA", "US", TC_STATE),
          loadRegionZone(bundle, "VT", "US", TC_STATE),
          loadRegionZone(bundle, "WV", "US", TC_STATE)
      })
      loadRegion(bundle, "Los Angeles Branch - HI", {
          loadRegionZone(bundle, "HI", "US", TC_STATE)
      })
      loadRegion(bundle, "Sacramento Branch", {
          loadRegionZone(bundle, "CA:Alameda", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Alpine", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Amador", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Butte", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Calaveras", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Colusa", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Contra Costa", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Del Norte", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:El Dorado", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Fresno", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Glenn", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Humboldt", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Inyo", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Kings", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Lake", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Lassen", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Madera", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Marin", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Mariposa", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Mendocino", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Merced", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Modoc", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Mono", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Monterey", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Napa", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Nevada", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Placer", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Plumas", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Sacramento", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:San Benito", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:San Francisco", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:San Joaquin", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:San Mateo", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Santa Clara", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Santa Cruz", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Shasta", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Sierra", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Siskiyou", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Solano", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Sonoma", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Stanislaus", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Sutter", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Tehama", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Trinity", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Tulare", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Tuolumne", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Yolo", "US", TC_COUNTY),
          loadRegionZone(bundle, "CA:Yuba", "US", TC_COUNTY)
      })

    })
  }

}
