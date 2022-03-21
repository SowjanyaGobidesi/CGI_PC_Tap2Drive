package gw.api.databuilder.im

uses gw.api.databuilder.DataBuilder
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.databuilder.populator.BeanPopulator
uses java.lang.Integer
uses gw.entity.IEntityPropertyInfo
uses gw.api.builder.BuilderPropertyPopulator
uses gw.api.databuilder.BuilderContext

@Export
class IMLocationBuilder extends DataBuilder<IMLocation, IMLocationBuilder>{
  construct() {
    super(IMLocation)
     addPopulator(Integer.MAX_VALUE, new BeanPopulator<IMLocation>() {
      override function execute(loc : IMLocation) {
        var period = loc.IMLine.Branch
        if (loc.Location == null) {  // this is duplicated in the IMBuildingBuilder
          loc.Location = period.PrimaryLocation          
        }
      }
    })
  }

  protected override function createBean(context : BuilderContext) : IMLocation {
    var line = context.ParentBean as InlandMarineLine
    var imLocation = new IMLocation(line.Branch)
    line.addToIMLocations(imLocation)
    return imLocation
  }
  
   function withLocation(policyLocationBuilder : PolicyLocationBuilder) : IMLocationBuilder {
    addPopulator(new BuilderPropertyPopulator<IMLocation>(IMLocation.Type.TypeInfo.getProperty("Location") as IEntityPropertyInfo, policyLocationBuilder))
    return this
  }

  function withExistingLocation(policyLocation : PolicyLocation) : IMLocationBuilder {
    set(IMLocation.Type.TypeInfo.getProperty("Location"), policyLocation)
    return this
  }

  function withBuilding(imBuildingBuilder : IMBuildingBuilder) : IMLocationBuilder {
    addArrayElement(IMLocation.Type.TypeInfo.getProperty("Buildings"), imBuildingBuilder)
    return this
  }
}
