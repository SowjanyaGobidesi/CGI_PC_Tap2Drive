package gw.lob.hop.schedule

uses gw.api.productmodel.ClauseSchedulePattern
uses gw.lang.reflect.IPropertyInfo
uses gw.lob.common.AbstractProductModelScheduleImpl

@Export
class HOPCovPartScheduleCondImpl extends AbstractProductModelScheduleImpl<HOPCovPartScheduleCond> {

  construct(delegateOwner: entity.HOPCovPartScheduleCond) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.getPattern().getClauseSchedulePattern()
  }

  override property get ScheduledItems(): ScheduledItem[] {
    return Owner.HOPCovPartScheduledItems
  }

  override function createAndAddScheduledItem(): ScheduledItem {
    var scheduledItem = new HOPCovPartSchCondItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToHOPCovPartScheduledItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override function removeScheduledItem(item: ScheduledItem) {
    Owner.removeFromHOPCovPartScheduledItems(item as HOPCovPartSchCondItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems(): KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
        .where(\p -> p.HOPLine != null)
        .each(\p -> {
          var matchingSlicedScheduleCond = p.HOPLine.HOPCoverageParts*.ConditionsFromCoverable.firstWhere(\c -> c.FixedId == Owner.FixedId) as HOPCovPartScheduleCond
          if (matchingSlicedScheduleCond != null) {
            matchingSlicedScheduleCond.ScheduledItems.each(\s -> {
              if (not schedItems.contains(s)) {
                schedItems.add(s)
              }
            })
          }
        })

    return schedItems.map(\item -> item as HOPCovPartSchCondItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo(): IPropertyInfo {
    return HOPCovPartSchCondItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}