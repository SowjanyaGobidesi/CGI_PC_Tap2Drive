package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/copydata/SelectIndividualCoveragesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SelectIndividualCoveragesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($coverageCopiers :  List<gw.coverage.ClausePatternCopier>) : void {
    __widgetOf(this, pcf.SelectIndividualCoveragesLV, SECTION_WIDGET_CLASS).setVariables(false, {$coverageCopiers})
  }
  
  function refreshVariables ($coverageCopiers :  List<gw.coverage.ClausePatternCopier>) : void {
    __widgetOf(this, pcf.SelectIndividualCoveragesLV, SECTION_WIDGET_CLASS).setVariables(true, {$coverageCopiers})
  }
  
  
}