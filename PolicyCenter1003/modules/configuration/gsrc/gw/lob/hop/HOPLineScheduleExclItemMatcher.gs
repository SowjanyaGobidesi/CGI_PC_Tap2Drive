package gw.lob.hop

uses entity.HOPLineScheduleExclItem
uses gw.api.logicalmatch.AbstractScheduleClauseItemMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineScheduleExclItemMatcher extends AbstractScheduleClauseItemMatcher<HOPLineScheduleExclItem> {

  construct(owner : HOPLineScheduleExclItem) {
    super(owner)
  }

  protected override property get SchedulePropertyInfo() : ILinkPropertyInfo {
    return HOPLineScheduleExclItem.SCHEDULE_PROP.get()
  }
}