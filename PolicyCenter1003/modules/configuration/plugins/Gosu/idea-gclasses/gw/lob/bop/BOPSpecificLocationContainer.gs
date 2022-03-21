package gw.lob.bop

uses gw.api.locale.DisplayKey
uses gw.api.domain.LineSpecificLocation
uses gw.lob.common.LineSpecificLocationContainerBase

@Export
class BOPSpecificLocationContainer extends LineSpecificLocationContainerBase<BOPLocation> {
  var _bopLine : BusinessOwnersLine
  
  construct(bopLine : BusinessOwnersLine) {
    super(bopLine)
    _bopLine = bopLine
  }

  override property get LineSpecificLocations() : LineSpecificLocation[] {
    return _bopLine.BOPLocations
  }

  override function addToLineSpecificLocations(location : LineSpecificLocation ) {
    var bopLocation = location as BOPLocation
    _bopLine.addToBOPLocations(bopLocation)
    // if isNew true, we made a brand new BOPLocation -
    // otherwise, we cloned a matching one from another slice and don't need to create Conditions and Exclusions
    if (bopLocation.New) {
      bopLocation.createCoveragesConditionsAndExclusions()
    }
  }

  override function removeFromLineSpecificLocations(bopLocation : LineSpecificLocation ) {
    if ((bopLocation as BOPLocation).Buildings.Count > 0) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("BusinessOwners.Location.CannotDelete.HasBuilding", bopLocation))
    }
    _bopLine.removeFromBOPLocations(bopLocation as BOPLocation)
  }

  override property get Period() : PolicyPeriod {
    return _bopLine.Branch
  }
 
}
