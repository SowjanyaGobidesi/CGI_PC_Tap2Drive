package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/QuoteTypeToolbarButtonSet.Quote.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class QuoteTypeToolbarButtonSet_Quote extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.QuoteTypeToolbarButtonSet_Quote, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.QuoteTypeToolbarButtonSet_Quote, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $jobWizardHelper})
  }
  
  
}