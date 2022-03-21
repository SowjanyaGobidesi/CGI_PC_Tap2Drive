package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PAVehicleAdditionalCoveragesDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PAVehicleAdditionalCoveragesDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($paLine :  PersonalAutoLine, $includedCoverageCategories :  String[], $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PAVehicleAdditionalCoveragesDV, SECTION_WIDGET_CLASS).setVariables(false, {$paLine, $includedCoverageCategories, $openForEdit})
  }
  
  function refreshVariables ($paLine :  PersonalAutoLine, $includedCoverageCategories :  String[], $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PAVehicleAdditionalCoveragesDV, SECTION_WIDGET_CLASS).setVariables(true, {$paLine, $includedCoverageCategories, $openForEdit})
  }
  
  
}