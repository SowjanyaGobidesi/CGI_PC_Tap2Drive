package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPCoverageTxLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPCoverageTxLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($txs :  java.util.Set<BOPTransaction>) : void {
    __widgetOf(this, pcf.BOPCoverageTxLV, SECTION_WIDGET_CLASS).setVariables(false, {$txs})
  }
  
  function refreshVariables ($txs :  java.util.Set<BOPTransaction>) : void {
    __widgetOf(this, pcf.BOPCoverageTxLV, SECTION_WIDGET_CLASS).setVariables(true, {$txs})
  }
  
  
}