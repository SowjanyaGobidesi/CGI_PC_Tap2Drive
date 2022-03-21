package gw.lob.hop

uses gw.lob.common.AbstractConditionMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPCoveragePartCondMatcher extends AbstractConditionMatcher<HOPCoveragePartCond> {
  construct(owner: HOPCoveragePartCond) {
    super(owner)
  }

  override property get Parent(): ILinkPropertyInfo {
    return HOPCoveragePartCond.Type.TypeInfo.getProperty("HOPCoveragePart") as ILinkPropertyInfo
  }

}
