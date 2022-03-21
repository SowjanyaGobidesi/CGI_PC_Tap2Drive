package gw.api.databuilder.wc
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext

@Export
class WCAircraftSeatBuilder extends DataBuilder<WCAircraftSeat, WCAircraftSeatBuilder> {

  construct() {
    super(WCAircraftSeat)
  }

  protected override function createBean(context : BuilderContext) : WCAircraftSeat {
    var line = context.getParentBean() as entity.WorkersCompLine
    return line.createAndAddWCAircraftSeat()
  }
  
  final function withDescription(desc : String) : WCAircraftSeatBuilder {
    set(WCAircraftSeat.Type.TypeInfo.getProperty("Description"), desc)
    return this
  }

  final function withState(state : State) : WCAircraftSeatBuilder {
    set(WCAircraftSeat.Type.TypeInfo.getProperty("State"), state)
    return this
  }  
}
