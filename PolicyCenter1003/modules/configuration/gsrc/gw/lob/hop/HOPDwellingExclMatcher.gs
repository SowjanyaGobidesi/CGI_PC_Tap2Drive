package gw.lob.hop

uses gw.lob.common.AbstractExclusionMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellingExclMatcher extends AbstractExclusionMatcher<HOPDwellingExcl> {
  construct(owner: HOPDwellingExcl) {
    super(owner)
  }

  override property get Parent(): ILinkPropertyInfo {
    return HOPDwellingExcl.Type.TypeInfo.getProperty("HOPDwelling") as ILinkPropertyInfo
  }

}
