package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/LineLocationDetailInputSet.BusinessOwners.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LineLocationDetailInputSet_BusinessOwners extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($polLocation :  PolicyLocation, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LineLocationDetailInputSet_BusinessOwners, SECTION_WIDGET_CLASS).setVariables(false, {$polLocation, $openForEdit})
  }
  
  function refreshVariables ($polLocation :  PolicyLocation, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LineLocationDetailInputSet_BusinessOwners, SECTION_WIDGET_CLASS).setVariables(true, {$polLocation, $openForEdit})
  }
  
  
}