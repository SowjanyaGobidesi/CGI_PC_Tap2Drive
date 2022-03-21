package gw.lob.hop

uses gw.coverage.AbstractCoverageMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPCoveragePartCovMatcher extends AbstractCoverageMatcher<HOPCoveragePartCov> {
  construct(owner: HOPCoveragePartCov) {
    super(owner)
  }

  override property get CoverableColumns(): List<ILinkPropertyInfo> {
    return {HOPCoveragePartCov.Type.TypeInfo.getProperty("HOPCoveragePart") as ILinkPropertyInfo}
  }

}
