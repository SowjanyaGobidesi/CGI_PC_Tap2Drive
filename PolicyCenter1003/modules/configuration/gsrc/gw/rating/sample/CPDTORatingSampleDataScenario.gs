package gw.rating.sample

uses gw.rating.rtm.builders.scenario.RatingScenario
uses gw.rating.rtm.builders.scenario.sample.CPDTOSampleDataFactorRowBuilder
uses gw.rating.rtm.builders.scenario.sample.CPDTOSampleDataTablesBuilder

@Export
class CPDTORatingSampleDataScenario {

  public static final var CP_ENGINE_RATE_BOOK_CODE : String = "cp_rtm_demo_rating_dto"
  public static final var CP_ENGINE_RATE_BOOK_NAME : String = "CP RTM Demo Rating DTO"
  
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

    var baseTable = CPDTOSampleDataTablesBuilder.BaseRateTable
    rateBookBuilder.includeTableWithData(baseTable, CPDTOSampleDataFactorRowBuilder.getData(baseTable.Definition))

    var deductTable = CPDTOSampleDataTablesBuilder.DeductTable
    rateBookBuilder.includeTableWithData(deductTable, CPDTOSampleDataFactorRowBuilder.getData(deductTable.Definition))

    var fireProtectClassTable = CPDTOSampleDataTablesBuilder.FireProtectClassTable
    rateBookBuilder.includeTableWithData(fireProtectClassTable, CPDTOSampleDataFactorRowBuilder.getData(fireProtectClassTable.Definition))

    var uwCompanyTable = CPDTOSampleDataTablesBuilder.UWCompanyTable
    rateBookBuilder.includeTableWithData(uwCompanyTable, CPDTOSampleDataFactorRowBuilder.getData(uwCompanyTable.Definition))

    return scenario
  }

}
