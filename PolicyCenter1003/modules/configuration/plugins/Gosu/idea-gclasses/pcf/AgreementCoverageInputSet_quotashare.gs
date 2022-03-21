package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/AgreementCoverageInputSet.quotashare.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AgreementCoverageInputSet_quotashare extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($agreement :  RIAgreement) : void {
    __widgetOf(this, pcf.AgreementCoverageInputSet_quotashare, SECTION_WIDGET_CLASS).setVariables(false, {$agreement})
  }
  
  function refreshVariables ($agreement :  RIAgreement) : void {
    __widgetOf(this, pcf.AgreementCoverageInputSet_quotashare, SECTION_WIDGET_CLASS).setVariables(true, {$agreement})
  }
  
  
}