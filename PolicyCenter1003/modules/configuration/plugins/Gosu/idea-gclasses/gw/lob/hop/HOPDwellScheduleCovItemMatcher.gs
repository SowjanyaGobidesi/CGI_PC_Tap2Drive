package gw.lob.hop

uses entity.HOPDwellScheduleCovItem
uses gw.api.logicalmatch.AbstractScheduleClauseItemMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellScheduleCovItemMatcher extends AbstractScheduleClauseItemMatcher<HOPDwellScheduleCovItem> {

  construct(owner : HOPDwellScheduleCovItem) {
    super(owner)
  }

  protected override property get SchedulePropertyInfo() : ILinkPropertyInfo {
    return HOPDwellScheduleCovItem.SCHEDULE_PROP.get()
  }
}