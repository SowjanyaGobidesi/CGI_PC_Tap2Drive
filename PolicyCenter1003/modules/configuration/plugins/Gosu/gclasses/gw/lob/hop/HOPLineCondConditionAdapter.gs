package gw.lob.hop

uses gw.coverage.ConditionAdapterBase

@Export
class HOPLineCondConditionAdapter extends ConditionAdapterBase {
  var _owner: HOPLineCond

  construct(owner: HOPLineCond) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return (_owner.HOPLine.Branch.BaseState)
  }

  override property get PolicyLine(): PolicyLine {
    return (_owner.HOPLine)
  }

  override property get OwningCoverable(): Coverable {
    return (_owner.HOPLine)
  }

  override function addToConditionArray(p0: PolicyCondition): void {
    _owner.HOPLine.addToHOPLineConditions(p0 as HOPLineCond)
  }

  override function removeFromParent(): void {
    _owner.HOPLine.removeFromHOPLineConditions(_owner)
  }

}
