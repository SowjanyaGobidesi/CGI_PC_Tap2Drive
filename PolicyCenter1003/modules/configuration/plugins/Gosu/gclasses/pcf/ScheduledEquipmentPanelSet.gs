package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/contractorsequip/ScheduledEquipmentPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ScheduledEquipmentPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contractorsEquipmentPart :  ContractorsEquipPart, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ScheduledEquipmentPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$contractorsEquipmentPart, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($contractorsEquipmentPart :  ContractorsEquipPart, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ScheduledEquipmentPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$contractorsEquipmentPart, $openForEdit, $jobWizardHelper})
  }
  
  
}