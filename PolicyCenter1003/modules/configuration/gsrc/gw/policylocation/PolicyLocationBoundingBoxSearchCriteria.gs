package gw.policylocation

uses gw.api.database.DBFunction
uses gw.api.locale.DisplayKey
uses gw.api.database.Query
uses java.math.BigDecimal
uses gw.api.database.Relop
uses java.util.ArrayList
uses java.lang.IllegalArgumentException
uses gw.api.database.IQueryBeanResult
uses java.lang.Math

uses gw.api.policy.period.PolicyPeriodQueryFilters
uses gw.search.EntitySearchCriteria
uses gw.api.database.spatial.SpatialPolygon
uses gw.api.database.spatial.SpatialPoint
uses java.util.Date

@Export
class PolicyLocationBoundingBoxSearchCriteria extends EntitySearchCriteria<PolicyLocation> {

  var _topLeftLat : BigDecimal as TopLeftLatitude
  var _topLeftLong : BigDecimal as TopLeftLongtitude
  var _bottomRightLat : BigDecimal as BottomRightLatitude
  var _bottomRightLong : BigDecimal as BottomRightLongtitude
  var _effDate : Date as EffectiveDate
  var _productCodes : ArrayList as ProductCodes
  
  construct() {
    TopLeftLatitude = 0
    TopLeftLongtitude = 0
    BottomRightLatitude = 0
    BottomRightLongtitude = 0
    EffectiveDate = Date.CurrentDate
    ProductCodes = {"BusinessOwners", "PersonalAuto"}
  }

  function prepareQuery() : Query<PolicyLocation> {
    var query = Query.make(PolicyLocation)
    
    // Filter by effective date, array of product codes and bounded policies
    addPolicyAndPolicyPeriodRestrictions(query, this.EffectiveDate, this.ProductCodes)
    
    if (!checkLatLongPairIsValid(TopLeftLatitude, TopLeftLongtitude) 
            || !checkLatLongPairIsValid(BottomRightLatitude, BottomRightLongtitude)){
        throw new IllegalArgumentException(DisplayKey.get("Java.ProximitySearch.Error.IncorrectLatLongValue"))
    }

    if (!checkBoundingBoxValid(TopLeftLatitude, TopLeftLongtitude, BottomRightLatitude, BottomRightLongtitude)) {
      throw new IllegalArgumentException(DisplayKey.get("Java.ProximitySearch.Error.IncorrectBoundingBox"))
    }
    
    return query
  }
  

  override protected function doSearch() : IQueryBeanResult<PolicyLocation>  {
    // resolved conflict: next 2 lines are from the app team
    print("bounding box: ${TopLeftLatitude}, ${TopLeftLongtitude}, ${BottomRightLatitude}, ${BottomRightLongtitude}")
    var rectangle = SpatialPolygon.createRectangle(new SpatialPoint(TopLeftLongtitude, TopLeftLatitude), new SpatialPoint(BottomRightLongtitude, BottomRightLatitude))
    var q = prepareQuery()
    var accountLocation = q.join("AccountLocation")
    q.withinPolygon(accountLocation.getColumnRef("SpatialPoint"), "PolicyLocation.AccountLocation.SpatialPoint", true, rectangle)
    return q.select()
  }


  //
  // PRIVATE SUPPORT FUNCTIONS
  //
  
  private function addPolicyAndPolicyPeriodRestrictions(query : Query<PolicyLocation>, effDate : Date, prodCodes : ArrayList) {
      var periodTable = query.join("BranchValue")
      periodTable.and(\ andRes -> {
        andRes.compare(DBFunction.DateFromTimestamp(periodTable.getColumnRef("PeriodStart")),
            Relop.LessThanOrEquals, effDate.trimToMidnight()) // Must be effective
        andRes.compare(DBFunction.DateFromTimestamp(periodTable.getColumnRef("PeriodEnd")),
            Relop.GreaterThan, effDate.trimToMidnight())

        PolicyPeriodQueryFilters.boundInForce(andRes)
        andRes.or(\ orRes -> {
          orRes.compare("CancellationDate", Relop.Equals, null)
          orRes.compare(DBFunction.DateFromTimestamp(periodTable.getColumnRef("CancellationDate")),
              Relop.GreaterThan, effDate.trimToMidnight())
        })
      })
    
      var policyTable = periodTable.join("Policy")
      policyTable.compareIn("ProductCode", prodCodes?.toTypedArray())

  }
 
  private function checkLatLongPairIsValid(lat : BigDecimal, long_ : BigDecimal) : boolean {
    if (lat < -90 || lat > 90 || long_ < -180 || long_ > 180){
      return false
    }
    
    return true
  }

  /**
   * Check to insure that the north latitude is greater than the south latitude.
   * Check that the size of the box is a reasonable size
   */
  private function checkBoundingBoxValid (lat1 : BigDecimal, long1 : BigDecimal,
                      lat2 : BigDecimal, long2 : BigDecimal) : boolean {
                        
    var result = true
    var earthRadius = 3958.75
    var quarterEarth = (earthRadius * 2 * Math.PI ) / 4   
    
    var sizeOfBox = distFrom(lat1, long1, lat2, long2)
    
    if (sizeOfBox > quarterEarth ) {
      result = false
    }
    
    if (lat1 < lat2) {
      result = false
    }
    
    return result
  }

  public function  distFrom( lat1 : BigDecimal,  lng1 : BigDecimal,  lat2 : BigDecimal,  lng2 : BigDecimal) : BigDecimal {

    var earthRadius = 3958.75;
    
    var dLat = Math.toRadians((lat2-lat1) as double);
    var dLng = Math.toRadians((lng2-lng1) as double);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
               Math.cos(Math.toRadians(lat1 as double)) * Math.cos(Math.toRadians(lat2 as double)) *
               Math.sin(dLng/2) * Math.sin(dLng/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var dist = earthRadius * c;

    return dist;
  }


  override protected property get InvalidSearchCriteriaMessage() : String {
    return null
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    return null
  }

}
