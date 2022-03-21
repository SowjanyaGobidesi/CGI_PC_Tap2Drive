package gw.lob.hop.schedule

uses gw.api.productmodel.ClauseSchedulePattern
uses gw.lang.reflect.IPropertyInfo
uses gw.lob.common.AbstractProductModelScheduleImpl

@Export
class HOPDwellingScheduleCovImpl extends AbstractProductModelScheduleImpl<HOPDwellingScheduleCov> {

  construct(delegateOwner: entity.HOPDwellingScheduleCov) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.getPattern().getClauseSchedulePattern()
  }

  override property get ScheduledItems(): ScheduledItem[] {
    return Owner.HOPDwellScheduledItems
  }

  override function createAndAddScheduledItem(): ScheduledItem {
    var scheduledItem = new HOPDwellScheduleCovItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToHOPDwellScheduledItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override function removeScheduledItem(item: ScheduledItem) {
    Owner.removeFromHOPDwellScheduledItems(item as HOPDwellScheduleCovItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems(): KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
        .where(\l -> l.HOPLine != null)
        .each(\l -> {
          var matchingSlicedScheduleCov = l.HOPLine.HOPDwellings*.CoveragesFromCoverable.firstWhere(\c -> c.FixedId == Owner.FixedId) as HOPDwellingScheduleCov
          if (matchingSlicedScheduleCov != null) {
            matchingSlicedScheduleCov.ScheduledItems.each(\s -> {
              if (not schedItems.contains(s)) {
                schedItems.add(s)
              }
            })
          }
        })

    return schedItems.map(\item -> item as HOPDwellScheduleCovItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo(): IPropertyInfo {
    return HOPDwellScheduleCovItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}