package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WorkersCompClassesInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkersCompClassesInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($jurisdiction :  WCJurisdiction, $wcLine :  WorkersCompLine) : void {
    __widgetOf(this, pcf.WorkersCompClassesInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$jurisdiction, $wcLine})
  }
  
  function refreshVariables ($jurisdiction :  WCJurisdiction, $wcLine :  WorkersCompLine) : void {
    __widgetOf(this, pcf.WorkersCompClassesInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$jurisdiction, $wcLine})
  }
  
  
}