package gw.lob.hop.schedule

uses gw.api.productmodel.ClauseSchedulePattern
uses gw.lang.reflect.IPropertyInfo
uses gw.lob.common.AbstractProductModelScheduleImpl

@Export
class HOPLineScheduleExclImpl extends AbstractProductModelScheduleImpl<HOPLineScheduleExcl> {

  construct(delegateOwner: entity.HOPLineScheduleExcl) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.getPattern().getClauseSchedulePattern()
  }

  override property get ScheduledItems(): ScheduledItem[] {
    return Owner.HOPLineScheduledItems
  }

  override function createAndAddScheduledItem(): ScheduledItem {
    var scheduledItem = new HOPLineScheduleExclItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToHOPLineScheduledItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override function removeScheduledItem(item: ScheduledItem) {
    Owner.removeFromHOPLineScheduledItems(item as HOPLineScheduleExclItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems(): KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
        .where(\p -> p.HOPLine != null)
        .each(\p -> {
          var matchingSlicedScheduleExcl = p.HOPLine.ExclusionsFromCoverable.firstWhere(\c -> c.FixedId == Owner.FixedId) as HOPLineScheduleExcl
          if (matchingSlicedScheduleExcl != null) {
            matchingSlicedScheduleExcl.ScheduledItems.each(\s -> {
              if (not schedItems.contains(s)) {
                schedItems.add(s)
              }
            })
          }
        })

    return schedItems.map(\item -> item as HOPLineScheduleExclItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo(): IPropertyInfo {
    return HOPLineScheduleExclItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}