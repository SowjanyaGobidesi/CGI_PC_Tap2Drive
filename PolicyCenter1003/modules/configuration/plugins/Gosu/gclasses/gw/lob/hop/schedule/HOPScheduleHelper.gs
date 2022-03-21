package gw.lob.hop.schedule

uses gw.lob.common.schedule.AbstractScheduleHelper

@Export
class HOPScheduleHelper extends AbstractScheduleHelper<entity.HOPLine, ScheduledItem> {

  override function getScheduledItemsForAllCoverables(line: entity.HOPLine): List<ScheduledItem> {
    // All scheduled items are coverables and implement the ScheduledItem delegate
    return line.AllCoverables.whereTypeIs(ScheduledItem).toList()
  }

  override function getCurrentAndFutureScheduledItemsForPolicyLine(line: entity.HOPLine): List<ScheduledItem> {
    var allItems = new ArrayList<ScheduledItem>()
    var editEffectiveDates = line.Branch.AllEffectiveDates.where(\d -> d.afterOrEqual(line.Branch.EditEffectiveDate)).toList()
    var lineVersionList = line.getVersionsOnDates<entity.HOPLine>(editEffectiveDates)
    for (var lineVersion in lineVersionList) {
      allItems.addAll(getScheduledItemsForAllCoverables(lineVersion))
    }
    var uniqueItems = new LinkedHashSet<ScheduledItem>(allItems)
    return uniqueItems.toList()
  }
}