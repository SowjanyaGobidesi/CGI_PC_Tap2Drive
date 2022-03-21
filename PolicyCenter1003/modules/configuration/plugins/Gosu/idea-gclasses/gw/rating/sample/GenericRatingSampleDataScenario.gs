package gw.rating.sample

uses gw.rating.rtm.builders.scenario.RatingScenario
uses gw.rating.rtm.builders.scenario.sample.GenericSampleDataFactorRowBuilder
uses gw.rating.rtm.builders.scenario.sample.GenericSampleDataTablesBuilder

uses java.util.Date

@Export
class GenericRatingSampleDataScenario {

  public static final var GX_ENGINE_RATE_BOOK_CODE : String = "gx_rtm_demo_rating"
  public static final var GENERIC_ENGINE_RATE_BOOK_NAME : String = "Generic RTM Demo Rating"

  static function SampleDataScenario(effectiveDate : Date = null) : RatingScenario {
    var scenario = new RatingScenario()
    var rateBookVersion1EffectiveDate = effectiveDate?:Date.Today.addYears(-5)
    var rateBookBuilder = scenario.addActiveBook(GX_ENGINE_RATE_BOOK_CODE)
        .withBookName(GENERIC_ENGINE_RATE_BOOK_NAME)
        .effectiveOn(rateBookVersion1EffectiveDate)
        .expireOn(null)
        .renewalEffectiveOn(rateBookVersion1EffectiveDate)
        .activeOn(rateBookVersion1EffectiveDate)
        .withPolicyLine(null)

    var genericStateTaxTable = GenericSampleDataTablesBuilder.GenericStateTaxTable
    rateBookBuilder.includeTableWithData(genericStateTaxTable, GenericSampleDataFactorRowBuilder.getData(genericStateTaxTable.Definition))

    return scenario
  }
}
