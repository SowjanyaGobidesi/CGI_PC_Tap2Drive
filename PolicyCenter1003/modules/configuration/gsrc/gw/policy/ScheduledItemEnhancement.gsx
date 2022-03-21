package gw.policy

uses gw.api.domain.covterm.CovTerm
uses gw.api.productmodel.CovTermPattern

enhancement ScheduledItemEnhancement : ScheduledItem {
  /**
   * Returns the CovTerm for the given CovTermPattern on this ScheduledItem. Returns null if the Coverage or
   * CovTerm does not exist on this ScheduledItem.
   */
  function getCovTerm(covTermPattern : CovTermPattern) : CovTerm {
    return this.getClause(covTermPattern.ClausePattern)?.getCovTerm(covTermPattern)
  }
}
