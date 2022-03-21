package gw.lob.gl

uses gw.api.productmodel.ClausePattern
uses gw.api.domain.Schedule
uses gw.lob.common.AbstractScheduledItemAdapter
uses gw.policy.PolicyLineConfiguration
uses entity.GLLineScheduleCondItem
uses typekey.Currency
uses entity.PolicyLine

@Export
class GLLineScheduleCondItemCoverableAdapter extends AbstractScheduledItemAdapter {

  var _owner : GLLineScheduleCondItem  as readonly Owner

  construct(item : GLLineScheduleCondItem) {
    _owner = item
  }

  override property get ScheduleParent() : Schedule {
    if (_owner.Schedule == null) {
      return null
    }
    return _owner.Schedule
  }

  override property get PolicyLine() : PolicyLine {
    return _owner.Schedule.GLLine
  }

  override property get Clause() : Clause {
    return null
  }

  override function hasClause() : boolean {
    return false
  }

  override property get DefaultCurrency() : Currency {
    return _owner.Schedule.GLLine.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies() : List<Currency> {
    return PolicyLineConfiguration.getByLine(InstalledPolicyLine.TC_GL).AllowedCurrencies
  }
  override function hasClause(pattern: ClausePattern): boolean {
    return (getClause(pattern) != null)
  }

  override property get Clauses(): Clause[] {
    return {}
  }

  override function getClause(pattern: ClausePattern): Clause {
    return Clauses?.firstWhere( \ clause -> clause.Pattern == pattern)
  }

}
