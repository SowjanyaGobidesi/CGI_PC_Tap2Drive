package gw.lob.hop.schedule

uses gw.api.productmodel.ClauseSchedulePattern
uses gw.lang.reflect.IPropertyInfo
uses gw.lob.common.AbstractProductModelScheduleImpl

@Export
class HOPCovPartScheduleExclImpl extends AbstractProductModelScheduleImpl<HOPCovPartScheduleExcl> {

  construct(delegateOwner: entity.HOPCovPartScheduleExcl) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.getPattern().getClauseSchedulePattern()
  }

  override property get ScheduledItems(): ScheduledItem[] {
    return Owner.HOPCovPartScheduledItems
  }

  override function createAndAddScheduledItem(): ScheduledItem {
    var scheduledItem = new HOPCovPartSchExclItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToHOPCovPartScheduledItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override function removeScheduledItem(item: ScheduledItem) {
    Owner.removeFromHOPCovPartScheduledItems(item as HOPCovPartSchExclItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems(): KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
        .where(\p -> p.HOPLine != null)
        .each(\p -> {
          var matchingSlicedScheduleExcl = p.HOPLine.HOPCoverageParts*.ExclusionsFromCoverable.firstWhere(\c -> c.FixedId == Owner.FixedId) as HOPCovPartScheduleExcl
          if (matchingSlicedScheduleExcl != null) {
            matchingSlicedScheduleExcl.ScheduledItems.each(\s -> {
              if (not schedItems.contains(s)) {
                schedItems.add(s)
              }
            })
          }
        })

    return schedItems.map(\item -> item as HOPCovPartSchExclItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo(): IPropertyInfo {
    return HOPCovPartSchExclItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}