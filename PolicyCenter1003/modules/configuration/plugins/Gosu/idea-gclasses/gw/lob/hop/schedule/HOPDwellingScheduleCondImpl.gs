package gw.lob.hop.schedule

uses gw.api.productmodel.ClauseSchedulePattern
uses gw.lang.reflect.IPropertyInfo
uses gw.lob.common.AbstractProductModelScheduleImpl

@Export
class HOPDwellingScheduleCondImpl extends AbstractProductModelScheduleImpl<HOPDwellingScheduleCond> {

  construct(delegateOwner: entity.HOPDwellingScheduleCond) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.getPattern().getClauseSchedulePattern()
  }

  override property get ScheduledItems(): ScheduledItem[] {
    return Owner.HOPDwellScheduledItems
  }

  override function createAndAddScheduledItem(): ScheduledItem {
    var scheduledItem = new HOPDwellScheduleCondItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToHOPDwellScheduledItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override function removeScheduledItem(item: ScheduledItem) {
    Owner.removeFromHOPDwellScheduledItems(item as HOPDwellScheduleCondItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems(): KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
        .where(\p -> p.HOPLine != null)
        .each(\p -> {
          var matchingSlicedScheduleCond = p.HOPLine.HOPDwellings*.ConditionsFromCoverable.firstWhere(\c -> c.FixedId == Owner.FixedId) as HOPDwellingScheduleCond
          if (matchingSlicedScheduleCond != null) {
            matchingSlicedScheduleCond.ScheduledItems.each(\s -> {
              if (not schedItems.contains(s)) {
                schedItems.add(s)
              }
            })
          }
        })

    return schedItems.map(\item -> item as HOPDwellScheduleCondItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo(): IPropertyInfo {
    return HOPDwellScheduleCondItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}