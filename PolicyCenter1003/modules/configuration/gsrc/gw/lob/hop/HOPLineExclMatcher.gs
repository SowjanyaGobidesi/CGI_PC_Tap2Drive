package gw.lob.hop

uses gw.lob.common.AbstractExclusionMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineExclMatcher extends AbstractExclusionMatcher<HOPLineExcl> {
  construct(owner: HOPLineExcl) {
    super(owner)
  }

  override property get Parent(): ILinkPropertyInfo {
    return HOPLineExcl.Type.TypeInfo.getProperty("HOPLine") as ILinkPropertyInfo
  }

}
