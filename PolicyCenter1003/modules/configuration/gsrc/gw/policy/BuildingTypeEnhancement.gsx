package gw.policy

/**
 * Defines a read-only property for each {@link BuildingImprType} and a read-only property for each
 * {@link BuildingSideType}.
 */
enhancement BuildingTypeEnhancement : entity.Building {

  property get Heating(): BuildingImprovement {
    return this.getBuildingImprovement(TC_HEATING)
  }

  property get Plumbing(): BuildingImprovement {
    return this.getBuildingImprovement(TC_PLUMBING)
  }

  property get Roofing(): BuildingImprovement {
    return this.getBuildingImprovement(TC_ROOFING)
  }

  property get Wiring(): BuildingImprovement {
    return this.getBuildingImprovement(TC_WIRING)
  }

  property get Other(): BuildingImprovement {
    return this.getBuildingImprovement(TC_OTHER)
  }
  
  property get FrontSide(): BuildingSide {
    return this.getBuildingSide(TC_FRONT)
  }

  property get RearSide(): BuildingSide {
    return this.getBuildingSide(TC_REAR)
  }

  property get LeftSide(): BuildingSide {
    return this.getBuildingSide(TC_LEFT)
  }

  property get RightSide(): BuildingSide {
    return this.getBuildingSide(TC_RIGHT)
  }

}
