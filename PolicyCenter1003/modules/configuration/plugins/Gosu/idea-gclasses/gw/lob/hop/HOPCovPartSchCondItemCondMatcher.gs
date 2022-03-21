package gw.lob.hop

uses entity.HOPCovPartSchCondItemCond
uses gw.entity.ILinkPropertyInfo

@Export
class HOPCovPartSchCondItemCondMatcher extends AbstractHOPSchClauseItemClauseMatcher<HOPCovPartSchCondItemCond> {

  construct(owner : HOPCovPartSchCondItemCond) {
    super(owner)
  }

  override property get SchClauseItemColumn() : ILinkPropertyInfo {
    return HOPCovPartSchCondItemCond.HOPCOVPARTSCHCONDITEM_PROP.get()
  }
}