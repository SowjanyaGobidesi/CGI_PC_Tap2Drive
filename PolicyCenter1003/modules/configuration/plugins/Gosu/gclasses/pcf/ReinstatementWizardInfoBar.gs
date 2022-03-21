package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/reinstatement/ReinstatementWizardInfoBar.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReinstatementWizardInfoBar extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.ReinstatementWizardInfoBar, SECTION_WIDGET_CLASS).setVariables(false, {$reinstatement, $policyPeriod})
  }
  
  function refreshVariables ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.ReinstatementWizardInfoBar, SECTION_WIDGET_CLASS).setVariables(true, {$reinstatement, $policyPeriod})
  }
  
  
}