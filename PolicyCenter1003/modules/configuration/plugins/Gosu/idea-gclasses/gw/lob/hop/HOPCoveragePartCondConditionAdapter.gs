package gw.lob.hop

uses gw.coverage.ConditionAdapterBase
uses entity.HOPCoveragePartCond
uses entity.PolicyLine

@Export
class HOPCoveragePartCondConditionAdapter extends ConditionAdapterBase {
  var _owner: HOPCoveragePartCond

  construct(owner: HOPCoveragePartCond) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return (_owner.HOPCoveragePart.HOPLine.Branch.BaseState)
  }

  override property get PolicyLine(): PolicyLine {
    return (_owner.HOPCoveragePart.HOPLine)
  }

  override property get OwningCoverable(): Coverable {
    return (_owner.HOPCoveragePart)
  }

  override function addToConditionArray(p0: PolicyCondition): void {
    _owner.HOPCoveragePart.addToConditions(p0 as HOPCoveragePartCond)
  }

  override function removeFromParent(): void {
    _owner.HOPCoveragePart.removeFromConditions(_owner)
  }

}
