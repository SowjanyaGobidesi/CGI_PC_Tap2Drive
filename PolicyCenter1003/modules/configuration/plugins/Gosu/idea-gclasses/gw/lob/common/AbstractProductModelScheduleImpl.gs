package gw.lob.common

uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.ClauseSchedulePattern
uses gw.api.productmodel.SchedulePropertyInfo

/**
 * Abstract implementation of the Product Model Schedule interface.
 */
@Export
abstract public class AbstractProductModelScheduleImpl<T extends ScheduleAutoNumberSequence & Clause> extends AbstractScheduleImpl<T> {

  construct(delegateOwner: T) {
    super(delegateOwner)
  }

  override property get SchedulePattern(): ClauseSchedulePattern {
    return Owner.Pattern.ClauseSchedulePattern
  }

  /**
   * Returns the most descriptive property for the schedule items based on the product model schedule pattern
   * If none is found in product model, iterates through known ScheduleItem columns to find possible descriptive property
   * If none is found in ScheduleItem columns returns null
   * @return SchedulePropertyInfo for most descriptive property or null
   */
  override property get MostDescriptivePropertyInfo() : SchedulePropertyInfo {
    var mostDescriptiveProperty = SchedulePattern.MostDescriptiveProperty
    if (mostDescriptiveProperty != null) {
      return mostDescriptiveProperty.createSchedulePropertyInfo(this.Owner)
    }
    return super.MostDescriptivePropertyInfo
  }

  override property get PropertyInfosMap(): Map<String, SchedulePropertyInfo> {
    var schedulePropertyInfos = new HashMap<String, SchedulePropertyInfo>()
    var scheduledItemPropPatterns = SchedulePattern.getScheduledItemPropertyPatterns()

    for (var scheduledItemPropertyPattern in scheduledItemPropPatterns) {
      schedulePropertyInfos.put(scheduledItemPropertyPattern.CodeIdentifier,
          scheduledItemPropertyPattern.createSchedulePropertyInfo(this.Owner));
    }
    return schedulePropertyInfos
  }

  override property get PropertyInfos() : SchedulePropertyInfo[] {
    var schedulePattern = SchedulePattern
    return getPropertyInfos(schedulePattern)
  }

  protected function getPropertyInfos(schedulePattern : ClauseSchedulePattern) : SchedulePropertyInfo[] {
    var result: SchedulePropertyInfo[] = {}
    if (schedulePattern != null) {
      var scheduledItemPropPatterns = schedulePattern.getScheduledItemPropertyPatterns()
      result = scheduledItemPropPatterns.map(\elt -> elt.createSchedulePropertyInfo(this.Owner)).toTypedArray()
    }
    return result
  }

  /**
   * For complex schedules (schedules with cov terms), it returns an array of clause patterns.
   * For simple schedules without cov terms, it returns null.
   */
  override property get ScheduledItemMultiPatterns(): ClausePattern[] {
    var scheduledItemClauseLinkages = Owner.Pattern.ClauseSchedulePattern.ScheduledItemClauseLinkages
    return (!scheduledItemClauseLinkages.isEmpty()) ? scheduledItemClauseLinkages*.LinkedClausePattern : null
  }
}