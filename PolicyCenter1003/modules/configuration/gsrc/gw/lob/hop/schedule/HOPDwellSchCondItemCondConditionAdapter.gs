package gw.lob.hop.schedule

uses gw.coverage.ConditionAdapterBase

@Export
class HOPDwellSchCondItemCondConditionAdapter extends ConditionAdapterBase {
  var _owner: HOPDwellSchCondItemCond

  construct(owner: HOPDwellSchCondItemCond) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return PolicyLine.BaseState
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPDwellScheduleCondItem
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPDwellScheduleCondItem.Schedule.HOPDwelling.HOPCoveragePart.HOPLine
  }

  override function removeFromParent(): void {
    _owner.HOPDwellScheduleCondItem.removeConditionFromCoverable(_owner)
  }

  override function addToConditionArray(p0: PolicyCondition) {
    //Do nothing
  }
}