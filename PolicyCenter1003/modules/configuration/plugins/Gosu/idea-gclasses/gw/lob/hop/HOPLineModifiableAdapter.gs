package gw.lob.hop

uses gw.api.domain.ModifiableAdapter

uses java.util.Date

uses entity.HOPLine

@Export
class HOPLineModifiableAdapter implements ModifiableAdapter {
  var _owner: HOPLine

  construct(owner: HOPLine) {
    _owner = owner
  }

  override property get AllModifiers(): Modifier[] {
    return _owner.HOPLineModifiers
  }

  override property get PolicyLine(): PolicyLine {
    return _owner
  }

  override property get PolicyPeriod(): PolicyPeriod {
    return _owner.Branch
  }

  override property get State(): Jurisdiction {
    return _owner.Branch.BaseState
  }

  override function addToModifiers(p0: Modifier) {
    _owner.addToHOPLineModifiers(p0 as HOPLineMod)
  }

  override function removeFromModifiers(p0: Modifier) {
    _owner.removeFromHOPLineModifiers(p0 as HOPLineMod)
  }

  override function createRawModifier(): Modifier {
    return new HOPLineMod(_owner.Branch)
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
