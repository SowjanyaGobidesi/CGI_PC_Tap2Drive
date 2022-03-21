package gw.pcf.sidebyside

uses gw.job.sxs.SideBySideCoverageInfo
uses gw.job.sxs.SideBySideCovTermInfo

/**
 * Used in Side-by-side screen to help render coverage/covterm rows
 */
@Export
class SideBySideScreenCoverageRow {

  var _label : String
  var _covInfo : SideBySideCoverageInfo
  var _covTermInfo : SideBySideCovTermInfo

  construct(label : String, coverageInfo : SideBySideCoverageInfo, covTermInfo : SideBySideCovTermInfo) {
    _label = label
    _covInfo = coverageInfo
    _covTermInfo = covTermInfo
  }

  property get Selected() : boolean {
    return _covInfo.Selected
  }
}