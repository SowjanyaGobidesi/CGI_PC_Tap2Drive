package gw.lob.hop

uses gw.lob.common.AbstractRateFactorMatcher

uses java.lang.Iterable

uses gw.entity.ILinkPropertyInfo

@Export
class HOPCoveragePartRateFactorMatcher extends AbstractRateFactorMatcher<HOPCoveragePartRF> {

  construct(owner: HOPCoveragePartRF) {
    super(owner)
  }

  override property get ParentColumns(): Iterable<ILinkPropertyInfo> {
    return {HOPCoveragePartRF.Type.TypeInfo.getProperty("HOPCoveragePartModifier") as ILinkPropertyInfo};
  }

}
