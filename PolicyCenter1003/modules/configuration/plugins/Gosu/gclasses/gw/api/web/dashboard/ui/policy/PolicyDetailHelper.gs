package gw.api.web.dashboard.ui.policy

uses gw.api.locale.DisplayKey

@Export
class PolicyDetailHelper {
  final var _period: PolicyPeriod

  construct(period: PolicyPeriod) {
    _period  = period
  }

  property get SourceDividerVisible(): boolean {
    return _period.Policy.MovedPolicySourceAccount != null
        or _period.Policy.RewrittenToNewAccountSource != null
        or _period.Policy.RewrittenToNewAccountDestination.BoundPeriods.HasElements
        or _period.Policy.DividedSourcePolicy != null
        or _period.PolicyTerm.PreRenewalDirection != null
  }

  property get SourcePolicyValue(): String {
    return DisplayKey.get('Web.Dashboard.Tile.PolicyDetails.PolicyNumOnAccount',
        _period.Policy.RewrittenToNewAccountSource.Periods.first().PolicyNumberDisplayString,
        _period.Policy.RewrittenToNewAccountSource.Account.AccountNumber)
  }

  property get SplitSourcePolicyValue(): String {
    return DisplayKey.get('Web.Dashboard.Tile.PolicyDetails.PolicyNumOnAccount',
        _period.Policy.DividedSourcePolicy.LatestBoundPeriod.PolicyNumberDisplayString,
        _period.Policy.DividedSourcePolicy.Account.AccountNumber)
  }

  property get TargetPolicyValue(): String {
    return DisplayKey.get('Web.Dashboard.Tile.PolicyDetails.PolicyNumOnAccount',
        _period.Policy.RewrittenToNewAccountDestination.Periods.first().PolicyNumberDisplayString,
        _period.Policy.RewrittenToNewAccountDestination.Account.AccountNumber)
  }
}
