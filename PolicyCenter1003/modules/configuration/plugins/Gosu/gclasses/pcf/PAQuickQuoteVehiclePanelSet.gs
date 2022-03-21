package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PAQuickQuoteVehiclePanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PAQuickQuoteVehiclePanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($paLine :  entity.PersonalAutoLine, $vehicle :  PersonalVehicle, $vehicleNum :  int, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PAQuickQuoteVehiclePanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$paLine, $vehicle, $vehicleNum, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($paLine :  entity.PersonalAutoLine, $vehicle :  PersonalVehicle, $vehicleNum :  int, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PAQuickQuoteVehiclePanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$paLine, $vehicle, $vehicleNum, $openForEdit, $jobWizardHelper})
  }
  
  
}