package gw.lob.hop.schedule

uses gw.coverage.ConditionAdapterBase

@Export
class HOPLineSchCondItemCondConditionAdapter extends ConditionAdapterBase {
  var _owner: HOPLineSchCondItemCond

  construct(owner: HOPLineSchCondItemCond) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return PolicyLine.BaseState
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPLineScheduleCondItem
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPLineScheduleCondItem.Schedule.HOPLine
  }

  override function removeFromParent(): void {
    _owner.HOPLineScheduleCondItem.removeConditionFromCoverable(_owner)
  }

  override function addToConditionArray(p0: PolicyCondition) {
    //Do nothing
  }
}