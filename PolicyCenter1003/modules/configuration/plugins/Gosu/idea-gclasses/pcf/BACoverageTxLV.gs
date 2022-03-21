package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BACoverageTxLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BACoverageTxLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($txs :  java.util.List<entity.BATransaction>, $addStateToCoverageName :  boolean) : void {
    __widgetOf(this, pcf.BACoverageTxLV, SECTION_WIDGET_CLASS).setVariables(false, {$txs, $addStateToCoverageName})
  }
  
  function refreshVariables ($txs :  java.util.List<entity.BATransaction>, $addStateToCoverageName :  boolean) : void {
    __widgetOf(this, pcf.BACoverageTxLV, SECTION_WIDGET_CLASS).setVariables(true, {$txs, $addStateToCoverageName})
  }
  
  
}