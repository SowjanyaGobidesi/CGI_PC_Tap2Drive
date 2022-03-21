package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/cancellation/CancellationWizardInfoBar.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CancellationWizardInfoBar extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($cancellation :  Cancellation, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CancellationWizardInfoBar, SECTION_WIDGET_CLASS).setVariables(false, {$cancellation, $policyPeriod})
  }
  
  function refreshVariables ($cancellation :  Cancellation, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CancellationWizardInfoBar, SECTION_WIDGET_CLASS).setVariables(true, {$cancellation, $policyPeriod})
  }
  
  
}