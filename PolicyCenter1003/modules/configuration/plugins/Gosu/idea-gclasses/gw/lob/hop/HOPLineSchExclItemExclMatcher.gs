package gw.lob.hop

uses gw.entity.ILinkPropertyInfo
uses entity.HOPLineSchExclItemExcl

@Export
class HOPLineSchExclItemExclMatcher extends AbstractHOPSchClauseItemClauseMatcher<HOPLineSchExclItemExcl> {

  construct(owner : HOPLineSchExclItemExcl) {
    super(owner)
  }

  override property get SchClauseItemColumn() : ILinkPropertyInfo {
    return HOPLineSchExclItemExcl.HOPLINESCHEDULEEXCLITEM_PROP.get()
  }
}