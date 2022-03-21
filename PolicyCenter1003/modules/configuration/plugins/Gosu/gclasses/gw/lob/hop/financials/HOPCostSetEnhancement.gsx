package gw.lob.hop.financials

enhancement HOPCostSetEnhancement<T extends HOPCost> : Set<T>  {

  /**
   * Returns a Map of coverages to their costs.  If the costs refer to different versions of
   * the same coverage, then the latest persisted one is used as the key.  Any costs that are not associated to
   * a coverage have a key value of null.  Lastly the AutoMap returns an empty set of costs for
   * any key that is not in the map.
   */
  reified function byFixedCoverage() : Map<Coverage, Set<T>> {
    var covModelByFixedId = this.map(\cost -> cost.Coverage)
        .partition(\cov -> cov.FixedId)
        .mapValues(\covs -> covs.maxBy(\cov -> cov.ID))
    var ret = this.partition(\cost -> covModelByFixedId.get(cost.Coverage.FixedId)).mapValues(\v -> v.toSet())
    return ret.toAutoMap(\l -> Collections.emptySet<T>())
  }

  /**
   * Returns a Map of Coverables to their costs.  If the costs refer to different versions of
   * the same coverable, then the latest persisted one is used as the key.  Any costs that are not associated to
   * a coverable have a key value of null.  Lastly the AutoMap returns an empty set of costs for
   * any key that is not in the map.
   */
  reified function byFixedCoverable() : Map<Coverable, Set<T>> {
    var cblModelByFixedId = this.map(\cost -> cost.Coverable)
        .partition(\cbl -> cbl.FixedId)
        .mapValues(\cbls -> cbls.maxBy(\cbl -> cbl.ID))
    var ret = this.partition(\cost -> cblModelByFixedId.get(cost.Coverable.FixedId)).mapValues(\v -> v.toSet())
    return ret.toAutoMap(\l -> Collections.emptySet<T>())
  }

}
