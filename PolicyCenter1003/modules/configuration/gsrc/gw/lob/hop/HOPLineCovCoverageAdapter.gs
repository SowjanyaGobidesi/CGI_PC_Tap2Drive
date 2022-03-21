package gw.lob.hop

uses gw.coverage.CoverageAdapterBase
uses gw.api.reinsurance.ReinsurableCoverable

@Export
class HOPLineCovCoverageAdapter extends CoverageAdapterBase {
  var _owner: HOPLineCov

  construct(owner: HOPLineCov) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return (_owner.HOPLine.Branch.BaseState)
  }

  override property get PolicyLine(): PolicyLine {
    return (_owner.HOPLine)
  }

  override property get OwningCoverable(): Coverable {
    return (_owner.HOPLine)
  }

  override function addToCoverageArray(p0: Coverage): void {
    _owner.HOPLine.addToHOPLineCoverages(p0 as HOPLineCov)
  }

  override function removeFromParent(): void {
    _owner.HOPLine.removeFromHOPLineCoverages(_owner)
  }

  override property get ReinsurableCoverable(): ReinsurableCoverable {
    return (_owner.BranchValue)
  }
}
