package gw.lob.hop.schedule

uses gw.api.reinsurance.ReinsurableCoverable
uses gw.coverage.CoverageAdapterBase

@Export
class HOPDwellSchCovItemCovCoverageAdapter extends CoverageAdapterBase {
  var _owner: HOPDwellSchCovItemCov

  construct(owner: HOPDwellSchCovItemCov) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return PolicyLine.BaseState
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPDwellScheduleCovItem
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPDwellScheduleCovItem.Schedule.HOPDwelling.HOPCoveragePart.HOPLine
  }

  override function removeFromParent(): void {
    _owner.HOPDwellScheduleCovItem.removeCoverageFromCoverable(_owner)
  }

  override function addToCoverageArray(p0: Coverage) {
    //Do nothing
  }

  override property get ReinsurableCoverable(): ReinsurableCoverable {
    return typeSafeReinsurableCoverable(_owner.BranchValue)
  }
}