package gw.lob.common

uses gw.api.locale.DisplayKey
uses entity.KeyableBean
uses gw.api.domain.Schedule
uses gw.api.productmodel.SchedulePropertyInfo
uses gw.api.productmodel.ClausePattern
uses gw.pl.persistence.core.Bundle
uses gw.lang.reflect.IPropertyInfo
uses java.util.Map
uses gw.api.productmodel.ScheduleTypeKeyPropertyInfo
uses gw.entity.TypeKey
uses gw.api.util.DisplayableException
uses java.util.List

/**
 * Abstract implementation of the Schedule interface. Also provides implementation for ScheduleAutoNumberSequence
 * This class has been deprecated as schedule patterns have been added to the product model. When creating
 * schedule clauses use product model patterns and implement AbstractProductModelScheduleImpl instead
 *
 *DEPRECATION NOTE: AbstractProductModelScheduleImpl is the future replacement for this abstract,
 *when removing this class, the code for non-overridden functions should be moved to that class
 */
@Export
@Deprecated(:value="Code configuration based schedules are deprecated since PC9.1.1. Use AbstractProductModelScheduleImpl and product model schedule patterns", :version="PC 9.1.1")
abstract class AbstractScheduleImpl<T extends ScheduleAutoNumberSequence> implements Schedule {

  var _owner : T as Owner
  var _propertyInfoMap : Map<String, SchedulePropertyInfo> as PropertyInfoMap
  
  construct(delegateOwner : T) {
    Owner = delegateOwner
    PropertyInfoMap = PropertyInfos.partitionUniquely(\ propInfo -> propInfo.PropertyInfo.Name)
  }

  override property get MostDescriptivePropertyInfo() : SchedulePropertyInfo {
    if (PropertyInfoMap.get("StringCol1") != null) {
      return PropertyInfoMap.get("StringCol1")
    } else if (PropertyInfoMap.get("NamedInsured") != null) {
      return PropertyInfoMap.get("NamedInsured")
    } else if (PropertyInfoMap.get("TypeKeyCol1") != null) {
      return PropertyInfoMap.get("TypeKeyCol1")
    } else if (PropertyInfoMap.get("IntCol1") != null) {
      return PropertyInfoMap.get("IntCol1") 
    } else if (PropertyInfoMap.get("PosIntCol1") != null) {
      return PropertyInfoMap.get("PosIntCol1")
    } else if (PropertyInfoMap.get("DateCol1") != null) {
      return PropertyInfoMap.get("DateCol1")
    }
    return null
  } 
  
  override property get ScheduleName() : String {
    return Owner.DisplayName  
  }

  override property get PropertyInfos() : SchedulePropertyInfo[] {
    // Subtypes need to handle specific patterns
    throw new IllegalStateException("Unknown pattern type")
  }

  override property get PropertyInfosMap() :  Map<String, SchedulePropertyInfo> {
    var schedulePropertyInfos = new HashMap<String, SchedulePropertyInfo>()
    var propertyArray = PropertyInfos;
    if(propertyArray != null){
      for(var schedulePropertyInfo in propertyArray){
        schedulePropertyInfos.put(schedulePropertyInfo.Label, schedulePropertyInfo)
      }
    }
    return schedulePropertyInfos
  }

  override property get ScheduledItemMultiPatterns() : ClausePattern[] {
    // Simple schedules without cov terms do not have a pattern
    return null
  }

  protected function initializeScheduledItem(scheduledItem : Coverable & ScheduledItem) {
    scheduledItem.createCoveragesConditionsAndExclusions()
    if (ScheduledItemMultiPatterns != null) {
      for (pattern in ScheduledItemMultiPatterns) {
        scheduledItem.createCoverageConditionOrExclusion(pattern)
      }
    }
  }
  
  override function renumberAutoNumberSequence() {
    if (Owner.ScheduleAutoNumberSeq != null) { //this could be null if the schedule doesn't have scheduled items
      Owner.ScheduleAutoNumberSeq.renumber(CurrentAndFutureScheduledItems, ScheduleNumberPropInfo)
    }
  }
  
  override function renumberNewScheduledItems() {
    if (Owner.ScheduleAutoNumberSeq != null) {    
      Owner.ScheduleAutoNumberSeq.renumberNewBeans(CurrentAndFutureScheduledItems, ScheduleNumberPropInfo)
    }
  }

  override function cloneAutoNumberSequence() {
    if (Owner.ScheduleAutoNumberSeq != null) {
      Owner.ScheduleAutoNumberSeq = Owner.ScheduleAutoNumberSeq.clone(Owner.Bundle)
    }
  }

  override function resetAutoNumberSequence() {
    if (Owner.ScheduleAutoNumberSeq != null) {
      Owner.ScheduleAutoNumberSeq.reset()
      renumberAutoNumberSequence()
    }
  }

  override function bindAutoNumberSequence() {
    if (Owner.ScheduleAutoNumberSeq != null) {
      renumberAutoNumberSequence()
      Owner.ScheduleAutoNumberSeq.bind(CurrentAndFutureScheduledItems, ScheduleNumberPropInfo)
    }
  }

  override function initializeAutoNumberSequence(bundle : Bundle) {
    if (Owner.ScheduleAutoNumberSeq == null) {
      Owner.ScheduleAutoNumberSeq = new AutoNumberSequence(bundle)
    }
  }

  override function createAutoNumber(scheduledItem : KeyableBean) {
    initializeAutoNumberSequence(scheduledItem.Bundle)
    Owner.ScheduleAutoNumberSeq.number(scheduledItem, CurrentAndFutureScheduledItems, ScheduleNumberPropInfo)
  }

  /**
   * Returns an array containing scheduled items from current and future slices. Used for autonumbering.
   */
  abstract protected property get CurrentAndFutureScheduledItems() : KeyableBean[]
  
  /**
   * Get scheduled item property via reflection. Used for autonumbering.
   */
  abstract protected property get ScheduleNumberPropInfo() : IPropertyInfo

  override function getScheduledItemDescription(scheduledItem : ScheduledItem) : String {
    var propInfo = MostDescriptivePropertyInfo
    if (propInfo != null) {
      var propValue = propInfo.PropertyInfo.Accessor.getValue(scheduledItem) as String
      if (propValue != null and propValue != "") {
      
      if (propInfo typeis ScheduleTypeKeyPropertyInfo){
        var getters = propInfo.ValueRange as List<TypeKey>
        propValue = getters.firstWhere(\ t -> t.Code == propValue).DisplayName
      }

        return DisplayKey.get("Web.Policy.ScheduledItem", propValue)
      } else {
        return DisplayKey.get("Web.Policy.ScheduledItem", "")
      }
    } 
    throw new DisplayableException(DisplayKey.get("Web.Policy.NoDescriptiveColumn", scheduledItem.DisplayName))
  } 
}
