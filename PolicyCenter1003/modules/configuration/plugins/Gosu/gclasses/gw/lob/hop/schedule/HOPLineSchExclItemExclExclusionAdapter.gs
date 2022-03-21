package gw.lob.hop.schedule

uses gw.coverage.ExclusionAdapterBase

@Export
class HOPLineSchExclItemExclExclusionAdapter extends ExclusionAdapterBase {
  var _owner: HOPLineSchExclItemExcl

  construct(owner: HOPLineSchExclItemExcl) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return PolicyLine.BaseState
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPLineScheduleExclItem
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPLineScheduleExclItem.Schedule.HOPLine
  }

  override function removeFromParent(): void {
    _owner.HOPLineScheduleExclItem.removeExclusionFromCoverable(_owner)
  }

  override function addToExclusionArray(p0: Exclusion) {
    //Do nothing
  }
}