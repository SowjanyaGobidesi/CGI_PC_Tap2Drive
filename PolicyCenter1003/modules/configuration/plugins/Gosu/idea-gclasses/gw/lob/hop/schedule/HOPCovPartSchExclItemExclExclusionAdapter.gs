package gw.lob.hop.schedule

uses gw.coverage.ExclusionAdapterBase

@Export
class HOPCovPartSchExclItemExclExclusionAdapter extends ExclusionAdapterBase {
  var _owner: HOPCovPartSchExclItemExcl

  construct(owner: HOPCovPartSchExclItemExcl) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return PolicyLine.BaseState
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPCovPartSchExclItem
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPCovPartSchExclItem.Schedule.HOPCoveragePart.HOPLine
  }

  override function removeFromParent(): void {
    _owner.HOPCovPartSchExclItem.removeExclusionFromCoverable(_owner)
  }

  override function addToExclusionArray(p0: Exclusion) {
    //Do nothing
  }
}