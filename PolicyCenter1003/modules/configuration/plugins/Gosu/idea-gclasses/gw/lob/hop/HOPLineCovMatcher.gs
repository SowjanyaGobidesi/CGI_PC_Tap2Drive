package gw.lob.hop

uses gw.coverage.AbstractCoverageMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineCovMatcher extends AbstractCoverageMatcher<HOPLineCov> {
  construct(owner: HOPLineCov) {
    super(owner)
  }

  override property get CoverableColumns(): List<ILinkPropertyInfo> {
    return {HOPLineCov.Type.TypeInfo.getProperty("HOPLine") as ILinkPropertyInfo}
  }

}
