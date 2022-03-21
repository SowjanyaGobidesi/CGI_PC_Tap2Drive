package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/cancellation/CancellationWizard_MultiLine_QuoteScreen.CommercialPackage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CancellationWizard_MultiLine_QuoteScreen_CommercialPackage extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($cancellation :  Cancellation, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CancellationWizard_MultiLine_QuoteScreen_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(false, {$cancellation, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($cancellation :  Cancellation, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CancellationWizard_MultiLine_QuoteScreen_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(true, {$cancellation, $isEditable, $jobWizardHelper})
  }
  
  
}