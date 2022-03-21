package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/LocationsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LocationsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $supportsNonSpecificLocation :  boolean) : void {
    __widgetOf(this, pcf.LocationsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit, $jobWizardHelper, $supportsNonSpecificLocation})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $supportsNonSpecificLocation :  boolean) : void {
    __widgetOf(this, pcf.LocationsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit, $jobWizardHelper, $supportsNonSpecificLocation})
  }
  
  
}