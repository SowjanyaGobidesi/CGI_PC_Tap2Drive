package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/SecondaryNamedInsuredInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SecondaryNamedInsuredInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod) : void {
    __widgetOf(this, pcf.SecondaryNamedInsuredInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$period})
  }
  
  function refreshVariables ($period :  PolicyPeriod) : void {
    __widgetOf(this, pcf.SecondaryNamedInsuredInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$period})
  }
  
  
}