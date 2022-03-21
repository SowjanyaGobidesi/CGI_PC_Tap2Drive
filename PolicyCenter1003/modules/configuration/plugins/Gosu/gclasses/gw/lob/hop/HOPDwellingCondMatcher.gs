package gw.lob.hop

uses gw.lob.common.AbstractConditionMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellingCondMatcher extends AbstractConditionMatcher<HOPDwellingCond> {
  construct(owner: HOPDwellingCond) {
    super(owner)
  }

  override property get Parent(): ILinkPropertyInfo {
    return HOPDwellingCond.Type.TypeInfo.getProperty("HOPDwelling") as ILinkPropertyInfo
  }

}
