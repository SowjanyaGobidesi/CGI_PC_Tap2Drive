package gw.plugin.clone

uses gw.api.database.Query

@Export
/**
 * This plugin is used to export a PolicyPeriod by creating a GXModel of it.
 */
class DefaultPolicyPeriodQuoteClonePlugin implements PolicyPeriodQuoteClonePlugin
{
  override function shouldCloneQuote (period : PolicyPeriod): boolean {
    return false
  }

  override function cleanupAfterCloningPolicyPeriod(clonedPeriod: PolicyPeriod)  {
    var costFXRates = clonedPeriod.AllCosts*.PolicyFXRate.toSet().where( \ elt -> elt != null)

    if (costFXRates.HasElements) {
      costFXRates.each( \ fxRate -> {
        var clonedFXRate = PolicyFXRate.valueOf(clonedPeriod, fxRate)

        //replace all costs that point to a PolicyFXRate to a a new PolicyFXRate that
        //points to our cloned Policy Period
        clonedPeriod.AllCosts.where( \ cost -> cost.PolicyFXRate == fxRate).each( \ cost -> {
          cost.PolicyFXRate = clonedFXRate
        })
      })
    }
  }

  override function processClonedPolicyPeriod(clonedPeriod: PolicyPeriod) {
    //clonedPeriod.updateTemporaryCloneStatus(PolicyPeriodCloneStatus.TC_PURGEABLE)
  }

  override function addToPurgeClonedPeriodsQuery (query : Query) {
  }
}
