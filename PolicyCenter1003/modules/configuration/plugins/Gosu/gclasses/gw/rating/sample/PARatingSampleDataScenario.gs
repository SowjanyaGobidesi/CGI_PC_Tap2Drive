package gw.rating.sample

uses java.util.Date
uses gw.rating.rtm.builders.scenario.RatingScenario
uses gw.rating.rtm.builders.scenario.sample.SampleDataTablesBuilder
uses gw.rating.rtm.builders.scenario.sample.SampleDataFactorRowBuilder

@Export
class PARatingSampleDataScenario {

  public static final var PA_ENGINE_RATE_BOOK_CODE : String = "pa_rtm_demo_rating"
  public static final var PA_ENGINE_RATE_BOOK_NAME : String = "PA RTM Demo Rating"
  
  static function aRatingSampleDataScenario(effectiveDate : Date = null) : RatingScenario {
    return generateRatingSampleDataScenario(false,effectiveDate?:Date.Today.addYears(-5))
  }

  static function uniqueRatingSampleDataScenario(effectiveDate : Date = null) : RatingScenario {
    return generateRatingSampleDataScenario(true,effectiveDate?:Date.Today.addYears(-5))
  }
  
  private static function generateRatingSampleDataScenario(isUnique : boolean, effectiveDate : Date) : RatingScenario {
    var scenario = new RatingScenario()
    
    var rateBookBuilder = scenario.addActiveBook(PA_ENGINE_RATE_BOOK_CODE)
                                  .withBookName(PA_ENGINE_RATE_BOOK_NAME)
                                  .effectiveOn(effectiveDate)
                                  .expireOn(null)
                                  .renewalEffectiveOn(effectiveDate)
                                  .activeOn(effectiveDate)

    var vehicleCostTable = isUnique
            ? SampleDataTablesBuilder.uniqueVehicleCostTable()
            : SampleDataTablesBuilder.aVehicleCostTable()

    var tables = isUnique
            ? 
              { SampleDataTablesBuilder.uniqueBaseRateTable(),
                SampleDataTablesBuilder.uniqueCoveragesTable(),
                SampleDataTablesBuilder.uniqueDriverAgeTable(),
                SampleDataTablesBuilder.uniqueYouthfulDriverTable(),
                SampleDataTablesBuilder.uniqueVehicleAgeTable(),
                vehicleCostTable,
                SampleDataTablesBuilder.uniqueUWCompanyTable(),
                SampleDataTablesBuilder.uniqueDiscountTable(),
                SampleDataTablesBuilder.uniqueMultiplePolicyDiscountTable(),
                SampleDataTablesBuilder.uniquePIPNJTable(),
                SampleDataTablesBuilder.uniqueCovDiscountTable(),
                SampleDataTablesBuilder.uniqueRenewalCapTable(),
                SampleDataTablesBuilder.uniqueInterpolationTable(),
                SampleDataTablesBuilder.uniqueRefValueProviderTestDataTable()
              }
            : 
              { SampleDataTablesBuilder.aBaseRateTable(),
                SampleDataTablesBuilder.aCoveragesTable(),
                SampleDataTablesBuilder.aDriverAgeTable(),
                SampleDataTablesBuilder.aYouthfulDriverTable(),
                SampleDataTablesBuilder.aVehicleAgeTable(),
                vehicleCostTable,
                SampleDataTablesBuilder.aUWCompanyTable(),
                SampleDataTablesBuilder.aDiscountTable(),
                SampleDataTablesBuilder.aMultiplePolicyDiscountTable(),
                SampleDataTablesBuilder.aPIPNJTable(),
                SampleDataTablesBuilder.aCovDiscountTable(),
                SampleDataTablesBuilder.aRenewalCapTable(),
                SampleDataTablesBuilder.aInterpolationParameterTable(),
                SampleDataTablesBuilder.aRefValueProviderTestDataTable()
              }
            
    for (table in tables) {
      rateBookBuilder.includeTableWithData(table, SampleDataFactorRowBuilder.getData(table.Definition))
    }

    var rateBookVersion2EffectiveDate = effectiveDate.addYears(1)
    var rateBookBuilderVersion2 = scenario.addEditionFromLastAdded("2")
                                          .withBookName(PA_ENGINE_RATE_BOOK_NAME)
                                          .effectiveOn(rateBookVersion2EffectiveDate)
                                          .expireOn(null)
                                          .activeOn(rateBookVersion2EffectiveDate)
                                          .renewalEffectiveOn(rateBookVersion2EffectiveDate)
    rateBookBuilderVersion2.updateTable(vehicleCostTable.Definition.TableCode, 
      SampleDataFactorRowBuilder.getData(vehicleCostTable.Definition, SampleDataFactorRowBuilder.VEHICLE_COST_TABLE_UPDATE))

    return scenario
  }
}
