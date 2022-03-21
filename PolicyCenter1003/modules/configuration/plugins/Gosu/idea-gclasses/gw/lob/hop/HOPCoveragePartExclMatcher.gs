package gw.lob.hop

uses gw.lob.common.AbstractExclusionMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPCoveragePartExclMatcher extends AbstractExclusionMatcher<HOPCoveragePartExcl> {
  construct(owner: HOPCoveragePartExcl) {
    super(owner)
  }

  override property get Parent(): ILinkPropertyInfo {
    return HOPCoveragePartExcl.Type.TypeInfo.getProperty("HOPCoveragePart") as ILinkPropertyInfo
  }

}
