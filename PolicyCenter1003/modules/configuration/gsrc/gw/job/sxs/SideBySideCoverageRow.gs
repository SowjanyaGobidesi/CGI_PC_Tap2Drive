package gw.job.sxs

@Export
class SideBySideCoverageRow {
  var _covLabel : String as CoverageLabel
  var _covTermInfos : SideBySideCovTermInfo[] as CovTermInfos // Represents the column values

  construct(label : String, sideBySideCovTerms : SideBySideCovTermInfo[]) {
    _covLabel = label
    _covTermInfos = sideBySideCovTerms
  }
}