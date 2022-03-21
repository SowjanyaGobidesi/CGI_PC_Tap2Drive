package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/LineLocationDetailInputSet.WorkersComp.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LineLocationDetailInputSet_WorkersComp extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($polLocation :  PolicyLocation, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LineLocationDetailInputSet_WorkersComp, SECTION_WIDGET_CLASS).setVariables(false, {$polLocation, $openForEdit})
  }
  
  function refreshVariables ($polLocation :  PolicyLocation, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LineLocationDetailInputSet_WorkersComp, SECTION_WIDGET_CLASS).setVariables(true, {$polLocation, $openForEdit})
  }
  
  
}