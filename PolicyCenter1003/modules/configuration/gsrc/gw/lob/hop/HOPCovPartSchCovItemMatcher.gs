package gw.lob.hop

uses gw.api.logicalmatch.AbstractScheduleClauseItemMatcher
uses entity.HOPCovPartScheduleCovItem
uses gw.entity.ILinkPropertyInfo

@Export
class HOPCovPartSchCovItemMatcher extends AbstractScheduleClauseItemMatcher<HOPCovPartScheduleCovItem> {

  construct(owner : HOPCovPartScheduleCovItem) {
    super(owner)
  }

  protected override property get SchedulePropertyInfo() : ILinkPropertyInfo {
    return HOPCovPartScheduleCovItem.SCHEDULE_PROP.get()
  }
}