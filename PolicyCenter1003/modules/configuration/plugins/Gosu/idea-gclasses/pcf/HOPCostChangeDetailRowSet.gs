package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPCostChangeDetailRowSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPCostChangeDetailRowSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  entity.PolicyPeriod, $costChanges :  java.util.List<entity.HOPTransaction>) : void {
    __widgetOf(this, pcf.HOPCostChangeDetailRowSet, SECTION_WIDGET_CLASS).setVariables(false, {$period, $costChanges})
  }
  
  function refreshVariables ($period :  entity.PolicyPeriod, $costChanges :  java.util.List<entity.HOPTransaction>) : void {
    __widgetOf(this, pcf.HOPCostChangeDetailRowSet, SECTION_WIDGET_CLASS).setVariables(true, {$period, $costChanges})
  }
  
  
}