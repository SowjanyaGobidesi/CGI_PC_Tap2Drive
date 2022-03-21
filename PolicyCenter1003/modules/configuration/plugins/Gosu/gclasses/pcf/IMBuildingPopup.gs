package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policy/IMBuildingPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMBuildingPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (imLine :  InlandMarineLine, imBuilding :  IMBuilding, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IMBuildingPopup, {imLine, imBuilding, openForEdit, jobWizardHelper}, 0)
  }
  
  static function createDestination (imLine :  InlandMarineLine, imLocation :  IMLocation, building :  Building, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IMBuildingPopup, {imLine, imLocation, building, openForEdit, jobWizardHelper}, 2)
  }
  
  static function createDestination (imLine :  InlandMarineLine, imLocation :  IMLocation, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IMBuildingPopup, {imLine, imLocation, openForEdit, jobWizardHelper}, 1)
  }
  
  static function push (imLine :  InlandMarineLine, imBuilding :  IMBuilding, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IMBuildingPopup, {imLine, imBuilding, openForEdit, jobWizardHelper}, 0).push()
  }
  
  static function push (imLine :  InlandMarineLine, imLocation :  IMLocation, building :  Building, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IMBuildingPopup, {imLine, imLocation, building, openForEdit, jobWizardHelper}, 2).push()
  }
  
  static function push (imLine :  InlandMarineLine, imLocation :  IMLocation, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IMBuildingPopup, {imLine, imLocation, openForEdit, jobWizardHelper}, 1).push()
  }
  
  
}