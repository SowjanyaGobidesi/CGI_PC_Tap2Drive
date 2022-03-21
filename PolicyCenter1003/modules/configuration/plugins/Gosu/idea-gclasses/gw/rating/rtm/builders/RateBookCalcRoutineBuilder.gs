package gw.rating.rtm.builders
uses gw.api.databuilder.DataBuilder
uses gw.rating.flow.builders.CalcRoutineDefinitionBuilder

@Export
class RateBookCalcRoutineBuilder extends DataBuilder<RateBookCalcRoutine, RateBookCalcRoutineBuilder>  {

  construct() {
    super(RateBookCalcRoutine)
  }

  function withRateBook( rateBook : RateBook ) : RateBookCalcRoutineBuilder {
    set(RateBookCalcRoutine.Type.TypeInfo.getProperty("RateBook"), rateBook)
    return this 
  }

  function withRateBook( rateBook : RateBookBuilder ) : RateBookCalcRoutineBuilder {
    set(RateBookCalcRoutine.Type.TypeInfo.getProperty("RateBook"), rateBook)
    return this 
  }

  function withCalcRoutine( calcRoutine : CalcRoutineDefinition ) : RateBookCalcRoutineBuilder {
    set(RateBookCalcRoutine.Type.TypeInfo.getProperty("CalcRoutineDefinition"), calcRoutine )
    return this  
  }
  
  function withCalcRoutine( calcRoutine : CalcRoutineDefinitionBuilder ) : RateBookCalcRoutineBuilder {
    set(RateBookCalcRoutine.Type.TypeInfo.getProperty("CalcRoutineDefinition"), calcRoutine )
    return this  
  }
    
}
