package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/UWRuleFilterCriteriaDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWRuleFilterCriteriaDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($criteria :  gw.web.bizrules.UWRuleFilterCriteria) : void {
    __widgetOf(this, pcf.UWRuleFilterCriteriaDV, SECTION_WIDGET_CLASS).setVariables(false, {$criteria})
  }
  
  function refreshVariables ($criteria :  gw.web.bizrules.UWRuleFilterCriteria) : void {
    __widgetOf(this, pcf.UWRuleFilterCriteriaDV, SECTION_WIDGET_CLASS).setVariables(true, {$criteria})
  }
  
  
}