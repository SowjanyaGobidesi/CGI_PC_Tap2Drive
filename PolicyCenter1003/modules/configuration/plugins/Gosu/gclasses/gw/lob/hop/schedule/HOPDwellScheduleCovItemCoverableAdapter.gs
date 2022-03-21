package gw.lob.hop.schedule

uses gw.api.domain.Schedule
uses gw.api.productmodel.ClausePattern
uses gw.lob.common.AbstractScheduledItemAdapter
uses gw.policy.PolicyLineConfiguration

@Export
class HOPDwellScheduleCovItemCoverableAdapter extends AbstractScheduledItemAdapter {
  var _owner: HOPDwellScheduleCovItem as readonly Owner

  construct(item: HOPDwellScheduleCovItem) {
    _owner = item
  }

  override property get ScheduleParent(): Schedule {
    return _owner.Schedule
  }

  override property get PolicyLine(): PolicyLine {
    return _owner.Schedule.HOPDwelling.HOPCoveragePart.HOPLine
  }

  override property get CoveragesFromCoverable(): Coverage[] {
    return _owner.ScheduledItemClause == null ? {} : {_owner.ScheduledItemClause}
  }

  override function addCoverage(cov: Coverage) {
    _owner.ScheduledItemClause = cov as HOPDwellSchCovItemCov
  }

  override function removeCoverage(cov: Coverage) {
    // For HOP we currently only support one clause on ScheduledItem, so remove will remove the only clause available.
    if (hasClause()) {
      _owner.ScheduledItemClause.remove()
    }
  }

  override property get Clause(): Clause {
    var result = _owner.ScheduledItemClause
    return result
  }

  override function hasClause(): boolean {
    return (_owner.ScheduledItemClause != null)
  }

  override property get DefaultCurrency(): Currency {
    return _owner.Schedule.HOPDwelling.PreferredCoverageCurrency
  }

  override property get AllowedCurrencies(): List<Currency> {
    return PolicyLineConfiguration.getByLine(InstalledPolicyLine.TC_HOP).AllowedCurrencies
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

  override property get AssociatedCoveragePartTypes() : CoveragePartType[] {
    return _owner.Schedule.getOwningCoverable().getAssociatedCoveragePartTypes()
  }
}
