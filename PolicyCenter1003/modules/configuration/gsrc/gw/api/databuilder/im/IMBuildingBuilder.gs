package gw.api.databuilder.im
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses gw.api.databuilder.populator.BeanPopulator
uses java.lang.Integer
uses gw.api.builder.BuildingBuilder

@Export
class IMBuildingBuilder extends DataBuilder<IMBuilding, IMBuildingBuilder> {

  construct() {
    super(IMBuilding)
    addPopulator(Integer.MAX_VALUE, new BeanPopulator<IMBuilding>() {
      override function execute(building : IMBuilding) {
        if (building.Building == null) {
          if (building.IMLocation.Location == null) {  // same behavior in the IMLocationBuilder
            building.IMLocation.Location = building.IMLocation.IMLine.Branch.PrimaryLocation
          }
          building.Building = building.IMLocation.Location.newBuilding()
        }
      }
    })
  }

  protected override function createBean(context : BuilderContext) : IMBuilding {
    var location = context.ParentBean as IMLocation
    var building = new IMBuilding(location.IMLine.Branch)
    location.addToBuildings(building)
    return building
  }

  function withBuilding(building : BuildingBuilder) : IMBuildingBuilder {
    set(IMBuilding.Type.TypeInfo.getProperty("Building"), building)
    return this
  }
  
  function withIMLocation(building : IMLocationBuilder) : IMBuildingBuilder {
    set(IMBuilding.Type.TypeInfo.getProperty("IMLocation"), building)
    return this
  }
}
