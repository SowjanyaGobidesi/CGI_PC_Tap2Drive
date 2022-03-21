package gw.api.databuilder.wc

uses gw.api.databuilder.BuilderContext

@Export
class WCFedCoveredEmployeeBuilder extends WCCoveredEmployeeBuilderBase<WCFedCoveredEmployee, WCFedCoveredEmployeeBuilder> {
  construct() {
    super(WCFedCoveredEmployee)
  }

  protected override function createBean(context : BuilderContext) : WCFedCoveredEmployee {
    var line = context.getParentBean() as entity.WorkersCompLine
    return line.createAndAddWCFedCoveredEmployee()
  }
}