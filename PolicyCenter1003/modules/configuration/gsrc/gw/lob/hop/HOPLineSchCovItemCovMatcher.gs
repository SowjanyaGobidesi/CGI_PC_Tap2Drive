package gw.lob.hop

uses entity.HOPLineSchCovItemCov
uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineSchCovItemCovMatcher extends AbstractHOPSchClauseItemClauseMatcher<HOPLineSchCovItemCov> {

  construct(owner : HOPLineSchCovItemCov) {
    super(owner)
  }

  override property get SchClauseItemColumn() : ILinkPropertyInfo {
    return HOPLineSchCovItemCov.HOPLINESCHEDULECOVITEM_PROP.get()
  }
}