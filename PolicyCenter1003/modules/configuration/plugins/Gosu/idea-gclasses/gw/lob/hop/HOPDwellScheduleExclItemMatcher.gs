package gw.lob.hop

uses entity.HOPDwellScheduleExclItem
uses gw.api.logicalmatch.AbstractScheduleClauseItemMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPDwellScheduleExclItemMatcher extends AbstractScheduleClauseItemMatcher<HOPDwellScheduleExclItem> {

  construct(owner : HOPDwellScheduleExclItem) {
    super(owner)
  }

  protected override property get SchedulePropertyInfo() : ILinkPropertyInfo {
    return HOPDwellScheduleExclItem.SCHEDULE_PROP.get()
  }
}