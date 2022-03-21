package gw.lob.hop

uses gw.api.domain.ModifiableAdapter

uses java.util.Date

uses gw.api.util.JurisdictionMappingUtil

@Export
class HOPDwellingModifiableAdapter implements ModifiableAdapter {
  var _owner: HOPDwelling

  construct(owner: HOPDwelling) {
    _owner = owner
  }

  override property get AllModifiers(): Modifier[] {
    return _owner.HOPDwellingMods
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.HOPCoveragePart.HOPLine
  }

  override property get PolicyPeriod(): PolicyPeriod {
    return _owner.Branch
  }

  override property get State(): Jurisdiction {
    return JurisdictionMappingUtil.getJurisdiction(_owner.Location)
  }

  override function addToModifiers(p0: Modifier) {
    _owner.addToHOPDwellingMods(p0 as HOPDwellingMod)
  }

  override function removeFromModifiers(p0: Modifier) {
    _owner.removeFromHOPDwellingMods(p0 as HOPDwellingMod)
  }

  override function createRawModifier(): Modifier {
    return new HOPDwellingMod(_owner.Branch)
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
