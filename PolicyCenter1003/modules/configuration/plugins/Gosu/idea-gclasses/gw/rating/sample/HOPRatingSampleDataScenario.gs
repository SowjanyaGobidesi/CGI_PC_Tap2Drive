package gw.rating.sample

uses gw.rating.rtm.builders.RateBookBuilder
uses gw.rating.rtm.builders.RateTableBuilder
uses gw.rating.rtm.builders.scenario.RatingScenario
uses gw.rating.rtm.builders.scenario.sample.HOPSampleDataFactorRowBuilder
uses gw.rating.rtm.builders.scenario.sample.HOPSampleDataTablesBuilder

@Export
class HOPRatingSampleDataScenario {

  public static final var HOP_ENGINE_RATE_BOOK_CODE : String = "hop_rtm_demo_rating"

  static function SampleDataScenario(effectiveDate : Date = null) : RatingScenario {
    var scenario = new RatingScenario()
    var rateBookVersion1EffectiveDate = effectiveDate?:Date.Today.addYears(-5)
    var rateBookBuilder = scenario.addActiveBook(HOP_ENGINE_RATE_BOOK_CODE)
                                  .withLocalizedBookNameFromDisplayKey("Web.Rating.RateBook.HOPRTMDemoRateBookName")
                                  .effectiveOn(rateBookVersion1EffectiveDate)
                                  .expireOn(null)
                                  .renewalEffectiveOn(rateBookVersion1EffectiveDate)
                                  .activeOn(rateBookVersion1EffectiveDate)
                                  .withPolicyLine("HOPLine")

    // Add form factor rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.FormFactorRateTable)

    // Add key factor rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.KeyFactorRateTable)

    // Add protection construction rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.ProtectionConstructionRateTable)

    // Add company loss cost multiplier rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.CompanyLossMultiplierRateTable)

    // Add territory loss cost rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.TerritoryLossCostRateTable)

    // Add scheduled personal property rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.ScheduledPersonalPropertyRateTable)

    // Add Coverage C increased limit factor rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.CovCIncreasedLimitFactorRateTable)

    // Add Coverage D increased limit factor rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.CovDIncreasedLimitFactorRateTable)

    // Add Coverage E increased limit factor rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.CoverageEIncreasedLimitFactorRateTable)

    // Add Coverage F increased limit factor rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.CoverageFIncreasedLimitFactorRateTable)

    // Add ordinance or law factor rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.OrdinanceOrLawFactorsRateTable)

    // Add All Perils Deductible factor rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.AllPerilsDeductibleFactorRateTable)

    // Add Modifiers rate table builder
    addRateBookRateTable(rateBookBuilder, HOPSampleDataTablesBuilder.ModifierRateTable)

    return scenario
  }

  private static function addRateBookRateTable(rateBookBuilder: RateBookBuilder, tableBuilder: RateTableBuilder) {
    rateBookBuilder.includeTableWithData(tableBuilder,
        HOPSampleDataFactorRowBuilder.getData(tableBuilder.Definition))
  }
}