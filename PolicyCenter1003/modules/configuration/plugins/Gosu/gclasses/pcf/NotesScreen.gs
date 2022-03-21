package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/NotesScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NotesScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $policyPeriod :  PolicyPeriod, $viewOnly :  boolean, $activity :  Activity) : void {
    __widgetOf(this, pcf.NotesScreen, SECTION_WIDGET_CLASS).setVariables(false, {$account, $policyPeriod, $viewOnly, $activity})
  }
  
  function refreshVariables ($account :  Account, $policyPeriod :  PolicyPeriod, $viewOnly :  boolean, $activity :  Activity) : void {
    __widgetOf(this, pcf.NotesScreen, SECTION_WIDGET_CLASS).setVariables(true, {$account, $policyPeriod, $viewOnly, $activity})
  }
  
  
}