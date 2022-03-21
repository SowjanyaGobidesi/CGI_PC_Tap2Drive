package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/NewDocumentFromTemplateScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewDocumentFromTemplateScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($DocumentCreationInfo :  gw.document.DocumentCreationInfo, $account :  Account, $policyPeriod :  PolicyPeriod, $job :  Job, $activity :  Activity) : void {
    __widgetOf(this, pcf.NewDocumentFromTemplateScreen, SECTION_WIDGET_CLASS).setVariables(false, {$DocumentCreationInfo, $account, $policyPeriod, $job, $activity})
  }
  
  function refreshVariables ($DocumentCreationInfo :  gw.document.DocumentCreationInfo, $account :  Account, $policyPeriod :  PolicyPeriod, $job :  Job, $activity :  Activity) : void {
    __widgetOf(this, pcf.NewDocumentFromTemplateScreen, SECTION_WIDGET_CLASS).setVariables(true, {$DocumentCreationInfo, $account, $policyPeriod, $job, $activity})
  }
  
  
}