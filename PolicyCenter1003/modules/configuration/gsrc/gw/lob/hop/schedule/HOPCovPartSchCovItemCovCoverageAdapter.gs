package gw.lob.hop.schedule

uses gw.api.reinsurance.ReinsurableCoverable
uses gw.coverage.CoverageAdapterBase

@Export
class HOPCovPartSchCovItemCovCoverageAdapter extends CoverageAdapterBase {
  var _owner: HOPCovPartSchCovItemCov

  construct(owner: HOPCovPartSchCovItemCov) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return PolicyLine.BaseState
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPCovPartScheduleCovItem
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPCovPartScheduleCovItem.Schedule.HOPCoveragePart.HOPLine
  }

  override function removeFromParent(): void {
    _owner.HOPCovPartScheduleCovItem.removeCoverageFromCoverable(_owner)
  }

  override function addToCoverageArray(p0: Coverage) {
    //Do nothing
  }

  override property get ReinsurableCoverable(): ReinsurableCoverable {
    return typeSafeReinsurableCoverable(_owner.BranchValue)
  }
}