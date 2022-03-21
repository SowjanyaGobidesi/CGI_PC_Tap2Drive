package gw.pcf.job.audit

uses gw.api.locale.DisplayKey
uses java.util.Set

/**
 * Helper code to job.audit/AuditRateCostDetailStateLV.pcf
 */
@Export
class AuditRateCostDetailStateLVHelper {
  var wcJurisdiction: WCJurisdiction

  construct(jurisdiction: WCJurisdiction) {
    this.wcJurisdiction = jurisdiction
  }

  property get BasisLabel(): String {
    return (IsRevisedAudit ?
        DisplayKey.get("Web.AuditWizard.PriorAuditedBasis") :
        DisplayKey.get("Web.AuditWizard.EstBasis"))
  }

  property get AmountLabel(): String {
    return (IsRevisedAudit ?
        DisplayKey.get("Web.AuditWizard.PriorAuditedAmount") :
        DisplayKey.get("Web.AuditWizard.EstAmount"))
  }

  private property get IsRevisedAudit(): boolean {
    return wcJurisdiction.Branch.Audit.AuditInformation.IsRevision
  }

  function getAllCosts(curCosts: java.util.Set <WCCost>, priorCosts: java.util.Set <WCCost>): java.util.Set <WCCost>
  {
    var curCostKeys = curCosts.map(\curCost -> curCost.CostKey)
    var missingPriorCosts = priorCosts.where(\priorCost -> not curCostKeys.contains(priorCost.CostKey)).toSet()
    return curCosts.union(missingPriorCosts)
  }
}
