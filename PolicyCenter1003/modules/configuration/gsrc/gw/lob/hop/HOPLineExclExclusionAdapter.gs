package gw.lob.hop

uses gw.coverage.ExclusionAdapterBase

@Export
class HOPLineExclExclusionAdapter extends ExclusionAdapterBase {
  var _owner: HOPLineExcl

  construct(owner: HOPLineExcl) {
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

  override function addToExclusionArray(p0: Exclusion): void {
    _owner.HOPLine.addToHOPLineExclusions(p0 as HOPLineExcl)
  }

  override function removeFromParent(): void {
    _owner.HOPLine.removeFromHOPLineExclusions(_owner)
  }

}
