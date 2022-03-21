package gw.lob.hop

uses entity.HOPCovPartSchExclItem
uses gw.api.logicalmatch.AbstractScheduleClauseItemMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPCovPartSchExclItemMatcher extends AbstractScheduleClauseItemMatcher<HOPCovPartSchExclItem> {

  construct(owner : HOPCovPartSchExclItem) {
    super(owner)
  }

  protected override property get SchedulePropertyInfo() : ILinkPropertyInfo {
    return HOPCovPartSchExclItem.SCHEDULE_PROP.get()
  }
}