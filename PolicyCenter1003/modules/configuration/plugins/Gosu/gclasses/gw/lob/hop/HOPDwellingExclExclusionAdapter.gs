package gw.lob.hop

uses gw.coverage.ExclusionAdapterBase
uses gw.api.util.JurisdictionMappingUtil

@Export
class HOPDwellingExclExclusionAdapter extends ExclusionAdapterBase {
  var _owner: HOPDwellingExcl

  construct(owner: HOPDwellingExcl) {
    super(owner)
    _owner = owner
  }

  override property get CoverageState(): Jurisdiction {
    return (JurisdictionMappingUtil.getJurisdiction(_owner.HOPDwelling.Location))
  }

  override property get PolicyLine(): PolicyLine {
    return (_owner.HOPDwelling.HOPCoveragePart.HOPLine)
  }

  override property get OwningCoverable(): Coverable {
    return (_owner.HOPDwelling)
  }

  override function addToExclusionArray(p0: Exclusion): void {
    _owner.HOPDwelling.addToExclusions(p0 as HOPDwellingExcl)
  }

  override function removeFromParent(): void {
    _owner.HOPDwelling.removeFromExclusions(_owner)
  }

}
