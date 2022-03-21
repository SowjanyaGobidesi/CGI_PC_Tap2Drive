package gw.api.databuilder.wc
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext

@Export
class InclusionPersonBuilder extends DataBuilder<InclusionPerson, InclusionPersonBuilder> {

  construct() {
    super(InclusionPerson)
  }

  protected override function createBean(context : BuilderContext) : InclusionPerson {
    var line = context.getParentBean() as entity.WorkersCompLine
    return line.createAndAddInclusionPerson()
  }
  
  final function withInclusionOption(option : Inclusion) : InclusionPersonBuilder {
    set(InclusionPerson.Type.TypeInfo.getProperty("Inclusion"), option)
    return this
  }

  final function withState(state : State) : InclusionPersonBuilder {
    set(InclusionPerson.Type.TypeInfo.getProperty("State"), state)
    return this
  }  
}
