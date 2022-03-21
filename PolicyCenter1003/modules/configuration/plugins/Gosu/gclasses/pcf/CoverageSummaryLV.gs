package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/CoverageSummaryLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoverageSummaryLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($clauses :  List<gw.api.domain.Clause>, $coverable :  Coverable) : void {
    __widgetOf(this, pcf.CoverageSummaryLV, SECTION_WIDGET_CLASS).setVariables(false, {$clauses, $coverable})
  }
  
  function refreshVariables ($clauses :  List<gw.api.domain.Clause>, $coverable :  Coverable) : void {
    __widgetOf(this, pcf.CoverageSummaryLV, SECTION_WIDGET_CLASS).setVariables(true, {$clauses, $coverable})
  }
  
  
}