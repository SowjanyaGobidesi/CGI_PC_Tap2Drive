package gw.plugin.billing.bc900

uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.CommissionPlanInfo

@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement CommissionPlanSummaryEnhancement : gw.plugin.billing.CommissionPlanSummary {
  function sync(plan : CommissionPlanInfo) {
    this.syncCurrency(plan)
    this.AllowedTiers = new Tier[plan.AllowedTiers.Count]
    for (tier in plan.AllowedTiers index i) {
      this.AllowedTiers[i] = typekey.Tier.get(tier)
    }
  }
}
