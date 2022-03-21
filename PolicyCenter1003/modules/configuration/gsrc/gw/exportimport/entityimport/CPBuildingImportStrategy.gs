package gw.exportimport.entityimport
uses gw.api.locale.DisplayKey
uses java.lang.IllegalArgumentException
uses gw.api.extension.ExtensionInterfaces

@Export
class CPBuildingImportStrategy implements EntityImportStrategy<CPBuilding, CPLocation> {

  override function deleteEntity(building : CPBuilding) {
    building.CPLocation.removeFromLineSpecificBuildings(building)
  }

  override function createEntity(period : PolicyPeriod, parentEntity : CPLocation) : CPBuilding {
    if (parentEntity == null) {
      throw new IllegalArgumentException(DisplayKey.get("Import.Validation.Errors.NoParentEntity", CPLocation, CPBuilding))
    }
    var building = ExtensionInterfaces.IPolicyLocationExtensions.newBuilding(parentEntity.Location)
    var cpBuilding = new CPBuilding(period)
    cpBuilding.Building = building
    parentEntity.addToBuildings(cpBuilding)
    return cpBuilding
  }

  override property get AllowCreate() : boolean {
    return true
  }

  override property get AllowDelete() : boolean {
    return true
  }

}
