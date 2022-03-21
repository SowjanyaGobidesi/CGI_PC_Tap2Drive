package gw.lob.hop

uses entity.HOPDwellSchCondItemCond
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellSchCondItemCondMatcher extends AbstractHOPSchClauseItemClauseMatcher<HOPDwellSchCondItemCond> {

  construct(owner : HOPDwellSchCondItemCond) {
    super(owner)
  }

  override property get SchClauseItemColumn() : ILinkPropertyInfo {
    return HOPDwellSchCondItemCond.HOPDWELLSCHEDULECONDITEM_PROP.get()
  }
}