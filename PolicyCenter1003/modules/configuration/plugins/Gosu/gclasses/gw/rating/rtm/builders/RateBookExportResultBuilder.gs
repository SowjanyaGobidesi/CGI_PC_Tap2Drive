package gw.rating.rtm.builders

uses gw.api.databuilder.DataBuilder

@Export
class RateBookExportResultBuilder extends DataBuilder<RateBookExportResult, RateBookExportResultBuilder> {

  construct() {
    super(RateBookExportResult)
  }

  function withRateBook(rateBook : RateBook) : RateBookExportResultBuilder {
    set(RateBookExportResult#RateBook, rateBook)
    return this
  }

  function withRateBook(rateBookBuilder : RateBookBuilder) : RateBookExportResultBuilder {
    set(RateBookExportResult#RateBook, rateBookBuilder)
    return this
  }

  function withData(data : Blob) : RateBookExportResultBuilder {
    set(RateBookExportResult#Data, data)
    return this
  }

  function withCompletionPercentage(completionPercentage : Integer) : RateBookExportResultBuilder {
    set(RateBookExportResult#CompletionPercentage, completionPercentage)
    return this
  }

  function withExportType(exportType : RateBookExportType) : RateBookExportResultBuilder {
    set(RateBookExportResult#ExportType, exportType)
    return this
  }
}