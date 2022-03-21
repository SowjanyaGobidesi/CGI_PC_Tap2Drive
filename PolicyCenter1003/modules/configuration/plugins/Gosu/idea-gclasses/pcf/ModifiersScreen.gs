package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/ModifiersScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ModifiersScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $modifiers :  Modifier[]) : void {
    __widgetOf(this, pcf.ModifiersScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit, $jobWizardHelper, $modifiers})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $modifiers :  Modifier[]) : void {
    __widgetOf(this, pcf.ModifiersScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit, $jobWizardHelper, $modifiers})
  }
  
  
}