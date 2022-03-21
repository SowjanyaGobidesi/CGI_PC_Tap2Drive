package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/TaxLocationSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TaxLocationSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.lob.common.TaxLocationSearchCriteria) : void {
    __widgetOf(this, pcf.TaxLocationSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.lob.common.TaxLocationSearchCriteria) : void {
    __widgetOf(this, pcf.TaxLocationSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}