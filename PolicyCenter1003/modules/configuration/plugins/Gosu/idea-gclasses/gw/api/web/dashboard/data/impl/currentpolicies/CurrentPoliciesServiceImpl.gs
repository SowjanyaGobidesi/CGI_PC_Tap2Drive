package gw.api.web.dashboard.data.impl.currentpolicies

uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.policy.period.PolicyPeriodQueryFilters
uses gw.api.web.dashboard.data.currentpolicies.CurrentPoliciesService

@Export
class CurrentPoliciesServiceImpl implements CurrentPoliciesService {

  override function getAccountPolicyPeriods(accounts: Account[]): PolicyPeriod[] {
    var periodQ = Query.make(PolicyPeriod)
    PolicyPeriodQueryFilters.boundInForce(periodQ)
    periodQ.join(PolicyPeriod#Policy)
        .compareIn(Policy#Account, accounts)
    return periodQ.select().toTypedArray()
  }

  override function getContactPolicyPeriodsStartedAfter(accountHolderContact: Contact, startedAfter: Date): PolicyPeriod[] {
    return accountHolderContact.AssociationFinder
        .findLatestBoundPolicyPeriods()
        .where(\policyPeriod -> policyPeriod.Policy.Account.AccountHolderContact == accountHolderContact &&
            policyPeriod.PeriodStart >= startedAfter)
        .toTypedArray()
  }
}