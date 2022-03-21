package gw.job.sxs

@Export
class SideBySideCovTermRow {
  var _covTermLabel : String as CovTermLabel
  var _covTermInfos : SideBySideCovTermInfo[] as CovTerms

  construct(label : String, sideBySideCovTerms : SideBySideCovTermInfo[]) {
    _covTermLabel = label
    _covTermInfos = sideBySideCovTerms
  }
}