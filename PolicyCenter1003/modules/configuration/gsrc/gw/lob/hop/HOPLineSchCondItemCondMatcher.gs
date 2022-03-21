package gw.lob.hop

uses entity.HOPLineSchCondItemCond
uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineSchCondItemCondMatcher extends AbstractHOPSchClauseItemClauseMatcher<HOPLineSchCondItemCond> {

  construct(owner : HOPLineSchCondItemCond) {
    super(owner)
  }

  override property get SchClauseItemColumn() : ILinkPropertyInfo {
    return HOPLineSchCondItemCond.HOPLINESCHEDULECONDITEM_PROP.get()
  }
}