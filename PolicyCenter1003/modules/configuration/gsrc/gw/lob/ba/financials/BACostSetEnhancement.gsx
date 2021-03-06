package gw.lob.ba.financials
uses java.util.Set
uses java.util.Map
uses java.util.Collections

enhancement BACostSetEnhancement<T extends BACost> : Set<T>
{
  /**
   * Partitions the cost set into an AutoMap of four groups:
   * 1. "StateCovPremium"   - lump-sump premiums for a state coverage
   * 2. "VehicleCovPremium" - premiums by vehicle; either the cost for a business vehicle coverage or a state coverage priced by vehicle
   * 3. "NonCovPremium"     - non-coverage premiums like minimum premiums, short-rate penalties, etc
   * 4. "StateTax"          - state taxes
   * The AutoMap returns an empty set of costs for any key that is not in the map.
   */
  reified function byHighLevelCostTypes() : Map<String, Set<T>>
  {
    var ret = this.partition( \ cost -> getHighLevelCostPartitionKey( cost ) ).mapValues( \ i -> i.toSet()  )
    return ret.toAutoMap( \ s -> Collections.emptySet<T>() )
  }
  
  private function getHighLevelCostPartitionKey( cost : T ) : String
  {
    var ratedOrder = cost.RatedOrder.Priority
    if ( ratedOrder <= (typekey.BARatedOrderType.TC_COVERAGEPREMIUM).Priority )
    {
      return cost.Vehicle == null ? "StateCovPremium" : "VehicleCovPremium"
    }
    else if ( ratedOrder < (typekey.BARatedOrderType.TC_STATETAX).Priority )
    {
      return "NonCovPremium"
    }
    return "StateTax"
  }
  
  /**
   * Returns an AutoMap of vehicle garage locations to their costs.  If the costs refer to different versions of
   * the same location, then the latest persisted one is used as the key.  Any costs that are not associated to
   * a vehicle garage location have a key value of null.  Lastly the AutoMap returns an empty set of costs for
   * any key that is not in the map.
   */
  reified function byFixedLocation() : Map<PolicyLocation, Set<T>>
  {
    var locModelByFixedId = this.map( \ cost -> cost.Vehicle.Location )
                               .partition( \ loc -> loc.FixedId )
                               .mapValues( \ locs -> locs.maxBy( \ loc -> loc.ID ) )
    var ret = this.partition( \ cost -> locModelByFixedId.get(cost.Vehicle.Location.FixedId ) )
    return ret.toAutoMap( \ l -> Collections.emptySet<T>() )
  }
  
  /**
   * Returns an AutoMap of vehicles to their costs.  If the costs refer to different versions of
   * the same vehicle, then the latest persisted one is used as the key.  Any costs that are not associated to
   * a vehicle have a key value of null.  Lastly the AutoMap returns an empty set of costs for
   * any key that is not in the map.
   */
  reified function byFixedVehicle() : Map<BusinessVehicle, Set<T>>
  {
    var vehModelByFixedId = this.map( \ cost -> cost.Vehicle )
                               .partition( \ v -> v.FixedId )
                               .mapValues( \ vs -> vs.maxBy( \ v -> v.ID ) )
    var ret =  this.partition( \ cost -> vehModelByFixedId.get(cost.Vehicle.FixedId ) )
    return ret.toAutoMap( \ v -> Collections.emptySet<T>() )
  }
  
}
