package gw.web.line.ba.policy

uses gw.api.locale.DisplayKey

@Export
class BAVehiclesUIHelper {

  /*
   * This method makes a copy of each of the vehicles selected when the
   * "Clone Selected" button is clicked during commercial auto submission.
   */

  public static function cloneVehicles(selectedVehicles : BusinessVehicle[], currentLocation : pcf.api.Wizard) {
    if(selectedVehicles == null || selectedVehicles?.IsEmpty) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("BusinessAuto.Vehicle.CloneVehicles.Error.NoVehiclesAreSelected"))
    }
    if(currentLocation == null) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("BusinessAuto.Vehicle.CloneVehicles.Error.NoWizardLocationIsFound"))
    }
    selectedVehicles.each(\vehicle -> vehicle.cloneVehicleAndCoveragesAndModifiers())
    currentLocation.saveDraft()
  }
}