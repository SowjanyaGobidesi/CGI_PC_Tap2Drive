package gw.lob.hop

uses gw.coverage.CoverageAdapterBase
uses gw.api.reinsurance.ReinsurableCoverable

@Export
class HOPCoveragePartCovCoverageAdapter extends CoverageAdapterBase {
  var _owner: HOPCoveragePartCov

  construct(owner: HOPCoveragePartCov) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return (_owner.HOPCoveragePart.HOPLine.Branch.BaseState)
  }

  override property get PolicyLine(): PolicyLine {
    return (_owner.HOPCoveragePart.HOPLine)
  }

  override property get OwningCoverable(): Coverable {
    return (_owner.HOPCoveragePart)
  }

  override function addToCoverageArray(p0: Coverage): void {
    _owner.HOPCoveragePart.addToCoverages(p0 as HOPCoveragePartCov)
  }

  override function removeFromParent(): void {
    _owner.HOPCoveragePart.removeFromCoverages(_owner)
  }

  override property get ReinsurableCoverable(): ReinsurableCoverable {
    return (_owner.BranchValue)
  }
}
