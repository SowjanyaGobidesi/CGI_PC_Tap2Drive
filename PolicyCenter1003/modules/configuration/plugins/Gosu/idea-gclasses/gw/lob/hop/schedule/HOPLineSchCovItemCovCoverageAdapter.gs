package gw.lob.hop.schedule

uses gw.coverage.CoverageAdapterBase
uses gw.api.reinsurance.ReinsurableCoverable

/**
 * Created by rkelly on 08/01/2016.
 */
@Export
class HOPLineSchCovItemCovCoverageAdapter extends CoverageAdapterBase {
  var _owner: HOPLineSchCovItemCov

  construct(owner: HOPLineSchCovItemCov) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return PolicyLine.BaseState
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPLineScheduleCovItem
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPLineScheduleCovItem.Schedule.HOPLine
  }

  override function removeFromParent(): void {
    _owner.HOPLineScheduleCovItem.removeCoverageFromCoverable(_owner)
  }

  override function addToCoverageArray(p0: Coverage) {
    //Do nothing
  }

  override property get ReinsurableCoverable(): ReinsurableCoverable {
    return typeSafeReinsurableCoverable(_owner.BranchValue)
  }
}
