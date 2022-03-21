package gw.lob.hop

uses gw.lob.common.AbstractModifierMatcher

uses java.lang.Iterable

uses gw.entity.ILinkPropertyInfo

@Export
class HOPCoveragePartModifierMatcher extends AbstractModifierMatcher<HOPCoveragePartMod> {
  construct(owner: HOPCoveragePartMod) {
    super(owner)
  }

  override property get ParentColumns(): Iterable<ILinkPropertyInfo> {
    return {HOPCoveragePartMod.Type.TypeInfo.getProperty("HOPCoveragePart") as ILinkPropertyInfo}
  }
}
