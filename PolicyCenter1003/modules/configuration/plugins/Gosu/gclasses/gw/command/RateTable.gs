package gw.command

uses gw.rating.rtm.RatingTestMethods
uses gw.rating.rtm.builders.scenario.Scenarios
uses gw.rating.sample.PARatingSampleDataScenario

@Export
class RateTable extends PCBaseCommand implements RatingTestMethods {

  function tinyDataSet() {
    PARatingSampleDataScenario.aRatingSampleDataScenario().createAndCommitBooks()
  }

  function simpleRateBook() {
    Scenarios.aSimpleRateBookScenario().createAndCommitBooks()
  }

  function rateBookForQuery() {
    Scenarios.aRateBookForQueryScenario().createAndCommitBooks()
  }

  function removeRatingData() {
    fullCleanup()   
  }

}