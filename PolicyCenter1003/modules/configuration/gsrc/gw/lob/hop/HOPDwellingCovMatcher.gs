package gw.lob.hop

uses gw.coverage.AbstractCoverageMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellingCovMatcher extends AbstractCoverageMatcher<HOPDwellingCov> {
  construct(owner: HOPDwellingCov) {
    super(owner)
  }

  override property get CoverableColumns(): List<ILinkPropertyInfo> {
    return {HOPDwellingCov.Type.TypeInfo.getProperty("HOPDwelling") as ILinkPropertyInfo}
  }

}
