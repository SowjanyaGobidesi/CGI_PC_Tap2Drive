package gw.sampledata.small

uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.api.system.PCConfigParameters
uses gw.rating.flow.scenario.CPDTORateflowScenario
uses gw.rating.flow.scenario.CPRateflowScenario
uses gw.rating.flow.scenario.GenericRateflowScenario
uses gw.rating.flow.scenario.HOPRateflowScenario
uses gw.rating.flow.scenario.PARateflowScenario
uses gw.rating.sample.CPDTORatingSampleDataScenario
uses gw.rating.sample.CPRatingSampleDataScenario
uses gw.rating.sample.GenericRatingSampleDataScenario
uses gw.rating.sample.HOPRatingSampleDataScenario
uses gw.rating.sample.PARatingSampleDataScenario
uses gw.sampledata.AbstractSampleDataCollection

@Export
class SmallSampleRatingData extends AbstractSampleDataCollection {

  override property get CollectionName() : String {
    return "Small Rate Tables"
  }

  override property get AlreadyLoaded() : boolean {
    return isRateBookLoaded(PARatingSampleDataScenario.PA_ENGINE_RATE_BOOK_CODE)
        and isRateBookLoaded(CPRatingSampleDataScenario.CP_ENGINE_RATE_BOOK_CODE)
        and isRateBookLoaded(GenericRatingSampleDataScenario.GX_ENGINE_RATE_BOOK_CODE)
  }

  override function load() {
    if (PCConfigParameters.EnableCPDTOParallelRating.Value) {
      if (not isRateBookLoaded(CPDTORatingSampleDataScenario.CP_ENGINE_RATE_BOOK_CODE)) {
        CPDTORateflowScenario.SampleDataScenario.createAndCommitBooks()
      }
    } else {
      if (not isRateBookLoaded(CPRatingSampleDataScenario.CP_ENGINE_RATE_BOOK_CODE)) {
        CPRateflowScenario.SampleDataScenario.createAndCommitBooks()
      }
    }
    if (not isRateBookLoaded(PARatingSampleDataScenario.PA_ENGINE_RATE_BOOK_CODE)) {
      PARateflowScenario.aBaseTestScenario().createAndCommitBooks()
    }
    if (not isRateBookLoaded(HOPRatingSampleDataScenario.HOP_ENGINE_RATE_BOOK_CODE)) {
      HOPRateflowScenario.SampleDataScenario.createAndCommitBooks()
    }
    if (not isRateBookLoaded(GenericRatingSampleDataScenario.GX_ENGINE_RATE_BOOK_CODE)) {
      GenericRateflowScenario.SampleDataScenario.createAndCommitBooks()
    }
  }

  private function isRateBookLoaded(rateBookCode : String) : boolean {
    return not (getRateBookQueryResult(rateBookCode).Empty)
  }

  private function getRateBookQueryResult(rateBookCode : String) : IQueryBeanResult<RateBook> {
    return Query<RateBook>.make(RateBook).compare(RateBook#BookCode, Equals, rateBookCode).select()
  }
}
