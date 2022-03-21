package gw.lob.hop.schedule

uses gw.coverage.ConditionAdapterBase

@Export
class HOPCovPartSchCondItemCondConditionAdapter extends ConditionAdapterBase {
  var _owner: HOPCovPartSchCondItemCond

  construct(owner: HOPCovPartSchCondItemCond) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return PolicyLine.BaseState
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPCovPartSchCondItem
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPCovPartSchCondItem.Schedule.HOPCoveragePart.HOPLine
  }

  override function removeFromParent(): void {
    _owner.HOPCovPartSchCondItem.removeConditionFromCoverable(_owner)
  }

  override function addToConditionArray(p0: PolicyCondition) {
    //Do nothing
  }
}