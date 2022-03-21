package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/MVRIncidentLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MVRIncidentLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($driverMVRArr :  gw.api.motorvehiclerecord.IMVRData[]) : void {
    __widgetOf(this, pcf.MVRIncidentLV, SECTION_WIDGET_CLASS).setVariables(false, {$driverMVRArr})
  }
  
  function refreshVariables ($driverMVRArr :  gw.api.motorvehiclerecord.IMVRData[]) : void {
    __widgetOf(this, pcf.MVRIncidentLV, SECTION_WIDGET_CLASS).setVariables(true, {$driverMVRArr})
  }
  
  
}