package gw.lob.hop

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo

@Export
class HOPCoveragePartMatcher extends AbstractEffDatedPropertiesMatcher<HOPCoveragePart> {

  construct(part : HOPCoveragePart) {
    super(part)
  }

  override property get IdentityColumns() : Iterable<IEntityPropertyInfo> {
    return {HOPCoveragePart.Type.TypeInfo.getProperty("CoveragePartType") as IEntityPropertyInfo}
  }
}