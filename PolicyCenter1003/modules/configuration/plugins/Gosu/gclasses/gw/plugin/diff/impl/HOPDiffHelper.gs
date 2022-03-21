package gw.plugin.diff.impl

uses gw.api.diff.DiffItem
uses gw.api.diff.DiffProperty
uses gw.lob.hop.schedule.HOPScheduleHelper

/**
 * This class contains methods to help with adding and filtering diff items for a
 * Homeowners line of business.
 */
@Export
class HOPDiffHelper extends DiffHelper<entity.HOPLine> {

  construct(reason: DiffReason, polLine1: entity.HOPLine, polLine2: entity.HOPLine) {
    super(reason, polLine1, polLine2)
  }

  /**
   * Should be used to add diff items that apply to this LOB, e.g. line-level coverages
   *
   * @param diffItems list of diff items to add to
   * @return List<DiffItem> returns the list of modified diff items
   */
  override function addDiffItems(diffItems: List<DiffItem>): List<DiffItem> {
    diffItems = super.addDiffItems(diffItems)

    // Add diffs for line-level coverages, exclusions, conditions and modifiers
    diffItems.addAll(this.compareLineField("HOPLineCoverages", 2))
    diffItems.addAll(this.compareLineField("HOPLineExclusions", 2))
    diffItems.addAll(this.compareLineField("HOPLineConditions", 2))
    diffItems.addAll(this.compareLineField("HOPLineModifiers", 2))

    // Setting the depth level to 3 on HOPCoveragePart field ensures that the diffItems include:
    // - All properties of coverage part (available at level 1).
    // - All clauses attached to the coverage part (level 2).
    // - All dwellings attached to the coverage part(level 2).
    // - All clauses attached to the dwelling (level 3).
    // - Exotic animals and hazards attached to dwelling (level 3).
    // - Scheduled items array attached to a dwelling clause (level 4).
    diffItems.addAll(this.compareLineField("HOPCoverageParts", 4))

    // HOPDwelling.HOPSwimmingPool is a one-to-one. For multiversion and compare job diffs, adding or removing a
    // one-to-one will appear as a property difference by default, instead of appearing as an add or remove. To make
    // those diffs consistent with policy review diffs, the filterDiffItems() method filters out property differences
    // for HOPDwelling.HOPSwimmingPool, and we explicitly generate differences for HOPSwimmingPool instead.
    addSwimmingPoolDiffs(diffItems)

    // Multiversion job and compare jobs do not handle 1-1 links.  Need to manually add those links.
    if (DiffReason.TC_MULTIVERSIONJOB == DifferenceReason || DiffReason.TC_COMPAREJOBS == DifferenceReason) {
      // Add scheduled item clauses
      var helper = new HOPScheduleHelper()
      this.addScheduledItemClauses(helper, diffItems)
    }

    return diffItems
  }

  /**
   * Filters diff items that apply to this LOB
   *
   * @param diffItems - list of diff items to filter
   * @return List<DiffItem> - returns the list of diff items that we've modified
   */
  override function filterDiffItems(diffItems: List<DiffItem>): List<DiffItem> {
    // At this moment the diffs of HOPScheduledItem should already be found so we exclude them, otherwise a duplicate
    // diff might be included as a property diff of the owning schedule - e.g. HOPLineScheduleCov#HOPLineScheduledItems
    DiffUtils.excludeType(HOPScheduledItem)
    diffItems = super.filterDiffItems(diffItems)
    diffItems.removeWhere(\item -> item typeis DiffProperty and item.PropertyInfo == HOPDwelling#SwimmingPool.PropertyInfo)
    return diffItems
  }

  private function addSwimmingPoolDiffs(diffItems : List<DiffItem>) {
    var pool1 = Line1.HOPDwellings.single().SwimmingPool
    var pool2 = Line2.HOPDwellings.single().SwimmingPool
    createDiffsForEntity(diffItems, pool1, pool2)
  }
}
