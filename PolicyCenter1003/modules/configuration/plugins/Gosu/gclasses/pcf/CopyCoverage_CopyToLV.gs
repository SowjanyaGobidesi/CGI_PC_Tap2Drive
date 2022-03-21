package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/CopyCoverage_CopyToLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyCoverage_CopyToLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($copyToVehicles :  PersonalVehicle[]) : void {
    __widgetOf(this, pcf.CopyCoverage_CopyToLV, SECTION_WIDGET_CLASS).setVariables(false, {$copyToVehicles})
  }
  
  function refreshVariables ($copyToVehicles :  PersonalVehicle[]) : void {
    __widgetOf(this, pcf.CopyCoverage_CopyToLV, SECTION_WIDGET_CLASS).setVariables(true, {$copyToVehicles})
  }
  
  
}