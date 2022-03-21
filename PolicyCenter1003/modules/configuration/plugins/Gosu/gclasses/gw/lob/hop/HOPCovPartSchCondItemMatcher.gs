package gw.lob.hop

uses entity.HOPCovPartSchCondItem
uses gw.api.logicalmatch.AbstractScheduleClauseItemMatcher
uses gw.entity.ILinkPropertyInfo

@Export
class HOPCovPartSchCondItemMatcher extends AbstractScheduleClauseItemMatcher<HOPCovPartSchCondItem> {

  construct(owner : HOPCovPartSchCondItem) {
    super(owner)
  }

  protected override property get SchedulePropertyInfo() : ILinkPropertyInfo {
    return HOPCovPartSchCondItem.SCHEDULE_PROP.get()
  }
}