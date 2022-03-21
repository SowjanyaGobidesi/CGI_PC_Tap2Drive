package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/coverage/SideBySideCovTermInputSet.datetime_notarget.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SideBySideCovTermInputSet_datetime_notarget extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($covTermInfo :  gw.job.sxs.SideBySideCovTermInfo, $colWidth :  int, $selectable :  boolean) : void {
    __widgetOf(this, pcf.SideBySideCovTermInputSet_datetime_notarget, SECTION_WIDGET_CLASS).setVariables(false, {$covTermInfo, $colWidth, $selectable})
  }
  
  function refreshVariables ($covTermInfo :  gw.job.sxs.SideBySideCovTermInfo, $colWidth :  int, $selectable :  boolean) : void {
    __widgetOf(this, pcf.SideBySideCovTermInputSet_datetime_notarget, SECTION_WIDGET_CLASS).setVariables(true, {$covTermInfo, $colWidth, $selectable})
  }
  
  
}