package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BAVehiclesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BAVehiclesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $baLine :  BusinessAutoLine, $showCheckbox :  boolean) : void {
    __widgetOf(this, pcf.BAVehiclesLV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit, $baLine, $showCheckbox})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $baLine :  BusinessAutoLine, $showCheckbox :  boolean) : void {
    __widgetOf(this, pcf.BAVehiclesLV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit, $baLine, $showCheckbox})
  }
  
  
}