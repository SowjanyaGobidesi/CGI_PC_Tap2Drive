package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCModifiersInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCModifiersInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($modifiers :  List<Modifier>, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.WCModifiersInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$modifiers, $policyPeriod})
  }
  
  function refreshVariables ($modifiers :  List<Modifier>, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.WCModifiersInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$modifiers, $policyPeriod})
  }
  
  
}