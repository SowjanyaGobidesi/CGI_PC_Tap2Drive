package gw.lob.hop

uses entity.HOPDwellSchExclItemExcl
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellSchExclItemExclMatcher extends AbstractHOPSchClauseItemClauseMatcher<HOPDwellSchExclItemExcl> {

  construct(owner : HOPDwellSchExclItemExcl) {
    super(owner)
  }

  override property get SchClauseItemColumn() : ILinkPropertyInfo {
    return HOPDwellSchExclItemExcl.HOPDWELLSCHEDULEEXCLITEM_PROP.get()
  }
}