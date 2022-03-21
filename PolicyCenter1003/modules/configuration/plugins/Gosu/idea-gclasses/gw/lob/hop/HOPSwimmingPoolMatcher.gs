package gw.lob.hop

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo
uses gw.entity.ILinkPropertyInfo

@Export
class HOPSwimmingPoolMatcher extends AbstractEffDatedPropertiesMatcher<HOPSwimmingPool> {
  construct(owner : HOPSwimmingPool) {
    super(owner)
  }

  override property get IdentityColumns() : Iterable<IEntityPropertyInfo> {
    return {}
  }

  override property get ParentColumns() : Iterable<ILinkPropertyInfo> {
    return {HOPSwimmingPool#HOPDwelling.PropertyInfo as ILinkPropertyInfo};
  }
}