package gw.lob.hop.schedule

uses gw.api.productmodel.ClauseSchedulePattern
uses gw.lang.reflect.IPropertyInfo
uses gw.lob.common.AbstractProductModelScheduleImpl

@Export
class HOPCovPartScheduleCovImpl extends AbstractProductModelScheduleImpl<HOPCovPartScheduleCov> {

  construct(delegateOwner: entity.HOPCovPartScheduleCov) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.getPattern().getClauseSchedulePattern()
  }

  override property get ScheduledItems(): ScheduledItem[] {
    return Owner.HOPCovPartScheduledItems
  }

  override function createAndAddScheduledItem(): ScheduledItem {
    var scheduledItem = new HOPCovPartScheduleCovItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToHOPCovPartScheduledItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override function removeScheduledItem(item: ScheduledItem) {
    Owner.removeFromHOPCovPartScheduledItems(item as HOPCovPartScheduleCovItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems(): KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
        .where(\l -> l.HOPLine != null)
        .each(\l -> {
          var matchingSlicedScheduleCov = l.HOPLine.HOPCoverageParts*.CoveragesFromCoverable.firstWhere(\c -> c.FixedId == Owner.FixedId) as HOPCovPartScheduleCov
          if (matchingSlicedScheduleCov != null) {
            matchingSlicedScheduleCov.ScheduledItems.each(\s -> {
              if (not schedItems.contains(s)) {
                schedItems.add(s)
              }
            })
          }
        })

    return schedItems.map(\item -> item as HOPCovPartScheduleCovItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo(): IPropertyInfo {
    return HOPCovPartScheduleCovItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}