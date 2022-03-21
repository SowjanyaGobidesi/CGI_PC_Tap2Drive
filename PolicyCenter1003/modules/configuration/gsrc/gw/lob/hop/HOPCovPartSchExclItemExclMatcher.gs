package gw.lob.hop

uses entity.HOPCovPartSchExclItemExcl
uses gw.entity.ILinkPropertyInfo

@Export
class HOPCovPartSchExclItemExclMatcher extends AbstractHOPSchClauseItemClauseMatcher<HOPCovPartSchExclItemExcl> {

  construct(owner : HOPCovPartSchExclItemExcl) {
    super(owner)
  }

  override property get SchClauseItemColumn() : ILinkPropertyInfo {
    return HOPCovPartSchExclItemExcl.HOPCOVPARTSCHEXCLITEM_PROP.get()
  }
}