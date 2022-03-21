package gw.lob.hop

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo
uses gw.entity.ILinkPropertyInfo

@Export
abstract class AbstractHOPSchClauseItemClauseMatcher<T extends Clause> extends AbstractEffDatedPropertiesMatcher<T> {

  construct(owner : T) {
    super(owner)
  }

  protected override property get IdentityColumns(): Iterable<IEntityPropertyInfo> {
    return {}
  }

  override property get ParentColumns() : Iterable<ILinkPropertyInfo> {
    return {SchClauseItemColumn}
  }

  abstract property get SchClauseItemColumn(): ILinkPropertyInfo
}