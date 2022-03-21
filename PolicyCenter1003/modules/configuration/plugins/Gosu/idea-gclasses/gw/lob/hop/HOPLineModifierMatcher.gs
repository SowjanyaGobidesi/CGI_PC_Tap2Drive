package gw.lob.hop

uses gw.lob.common.AbstractModifierMatcher

uses java.lang.Iterable

uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineModifierMatcher extends AbstractModifierMatcher<HOPLineMod> {
  construct(owner: HOPLineMod) {
    super(owner)
  }

  override property get ParentColumns(): Iterable<ILinkPropertyInfo> {
    return {HOPLineMod.Type.TypeInfo.getProperty("HOPLine") as ILinkPropertyInfo}
  }
}
