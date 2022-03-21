package gw.lob.hop

uses gw.lob.common.AbstractConditionMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineCondMatcher extends AbstractConditionMatcher<HOPLineCond> {
  construct(owner: HOPLineCond) {
    super(owner)
  }

  override property get Parent(): ILinkPropertyInfo {
    return HOPLineCond.Type.TypeInfo.getProperty("HOPLine") as ILinkPropertyInfo
  }

}
