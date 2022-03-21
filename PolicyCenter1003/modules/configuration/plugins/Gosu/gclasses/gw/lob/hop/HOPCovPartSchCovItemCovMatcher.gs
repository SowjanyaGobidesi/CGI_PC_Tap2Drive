package gw.lob.hop

uses entity.HOPCovPartSchCovItemCov
uses gw.entity.ILinkPropertyInfo

@Export
class HOPCovPartSchCovItemCovMatcher extends AbstractHOPSchClauseItemClauseMatcher<HOPCovPartSchCovItemCov> {

  construct(owner : HOPCovPartSchCovItemCov) {
    super(owner)
  }

  override property get SchClauseItemColumn() : ILinkPropertyInfo {
    return HOPCovPartSchCovItemCov.HOPCOVPARTSCHEDULECOVITEM_PROP.get()
  }
}