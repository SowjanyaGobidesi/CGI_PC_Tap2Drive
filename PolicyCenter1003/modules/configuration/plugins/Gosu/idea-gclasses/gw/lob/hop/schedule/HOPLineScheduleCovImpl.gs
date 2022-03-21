package gw.lob.hop.schedule

uses gw.api.productmodel.ClauseSchedulePattern
uses gw.lang.reflect.IPropertyInfo
uses gw.lob.common.AbstractProductModelScheduleImpl
uses entity.HOPLineScheduleCovItem

@Export
class HOPLineScheduleCovImpl extends AbstractProductModelScheduleImpl<HOPLineScheduleCov> {

  construct(delegateOwner: entity.HOPLineScheduleCov) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.getPattern().getClauseSchedulePattern()
  }

  override property get ScheduledItems(): ScheduledItem[] {
    return Owner.HOPLineScheduledItems
  }

  override function createAndAddScheduledItem(): ScheduledItem {
    var scheduledItem = new HOPLineScheduleCovItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToHOPLineScheduledItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override function removeScheduledItem(item: ScheduledItem) {
    Owner.removeFromHOPLineScheduledItems(item as HOPLineScheduleCovItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems(): KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
        .where(\p -> p.HOPLine != null)
        .each(\p -> {
          var matchingSlicedScheduleCov = p.HOPLine.CoveragesFromCoverable.firstWhere(\c -> c.FixedId == Owner.FixedId) as HOPLineScheduleCov
          if (matchingSlicedScheduleCov != null) {
            matchingSlicedScheduleCov.ScheduledItems.each(\s -> {
              if (not schedItems.contains(s)) {
                schedItems.add(s)
              }
            })
          }
        })

    return schedItems.map(\item -> item as HOPLineScheduleCovItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo(): IPropertyInfo {
    return HOPLineScheduleCovItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}