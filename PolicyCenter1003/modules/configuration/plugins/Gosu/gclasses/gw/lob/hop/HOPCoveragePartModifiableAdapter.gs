package gw.lob.hop

uses gw.api.domain.ModifiableAdapter

uses java.util.Date

@Export
class HOPCoveragePartModifiableAdapter implements ModifiableAdapter {
  var _owner: HOPCoveragePart

  construct(owner: HOPCoveragePart) {
    _owner = owner
  }

  override property get AllModifiers(): Modifier[] {
    return _owner.HOPCoveragePartMods
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPLine
  }

  override property get PolicyPeriod(): PolicyPeriod {
    return _owner.Branch
  }

  override property get State(): Jurisdiction {
    return _owner.HOPLine.Branch.BaseState
  }

  override function addToModifiers(p0: Modifier) {
    _owner.addToHOPCoveragePartMods(p0 as HOPCoveragePartMod)
  }

  override function removeFromModifiers(p0: Modifier) {
    _owner.removeFromHOPCoveragePartMods(p0 as HOPCoveragePartMod)
  }

  override function createRawModifier(): Modifier {
    return new HOPCoveragePartMod(_owner.Branch)
  }

  override function postUpdateModifiers() {
  }

  override property get ReferenceDateInternal(): Date {
    return _owner.ReferenceDateInternal
  }

  override property set ReferenceDateInternal(date: Date) {
    _owner.ReferenceDateInternal = date
  }
}
