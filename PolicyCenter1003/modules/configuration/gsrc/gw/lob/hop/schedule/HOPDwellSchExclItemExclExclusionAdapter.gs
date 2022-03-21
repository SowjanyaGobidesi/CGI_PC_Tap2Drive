package gw.lob.hop.schedule

uses gw.coverage.ExclusionAdapterBase

@Export
class HOPDwellSchExclItemExclExclusionAdapter extends ExclusionAdapterBase {
  var _owner: HOPDwellSchExclItemExcl

  construct(owner: HOPDwellSchExclItemExcl) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return PolicyLine.BaseState
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPDwellScheduleExclItem
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPDwellScheduleExclItem.Schedule.HOPDwelling.HOPCoveragePart.HOPLine
  }

  override function removeFromParent(): void {
    _owner.HOPDwellScheduleExclItem.removeExclusionFromCoverable(_owner)
  }

  override function addToExclusionArray(p0: Exclusion) {
    //Do nothing
  }
}