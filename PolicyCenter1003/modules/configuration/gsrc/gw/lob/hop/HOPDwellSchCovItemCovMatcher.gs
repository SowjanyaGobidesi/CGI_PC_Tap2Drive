package gw.lob.hop

uses entity.HOPDwellSchCovItemCov
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellSchCovItemCovMatcher extends AbstractHOPSchClauseItemClauseMatcher<HOPDwellSchCovItemCov> {

  construct(owner : HOPDwellSchCovItemCov) {
    super(owner)
  }

  override property get SchClauseItemColumn() : ILinkPropertyInfo {
    return HOPDwellSchCovItemCov.HOPDWELLSCHEDULECOVITEM_PROP.get()
  }
}