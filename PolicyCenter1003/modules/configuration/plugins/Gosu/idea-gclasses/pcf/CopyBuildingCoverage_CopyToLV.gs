package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CopyBuildingCoverage_CopyToLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyBuildingCoverage_CopyToLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($locations :  CPLocation[], $copyToBuildings :  CPBuilding[]) : void {
    __widgetOf(this, pcf.CopyBuildingCoverage_CopyToLV, SECTION_WIDGET_CLASS).setVariables(false, {$locations, $copyToBuildings})
  }
  
  function refreshVariables ($locations :  CPLocation[], $copyToBuildings :  CPBuilding[]) : void {
    __widgetOf(this, pcf.CopyBuildingCoverage_CopyToLV, SECTION_WIDGET_CLASS).setVariables(true, {$locations, $copyToBuildings})
  }
  
  
}