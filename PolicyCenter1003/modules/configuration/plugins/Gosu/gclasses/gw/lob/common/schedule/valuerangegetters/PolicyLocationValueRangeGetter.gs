package gw.lob.common.schedule.valuerangegetters

uses gw.api.productmodel.IValueRangeGetter

@Export
class PolicyLocationValueRangeGetter implements IValueRangeGetter {
  var _owningClause: Clause

  construct(owningClause: Clause) {
    _owningClause = owningClause
  }

  override property get ValueRange(): KeyableBean[] {
    return (_owningClause.BranchUntyped as PolicyPeriod).PolicyLocations
  }
}