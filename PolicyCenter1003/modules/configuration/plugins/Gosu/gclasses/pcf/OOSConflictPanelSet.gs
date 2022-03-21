package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/OOSConflictPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OOSConflictPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $rootNodeWrapper :  gw.api.tree.RowTreeRootNodeWrapper, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.OOSConflictPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $rootNodeWrapper, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $rootNodeWrapper :  gw.api.tree.RowTreeRootNodeWrapper, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.OOSConflictPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $rootNodeWrapper, $jobWizardHelper})
  }
  
  
}