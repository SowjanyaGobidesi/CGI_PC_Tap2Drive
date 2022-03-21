package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/IMCostLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMCostLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($costs :  java.util.List<IMCost>) : void {
    __widgetOf(this, pcf.IMCostLV, SECTION_WIDGET_CLASS).setVariables(false, {$costs})
  }
  
  function refreshVariables ($costs :  java.util.List<IMCost>) : void {
    __widgetOf(this, pcf.IMCostLV, SECTION_WIDGET_CLASS).setVariables(true, {$costs})
  }
  
  
}