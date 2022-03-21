package gw.lob.hop

uses gw.lob.common.AbstractModifierMatcher

uses java.lang.Iterable

uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellingModifierMatcher extends AbstractModifierMatcher<HOPDwellingMod> {
  construct(owner: HOPDwellingMod) {
    super(owner)
  }

  override property get ParentColumns(): Iterable<ILinkPropertyInfo> {
    return {HOPDwellingMod.Type.TypeInfo.getProperty("HOPDwelling") as ILinkPropertyInfo}
  }
}
