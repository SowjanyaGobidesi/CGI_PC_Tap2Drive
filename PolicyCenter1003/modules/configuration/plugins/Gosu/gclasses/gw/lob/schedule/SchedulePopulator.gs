package gw.lob.schedule

uses entity.Clause
uses gw.api.domain.Schedule
uses gw.api.productmodel. *
uses gw.lang.reflect.ReflectUtil

uses java.util.Date
uses gw.api.upgrade.PCCoercions
uses gw.api.productmodel.ClausePattern

@Export
class SchedulePopulator {

  /**
   * The Coverable on which the Schedule will reside.  
   * Note, once {@link createSchedule()} is called, this property may be out of date.
   * 
   */
  var _owner : Coverable as ScheduleOwner

  /**
   * The ClausePattern associated with the Schedule.  
   * This is for the entire schedule and not individual scheduled items.
   */
  var _schedulePattern : ClausePattern as SchedulePattern
  
  /**
   * Block for populating column values associated with a ScheduledItem.
   */
  var _populateColumns : block(item : ScheduledItem, num : int) as PopulateColumns
  
  /**
   * The number of scheduled items to create when {@link createSchedule()} is invoked.
   */
  var _itemCount : int as ItemCount = 4
  
  property get ScheduleClause() : Clause {
    var scheduleImpl : Clause
    if (SchedulePattern typeis CoveragePattern) {
      scheduleImpl = ScheduleOwner.getCoverage(SchedulePattern) 
      if (scheduleImpl == null) {
        scheduleImpl = ScheduleOwner.createCoverage(SchedulePattern)
      }
    } else if (SchedulePattern typeis ConditionPattern) {
      scheduleImpl = ScheduleOwner.getCondition(SchedulePattern) 
      if (scheduleImpl == null) {
        scheduleImpl = ScheduleOwner.createCondition(SchedulePattern)
      }  
    } else if (SchedulePattern typeis ExclusionPattern) {
      scheduleImpl = ScheduleOwner.getExclusion(SchedulePattern) 
      if (scheduleImpl == null) {
        scheduleImpl = ScheduleOwner.createExclusion(SchedulePattern)
      }  
    }
    return scheduleImpl
  }

  function createSchedule() : Schedule {
    if (ScheduleOwner == null){
       throw "Cannot create schedule, schedule owner is null" 
    }
    var scheduleImpl = ScheduleClause
    for (itemIndex in 0..|ItemCount){
      var item = ReflectUtil.invokeMethod(scheduleImpl, "createAndAddScheduledItem", {}) as ScheduledItem
      setColumns(item, itemIndex)
    }
    return scheduleImpl as Schedule

  }

  function setColumns(item : ScheduledItem, itemIndex : int) {
    PopulateColumns(item, itemIndex)
  }
  
  static function glPestHerbicideApplicatorSchedule(owner : GLLine) : SchedulePopulator {
    var result = new SchedulePopulator(){
      :ItemCount = 1
      ,:ScheduleOwner = owner
      ,:SchedulePattern = PCCoercions.makeProductModel<ClausePattern>("GLPestHerbicideApplicatorSchedule")
      ,:PopulateColumns = \ item : ScheduledItem, num : int ->{
          item.setFieldValue("StringCol1", "Test")
        }
    }
    return result
  } 

   static function glPestHerbicideApplicatorScheduleItems(owner : GLLine, count : int) : SchedulePopulator {
    
    var result = new SchedulePopulator(){
      :ItemCount = count
      ,:ScheduleOwner = owner
      ,:SchedulePattern = PCCoercions.makeProductModel<ClausePattern>("GLPestHerbicideApplicatorSchedule")
      ,:PopulateColumns = \ item : ScheduledItem, num : int ->{
          item.setFieldValue("StringCol1", "Test"+ num)
        }
    }
    return result
  } 

   static function glExcludeY2KCompAndElecProbScheduleItems(owner : GLLine, count : int) : SchedulePopulator {
    
    var result = new SchedulePopulator(){
      :ItemCount = count
      ,:ScheduleOwner = owner
      ,:SchedulePattern = PCCoercions.makeProductModel<ClausePattern>("ExcludeY2KCompAndElecProbSchedule")
      ,:PopulateColumns = \ item : ScheduledItem, num : int ->{
          item.setFieldValue("StringCol1", "Test"+ num) //Description
          item.setFieldValue("TypeKeyCol1", GLY2KCompSpecdCovExclType.TC_COMPLETEDOPERATION.Code) //Type
          item.setFieldValue("BoolCol1", true) // Bodily Injury Excluded
          item.setFieldValue("BoolCol1", true) // Property Damage Excluded
        }
    }
    return result
  } 
  
  
   static function glAmendExtRepPerdSpecProdWorkScheduleItems(owner : GLLine, count : int) : SchedulePopulator {
    
    var result = new SchedulePopulator(){
      :ItemCount = count
      ,:ScheduleOwner = owner
      ,:SchedulePattern = PCCoercions.makeProductModel<ClausePattern>("AmendExtRepPerdSpecProdWorkSchedule")
      ,:PopulateColumns = \ item : ScheduledItem, num : int ->{
          item.setFieldValue("TypeKeyCol1", GLProductWorkType.TC_PRODUCT.Code) //Type
          item.setFieldValue("StringCol1", "Test"+ num) //Description
          item.setFieldValue("TypeKeyCol2", GLActType.TC_DISTRIBUTION.Code) //Act Type
          item.setFieldValue("DateCol1", Date.Today) // Act Date
        }
    }
    return result
  } 
}
