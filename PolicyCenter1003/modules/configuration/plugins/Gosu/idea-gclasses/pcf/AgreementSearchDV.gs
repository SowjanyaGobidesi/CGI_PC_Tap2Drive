package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/AgreementSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AgreementSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($criteria :  gw.reinsurance.search.AgreementSearchCriteria) : void {
    __widgetOf(this, pcf.AgreementSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$criteria})
  }
  
  function refreshVariables ($criteria :  gw.reinsurance.search.AgreementSearchCriteria) : void {
    __widgetOf(this, pcf.AgreementSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$criteria})
  }
  
  
}