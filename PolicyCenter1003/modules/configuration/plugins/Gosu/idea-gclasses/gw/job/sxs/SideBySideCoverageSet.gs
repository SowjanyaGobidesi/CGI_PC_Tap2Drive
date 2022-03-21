package gw.job.sxs

uses java.util.HashMap
uses java.lang.Integer
uses java.util.Map

@Export
class SideBySideCoverageSet {
  var _initialRow : SideBySideCoverageRow as InitialRow
  var _covTermRows : SideBySideCoverageRow[] as AdditionalCovTermRows
  var _covRows : SideBySideCoverageRow[] as CovTermRows

  construct(covAndCovTermRows : SideBySideCoverageRow[],
            idxToCovTermInfo : Map<Integer,SideBySideCovTermInfo[]>) {
    _covRows = covAndCovTermRows
    _initialRow = covAndCovTermRows.first()
    _covTermRows = covAndCovTermRows.where(\row -> row!=_initialRow)
  }
}