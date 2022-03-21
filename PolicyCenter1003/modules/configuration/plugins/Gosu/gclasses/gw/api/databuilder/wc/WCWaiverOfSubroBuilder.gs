package gw.api.databuilder.wc
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext

@Export
class WCWaiverOfSubroBuilder extends DataBuilder<WCWaiverOfSubro, WCWaiverOfSubroBuilder> {

  construct() {
    super(WCWaiverOfSubro)
  }

  protected override function createBean(context : BuilderContext) : WCWaiverOfSubro {
    var line = context.getParentBean() as entity.WorkersCompLine
    return line.createAndAddWCWaiverOfSubro(TC_BLANKET)
  }
  
  final function withWaiverType(waiverType : WaiverOfSubrogationType) : WCWaiverOfSubroBuilder {
    set(WCWaiverOfSubro.Type.TypeInfo.getProperty("Type"), waiverType)
    return this
  }

  final function withState(state : State) : WCWaiverOfSubroBuilder {
    set(WCWaiverOfSubro.Type.TypeInfo.getProperty("State"), state)
    return this
  }  
  
  final function withDescription(desc : String) : WCWaiverOfSubroBuilder {
    set(WCWaiverOfSubro.Type.TypeInfo.getProperty("Description"), desc)
    return this
  }
}
