package gw.exportimport.entityimport
uses java.lang.UnsupportedOperationException
uses gw.api.extension.ExtensionInterfaces

@Export
class CPLocationImportStrategy implements EntityImportStrategy<CPLocation, KeyableBean> {

  override function deleteEntity(location : CPLocation) {
    throw new UnsupportedOperationException("Delete not supported for CPLocation.")
  }

  override function createEntity(period : PolicyPeriod, parentEntity : KeyableBean) : CPLocation {
     return ExtensionInterfaces.IPolicyPeriodExtensions.getCPLine(period).addNewLineSpecificLocation() as CPLocation
  }

  override property get AllowCreate() : boolean {
    return true
  }

  override property get AllowDelete() : boolean {
    return false
  }

}
