package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/coverage/SideBySideCovTermInputSet.bit.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SideBySideCovTermInputSet_bit extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($covTermInfo :  gw.job.sxs.SideBySideCovTermInfo, $colWidth :  int, $selectable :  boolean) : void {
    __widgetOf(this, pcf.SideBySideCovTermInputSet_bit, SECTION_WIDGET_CLASS).setVariables(false, {$covTermInfo, $colWidth, $selectable})
  }
  
  function refreshVariables ($covTermInfo :  gw.job.sxs.SideBySideCovTermInfo, $colWidth :  int, $selectable :  boolean) : void {
    __widgetOf(this, pcf.SideBySideCovTermInputSet_bit, SECTION_WIDGET_CLASS).setVariables(true, {$covTermInfo, $colWidth, $selectable})
  }
  
  
}