package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/Common_MultiLine_QuoteScreenPanelSet.CommercialPackage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Common_MultiLine_QuoteScreenPanelSet_CommercialPackage extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $showTransactionCard :  boolean) : void {
    __widgetOf(this, pcf.Common_MultiLine_QuoteScreenPanelSet_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $isEditable, $jobWizardHelper, $showTransactionCard})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $showTransactionCard :  boolean) : void {
    __widgetOf(this, pcf.Common_MultiLine_QuoteScreenPanelSet_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $isEditable, $jobWizardHelper, $showTransactionCard})
  }
  
  
}