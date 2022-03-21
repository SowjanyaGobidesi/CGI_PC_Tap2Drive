package gw.lob.im
uses gw.lob.common.LineSpecificLocationContainerBase
uses gw.api.domain.LineSpecificLocation

@Export
class IMSpecificLocationContainer extends LineSpecificLocationContainerBase<IMLocation> {
  var _imLine : InlandMarineLine
  
  construct(imLine : InlandMarineLine) {
    super(imLine)
    _imLine = imLine
  }

  override property get LineSpecificLocations() : LineSpecificLocation[] {
    return _imLine.IMLocations
  }

  override function addToLineSpecificLocations(imLocation : LineSpecificLocation ) {
    _imLine.addToIMLocations(imLocation as IMLocation)
  }

  override function removeFromLineSpecificLocations(imLocation : LineSpecificLocation ) {
    var imSingPart = _imLine.IMSignPart
    if (imSingPart.IMSigns != null) {
      var imsigns = imSingPart.IMSigns.where(\ i -> i.IMLocation.PublicID == (imLocation as IMLocation).PublicID)
      for (var imsign in imsigns) {
        imSingPart.removeFromIMSigns(imsign)
      }
    }
    (imLocation as IMLocation).Buildings.each( \b ->imLocation.removeFromLineSpecificBuildings(b))
    _imLine.removeFromIMLocations(imLocation as IMLocation)
  }

  override property get Period() : PolicyPeriod {
    return _imLine.Branch
  }

}
