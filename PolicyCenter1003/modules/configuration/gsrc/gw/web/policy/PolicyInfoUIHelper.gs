package gw.web.policy

uses gw.api.locale.DisplayKey

@Export
class PolicyInfoUIHelper {

  static function performAffinityGroupSearch(name : String, period: PolicyPeriod) : AffinityGroup {
    if (name == null) {
      return null
    }
    var criteria = new gw.admin.affinitygroup.AffinityGroupSearchCriteria()
    criteria.AffinityGroupName = name
    criteria.Organization = period.ProducerOfRecord.Name
    criteria.ProducerCode = period.ProducerCodeOfRecord.Code
    criteria.Product = period.Policy.Product
    criteria.Jurisdiction = period.BaseState
    criteria.AffinityGroupStartDate = period.PeriodStart
    criteria.AffinityGroupEndDate = period.PeriodEnd


    var results = criteria.performSearch()
    try {
      var group = results.getAtMostOneRow()
      if (group == null) {
        throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Policy.AffinityGroup.NoAffinityGroupFound", name))
      }
      return group
    } catch(e : gw.api.database.MultipleMatchesException) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Policy.AffinityGroup.MultipleAffinityGroupsFound", name))
    }
  }

  static function getBaseStateVisibility(period : PolicyPeriod) : boolean {
    return period.Lines.hasMatch(\ line -> line.BaseStateRequired)
        and period.Reinstatement == null
  }
}
