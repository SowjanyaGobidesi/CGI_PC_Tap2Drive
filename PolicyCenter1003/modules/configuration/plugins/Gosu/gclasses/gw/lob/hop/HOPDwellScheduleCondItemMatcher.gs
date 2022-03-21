package gw.lob.hop

uses entity.HOPDwellScheduleCondItem
uses gw.api.logicalmatch.AbstractScheduleClauseItemMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellScheduleCondItemMatcher extends AbstractScheduleClauseItemMatcher<HOPDwellScheduleCondItem> {

  construct(owner : HOPDwellScheduleCondItem) {
    super(owner)
  }

  protected override property get SchedulePropertyInfo() : ILinkPropertyInfo {
    return HOPDwellScheduleCondItem.SCHEDULE_PROP.get()
  }
}