package gw.lob.hop

uses gw.coverage.ExclusionAdapterBase

@Export
class HOPCoveragePartExclExclusionAdapter extends ExclusionAdapterBase {
  var _owner: HOPCoveragePartExcl

  construct(owner: HOPCoveragePartExcl) {
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

  override function addToExclusionArray(p0: Exclusion): void {
    _owner.HOPCoveragePart.addToExclusions(p0 as HOPCoveragePartExcl)
  }

  override function removeFromParent(): void {
    _owner.HOPCoveragePart.removeFromExclusions(_owner)
  }

}
