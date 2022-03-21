package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/AgreementPAndCInputSet.treaty.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AgreementPAndCInputSet_treaty extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($agreement :  RIAgreement) : void {
    __widgetOf(this, pcf.AgreementPAndCInputSet_treaty, SECTION_WIDGET_CLASS).setVariables(false, {$agreement})
  }
  
  function refreshVariables ($agreement :  RIAgreement) : void {
    __widgetOf(this, pcf.AgreementPAndCInputSet_treaty, SECTION_WIDGET_CLASS).setVariables(true, {$agreement})
  }
  
  
}