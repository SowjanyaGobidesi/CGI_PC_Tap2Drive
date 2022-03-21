package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/MVRDriverDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MVRDriverDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($mvrDriver :  gw.api.motorvehiclerecord.IMVRData) : void {
    __widgetOf(this, pcf.MVRDriverDV, SECTION_WIDGET_CLASS).setVariables(false, {$mvrDriver})
  }
  
  function refreshVariables ($mvrDriver :  gw.api.motorvehiclerecord.IMVRData) : void {
    __widgetOf(this, pcf.MVRDriverDV, SECTION_WIDGET_CLASS).setVariables(true, {$mvrDriver})
  }
  
  
}