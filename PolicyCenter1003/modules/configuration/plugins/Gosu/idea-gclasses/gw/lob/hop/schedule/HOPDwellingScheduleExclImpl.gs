package gw.lob.hop.schedule

uses gw.api.productmodel.ClauseSchedulePattern
uses gw.lang.reflect.IPropertyInfo
uses gw.lob.common.AbstractProductModelScheduleImpl

@Export
class HOPDwellingScheduleExclImpl extends AbstractProductModelScheduleImpl<HOPDwellingScheduleExcl> {

  construct(delegateOwner: entity.HOPDwellingScheduleExcl) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.getPattern().getClauseSchedulePattern()
  }

  override property get ScheduledItems(): ScheduledItem[] {
    return Owner.HOPDwellScheduledItems
  }

  override function createAndAddScheduledItem(): ScheduledItem {
    var scheduledItem = new HOPDwellScheduleExclItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToHOPDwellScheduledItems(scheduledItem)
    initializeScheduledItem(scheduledItem)
    return scheduledItem
  }

  override function removeScheduledItem(item: ScheduledItem) {
    Owner.removeFromHOPDwellScheduledItems(item as HOPDwellScheduleExclItem)
    renumberAutoNumberSequence()
  }

  override property get CurrentAndFutureScheduledItems(): KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
        .where(\p -> p.HOPLine != null)
        .each(\p -> {
          var matchingSlicedScheduleExcl = p.HOPLine.HOPDwellings*.ExclusionsFromCoverable.firstWhere(\c -> c.FixedId == Owner.FixedId) as HOPDwellingScheduleExcl
          if (matchingSlicedScheduleExcl != null) {
            matchingSlicedScheduleExcl.ScheduledItems.each(\s -> {
              if (not schedItems.contains(s)) {
                schedItems.add(s)
              }
            })
          }
        })

    return schedItems.map(\item -> item as HOPDwellScheduleExclItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo(): IPropertyInfo {
    return HOPDwellScheduleExclItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }


}