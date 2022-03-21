package gw.lob.hop

uses gw.coverage.ConditionAdapterBase
uses gw.api.util.JurisdictionMappingUtil

@Export
class HOPDwellingCondConditionAdapter extends ConditionAdapterBase {
  var _owner: HOPDwellingCond

  construct(owner: HOPDwellingCond) {
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

  override function addToConditionArray(p0: PolicyCondition): void {
    _owner.HOPDwelling.addToConditions(p0 as HOPDwellingCond)
  }

  override function removeFromParent(): void {
    _owner.HOPDwelling.removeFromConditions(_owner)
  }

}
