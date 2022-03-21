package gw.plugin.job.impl
uses gw.plugin.job.IAuditSchedulePatternSelectorPlugin
uses gw.api.productmodel.AuditSchedulePattern
uses gw.api.productmodel.AuditSchedulePatternLookup

@Export
class AuditSchedulePatternSelectorPlugin implements IAuditSchedulePatternSelectorPlugin {

  construct() {
  }

  override function selectFinalAuditSchedulePatternForCancellation(period : PolicyPeriod) : AuditSchedulePattern {
    return AuditSchedulePatternLookup.getAll().firstWhere(\ f -> f.PublicID == "CancellationPhone")
  }

  override function selectFinalAuditSchedulePatternForExpiredPolicy(period : PolicyPeriod) : AuditSchedulePattern {
    return AuditSchedulePatternLookup.getAll().firstWhere(\ f -> f.PublicID == "ExpirationPhysical")
  }
}
