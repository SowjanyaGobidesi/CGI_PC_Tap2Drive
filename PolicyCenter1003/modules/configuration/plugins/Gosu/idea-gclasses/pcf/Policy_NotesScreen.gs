package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/Policy_NotesScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Policy_NotesScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $activity :  Activity) : void {
    __widgetOf(this, pcf.Policy_NotesScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $activity})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $activity :  Activity) : void {
    __widgetOf(this, pcf.Policy_NotesScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $activity})
  }
  
  
}