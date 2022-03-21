package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPCostChangeDetailLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPCostChangeDetailLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($line :  entity.HOPLine, $costChanges :  java.util.List<entity.HOPTransaction>) : void {
    __widgetOf(this, pcf.HOPCostChangeDetailLV, SECTION_WIDGET_CLASS).setVariables(false, {$line, $costChanges})
  }
  
  function refreshVariables ($line :  entity.HOPLine, $costChanges :  java.util.List<entity.HOPTransaction>) : void {
    __widgetOf(this, pcf.HOPCostChangeDetailLV, SECTION_WIDGET_CLASS).setVariables(true, {$line, $costChanges})
  }
  
  
}