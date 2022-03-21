package gw.lob.hop

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellingMatcher extends AbstractEffDatedPropertiesMatcher<HOPDwelling> {

  construct(owner : HOPDwelling) {
    super(owner)
  }

  override property get IdentityColumns() : Iterable<IEntityPropertyInfo> {
    return {} // Currently no ID columns, just a link to the associated location
  }

  override property get ParentColumns() : Iterable<ILinkPropertyInfo> {
    return {HOPDwelling.Type.TypeInfo.getProperty("Location") as ILinkPropertyInfo};
  }

}