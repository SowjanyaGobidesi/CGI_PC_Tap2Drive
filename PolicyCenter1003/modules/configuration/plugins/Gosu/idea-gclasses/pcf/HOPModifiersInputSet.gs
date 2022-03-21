package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPModifiersInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPModifiersInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($modifiers :  Modifier[], $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.HOPModifiersInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$modifiers, $policyPeriod})
  }
  
  function refreshVariables ($modifiers :  Modifier[], $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.HOPModifiersInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$modifiers, $policyPeriod})
  }
  
  
}