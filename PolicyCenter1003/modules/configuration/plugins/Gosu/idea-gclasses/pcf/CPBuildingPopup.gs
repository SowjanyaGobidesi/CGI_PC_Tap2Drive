package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CPBuildingPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPBuildingPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (cpLine :  CommercialPropertyLine, cpBuilding :  CPBuilding, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPBuildingPopup, {cpLine, cpBuilding, openForEdit, jobWizardHelper}, 0)
  }
  
  static function createDestination (cpLine :  CommercialPropertyLine, cpLocation :  CPLocation, building :  Building, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPBuildingPopup, {cpLine, cpLocation, building, openForEdit, jobWizardHelper}, 2)
  }
  
  static function createDestination (cpLine :  CommercialPropertyLine, cpLocation :  CPLocation, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPBuildingPopup, {cpLine, cpLocation, openForEdit, jobWizardHelper}, 1)
  }
  
  static function push (cpLine :  CommercialPropertyLine, cpBuilding :  CPBuilding, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPBuildingPopup, {cpLine, cpBuilding, openForEdit, jobWizardHelper}, 0).push()
  }
  
  static function push (cpLine :  CommercialPropertyLine, cpLocation :  CPLocation, building :  Building, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPBuildingPopup, {cpLine, cpLocation, building, openForEdit, jobWizardHelper}, 2).push()
  }
  
  static function push (cpLine :  CommercialPropertyLine, cpLocation :  CPLocation, openForEdit :  boolean, jobWizardHelper :  gw.api.web.job.JobWizardHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPBuildingPopup, {cpLine, cpLocation, openForEdit, jobWizardHelper}, 1).push()
  }
  
  
}