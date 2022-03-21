package gw.rating.worksheet

uses gw.api.rating.DefaultFactorSourceLogger
uses gw.api.rating.FactorSourceWorksheetLogger

@Export
class FailoverRateTableFactorSourceLogger extends DefaultFactorSourceLogger implements FactorSourceWorksheetLogger {

  var _rateTable : RateTable

  construct(rateTable : RateTable) {
    _rateTable = rateTable
  }

  override property get WorksheetLog(): String {
    return "Failover: from " + _rateTable.RateBook.BookCode + " (" + _rateTable.RateBook.BookEdition + ")"
  }
}