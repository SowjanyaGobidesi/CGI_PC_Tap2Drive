package gw.lob.hop

uses gw.lob.common.AbstractRateFactorMatcher

uses java.lang.Iterable

uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellingRateFactorMatcher extends AbstractRateFactorMatcher<HOPDwellingRF> {

  construct(owner: HOPDwellingRF) {
    super(owner)
  }

  override property get ParentColumns(): Iterable<ILinkPropertyInfo> {
    return {HOPDwellingRF.Type.TypeInfo.getProperty("HOPDwellingModifier") as ILinkPropertyInfo};
  }

}
