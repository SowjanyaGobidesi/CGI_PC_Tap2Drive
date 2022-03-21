package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PALineAdditionalCoveragesDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PALineAdditionalCoveragesDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($paLine :  PersonalAutoLine, $includedCoverageCategories :  String[], $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PALineAdditionalCoveragesDV, SECTION_WIDGET_CLASS).setVariables(false, {$paLine, $includedCoverageCategories, $openForEdit})
  }
  
  function refreshVariables ($paLine :  PersonalAutoLine, $includedCoverageCategories :  String[], $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PALineAdditionalCoveragesDV, SECTION_WIDGET_CLASS).setVariables(true, {$paLine, $includedCoverageCategories, $openForEdit})
  }
  
  
}