package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPDwellingConstructionDetailsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPDwellingConstructionDetailsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  entity.PolicyPeriod, $openForEdit :  java.lang.Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.HOPDwellingConstructionDetailsDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  entity.PolicyPeriod, $openForEdit :  java.lang.Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.HOPDwellingConstructionDetailsDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}