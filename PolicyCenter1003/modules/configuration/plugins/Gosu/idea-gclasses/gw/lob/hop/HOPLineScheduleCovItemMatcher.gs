package gw.lob.hop

uses gw.api.logicalmatch.AbstractScheduleClauseItemMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPLineScheduleCovItemMatcher extends AbstractScheduleClauseItemMatcher<HOPLineScheduleCovItem> {

  construct(owner : entity.HOPLineScheduleCovItem) {
    super(owner)
  }

  protected override property get SchedulePropertyInfo() : ILinkPropertyInfo {
    return HOPLineScheduleCovItem.SCHEDULE_PROP.get()
  }
}