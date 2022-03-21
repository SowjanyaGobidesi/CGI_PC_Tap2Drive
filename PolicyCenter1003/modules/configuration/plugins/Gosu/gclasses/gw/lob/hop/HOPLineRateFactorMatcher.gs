package gw.lob.hop

uses gw.lob.common.AbstractRateFactorMatcher

uses java.lang.Iterable

uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineRateFactorMatcher extends AbstractRateFactorMatcher<HOPLineRF> {

  construct(owner: HOPLineRF) {
    super(owner)
  }

  override property get ParentColumns(): Iterable<ILinkPropertyInfo> {
    return {HOPLineRF.Type.TypeInfo.getProperty("HOPLineModifier") as ILinkPropertyInfo};
  }

}
