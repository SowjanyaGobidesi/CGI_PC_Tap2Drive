package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPLocationsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPLocationsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($bopLine :  BusinessOwnersLine) : void {
    __widgetOf(this, pcf.BOPLocationsLV, SECTION_WIDGET_CLASS).setVariables(false, {$bopLine})
  }
  
  function refreshVariables ($bopLine :  BusinessOwnersLine) : void {
    __widgetOf(this, pcf.BOPLocationsLV, SECTION_WIDGET_CLASS).setVariables(true, {$bopLine})
  }
  
  
}