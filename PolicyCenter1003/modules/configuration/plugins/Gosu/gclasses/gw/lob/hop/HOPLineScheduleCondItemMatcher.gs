package gw.lob.hop

uses gw.api.logicalmatch.AbstractScheduleClauseItemMatcher
uses entity.HOPLineScheduleCondItem
uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineScheduleCondItemMatcher extends AbstractScheduleClauseItemMatcher<HOPLineScheduleCondItem> {

  construct(owner : HOPLineScheduleCondItem) {
    super(owner)
  }

  protected override property get SchedulePropertyInfo() : ILinkPropertyInfo {
    return HOPLineScheduleCondItem.SCHEDULE_PROP.get()
  }
}