package gw.lob.gl.schedule
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.ClauseSchedulePattern
uses gw.entity.ITypeList
uses gw.lob.common.AbstractScheduleImpl
uses gw.api.productmodel.SchedulePropertyInfo
uses gw.lang.reflect.IPropertyInfo
uses gw.api.productmodel.ScheduleStringPropertyInfo
uses gw.api.productmodel.ScheduleTypeKeyPropertyInfo
uses gw.api.productmodel.ScheduleBooleanPropertyInfo

@Export
class GLLineScheduleExclImpl extends AbstractScheduleImpl<entity.GLLineScheduleExcl> {

  construct(delegateOwner : entity.GLLineScheduleExcl) {
    super(delegateOwner)
  }

  override property get SchedulePattern() : ClauseSchedulePattern {
    return Owner.SchedulePattern
  }

  override property get ScheduledItems() : ScheduledItem[] {
    return Owner.GLLineScheduledItems
  }

  override function createAndAddScheduledItem() : ScheduledItem {
    var scheduledItem = new GLLineScheduleExclItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToGLLineScheduledItems(scheduledItem)
    return scheduledItem
  }

  override property get PropertyInfos() : SchedulePropertyInfo[] {
   switch (typeof Owner) {
         case ExcludeY2KCompAndElecProbSchedule:
          return {
            new ScheduleStringPropertyInfo("StringCol1", DisplayKey.get("Web.Policy.GL.Schedule.Description"), true, false, 0),
            new ScheduleTypeKeyPropertyInfo("TypeKeyCol1", DisplayKey.get("Web.Policy.GL.Schedule.Type"), GLY2KCompSpecdCovExclType as ITypeList, null, true, false, 0),
            new ScheduleBooleanPropertyInfo("BoolCol1", DisplayKey.get("Web.Policy.GL.Schedule.BodilyInjuryExcluded"), true, false, 0),
            new ScheduleBooleanPropertyInfo("BoolCol2", DisplayKey.get("Web.Policy.GL.Schedule.PropertyDamageExcluded"), true, false, 0)
          }    
        default:
          return super.PropertyInfos
    }
  }
  
  override function removeScheduledItem(item : ScheduledItem) {
    Owner.removeFromGLLineScheduledItems(item as GLLineScheduleExclItem)
  }

  override property get CurrentAndFutureScheduledItems() : KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
      .where(\ p ->  p.GLLine != null)
      .each(\ p ->  {
        var matchingSlicedScheduleCov = p.GLLine.CoveragesFromCoverable.firstWhere(\ c -> c.FixedId == Owner.FixedId) as GLLineScheduleExcl
        if (matchingSlicedScheduleCov != null){
          matchingSlicedScheduleCov.ScheduledItems.each(\ s -> {
            if(!schedItems.contains(s)) {
              schedItems.add(s)
            }
          })
        }
      })

    return schedItems.map(\ item -> item as GLLineScheduleExclItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo() : IPropertyInfo {
    return GLLineScheduleExclItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}
