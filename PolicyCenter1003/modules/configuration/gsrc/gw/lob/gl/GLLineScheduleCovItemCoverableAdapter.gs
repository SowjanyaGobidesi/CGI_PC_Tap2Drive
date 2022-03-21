package gw.lob.gl

uses gw.api.domain.Schedule
uses gw.api.productmodel.ClausePattern
uses gw.lob.common.AbstractScheduledItemAdapter
uses gw.policy.PolicyLineConfiguration
uses entity.GLLineScheduleCovItem
uses typekey.Currency
uses entity.PolicyLine
uses entity.GLLineSchCovItemCov

@Export
class GLLineScheduleCovItemCoverableAdapter extends AbstractScheduledItemAdapter{
  var _owner : GLLineScheduleCovItem  as readonly Owner

  construct(item : GLLineScheduleCovItem) {
    _owner = item
  }

  override property get ScheduleParent() : Schedule {
    return _owner.Schedule
  }

  override property get PolicyLine() : PolicyLine {
    return _owner.Schedule.GLLine
  }

  override property get CoveragesFromCoverable() : Coverage[] {
    return _owner.ScheduledItemClause == null ? {} : {_owner.ScheduledItemClause}
  }

  override function addCoverage( cov : Coverage) {
    _owner.ScheduledItemClause = cov as GLLineSchCovItemCov
  }

  override function removeCoverage( cov : Coverage ) {
    if (hasClause()) {
      _owner.ScheduledItemClause.remove()
    }
  }

  override property get Clause() : Clause {
    var result = _owner.ScheduledItemClause
    return result
  }

  override function hasClause() : boolean {
    return (_owner.ScheduledItemClause != null)
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
    return _owner.ScheduledItemClause == null ? {} : {_owner.ScheduledItemClause}
  }

  override function getClause(pattern: ClausePattern): Clause {
    return Clauses?.firstWhere( \ clause -> clause.Pattern == pattern)
  }
}
