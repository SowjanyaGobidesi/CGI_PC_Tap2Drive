package gw.lob.hop.schedule

uses gw.api.productmodel.ClauseSchedulePattern
uses gw.lang.reflect.IPropertyInfo
uses gw.lob.common.AbstractProductModelScheduleImpl

@Export
class HOPLineScheduleCondImpl extends AbstractProductModelScheduleImpl<HOPLineScheduleCond> {

  construct(delegateOwner: entity.HOPLineScheduleCond) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.getPattern().getClauseSchedulePattern()
  }

  override property get ScheduledItems(): ScheduledItem[] {
    return Owner.HOPLineScheduledItems
  }

  override function createAndAddScheduledItem(): ScheduledItem {
    var scheduledItem = new HOPLineScheduleCondItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToHOPLineScheduledItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override function removeScheduledItem(item: ScheduledItem) {
    Owner.removeFromHOPLineScheduledItems(item as HOPLineScheduleCondItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems(): KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
        .where(\p -> p.HOPLine != null)
        .each(\p -> {
          var matchingSlicedScheduleCond = p.HOPLine.ConditionsFromCoverable.firstWhere(\c -> c.FixedId == Owner.FixedId) as HOPLineScheduleCond
          if (matchingSlicedScheduleCond != null) {
            matchingSlicedScheduleCond.ScheduledItems.each(\s -> {
              if (not schedItems.contains(s)) {
                schedItems.add(s)
              }
            })
          }
        })

    return schedItems.map(\item -> item as HOPLineScheduleCondItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo(): IPropertyInfo {
    return HOPLineScheduleCondItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}