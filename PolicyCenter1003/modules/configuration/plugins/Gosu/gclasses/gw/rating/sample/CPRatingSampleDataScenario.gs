package gw.rating.sample

uses gw.rating.rtm.builders.scenario.RatingScenario
uses gw.rating.rtm.builders.scenario.sample.CPSampleDataFactorRowBuilder
uses gw.rating.rtm.builders.scenario.sample.CPSampleDataTablesBuilder
uses java.util.Date

@Export
class CPRatingSampleDataScenario {

  public static final var CP_ENGINE_RATE_BOOK_CODE : String = "cp_rtm_demo_rating"
  public static final var CP_ENGINE_RATE_BOOK_NAME : String = "CP RTM Demo Rating"
  
  static function SampleDataScenario(effectiveDate : Date = null) : RatingScenario {
    var scenario = new RatingScenario()
    var rateBookVersion1EffectiveDate = effectiveDate?:Date.Today.addYears(-5)
    var rateBookBuilder = scenario.addActiveBook(CP_ENGINE_RATE_BOOK_CODE)
                                  .withBookName(CP_ENGINE_RATE_BOOK_NAME)
                                  .effectiveOn(rateBookVersion1EffectiveDate)
                                  .expireOn(null)
                                  .renewalEffectiveOn(rateBookVersion1EffectiveDate)
                                  .activeOn(rateBookVersion1EffectiveDate)
                                  .withPolicyLine("CPLine")

    var baseTable = CPSampleDataTablesBuilder.BaseRateTable
    rateBookBuilder.includeTableWithData(baseTable, CPSampleDataFactorRowBuilder.getData(baseTable.Definition))

    var deductTable = CPSampleDataTablesBuilder.DeductTable
    rateBookBuilder.includeTableWithData(deductTable, CPSampleDataFactorRowBuilder.getData(deductTable.Definition))

    var fireProtectClassTable = CPSampleDataTablesBuilder.FireProtectClassTable
    rateBookBuilder.includeTableWithData(fireProtectClassTable, CPSampleDataFactorRowBuilder.getData(fireProtectClassTable.Definition))

    var uwCompanyTable = CPSampleDataTablesBuilder.UWCompanyTable
    rateBookBuilder.includeTableWithData(uwCompanyTable, CPSampleDataFactorRowBuilder.getData(uwCompanyTable.Definition))

    return scenario
  }

}
