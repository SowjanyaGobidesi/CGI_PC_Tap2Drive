package gw.lob.gl.schedule
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.ClauseSchedulePattern
uses gw.entity.ITypeList
uses gw.lob.common.AbstractScheduleImpl
uses gw.api.productmodel.SchedulePropertyInfo
uses gw.lang.reflect.IPropertyInfo
uses gw.api.productmodel.IValueRangeGetter
uses gw.api.productmodel.ScheduleDatePropertyInfo
uses gw.api.productmodel.ScheduleStringPropertyInfo
uses gw.api.productmodel.ScheduleTypeKeyPropertyInfo


@Export
class GLLineScheduleCondImpl  extends AbstractScheduleImpl<entity.GLLineScheduleCond> {

  construct(delegateOwner : entity.GLLineScheduleCond) {
    super(delegateOwner)
  }

  override property get ScheduledItems() : ScheduledItem[] {
    return Owner.GLLineScheduledItems
  }

  override property get SchedulePattern() : ClauseSchedulePattern {
    return Owner.SchedulePattern
  }

  override function createAndAddScheduledItem() : ScheduledItem {
    var scheduledItem = new GLLineScheduleCondItem(Owner.Branch)
    createAutoNumber(scheduledItem)
    Owner.addToGLLineScheduledItems(scheduledItem)
    return scheduledItem
  }

  override property get PropertyInfos() : SchedulePropertyInfo[] {
   switch (typeof Owner) {
        case AmendExtRepPerdSpecAccidSchedule:
          return {
            new ScheduleDatePropertyInfo("DateCol1", DisplayKey.get("Web.Policy.GL.Schedule.Date"), true, false, 0),
            new ScheduleStringPropertyInfo("StringCol1", DisplayKey.get("Web.Policy.GL.Schedule.Location"), true, false, 0),
            new ScheduleStringPropertyInfo("StringCol2", DisplayKey.get("Web.Policy.GL.Schedule.Description"), true, false, 0)
          }
         case AmendExtRepPerdSpecLocSchedule:
          return { 
            new ScheduleGLPolicyLocationPropertyInfo("PolicyLocation"
            , DisplayKey.get("Web.Policy.GL.Schedule.Location")
            , new IValueRangeGetter() {
                override property get ValueRange() : KeyableBean[] {
                  return Owner.GLLine.Branch.PolicyLocations
                }}
             , true, false, 0)
          }    
         case AmendExtRepPerdSpecProdWorkSchedule:
          return {
            new ScheduleTypeKeyPropertyInfo("TypeKeyCol1", DisplayKey.get("Web.Policy.GL.Schedule.Type"), (GLProductWorkType as ITypeList), null, true, false, 0),
            new ScheduleStringPropertyInfo("StringCol1", DisplayKey.get("Web.Policy.GL.Schedule.Description"), true, false, 0),
            new ScheduleTypeKeyPropertyInfo("TypeKeyCol2", DisplayKey.get("Web.Policy.GL.Schedule.Act"), (GLActType as ITypeList), null, true, false, 0),
            new ScheduleDatePropertyInfo("DateCol1", DisplayKey.get("Web.Policy.GL.Schedule.DateOfAct"), true, false, 0)
          }        
        default:
          return super.PropertyInfos
    }
  }
  
  override property get MostDescriptivePropertyInfo() : SchedulePropertyInfo {
    switch (typeof Owner) {
      case AmendExtRepPerdSpecLocSchedule:
        return PropertyInfoMap.get("PolicyLocation")
      default:
        return super.MostDescriptivePropertyInfo
    }
  } 
  
  override function removeScheduledItem(item : ScheduledItem) {
    Owner.removeFromGLLineScheduledItems(item as GLLineScheduleCondItem)
  }

  override property get CurrentAndFutureScheduledItems() : KeyableBean[] {
    var schedItems = Owner.ScheduledItems.toList()

    Owner.Branch.OOSSlices
      .where(\ p ->  p.GLLine != null)
      .each(\ p ->  {
        var matchingSlicedScheduleCov = p.GLLine.CoveragesFromCoverable.firstWhere(\ c -> c.FixedId == Owner.FixedId) as GLLineScheduleCond
        if (matchingSlicedScheduleCov != null){
          matchingSlicedScheduleCov.ScheduledItems.each(\ s -> {
            if(!schedItems.contains(s)) {
              schedItems.add(s)
            }
          })
        }
      })

    return schedItems.map(\ item -> item as GLLineScheduleCondItem).toTypedArray()
  }

  override property get ScheduleNumberPropInfo() : IPropertyInfo {
    return GLLineScheduleCondItem.Type.TypeInfo.getProperty("ScheduleNumber")
  }
}
