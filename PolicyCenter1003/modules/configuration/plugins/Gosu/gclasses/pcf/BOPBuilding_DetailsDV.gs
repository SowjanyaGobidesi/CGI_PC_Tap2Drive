package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPBuilding_DetailsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPBuilding_DetailsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($building :  BOPBuilding, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.BOPBuilding_DetailsDV, SECTION_WIDGET_CLASS).setVariables(false, {$building, $openForEdit})
  }
  
  function refreshVariables ($building :  BOPBuilding, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.BOPBuilding_DetailsDV, SECTION_WIDGET_CLASS).setVariables(true, {$building, $openForEdit})
  }
  
  
}